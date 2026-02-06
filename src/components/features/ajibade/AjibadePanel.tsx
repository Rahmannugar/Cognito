import { useState, useRef, useEffect, type FormEvent } from "react";
import { Send, Mic, MicOff } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { MessageBubble } from "./MessageBubble";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

import { AJIBADE_AVATAR } from "@/lib/constants";

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: string;
}

interface AjibadePanelProps {
    className?: string;
    onSendMessage: (message: string) => void;
    clarificationResponse?: {
        id?: string;
        stepPayload: { textToSpeak: string };
    } | null;
    isLoadingClarification?: boolean;
    disabled?: boolean;
    currentStepText?: string | null;
    onPlaybackEnded?: () => void;
}

const INITIAL_MESSAGES: Message[] = [];

// Waveform visualization component
const Waveform = ({ isPlaying }: { isPlaying: boolean }) => (
    <div className="flex items-center gap-1 h-8">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <motion.div
                key={i}
                className="w-1 bg-emerald-400 rounded-full"
                animate={
                    isPlaying
                        ? {
                            height: [8, 16, 8, 24, 8],
                        }
                        : {
                            height: 4,
                        }
                }
                transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    delay: i * 0.05,
                    ease: "easeInOut",
                }}
            />
        ))}
    </div>
);

