import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Upload, MessageCircle, Check, Clock, Flame, TrendingUp, ChevronRight } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/Button';
import { StatsCard, RecentActivity } from '@/components/shared';
import { MOCK_USER } from '@/lib/constants';
import { cn } from '@/lib/utils';

const LEARNING_MODES = [
    {
        id: 'youtube',
        title: 'YouTube Tutor',
        description: 'Turn any video into an interactive lesson with real-time quizzes and notes.',
        icon: Play,
        href: '/youtube',
        buttonText: 'Start Watching',
        gradient: 'from-red-500/10 to-pink-500/10',
        hoverBorder: 'hover:border-red-200',
        iconBg: 'from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20',
        iconColor: 'text-red-500',
    },
    {
        id: 'pdf',
        title: 'PDF Tutor',
        description: 'Upload readings and documents to get instant summaries and key takeaways.',
        icon: Upload,
        href: '/pdf',
        buttonText: 'Upload PDF',
        gradient: 'from-blue-500/10 to-purple-500/10',
        hoverBorder: 'hover:border-blue-200',
        iconBg: 'from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20',
        iconColor: 'text-blue-600',
    },
    {
        id: 'teach-me',
        title: 'Teach Me',
        description: 'Get step-by-step explanations on any topic from an AI instructor.',
        icon: MessageCircle,
        href: '/teach-me',
        buttonText: 'Start Session',
        gradient: 'from-orange-500/10 to-yellow-500/10',
        hoverBorder: 'hover:border-orange-200',
        iconBg: 'from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20',
        iconColor: 'text-orange-500',
    },
];

