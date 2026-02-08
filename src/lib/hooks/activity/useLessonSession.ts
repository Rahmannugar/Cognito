import { useState, useRef, useEffect, useCallback } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useLessonWebSocket } from "@/lib/hooks/activity/useLessonWebSocket";

export function useLessonSession() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const { state } = useLocation();
  const unit = state?.unit;
  const isYouTubeMode = !!unit?.youtubeUrl;

  const [isPlaying, setIsPlaying] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<any>(null); // YouTube Player ref
  const [showExitDialog, setShowExitDialog] = useState(false);

  // Session states
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(
    null,
  );
  const [isShowingFeedback, setIsShowingFeedback] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [manualChatEnabled, setManualChatEnabled] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isAudioFinished, setIsAudioFinished] = useState(false);

  // Latest Fix States
  const [ttsRequestedForStep, setTtsRequestedForStep] = useState<string | null>(
    null,
  );
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [introStatus, setIntroStatus] = useState<
    "NONE" | "REQUESTED" | "FINISHED"
  >("NONE");
  const [isCurrentlyPausing, setIsCurrentlyPausing] = useState(false);

  const {
    steps,
    isConnected,
    sendMessage,
    clarificationResponse,
    isLoadingClarification,
    sendStepCompleted,
    requestTTS,
    isCompleted,
    completionStats,
  } = useLessonWebSocket(hasStarted ? sessionId || null : null, isYouTubeMode);

  const currentStep = steps[steps.length - 1];

  const handleAudioEnded = () => {
    setIsAudioFinished(true);

    if (isYouTubeMode && introStatus === "REQUESTED") {
      console.log("Intro finished. Starting video...");
      setIntroStatus("FINISHED");
      if (
        playerRef.current &&
        typeof playerRef.current.playVideo === "function"
      ) {
        playerRef.current.playVideo();
      }
      return;
    }

    if (isYouTubeMode && isCurrentlyPausing) {
      if (isQuizActive) {
        console.log("Audio ended for Quiz. Showing quiz modal...");
        return;
      }
      console.log("Explanation finished. Resuming video...");
      setIsCurrentlyPausing(false);
      if (
        playerRef.current &&
        typeof playerRef.current.playVideo === "function"
      ) {
        playerRef.current.playVideo();
      }
      return;
    }

    if (currentStep?.stepType === "CONCLUSION") {
      console.log(
        "CONCLUSION step audio ended. Waiting for SESSION_COMPLETED signal...",
      );
      return;
    }

    if (!isQuizActive && !manualChatEnabled) {
      console.log("Audio ended - Auto-advancing step...");
      sendStepCompleted();
    }
  };

  useEffect(() => {
    setIsAudioFinished(false);
    setIsCurrentlyPausing(false);
    if (
      currentStep?.stepPayload?.quizzesJson &&
      currentStep.stepPayload.quizzesJson.length > 0
    ) {
      setIsQuizActive(true);
      setIsQuizFinished(false);
      setCurrentQuizIndex(0);
      setQuizScore(0);
      setSelectedAnswerIndex(null);
      setIsShowingFeedback(false);
      setManualChatEnabled(false);
    } else {
      setIsQuizActive(false);
      setManualChatEnabled(false);
    }
    setTtsRequestedForStep(null);
  }, [currentStep]);

  useEffect(() => {
    const targetStep = clarificationResponse || currentStep;
    if (targetStep?.stepPayload?.canvasHtmlContent && iframeRef.current) {
      const iframe = iframeRef.current;
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (doc) {
        doc.open();
        doc.write(targetStep.stepPayload.canvasHtmlContent);
        doc.close();
      }
    }
  }, [currentStep, clarificationResponse]);

  const extractVideoId = (url: string) => {
    const regex =
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const videoId = unit?.youtubeUrl ? extractVideoId(unit.youtubeUrl) : null;

  const stateRef = useRef({
    isQuizActive,
    manualChatEnabled,
    currentStep,
  });

  useEffect(() => {
    stateRef.current = { isQuizActive, manualChatEnabled, currentStep };
  }, [isQuizActive, manualChatEnabled, currentStep]);

  const onPlayerReady = useCallback(() => {
    console.log("YouTube Player Ready");
    setIsPlayerReady(true);
  }, []);

  const onStateChange = useCallback(
    (event: any) => {
      setIsPlaying(event.data === 1);
      // Auto-advance if video finishes naturally (State 0 = Ended)
      if (event.data === 0) {
        const { isQuizActive, manualChatEnabled, currentStep } =
          stateRef.current;
        if (
          !isQuizActive &&
          !manualChatEnabled &&
          currentStep?.stepType !== "CONCLUSION"
        ) {
          console.log("Video ended naturally. Auto-advancing...");
          sendStepCompleted();
        }
      }
    },
    [sendStepCompleted],
  );

  useEffect(() => {
    if (isYouTubeMode && hasStarted && isConnected && introStatus === "NONE") {
      const introText = `I am Ajibade, your AI tutor. We will be watching this lesson on ${unit?.title || "the topic"}. Just watch, and I will pause the video if I need to explain something or ask a question. Let's get started!`;
      requestTTS(introText);
      setIntroStatus("REQUESTED");
    }
  }, [isYouTubeMode, hasStarted, isConnected, introStatus, unit, requestTTS]);

  useEffect(() => {
    if (isQuizActive || !currentStep?.id) return;

    const interval = setInterval(() => {
      if (
        playerRef.current &&
        typeof playerRef.current.getCurrentTime === "function"
      ) {
        if (!isPlayerReady) setIsPlayerReady(true);

        const currentTime = playerRef.current.getCurrentTime();
        const pauseTime = currentStep?.stepPayload?.pauseAtSeconds;

        if (
          typeof pauseTime === "number" &&
          currentTime >= pauseTime &&
          currentTime < pauseTime + 1.5
        ) {
          const state = playerRef.current.getPlayerState();
          // State 1 = Playing
          if (state === 1 && !isCurrentlyPausing) {
            console.log(`🎯 Target reached: ${pauseTime}s. Pausing video...`);
            setIsCurrentlyPausing(true);
            playerRef.current.pauseVideo();

            if (
              currentStep.stepPayload.textToSpeak &&
              ttsRequestedForStep !== currentStep.id
            ) {
              requestTTS(currentStep.stepPayload.textToSpeak);
              setTtsRequestedForStep(currentStep.id);
            }
          }
        }
      }
    }, 200);

    return () => clearInterval(interval);
  }, [
    currentStep,
    requestTTS,
    isPlayerReady,
    ttsRequestedForStep,
    isQuizActive,
    isCurrentlyPausing,
  ]);

  useEffect(() => {
    if (
      playerRef.current &&
      typeof playerRef.current.playVideo === "function"
    ) {
      const state = playerRef.current.getPlayerState();
      if (state === 2 || state === 5) {
        console.log("Resuming video for next segment...");
        setIsCurrentlyPausing(false);
        playerRef.current.playVideo();
      }
    }
  }, [currentStep?.id]);

  const handleBackClick = () => setShowExitDialog(true);
  const handleConfirmExit = () => {
    setShowExitDialog(false);
    sendMessage("CLOSE_SESSION", { sessionId });
    setTimeout(() => {
      navigate("/teach-me/class/units", { replace: true });
    }, 100);
  };

  const handleQuizOptionClick = (_option: string, index: number) => {
    if (isShowingFeedback) return;
    const quizzes = currentStep?.stepPayload?.quizzesJson;
    if (!quizzes) return;
    const quiz = quizzes[currentQuizIndex];
    setSelectedAnswerIndex(index);
    setIsShowingFeedback(true);
    if (index === quiz.correctAnswerIndex) setQuizScore((prev) => prev + 1);
    setTimeout(() => {
      if (currentQuizIndex < quizzes.length - 1) {
        setCurrentQuizIndex((prev) => prev + 1);
        setSelectedAnswerIndex(null);
        setIsShowingFeedback(false);
      } else {
        setIsQuizFinished(true);
      }
    }, 1500);
  };

  const handlePostQuizResponse = (hasQuestion: boolean) => {
    if (hasQuestion) setManualChatEnabled(true);
    else sendStepCompleted();
  };

  const handleAudioStatusChange = useCallback(
    (isPlayingAudio: boolean) => {
      if (
        !isYouTubeMode ||
        !playerRef.current ||
        typeof playerRef.current.pauseVideo !== "function"
      )
        return;

      if (isPlayingAudio) {
        console.log("🔊 Ajibade started speaking - PAUSING video");
        playerRef.current.pauseVideo();
      } else {
        console.log("Mw Ajibade stopped speaking");
        if (
          !isCurrentlyPausing &&
          introStatus === "FINISHED" &&
          !isQuizActive
        ) {
          console.log("▶️ Resuming video after Ajibade speech");
          playerRef.current.playVideo();
        }
      }
    },
    [isYouTubeMode, isCurrentlyPausing, introStatus, isQuizActive],
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      )
        return;
      if (e.key === " " || e.key === "k" || e.key === "K") {
        e.preventDefault();
        if (
          playerRef.current &&
          typeof playerRef.current.getPlayerState === "function"
        ) {
          const state = playerRef.current.getPlayerState();
          if (state === 1) playerRef.current.pauseVideo();
          else playerRef.current.playVideo();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const togglePlayback = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (
      playerRef.current &&
      typeof playerRef.current.getPlayerState === "function"
    ) {
      const state = playerRef.current.getPlayerState();
      if (state === 1) playerRef.current.pauseVideo();
      else playerRef.current.playVideo();
    }
  };

  return {
    sessionId,
    unit,
    isYouTubeMode,
    isPlaying,
    iframeRef,
    playerRef,
    videoId: videoId || "", // Ensure string type
    onPlayerReady,
    onStateChange,
    showExitDialog,
    isQuizActive,
    isQuizFinished,
    currentQuizIndex,
    selectedAnswerIndex,
    isShowingFeedback,
    quizScore,
    manualChatEnabled,
    hasStarted,
    isAudioFinished,
    currentStep,
    steps,
    isConnected,
    clarificationResponse,
    isLoadingClarification,
    isCompleted,
    completionStats,
    introStatus,
    isCurrentlyPausing,

    // Actions
    setHasStarted,
    setShowExitDialog,
    setIsQuizActive,
    handleBackClick,
    handleConfirmExit,
    handleQuizOptionClick,
    handlePostQuizResponse,
    handleAudioEnded,
    handleAudioStatusChange,
    sendMessage,
    requestTTS,
    togglePlayback,
  };
}
