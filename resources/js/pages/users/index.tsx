import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import * as React from 'react';

import { userColumn } from '@/components/data-table/columns';
import { DataTable } from '@/components/data-table/data-table';
import { DataTableToolbar } from '@/components/data-table/data-table-toolbar';

import {
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    type ColumnFiltersState,
    type SortingState,
} from '@tanstack/react-table';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Users', href: '/users' },
];

export default function Index({ users }: any) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

    const table = useReactTable({
        data: users,
        columns: userColumn,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        state: {
            sorting,
            columnFilters,
        },
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between space-y-2">
                    <div>
                        <h2 className="text-2xl font-bold">Users</h2>
                        <p className="text-muted-foreground">Manage your users here.</p>
                    </div>
                </div>

                <DataTableToolbar
                    table={table}
                    searchColumn="name"
                    filters={[
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
                    ]}
                />

                <DataTable table={table} />
            </div>
        </AppLayout>
    );
}
