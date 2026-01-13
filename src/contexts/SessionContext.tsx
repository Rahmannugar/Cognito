import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Session } from '@/lib/validators';

interface SessionContextType {
    currentSession: Session | null;
    sessions: Session[];
    setCurrentSession: (session: Session | null) => void;
    addSession: (session: Session) => void;
    updateSession: (id: string, updates: Partial<Session>) => void;
}

const SessionContext = createContext<SessionContextType | null>(null);

interface SessionProviderProps {
    children: ReactNode;
}

export function SessionProvider({ children }: SessionProviderProps) {
    const [currentSession, setCurrentSession] = useState<Session | null>(null);
    const [sessions, setSessions] = useState<Session[]>([]);

    const addSession = useCallback((session: Session) => {
        setSessions((prev) => [session, ...prev]);
    }, []);

    const updateSession = useCallback((id: string, updates: Partial<Session>) => {
        setSessions((prev) =>
            prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
        );
        if (currentSession?.id === id) {
            setCurrentSession((prev) => (prev ? { ...prev, ...updates } : prev));
        }
    }, [currentSession?.id]);

    return (
        <SessionContext.Provider
            value={{ currentSession, sessions, setCurrentSession, addSession, updateSession }}
        >
            {children}
        </SessionContext.Provider>
    );
}

export function useSession() {
    const context = useContext(SessionContext);
    if (!context) {
        throw new Error('useSession must be used within a SessionProvider');
    }
    return context;
}
