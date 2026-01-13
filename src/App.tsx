import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SessionProvider } from '@/contexts/SessionContext';
import Landing from '@/pages/Landing';
import Dashboard from '@/pages/Dashboard';
import YouTubeTutor from '@/pages/YouTubeTutor';
import PDFTutor from '@/pages/PDFTutor';
import TeachMe from '@/pages/TeachMe';
import QuizMode from '@/pages/QuizMode';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import Classes from '@/pages/Classes';
import Community from '@/pages/Community';
import Settings from '@/pages/Settings';

export default function App() {
    return (
        <SessionProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/youtube" element={<YouTubeTutor />} />
                    <Route path="/pdf" element={<PDFTutor />} />
                    <Route path="/teach-me" element={<TeachMe />} />
                    <Route path="/quiz" element={<QuizMode />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/classes" element={<Classes />} />
                    <Route path="/community" element={<Community />} />
                    <Route path="/settings" element={<Settings />} />
                </Routes>
            </BrowserRouter>
        </SessionProvider>
    );
}
