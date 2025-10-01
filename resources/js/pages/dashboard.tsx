import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { PlusIcon, TablePropertiesIcon } from 'lucide-react';
import { useRoute } from 'ziggy';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

interface Props {
    ingredientsCount: number;
}

export default function Dashboard({ ingredientsCount }: Props) {
    const route = useRoute();
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative flex aspect-video flex-col gap-2 overflow-hidden rounded-xl border border-sidebar-border/70 p-4 dark:border-sidebar-border">
                        <h2 className="text-center">Manage ingredients</h2>
                        <div className="flex flex-1 flex-col justify-end gap-2">
                            <div className="flex justify-between gap-1 text-gray-500">
                                <p>count</p>
                                <p>{ingredientsCount}</p>
                            </div>
                            <div className="flex justify-between gap-1 text-gray-500">
                                <p>count</p>
                                <p>x</p>
                            </div>
                            <div className="flex justify-end gap-2">
                                <Link
                                    href={route('ingredients.create')}
                                    className="flex items-center gap-2 rounded-md bg-gray-100 p-1 px-2 text-neutral-900"
                                >
                                    <PlusIcon /> Create
                                </Link>
                                <Link
                                    href={route('ingredients.index')}
                                    className="flex items-center gap-2 rounded-md bg-gray-100 p-1 px-2 text-neutral-900"
                                >
                                    <TablePropertiesIcon />
                                    Show all
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </AppLayout>
    );
}
