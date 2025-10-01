/* eslint-disable @typescript-eslint/no-unused-vars */
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { useRef } from 'react';
import { useRoute } from 'ziggy';

import IngredientList from '@/components/ingredients/ingredients-list';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';

// interface Props {}

interface Ingredient {
    name: string;
    categories: string[];
}

export default function CreateIngredient() {
    const route = useRoute();

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Add Ingredients',
            href: route('ingredients.create'),
        },
    ];

    const ingredientNameInputRef = useRef<HTMLInputElement>(null);
    const categoryInputRef = useRef<HTMLInputElement>(null);
    const form = useForm({
        ingredients: [] as Ingredient[],
        currentCategories: [] as string[],
    });
    const { data, setData, post, processing, errors, reset } = form;

    const clearInputs = () => {
        if (ingredientNameInputRef.current) {
            ingredientNameInputRef.current.value = '';
        }
        if (categoryInputRef.current) {
            categoryInputRef.current.value = '';
        }
        setData('currentCategories', []);
        ingredientNameInputRef.current?.focus();
    };

    const addCategory = () => {
        const categoryValue = categoryInputRef.current?.value.trim() || '';
        if (categoryValue && !data.currentCategories.includes(categoryValue)) {
            setData('currentCategories', [...data.currentCategories, categoryValue]);
            if (categoryInputRef.current) {
                categoryInputRef.current.value = '';
            }
        }
    };

    const removeCategory = (categoryToRemove: string) => {
        setData(
            'currentCategories',
            data.currentCategories.filter((cat) => cat !== categoryToRemove),
        );
    };

    const addIngredient = () => {
        const ingredientName = ingredientNameInputRef.current?.value.trim() || '';

        if (ingredientName === '') return;

        setData((prev) => ({
            ...prev,
            ingredients: [
                ...prev.ingredients,
                {
                    name: ingredientName,
                    categories: [...prev.currentCategories],
                },
            ],
        }));
        clearInputs();
    };

    const handleCategoryKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addCategory();
        }
    };

    const removeIngredient = (ingredient: any) => {
        setData((prev) => ({
            ...prev,
            ingredients: prev.ingredients.filter((ing) => ing !== ingredient),
        }));
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (data.ingredients.length === 0) return;

        post(route('ingredients.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add Ingredients" />
            <form onSubmit={submit} className="container mx-auto max-w-4xl space-y-6">
                <div className="rounded-xl border bg-card p-6 shadow-sm">
                    <h2 className="mb-4 text-lg font-semibold">Add New Ingredient</h2>

                    <div className="grid gap-6 md:grid-cols-2">
                        <label className="space-y-2">
                            <span className="text-sm font-medium text-foreground">Ingredient Name</span>
                            <Input
                                type="text"
                                placeholder="Enter ingredient name"
                                ref={ingredientNameInputRef}
                                className="w-full"
                            />
                        </label>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">Categories</label>
                            <div className="space-y-3">
                                <div className="flex gap-2">
                                    <Input
                                        type="text"
                                        placeholder="Add category"
                                        ref={categoryInputRef}
                                        onKeyPress={handleCategoryKeyPress}
                                        className="flex-1"
                                    />
                                    <Button type="button" variant="outline" onClick={addCategory} size="sm">
                                        Add
                                    </Button>
                                </div>

                                {data.currentCategories.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {data.currentCategories.map((category, index) => (
                                            <Badge
                                                key={index}
                                                variant="secondary"
                                                className="flex items-center gap-1 pr-1"
                                            >
                                                {category}
                                                <button
                                                    type="button"
                                                    onClick={() => removeCategory(category)}
                                                    className="ml-1 rounded-full p-0.5 transition-colors hover:bg-destructive hover:text-destructive-foreground"
                                                >
                                                    <X className="h-3 w-3" />
                                                </button>
                                            </Badge>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <Button type="button" onClick={addIngredient} disabled={processing} className="min-w-32">
                            Add Ingredient
                        </Button>
                    </div>
                </div>
                <IngredientList ingredients={data.ingredients} onDelete={removeIngredient} />
                {data.ingredients.length > 0 && (
                    <div className="flex justify-center">
                        <Button type="submit" disabled={processing} className="min-w-48">
                            Save All Ingredients ({data.ingredients.length})
                        </Button>
                    </div>
                )}
            </form>
        </AppLayout>
    );
}
