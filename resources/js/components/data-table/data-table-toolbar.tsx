import { Table } from '@tanstack/react-table';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Filter, Search, X } from 'lucide-react';

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
    searchColumns?: string[];
    filters?: FilterConfig[];
    createButton?: React.ReactNode;
}

export function DataTableToolbar<TData>({ table, searchColumns = [], filters = [], createButton }: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0;
    const [searchValue, setSearchValue] = React.useState('');
    const [showFilters, setShowFilters] = React.useState(false);

    React.useEffect(() => {
        table.setGlobalFilter(searchValue);
    }, [searchValue, table]);

    const handleReset = () => {
        setSearchValue('');
        table.resetColumnFilters();
    };

    return (
        <>
            {/* Desktop layout - original single row */}
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

            {/* Mobile layout - stacked with collapsible filters */}
            <div className="space-y-3 md:hidden">
                <div className="flex items-center gap-2">
                    {/* Search input - takes available space */}
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

                    {/* Filter toggle button */}
                    {filters.length > 0 && (
                        <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)} className="h-8 px-2">
                            <Filter className="h-4 w-4" />
                            {(isFiltered || searchValue) && <span className="ml-1 h-2 w-2 rounded-full bg-primary"></span>}
                        </Button>
                    )}

                    {/* Reset button */}
                    {(isFiltered || searchValue) && (
                        <Button variant="ghost" onClick={handleReset} className="h-8 px-2">
                            <X className="h-4 w-4" />
                        </Button>
                    )}

                    {/* View options and create button */}
                    <div className="flex flex-shrink-0 items-center gap-2">
                        <DataTableViewOptions table={table} />
                        {createButton}
                    </div>
                </div>

                {/* Mobile filters - collapsible */}
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
            </div>
        </>
    );
}
