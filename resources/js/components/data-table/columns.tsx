import { ColumnDef } from '@tanstack/react-table';

import { Checkbox } from '@/components/ui/checkbox';

import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import { User } from '@/types';
import { router } from '@inertiajs/react';
import { ConfirmDeleteDialog } from '../dialog/confirm-delete-dialog';
import EditUserDialog from '../dialog/edit-user-dialog';
import { DataTableRowActions } from './data-table-row-actions';

//User Columns Definition
export const userColumn: ColumnDef<User>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'name',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    },
    {
        accessorKey: 'email',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
    },
    {
        accessorKey: 'role',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Role" />,
    },
    {
        accessorKey: 'status',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    },
    {
        id: 'actions',
        cell: ({ row }) => (
            <DataTableRowActions
                row={row}
                onEdit={(row, open, setOpen) => <EditUserDialog user={row.original} open={open} setOpen={setOpen} />}
                onDelete={(row, open, setOpen) => (
                    <ConfirmDeleteDialog
                        resourceName={row.original.name}
                        deleteUrl={route('users.destroy', row.original.id)}
                        open={open}
                        setOpen={setOpen}
                        onSuccess={() => router.reload({ only: ['users'] })}
                    />
                )}
            />
        ),
    },
];
