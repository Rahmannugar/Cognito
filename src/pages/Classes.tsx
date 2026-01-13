import { motion } from 'framer-motion';
import { BookOpen, Plus } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

const CLASSES = [
    { id: '1', title: 'Introduction to Calculus', progress: 80, lessons: 12, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYpI-ldrmCENIk-urdRj6V_Za8Cyilcr_3Zc-G82QVJXFHbWQ1hgra2PZhd7Q7ZGbf9kQTPPLhJml5sqdLLwJvYhCoejs0MgAKT_pOKUpgl943Wpab_4Lsn7A4gKp9O-0bcYiRiDECErzY4eaB7NINoCq9nB_dTqhFMyRZk2HrUM6xfmB3uKmuWy68kOJe-cHdL6Hu5Fz0TDVpbn9ibhfe1WhD0WJrc3XcoI6FW1v0WTMJi7WKI5HFY93gYGSIpvcj9D2QUwc6zFqH' },
    { id: '2', title: 'Python Programming', progress: 100, lessons: 8, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPcSEpVzhKAEySJ5qglO_aC09yS9M9tNsB1f3ckBHFNJd3Dsd1v740S9vfVrs_DLvw7p4WNILZbGVOOJgCfJEntrq7W-HQ9_i3eZgJJ9fE3-0lASJiwJD38jCu56I5HOlzZBUiBmGW7ey-tSal-mcQZh4t1mdKWT-kL2DGg0d7TZd6-4xT53cAiDMjGdm_rGZXbEpFzSxRrvsZC6isaFfqcRWLNrpQXZPzYADUCEON1V5PR8SyicHW5mWpdhXSbCkcD0I9OQ0GtSAe' },
    { id: '3', title: 'French Revolution History', progress: 45, lessons: 6, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCXZGpoLUrwSWpo_aEeExt9ewVS3iuQFGWxq9IMrV2ieWAQ73aO7qjXw8RHSJgl3rIns7pjWdjENowhmacjnkvyB1hvNvCu_LFbvErSA7m0uWl5dNvS54TFAZuTJN3Cbu-41Ip4TFwx4c-xPj-niBdNR90_4nvDmzsiah0etdQLRGasdPxvq33s7UeJySEi0Ll_2NaM7nO_WrYRQciwepc3b3qlVlkLcRC1RUdl58grdLsyl-vqdfHW1i_oCUMEdSrB2yIrTP1iSMAl' },
];

export default function Classes() {
    return (
        <AppLayout>
            <div className="max-w-[1440px] mx-auto p-6 lg:p-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between mb-8"
                >
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Classes</h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">Track your enrolled courses and progress</p>
                    </div>
                    <Button>
                        <Plus className="w-4 h-4" /> Add Class
                    </Button>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {CLASSES.map((cls, i) => (
                        <motion.div
                            key={cls.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Card variant="interactive" className="overflow-hidden">
                                <div
                                    className="h-40 bg-cover bg-center"
                                    style={{ backgroundImage: `url("${cls.image}")` }}
                                />
                                <div className="p-5">
                                    <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">{cls.title}</h3>
                                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                                        <BookOpen className="w-4 h-4" />
                                        <span>{cls.lessons} lessons</span>
                                    </div>
                                    <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-primary rounded-full transition-all"
                                            style={{ width: `${cls.progress}%` }}
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">{cls.progress}% complete</p>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
