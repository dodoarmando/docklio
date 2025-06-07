import * as React from 'react';

import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useForm, router } from '@inertiajs/react';
import { UserPlus, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

export function CreateUserDialog() {
    const { data, setData, post, processing, reset, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });

    const [showPassword, setShowPassword] = React.useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = React.useState(false);
    const closeRef = React.useRef<HTMLButtonElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('users.store'), {
            onSuccess: () => {
                toast.success(
                    <>
                        User <span className="font-bold">{data.name}</span> created successfully!
                    </>
                );
                reset();
                closeRef.current?.click();
                router.reload({ only: ['users'] });
            },
        });
    };
    

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="sm" className="ml-2 hidden h-8 lg:flex hover:bg-gray-800">
                    <UserPlus className="h-4 w-4" />
                    Create User
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <DialogHeader>
                        <DialogTitle>Create User</DialogTitle>
                        <DialogDescription>
                            Add a new user to your account.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Enter user name"
                                required
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                        </div>

                        <div className="grid gap-2">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <Input
                                id="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="Enter user email"
                                required
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        </div>

                        <div className="grid gap-2 relative">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <Input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="Enter user password"
                                required
                            />
                            <button
                                type="button"
                                className="absolute right-2 top-[38px] text-gray-500"
                                onClick={() => setShowPassword(!showPassword)}
                                tabIndex={-1}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                        </div>

                        <div className="grid gap-2 relative">
                            <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                            <Input
                                id="password_confirmation"
                                type={showPasswordConfirm ? 'text' : 'password'}
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                placeholder="Confirm user password"
                                required
                            />
                            <button
                                type="button"
                                className="absolute right-2 top-[38px] text-gray-500"
                                onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                                tabIndex={-1}
                            >
                                {showPasswordConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                            {errors.password_confirmation && <p className="text-red-500 text-sm">{errors.password_confirmation}</p>}
                        </div>
                    </div>

                    <DialogFooter className="flex justify-end space-x-2 mt-4">
                        <DialogClose asChild>
                            <Button variant="outline" ref={closeRef}>
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Creating...' : 'Create User'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}