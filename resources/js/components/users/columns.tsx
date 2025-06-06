import { ColumnDef } from "@tanstack/react-table"
import { type User } from "@/types"

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
]
