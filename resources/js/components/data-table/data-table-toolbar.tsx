import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table } from '@tanstack/react-table';
import { Search, X } from 'lucide-react';

import { DataTableFacetedFilter } from '@/components/data-table/data-table-faceted-filter';
import { DataTableViewOptions } from '@/components/data-table/data-table-view-options';

interface FilterOption {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
}

interface FilterConfig {
    columnId: string;
    title: string;
    options: FilterOption[];
}

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
    searchColumn?: string;
    filters?: FilterConfig[];
}

export function DataTableToolbar<TData>({ table, searchColumn, filters = [] }: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0;

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
                {searchColumn && table.getColumn(searchColumn) && (
                    <div className="relative flex items-center rounded-md border pl-2 focus-within:ring-1 focus-within:ring-ring">
                        <Search className="h-5 w-5 text-muted-foreground" />
                        <Input
                            placeholder={`Search ${searchColumn}...`}
                            value={(table.getColumn(searchColumn)?.getFilterValue() as string) ?? ''}
                            onChange={(event) => table.getColumn(searchColumn)?.setFilterValue(event.target.value)}
                            className="h-7 border-0 shadow-none focus-visible:ring-0"
                        />
                    </div>
                )}

                {filters.map((filter) => {
                    const column = table.getColumn(filter.columnId);
                    if (!column) return null;
                    return <DataTableFacetedFilter key={filter.columnId} column={column} title={filter.title} options={filter.options} />;
                })}

                {isFiltered && (
                    <Button variant="ghost" onClick={() => table.resetColumnFilters()} className="h-8 px-2 lg:px-3">
                        Reset
                        <X className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>

            <DataTableViewOptions table={table} />
        </div>
    );
}
