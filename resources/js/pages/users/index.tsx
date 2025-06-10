import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

import { userColumn } from '@/components/data-table/columns';
import { DataTable } from '@/components/data-table/data-table';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Users',
        href: '/users',
    },
];

export default function Index({ users }: any) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <h1 className="text-2xl font-bold">Users</h1>
                <p className="text-muted-foreground">
                    Manage your users here.
                </p>
                <DataTable columns={userColumn} data={users} />
            </div>
        </AppLayout>
    );
}