export function AjibadePanel({
    className,
    onSendMessage,
    clarificationResponse,
    isLoadingClarification,
    disabled = false,
    currentStepText,
    onPlaybackEnded,
}: AjibadePanelProps) {
    const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
    const [input, setInput] = useState("");
    const [isRecording, setIsRecording] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isPlayingAudio, setIsPlayingAudio] = useState(false);
    const chatRef = useRef<HTMLDivElement>(null);
    const onPlaybackEndedRef = useRef(onPlaybackEnded);

    useEffect(() => {
        onPlaybackEndedRef.current = onPlaybackEnded;
    }, [onPlaybackEnded]);

    // --- Web Audio API Refs ---
    const audioContextRef = useRef<AudioContext | null>(null);
    const nextStartTimeRef = useRef<number>(0);
    const isPlayingRef = useRef(false);
    const activeSourcesRef = useRef<AudioBufferSourceNode[]>([]);
    const playbackTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Initialize Audio Context
    useEffect(() => {
        const initAudioContext = () => {
            if (!audioContextRef.current) {
                // Backend sends 24kHz audio
                const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
                audioContextRef.current = new AudioContextClass({ sampleRate: 24000 });
            }
        };

        // Initialize on interaction or load if allowed
        initAudioContext();

        return () => {
            stopAudio();
            if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
                audioContextRef.current.close();
                audioContextRef.current = null;
            }
        };
    }, []);

    const stopAudio = () => {
        activeSourcesRef.current.forEach(source => {
            try {
                source.stop();
                source.disconnect();
            } catch (e) { /* ignore */ }
        });
        activeSourcesRef.current = [];
        isPlayingRef.current = false;
        setIsPlayingAudio(false);
        nextStartTimeRef.current = 0;

        if (playbackTimeoutRef.current) {
            clearTimeout(playbackTimeoutRef.current);
            playbackTimeoutRef.current = null;
        }
    };

    const processAudioChunk = (base64Audio: string) => {
        const ctx = audioContextRef.current;
        if (!ctx) return;

        try {
            // 1. Base64 -> Float32Array (PCM)
            const binaryString = window.atob(base64Audio);
            const len = binaryString.length;
            const bytes = new Uint8Array(len);
            for (let i = 0; i < len; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }

            // Convert 16-bit PCM bytes to Float32 [-1.0, 1.0]
            // 16-bit = 2 bytes per sample. Little endian.
            const samples = new Int16Array(bytes.buffer);
            const float32Data = new Float32Array(samples.length);
            for (let i = 0; i < samples.length; i++) {
                // Normalize -32768..32767 to -1.0..1.0
                float32Data[i] = samples[i] / 32768.0;
            }

            // 2. Create AudioBuffer
            const buffer = ctx.createBuffer(
                1, // channels
                float32Data.length,
                24000 // sample rate
            );
            buffer.getChannelData(0).set(float32Data);

            // 3. Schedule Playback
            const source = ctx.createBufferSource();
            source.buffer = buffer;
            source.connect(ctx.destination);

            const currentTime = ctx.currentTime;
            // Ideally schedule right after the previous one finishes
            // Add a tiny buffer (0.05s) if starting fresh to avoid "cutting off" the start
            const scheduleTime = Math.max(currentTime + 0.05, nextStartTimeRef.current);

            source.start(scheduleTime);

            // Update timeline pointer
            nextStartTimeRef.current = scheduleTime + buffer.duration;

            // Track active source
            activeSourcesRef.current.push(source);
            source.onended = () => {
                activeSourcesRef.current = activeSourcesRef.current.filter(s => s !== source);
            };

            // Update UI state
            isPlayingRef.current = true;
            setIsPlayingAudio(true);

            // Handle "Playback Ended" detection
            // We set a timeout for when the *last* scheduled sound finishes
            if (playbackTimeoutRef.current) {
                clearTimeout(playbackTimeoutRef.current);
            }

            // Calculate when this specific chunk (and thus the whole stream so far) ends
            const timeUntilEnd = (nextStartTimeRef.current - currentTime) * 1000;

            playbackTimeoutRef.current = setTimeout(() => {
                // Only trigger if no new chunks have pushed nextStartTimeRef further
                if (audioContextRef.current && audioContextRef.current.currentTime >= nextStartTimeRef.current - 0.1) {
                    isPlayingRef.current = false;
                    setIsPlayingAudio(false);
                    onPlaybackEndedRef.current?.();
                }
            }, timeUntilEnd + 100); // Small buffer for safety

        } catch (e) {
            console.error("Error processing audio chunk:", e);
        }
    };

    useEffect(() => {
        const handleAudioChunk = (event: CustomEvent<string>) => {
            const base64Audio = event.detail;
            if (!base64Audio) return;

            // Ensure context is running (browsers suspend it until user gesture)
            if (audioContextRef.current?.state === 'suspended') {
                audioContextRef.current.resume();
            }

            processAudioChunk(base64Audio);
        };

        window.addEventListener(
            "lesson-audio-chunk",
            handleAudioChunk as EventListener,
        );

        return () => {
            window.removeEventListener(
                "lesson-audio-chunk",
                handleAudioChunk as EventListener,
            );
        };
    }, []);

    // Reset audio when stepping (changing text)
    useEffect(() => {
        // If text changes, it implies a new step, so we might want to ensure we aren't playing old audio.
        // However, for streaming, we might receive text *before* audio finishes.
        // But typically a "new step" means "stop previous step's audio".
        // Let's safe-guard: if currentStepText changes significantly or looking for a "reset" signal.
        // For now, relies mostly on the stream flow. 
        // Optionally reset timeline if needed, but streaming usually implies continuous flow.
    }, [currentStepText]);

    useEffect(() => {
        if (currentStepText) {
            const newMsg: Message = {
                id: `transcript-${Date.now()}`,
                role: "assistant",
                content: currentStepText,
                timestamp: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                }),
            };
            setMessages((prev) => {
                if (
                    prev.length > 0 &&
                    prev[prev.length - 1]?.content === currentStepText
                )
                    return prev;
                return [...prev, newMsg];
            });
        }
    }, [currentStepText]);

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [messages, isMobileOpen]);

    useEffect(() => {
        if (clarificationResponse) {
            const aiMessage: Message = {
                id: Date.now().toString(),
                role: "assistant",
                content: clarificationResponse.stepPayload.textToSpeak,
                timestamp: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                }),
            };
            setMessages((prev) => [...prev, aiMessage]);
        }
    }, [clarificationResponse]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: input.trim(),
            timestamp: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            }),
        };

        setMessages((prev) => [...prev, userMessage]);
        onSendMessage(input.trim());
        setInput("");
    };

    const toggleRecording = () => {
        setIsRecording(!isRecording);
        if (!isRecording) {
            setTimeout(() => {
                setIsRecording(false);
                setInput(
                    (prev) => prev + (prev ? " " : "") + "Voice message transcribed...",
                );
            }, 2000);
        }
    };

    return (
        <>
            <div
                className={cn(
                    "flex flex-col bg-slate-900/95 backdrop-blur-xl border-l border-white/10 relative transition-transform duration-300",
                    "lg:relative lg:translate-y-0",
                    className,
                )}
            >
                <div
                    className="lg:hidden absolute -top-8 left-0 right-0 h-8 bg-slate-900/95 rounded-t-xl flex items-center justify-center border-t border-x border-white/10 cursor-pointer"
                    onClick={() => setIsMobileOpen(!isMobileOpen)}
                >
                    <div className="w-12 h-1.5 bg-slate-600 rounded-full" />
                </div>

                <div className="p-4 border-b border-white/10 bg-slate-900/80 backdrop-blur-xl shrink-0 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Avatar
                                src={AJIBADE_AVATAR}
                                alt="Ajibade"
                                size="lg"
                                ring
                                className="relative"
                            />
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-900" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-white tracking-tight">
                                Ajibade AI
                            </h3>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {isPlayingAudio && <Waveform isPlaying={isPlayingAudio} />}
                    </div>
                </div>

                <div
                    ref={chatRef}
                    className="flex-1 overflow-y-auto p-4 space-y-6 bg-slate-900/50"
                >
                    <div className="flex justify-center">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-slate-800/50 px-3 py-1 rounded-full border border-white/5">
                            Today
                        </span>
                    </div>
                    {messages.map((message) => (
                        <MessageBubble
                            key={message.id}
                            role={message.role}
                            content={message.content}
                            timestamp={message.timestamp}
                            avatar={message.role === "assistant" ? AJIBADE_AVATAR : undefined}
                        />
                    ))}
                    {isLoadingClarification && (
                        <div className="flex items-center gap-2 text-slate-400 pl-2">
                            <span className="text-xs animate-pulse">
                                Ajibade is typing...
                            </span>
                        </div>
                    )}
                </div>

                <div className="p-3 bg-slate-900/90 backdrop-blur-xl border-t border-white/5 shrink-0">
                    <form onSubmit={handleSubmit}>
                        <div className="flex items-center gap-2 bg-slate-800/80 p-1.5 rounded-xl border border-white/10 focus-within:border-primary/40 transition-all">
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                disabled={disabled}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSubmit(e);
                                    }
                                }}
                                className="flex-1 bg-transparent border-0 py-2 px-3 text-sm focus:ring-0 focus:outline-none text-white placeholder-slate-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                placeholder={
                                    disabled ? "Complete the quiz first..." : "Message..."
                                }
                            />

                            <button
                                type="button"
                                onClick={toggleRecording}
                                disabled={disabled}
                                className={cn(
                                    "p-2 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed",
                                    isRecording
                                        ? "bg-red-500/20 text-red-500"
                                        : "text-slate-400 hover:text-white",
                                )}
                            >
                                {isRecording ? (
                                    <MicOff className="w-4 h-4" />
                                ) : (
                                    <Mic className="w-4 h-4" />
                                )}
                            </button>

                            <button
                                type="submit"
                                disabled={disabled || !input.trim()}
                                className="p-2 bg-primary text-white rounded-lg hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
