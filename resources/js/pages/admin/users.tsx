import { DataTable } from '@/components/admin/data-table/data-table';
import { Button } from '@/components/ui/button';
import { UserColumn } from '@/features/users/users-column';

import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type User } from '@/types';
import { Head } from '@inertiajs/react';

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

// DataTable filter config (for toolbar)
const userFilters = [
    {
        columnId: 'role',
        title: 'Role',
        options: [
            { label: 'Admin', value: 'admin' },
            { label: 'User', value: 'user' },
        ],
    },
    {
        columnId: 'status',
        title: 'Status',
        options: [
            { label: 'Active', value: 'active' },
            { label: 'Offline', value: 'offline' },
        ],
    },
];

export default function Users({ users }: { users: User[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Header */}
                <div className="flex items-center justify-between gap-2">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-2xl font-semibold tracking-tight">Users</h2>
                        <p className="text-muted-foreground">Here's a list of your users.</p>
                    </div>
                </div>

                {/* DataTable with dynamic toolbar */}
                <DataTable
                    columns={UserColumn}
                    data={users}
                    filters={userFilters}
                    searchColumns={['name', 'email']}
                    createButton={<Button size="sm">Create User</Button>}
                />
            </div>
        </AppLayout>
    );
}
