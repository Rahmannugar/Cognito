import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, Play, FileText, MessageCircle, Sparkles, ChevronRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ThemeToggle } from '@/components/shared/ThemeToggle';

const FEATURES = [
    {
        icon: Play,
        title: 'YouTube Tutor',
        description: 'Transform any video into an interactive lesson with AI-powered quizzes and real-time explanations.',
        gradient: 'from-red-500 to-pink-500',
    },
    {
        icon: FileText,
        title: 'PDF Tutor',
        description: 'Upload documents and get instant summaries, key takeaways, and deep-dive explanations.',
        gradient: 'from-blue-500 to-cyan-500',
    },
    {
        icon: MessageCircle,
        title: 'Teach Me Anything',
        description: 'Learn any topic with step-by-step guidance from our AI instructor on an interactive canvas.',
        gradient: 'from-orange-500 to-yellow-500',
    },
];



export default function Landing() {
    return (
        <div className="min-h-screen bg-white dark:bg-background-dark overflow-hidden">
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-lg">
                            <GraduationCap className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">Cognito</span>
                    </Link>
                    <nav className="hidden md:flex items-center gap-8">
                        <a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">Features</a>
                        <a href="#how-it-works" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">How it Works</a>
                    </nav>
                    <div className="flex items-center gap-3">
                        <ThemeToggle />
                        <Link to="/login">
                            <Button variant="ghost">Log In</Button>
                        </Link>
                        <Link to="/signup">
                            <Button>Get Started</Button>
                        </Link>
                    </div>
                </div>
            </header>

            <section className="pt-32 pb-20 px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5" />
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                            <Sparkles className="w-4 h-4" />
                            AI-Powered Learning Platform
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white leading-tight mb-6">
                            Learn Smarter,
                            <br />
                            <span className="bg-gradient-to-r from-primary via-purple-500 to-blue-500 bg-clip-text text-transparent">
                                Not Harder
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
                            Transform any content into interactive learning experiences with your personal AI tutor, Ajibade.
                            Videos, PDFs, or any topic — master it all.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link to="/signup">
                                <Button size="lg" className="text-lg px-8">
                                    Start Learning Free <ChevronRight className="w-5 h-5" />
                                </Button>
                            </Link>
                            <Link to="/login">
                                <Button variant="secondary" size="lg" className="text-lg px-8">
                                    Watch Demo
                                </Button>
                            </Link>
                        </div>
                        <div className="flex items-center justify-center gap-6 mt-8 text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-green-500" />
                                <span>Free to start</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-green-500" />
                                <span>No credit card required</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="mt-16 relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-background-dark via-transparent to-transparent z-10 pointer-events-none" />
                        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-700/50 max-w-5xl mx-auto">
                            <div className="flex items-center gap-2 px-4 py-3 bg-gray-800/50 border-b border-gray-700/50">
                                <div className="w-3 h-3 rounded-full bg-red-500" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                <div className="w-3 h-3 rounded-full bg-green-500" />
                                <span className="ml-4 text-sm text-gray-400">cognito.app</span>
                            </div>
                            <div className="p-8 flex items-center justify-center min-h-[300px]">
                                <div className="text-center">
                                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                                        <span className="text-3xl font-black text-white">A</span>
                                    </div>
                                    <p className="text-white text-lg font-medium">Meet Ajibade, your AI tutor</p>
                                    <p className="text-gray-400 text-sm mt-1">Ready to help you learn anything</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <section id="features" className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            One Platform, Endless Learning
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            Whether you learn from videos, documents, or need personalized teaching — Cognito adapts to you.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {FEATURES.map((feature, i) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700"
                            >
                                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg`}>
                                    <feature.icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="how-it-works" className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            How It Works
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400">
                            Get started in seconds, learn for a lifetime.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            { step: '01', title: 'Choose Your Content', desc: 'Paste a YouTube link, upload a PDF, or pick any topic you want to master.' },
                            { step: '02', title: 'Meet Ajibade', desc: 'Your AI tutor breaks down the content, creates quizzes, and answers your questions.' },
                            { step: '03', title: 'Master the Material', desc: 'Interactive exercises and spaced repetition ensure you truly understand and remember.' },
                        ].map((item, i) => (
                            <motion.div
                                key={item.step}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="text-center"
                            >
                                <div className="text-6xl font-black text-primary/20 mb-4">{item.step}</div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{item.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>



            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-br from-primary via-purple-600 to-blue-600 rounded-3xl p-12 text-center text-white relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent)]" />
                        <h2 className="text-4xl font-bold mb-4 relative z-10">Ready to Learn Smarter?</h2>
                        <p className="text-xl text-white/80 mb-8 relative z-10">
                            Join thousands of students who are already transforming how they learn.
                        </p>
                        <Link to="/signup">
                            <Button size="lg" className="bg-white text-primary hover:bg-gray-100 text-lg px-10 relative z-10">
                                Get Started Free <ChevronRight className="w-5 h-5" />
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            <footer className="py-12 px-6 border-t border-gray-200 dark:border-gray-800">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                            <GraduationCap className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-lg font-bold text-gray-900 dark:text-white">Cognito</span>
                    </div>
                    <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Cognito. All rights reserved.</p>
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                        <a href="#" className="hover:text-primary transition-colors">Privacy</a>
                        <a href="#" className="hover:text-primary transition-colors">Terms</a>
                        <a href="#" className="hover:text-primary transition-colors">Contact</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
