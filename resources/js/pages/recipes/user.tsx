import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { useRoute } from 'ziggy';

import RecipesList from '@/components/recipes/recipes-list';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/useDebounce';
import { Link } from '@inertiajs/react';
import { PlusIcon, SearchIcon } from 'lucide-react';

interface Props {
    recipes: any;
    user_id: number;
    filters?: {
        search?: string;
    };
}

export default function UserRecipes({ recipes, user_id, filters }: Props) {
    const route = useRoute();

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
            router.get(route('recipes.user'), Object.fromEntries(currentParams), {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            });
        }
    }, [debouncedSearch, route, filters?.search]);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'My Recipes',
            href: route('recipes.user'),
        },
    ];

    return (
        <AppLayout
            breadcrumbs={breadcrumbs}
            endSlot={
                <Link
                    href={route('recipes.create')}
                    className="flex items-center gap-2 rounded-md bg-gray-100 p-1 px-2 text-neutral-900"
                >
                    <PlusIcon /> Create Recipe
                </Link>
            }
        >
            <Head title="My Recipes" />
            <div className="space-y-6 p-4">
                {/* Search Bar */}
                <div className="relative mx-auto max-w-md">
                    <SearchIcon className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Search your recipes..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10"
                    />
                </div>

                {/* Results count */}
                {filters?.search && (
                    <div className="text-center text-sm text-muted-foreground">
                        {recipes.total === 0
                            ? `No recipes found for "${filters.search}"`
                            : `Found ${recipes.total} recipe${recipes.total !== 1 ? 's' : ''} for "${filters.search}"`}
                    </div>
                )}

                {/* Recipes List */}
                <div>
                    <RecipesList recipes={recipes.data} userId={user_id} />
                </div>
            </div>
        </AppLayout>
    );
}
