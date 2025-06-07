import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

import { type User } from '@/types';
import { columns } from '@/components/users/columns';
import { DataTable } from '@/components/data-table';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/users',
    },
];

export default function Users({ users }: { users: User[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <DataTable
                    title="Users"
                    description="Manage your users here. You can view, edit, and delete user accounts."
                    columns={columns}
                    data={users}
                />
            </div>
        </AppLayout>
    );
}
