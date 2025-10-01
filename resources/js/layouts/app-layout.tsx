import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { useEffect, type ReactNode } from 'react';
import toast, { Toaster } from 'react-hot-toast';

interface AppLayoutProps {
    children: ReactNode;
    endSlot?: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, endSlot, ...props }: AppLayoutProps) => {
    const { flash } = usePage().props as unknown as { flash: { success?: string } };

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash?.success);
        }
    }, [flash?.success]);

    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs} endSlot={endSlot} {...props}>
            <Toaster position="top-right" reverseOrder={false} />
            {children}
        </AppLayoutTemplate>
    );
};
