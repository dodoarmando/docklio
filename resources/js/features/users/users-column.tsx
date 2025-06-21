import { DataTableColumnHeader } from '@/components/admin/data-table/data-table-columns-header';
import { Checkbox } from '@/components/ui/checkbox';
import { UsersActions } from '@/features/users/users-actions';
import { User } from '@/types';
import { ColumnDef } from '@tanstack/react-table';

export const UserColumn: ColumnDef<User>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected() ? true : table.getIsSomePageRowsSelected() ? 'indeterminate' : false}
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
        header: 'Role',
    },
    {
        accessorKey: 'status',
        header: 'Status',
    },
    {
        accessorKey: 'created_at_diff',
        header: 'Created At',
    },
    {
        id: 'actions',
        cell: ({ row }) => <UsersActions user={row.original} />,
    },
];
