import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table } from '@tanstack/react-table';
import { Filter, Search, X } from 'lucide-react';
import * as React from 'react';

import { DataTableFacetedFilter } from './data-table-faceted-filter';
import { DataTableViewOptions } from './data-table-view-options';

// Option untuk setiap filter (dropdown)
export interface FilterOption {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
}

// Konfigurasi filter pada toolbar
export interface FilterConfig {
    columnId: string;
    title: string;
    options: FilterOption[];
}

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
    searchColumns?: string[]; // contoh: ['name', 'email']
    filters?: FilterConfig[]; // daftar filter dinamis
    createButton?: React.ReactNode;
}

export function DataTableToolbar<TData>({ table, searchColumns = [], filters = [], createButton }: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0 || !!table.getState().globalFilter;
    const [searchValue, setSearchValue] = React.useState('');

    // Search ke globalFilter (bisa dimodifikasi kalau mau search per column)
    React.useEffect(() => {
        table.setGlobalFilter?.(searchValue);
    }, [searchValue, table]);

    const handleReset = () => {
        setSearchValue('');
        table.resetColumnFilters();
        table.setGlobalFilter?.('');
    };

    // --- Desktop layout ---
    return (
        <>
            <div className="hidden items-center justify-between gap-2 md:flex">
                <div className="flex flex-1 items-center space-x-2">
                    {searchColumns.length > 0 && (
                        <div className="relative flex items-center rounded-md border pl-2 focus-within:ring-1 focus-within:ring-ring">
                            <Search className="h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder={`Search ${searchColumns.join(', ')}...`}
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                className="h-8 w-[150px] border-0 shadow-none focus-visible:ring-0 lg:w-[250px]"
                                autoComplete="off"
                            />
                        </div>
                    )}

                    {/* Dynamic Faceted Filters */}
                    {filters.map((filter) => {
                        const column = table.getColumn(filter.columnId);
                        return column ? (
                            <DataTableFacetedFilter key={filter.columnId} column={column} title={filter.title} options={filter.options} />
                        ) : null;
                    })}

                    {(isFiltered || searchValue) && (
                        <Button variant="ghost" onClick={handleReset} className="h-8 px-2 lg:px-3">
                            Reset
                            <X className="ml-2 h-4 w-4" />
                        </Button>
                    )}
                </div>
                <DataTableViewOptions table={table} />
                {createButton && <div className="flex-shrink-0">{createButton}</div>}
            </div>

            {/* --- Mobile layout: search + filter toggle --- */}
            <div className="space-y-3 md:hidden">
                <div className="flex items-center gap-2">
                    {searchColumns.length > 0 && (
                        <div className="relative min-w-0 flex-1">
                            <div className="relative flex items-center rounded-md border pl-2 focus-within:ring-1 focus-within:ring-ring">
                                <Search className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                                <Input
                                    placeholder={`Search ${searchColumns.slice(0, 2).join(', ')}${searchColumns.length > 2 ? '...' : ''}...`}
                                    value={searchValue}
                                    onChange={(e) => setSearchValue(e.target.value)}
                                    className="h-8 border-0 shadow-none focus-visible:ring-0"
                                    autoComplete="off"
                                />
                            </div>
                        </div>
                    )}

                    {/* Filter toggle (mobile) */}
                    {filters.length > 0 && <FilterToggleButton isActive={isFiltered || searchValue !== ''} filters={filters} table={table} />}

                    {/* Reset button */}
                    {(isFiltered || searchValue) && (
                        <Button variant="ghost" onClick={handleReset} className="h-8 px-2">
                            <X className="h-4 w-4" />
                        </Button>
                    )}

                    {/* View options & create button */}
                    <div className="flex flex-shrink-0 items-center gap-2">
                        <DataTableViewOptions table={table} />
                        {createButton}
                    </div>
                </div>
            </div>
        </>
    );
}

// --- Komponen Toggle Filter Mobile ---
function FilterToggleButton<TData>({ isActive, filters, table }: { isActive: boolean; filters: FilterConfig[]; table: Table<TData> }) {
    const [showFilters, setShowFilters] = React.useState(false);

    return (
        <>
            <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)} className="h-8 px-2">
                <Filter className="h-4 w-4" />
                {isActive && <span className="ml-1 h-2 w-2 rounded-full bg-primary"></span>}
            </Button>
            {filters.length > 0 && showFilters && (
                <div className="flex flex-wrap items-start gap-2">
                    {filters.map((filter) => {
                        const column = table.getColumn(filter.columnId);
                        return column ? (
                            <DataTableFacetedFilter key={filter.columnId} column={column} title={filter.title} options={filter.options} />
                        ) : null;
                    })}
                </div>
            )}
        </>
    );
}
