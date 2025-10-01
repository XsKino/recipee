/* eslint-disable @typescript-eslint/no-explicit-any */
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { useRoute } from 'ziggy';

import IngredientList from '@/components/ingredients/ingredients-list';
import { Input } from '@/components/ui/input';
import { PaginationComponent } from '@/components/ui/pagination';
import { useDebounce } from '@/hooks/useDebounce';
import { PlusIcon, SearchIcon } from 'lucide-react';

interface Props {
    ingredients: any;
    flash: any;
    filters?: {
        search?: string;
    };
}

export default function Dashboard({ ingredients, filters }: Props) {
    const route = useRoute();
    const { delete: destroy } = useForm();

    const [search, setSearch] = useState(filters?.search || '');
    const debouncedSearch = useDebounce(search, 500);

    useEffect(() => {
        const currentParams = new URLSearchParams(window.location.search);
        const shouldSearch = debouncedSearch.trim() !== '';
        const previousSearch = filters?.search || '';

        if (shouldSearch) {
            currentParams.set('search', debouncedSearch);
        } else {
            currentParams.delete('search');
        }

        // Reset to page 1 if search term changed
        if (debouncedSearch !== previousSearch) {
            currentParams.delete('page');
        }

        const newSearchString = currentParams.toString();
        const currentSearchString = window.location.search.replace('?', '');
        
        if (currentSearchString !== newSearchString) {
            router.get(route('ingredients.index'), Object.fromEntries(currentParams), {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            });
        }
    }, [debouncedSearch, route, filters?.search]);

    const deleteIngredient = (ingredient: any) => {
        destroy(route('ingredients.destroy', ingredient), {
            preserveScroll: true,
        });
    };

    const editIngredient = (ingredient: any) => {
        router.visit(route('ingredients.edit', ingredient.id));
    };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Ingredients',
            href: route('ingredients.index'),
        },
    ];

    return (
        <AppLayout
            breadcrumbs={breadcrumbs}
            endSlot={
                <Link
                    href={route('ingredients.create')}
                    className="flex items-center gap-2 rounded-md bg-gray-100 p-1 px-2 text-neutral-900"
                >
                    <PlusIcon /> Add Ingredients
                </Link>
            }
        >
            <Head title="Ingredients" />
            <div className="space-y-6 p-4">
                {/* Search Bar */}
                <div className="relative mx-auto max-w-md">
                    <SearchIcon className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Search ingredients..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10"
                    />
                </div>

                {/* Results count */}
                {filters?.search && (
                    <div className="text-center text-sm text-muted-foreground">
                        {ingredients.total === 0
                            ? `No ingredients found for "${filters.search}"`
                            : `Found ${ingredients.total} ingredient${ingredients.total !== 1 ? 's' : ''} for "${filters.search}"`}
                    </div>
                )}

                {/* Pagination */}
                <PaginationComponent links={ingredients.links} />

                {/* Ingredients List */}
                <div className="min-h-[400px]">
                    <IngredientList 
                        ingredients={ingredients.data} 
                        onEdit={editIngredient}
                        onDelete={deleteIngredient} 
                    />
                </div>

                {/* Pagination */}
                <PaginationComponent links={ingredients.links} />
            </div>
        </AppLayout>
    );
}
