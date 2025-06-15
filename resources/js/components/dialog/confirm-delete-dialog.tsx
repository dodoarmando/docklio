import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { router } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import * as React from 'react';
import { toast } from 'sonner';

interface ConfirmDeleteDialogProps {
    title?: string;
    description?: string;
    resourceName: string;
    deleteUrl: string;
    open: boolean;
    setOpen: (open: boolean) => void;
    onSuccess?: () => void;
}

export function ConfirmDeleteDialog({
    title = 'Are you sure?',
    description,
    resourceName,
    deleteUrl,
    open,
    setOpen,
    onSuccess,
}: ConfirmDeleteDialogProps) {
    const [processing, setProcessing] = React.useState(false);

    const handleDelete = (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);

        router.delete(deleteUrl, {
            onSuccess: () => {
                toast.success(
                    <>
                        <span className="font-bold">{resourceName}</span> deleted successfully!
                    </>,
                );
                setOpen(false);
                setProcessing(false);
                if (onSuccess) onSuccess();
            },
            onError: () => setProcessing(false),
        });
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description ?? `This action cannot be undone. This will permanently delete ${resourceName}.`}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={processing}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
