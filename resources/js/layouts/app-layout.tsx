import { Toaster } from '@/components/ui/sonner';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => (
    <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
        {children}
        <Toaster
            position="bottom-right"
            toastOptions={{
                className: 'bg-background text-foreground',
                style: {
                    backgroundColor: 'var(--background)',
                    color: 'var(--foreground)',
                },
            }}
        />
    </AppLayoutTemplate>
);
