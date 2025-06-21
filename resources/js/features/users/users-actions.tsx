import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User } from '@/types';
import { MoreHorizontal } from 'lucide-react';

type UserActionsProps = {
    user: User;
};

export function UsersActions({ user }: UserActionsProps) {
    // TODO: Ganti console.log ke fungsi sesuai kebutuhan (misal open dialog/modal)
    const handleView = () => {
        console.log('View user', user);
    };

    const handleEdit = () => {
        console.log('Edit user', user);
    };

    const handleDelete = () => {
        console.log('Delete user', user);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={handleView}>View User</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleEdit}>Edit User</DropdownMenuItem>
                <DropdownMenuItem onClick={handleDelete}>Delete User</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
