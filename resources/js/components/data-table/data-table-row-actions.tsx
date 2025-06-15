import { Row } from '@tanstack/react-table';
import { FilePen, FileScan, FileX, MoreHorizontal } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface DataTableRowActionsProps<TData> {
    row: Row<TData>;
    onEdit?: (row: Row<TData>, open: boolean, setOpen: (val: boolean) => void) => React.ReactNode;
    onDelete: (row: Row<TData>, open: boolean, setOpen: (val: boolean) => void) => React.ReactNode;
}

export function DataTableRowActions<TData>({ row, onEdit, onDelete }: DataTableRowActionsProps<TData>) {
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const handleEdit = () => setEditOpen(true);
    const handleDelete = () => setDeleteOpen(true);

    return (
        <>
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem>
                        <FileScan className="mr-2 h-4 w-4" />
                        View
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        onSelect={(e) => {
                            e.preventDefault();
                            handleEdit();
                        }}
                    >
                        <FilePen className="mr-2 h-4 w-4" />
                        Edit
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                        onSelect={(e) => {
                            e.preventDefault();
                            handleDelete();
                        }}
                    >
                        <FileX className="mr-2 h-4 w-4 text-red-500" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {onEdit?.(row, editOpen, setEditOpen)}
            {onDelete(row, deleteOpen, setDeleteOpen)}
        </>
    );
}