const RECENT_SESSIONS = [
    {
        id: '1',
        title: 'Intro to Calculus',
        type: 'Video' as const,
        thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYpI-ldrmCENIk-urdRj6V_Za8Cyilcr_3Zc-G82QVJXFHbWQ1hgra2PZhd7Q7ZGbf9kQTPPLhJml5sqdLLwJvYhCoejs0MgAKT_pOKUpgl943Wpab_4Lsn7A4gKp9O-0bcYiRiDECErzY4eaB7NINoCq9nB_dTqhFMyRZk2HrUM6xfmB3uKmuWy68kOJe-cHdL6Hu5Fz0TDVpbn9ibhfe1WhD0WJrc3XcoI6FW1v0WTMJi7WKI5HFY93gYGSIpvcj9D2QUwc6zFqH',
        progress: 80,
        timeAgo: '2 hours ago',
    },
    {
        id: '2',
        title: 'French Revolution History',
        type: 'PDF' as const,
        thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCXZGpoLUrwSWpo_aEeExt9ewVS3iuQFGWxq9IMrV2ieWAQ73aO7qjXw8RHSJgl3rIns7pjWdjENowhmacjnkvyB1hvNvCu_LFbvErSA7m0uWl5dNvS54TFAZuTJN3Cbu-41Ip4TFwx4c-xPj-niBdNR90_4nvDmzsiah0etdQLRGasdPxvq33s7UeJySEi0Ll_2NaM7nO_WrYRQciwepc3b3qlVlkLcRC1RUdl58grdLsyl-vqdfHW1i_oCUMEdSrB2yIrTP1iSMAl',
        progress: 45,
        timeAgo: 'Yesterday',
    },
    {
        id: '3',
        title: 'Organic Chemistry Basics',
        type: 'Quiz' as const,
        thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBl9Yp2X2OXLml8izb9bAFuzep4ZWCEwrcaz3Ak3FD28_Yj6Z4aESydBBIwDtxQ_PzFYrzAM2vrarDTLQdssOLAMJV7uTdmRrnxAoevVInxrmrKRzFYxVV2M4OAcWidDfzBX6GXJh5v8zQt33sOnyRn2hteffVTaO9egqh9tCTni6k0s02VYuv_3wu2OduYjFx3bPYYWYsm_T9b3t0pxWNGcQxb8X5vzYS_dEgh2JAzhJC5SsGty1WIPROuQteWxr3XJD9a3xvTJWEg',
        progress: 0,
        timeAgo: '2 days ago',
    },
    {
        id: '4',
        title: 'Python Programming',
        type: 'Video' as const,
        thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPcSEpVzhKAEySJ5qglO_aC09yS9M9tNsB1f3ckBHFNJd3Dsd1v740S9vfVrs_DLvw7p4WNILZbGVOOJgCfJEntrq7W-HQ9_i3eZgJJ9fE3-0lASJiwJD38jCu56I5HOlzZBUiBmGW7ey-tSal-mcQZh4t1mdKWT-kL2DGg0d7TZd6-4xT53cAiDMjGdm_rGZXbEpFzSxRrvsZC6isaFfqcRWLNrpQXZPzYADUCEON1V5PR8SyicHW5mWpdhXSbCkcD0I9OQ0GtSAe',
        progress: 100,
        timeAgo: '3 days ago',
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

export default function Dashboard() {
    return (
        <AppLayout>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-[1440px] w-full mx-auto p-6 lg:p-10 grid grid-cols-1 xl:grid-cols-12 gap-8"
            >
                <div className="xl:col-span-8 flex flex-col gap-8">
                    <motion.section
                        variants={itemVariants}
                        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary-dark to-primary p-8 md:p-10 text-white shadow-lg shadow-primary/20"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
                        <div className="absolute bottom-0 left-20 w-40 h-40 bg-purple-900/20 rounded-full blur-2xl pointer-events-none" />
                        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="space-y-2">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/20 text-xs font-bold uppercase tracking-wider mb-2">
                                    <Flame className="w-4 h-4" />
                                    <span>12 Day Streak</span>
                                </div>
                                <h1 className="text-3xl md:text-4xl font-bold leading-tight">
                                    Welcome back, {MOCK_USER.name}!
                                </h1>
                                <p className="text-purple-100 max-w-md text-sm md:text-base opacity-90">
                                    Ready to continue your learning journey? You have 3 pending tasks for
                                    today.
                                </p>
                            </div>
                            <div className="flex-shrink-0">
                                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 flex flex-col items-center justify-center min-w-[120px]">
                                    <span className="text-3xl font-bold">85%</span>
                                    <span className="text-xs text-purple-100 uppercase tracking-wide">
                                        Weekly Goal
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    <motion.div
                        variants={itemVariants}
                        className="flex items-center justify-between"
                    >
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Choose Learning Mode
                        </h2>
                        <a
                            href="#"
                            className="text-sm font-medium text-primary hover:text-primary/80 flex items-center gap-1"
                        >
                            View all <ChevronRight className="w-4 h-4" />
                        </a>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    >
                        {LEARNING_MODES.map((mode) => (
                            <div
                                key={mode.id}
                                className={cn(
                                    'group relative flex flex-col bg-white dark:bg-card-dark rounded-2xl p-6',
                                    'shadow-soft hover:shadow-lg transition-all duration-300',
                                    'border border-transparent overflow-hidden',
                                    mode.hoverBorder
                                )}
                            >
                                <div
                                    className={cn(
                                        'absolute top-0 right-0 w-32 h-32 bg-gradient-to-br rounded-full blur-2xl -mr-10 -mt-10',
                                        'group-hover:scale-150 transition-transform duration-500',
                                        mode.gradient
                                    )}
                                />
                                <div
                                    className={cn(
                                        'mb-6 w-14 h-14 rounded-xl bg-gradient-to-br flex items-center justify-center',
                                        mode.iconBg,
                                        mode.iconColor
                                    )}
                                >
                                    <mode.icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                    {mode.title}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 flex-1 leading-relaxed">
                                    {mode.description}
                                </p>
                                <Link to={mode.href}>
                                    <Button className="w-full">
                                        {mode.buttonText}
                                        <ChevronRight className="w-4 h-4" />
                                    </Button>
                                </Link>
                            </div>
                        ))}
                    </motion.div>

                    <motion.div variants={itemVariants} className="mt-auto pt-4">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                            Your Progress
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <StatsCard
                                icon={<Check className="w-5 h-5" />}
                                value={24}
                                label="Lessons Done"
                                iconBgColor="bg-green-100 dark:bg-green-900/30"
                                iconColor="text-green-600"
                            />
                            <StatsCard
                                icon={<Clock className="w-5 h-5" />}
                                value="12.5h"
                                label="Hours Spent"
                                iconBgColor="bg-purple-100 dark:bg-purple-900/30"
                                iconColor="text-purple-600"
                            />
                            <StatsCard
                                icon={<Flame className="w-5 h-5" />}
                                value={12}
                                label="Current Streak"
                                iconBgColor="bg-orange-100 dark:bg-orange-900/30"
                                iconColor="text-orange-600"
                            />
                            <StatsCard
                                icon={<TrendingUp className="w-5 h-5" />}
                                value="Top 5%"
                                label="Class Rank"
                                iconBgColor="bg-blue-100 dark:bg-blue-900/30"
                                iconColor="text-blue-600"
                            />
                        </div>
                    </motion.div>
                </div>

                <motion.div variants={itemVariants} className="xl:col-span-4">
                    <RecentActivity sessions={RECENT_SESSIONS} className="h-full" />
                </motion.div>
            </motion.div>
        </AppLayout>
    );
}
