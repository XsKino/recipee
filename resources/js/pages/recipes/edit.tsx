/* eslint-disable @typescript-eslint/no-unused-vars */
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { useRoute } from 'ziggy';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PlusIcon, XIcon } from 'lucide-react';
import { useRef } from 'react';

interface Props {
    recipe: {
        id: number;
        title: string;
        description: string;
        procedure: string;
        image?: string;
        ingredients: Array<{
            id: number;
            name: string;
            pivot: {
                quantity?: number;
                unit?: string;
            };
        }>;
    };
}

interface Recipe {
    name: string;
    categories: string[];
}

interface Ingredient {
    name: string;
    quantity: number;
    unit: string;
}

export default function EditRecipe({ recipe }: Props) {
    const route = useRoute();
    const ingredientNameInputRef = useRef<HTMLInputElement>(null);
    const IngredientQuantityInputRef = useRef<HTMLInputElement>(null);
    const IngredientUnitInputRef = useRef<HTMLInputElement>(null);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Edit Recipe',
            href: route('recipes.edit', recipe),
        },
    ];

    const form = useForm('EditRecipe', {
        title: recipe.title,
        description: recipe.description,
        procedure: recipe.procedure,
        ingredients:
            (recipe?.ingredients?.map((ing) => ({
                name: ing.name,
                quantity: ing.pivot.quantity || 1,
                unit: ing.pivot.unit || '',
            })) as Ingredient[]) || [],
        image: null as File | null,
        // _method: 'PUT', // This way of method spoofing also does not work, the request is reaching the server as a PUT, but the form data is empty
    });
    const { data, setData, post, delete: destroy, processing, errors, reset } = form;

    const addIngredient = () => {
        if (
            !ingredientNameInputRef.current?.value ||
            !IngredientQuantityInputRef.current?.value ||
            !IngredientUnitInputRef.current?.value
        )
            return;

        const clearIngredientInputs = () => {
            if (
                !ingredientNameInputRef.current ||
                !IngredientQuantityInputRef.current ||
                !IngredientUnitInputRef.current
            )
                return;
            ingredientNameInputRef.current.value = '';
            IngredientQuantityInputRef.current.value = '1';
            IngredientUnitInputRef.current.value = '';
        };

        const newIngredient = {
            name: ingredientNameInputRef.current ? (ingredientNameInputRef.current as HTMLInputElement).value : '',
            quantity: IngredientQuantityInputRef.current
                ? parseFloat((IngredientQuantityInputRef.current as HTMLInputElement).value)
                : 1,
            unit: IngredientUnitInputRef.current ? (IngredientUnitInputRef.current as HTMLInputElement).value : '',
        };
        newIngredient.name = newIngredient.name[0].toUpperCase() + newIngredient.name.substring(1);

        setData((prev) => ({
            ...prev,
            ingredients: [...prev.ingredients, newIngredient],
        }));

        clearIngredientInputs();
        ingredientNameInputRef.current?.focus();
    };

    const removeIngredient = (index: number) => {
        setData((prev) => ({
            ...prev,
            ingredients: prev.ingredients.filter((_, i) => i !== index),
        }));
    };

    const captureValue = (
        field: string,
    ): React.ChangeEventHandler<HTMLInputElement> & React.ChangeEventHandler<HTMLTextAreaElement> => {
        return (e) => {
            const value = e.target.value;
            setData((prev) => ({
                ...prev,
                [field]: value,
            }));
        };
    };

    const captureFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('image', file);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('recipes.update.post', recipe), {
            // Auxiliar recipes.update.post route to avoid method spoofing issues
            // post(route('recipes.update', recipe), {
            // I dont know why but method spoofing dont work with inertiajs
            // method: 'put', // 'method' visit option aint doing anything, the request is reaching the server as a POST request
            forceFormData: true,
        });
    };

    const deleteRecipe = () => {
        if (!confirm('Are you sure you want to delete this recipe? This action cannot be undone.')) return;
        destroy(route('recipes.destroy', recipe));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Recipe" />
            <form onSubmit={submit} className="container mx-auto max-w-7xl space-y-6 p-4">
                <div className="space-y-4 rounded-xl border bg-card p-6 shadow-sm">
                    <h2 className="mb-4 text-lg font-semibold">Edit Recipe</h2>
                    <div className="grid gap-6 md:grid-cols-3">
                        <div className="space-y-4">
                            <label className="space-y-2">
                                <span className="text-sm font-medium text-foreground">Header image</span>
                                <Input onChange={captureFile} type="file" accept="image/*" className="w-full" />
                                <span className="text-sm font-medium text-foreground">Recipe Title</span>
                                <Input
                                    onChange={captureValue('title')}
                                    type="text"
                                    placeholder="Enter recipe title"
                                    className="w-full"
                                    value={data.title}
                                />
                                <span className="text-sm font-medium text-foreground">Recipe Description</span>
                                <Textarea
                                    onChange={captureValue('description')}
                                    placeholder="Enter recipe description"
                                    className="w-full"
                                    value={data.description}
                                />
                            </label>
                            <label className="space-y-2">
                                <span className="text-sm font-medium text-foreground">Ingredients</span>
                                <div className="flex gap-2">
                                    <Input
                                        ref={ingredientNameInputRef}
                                        type="text"
                                        placeholder="ingredient name"
                                        className="flex-1"
                                    ></Input>
                                    <Input
                                        ref={IngredientQuantityInputRef}
                                        type="number"
                                        min={0}
                                        step={1}
                                        placeholder="1"
                                        defaultValue={1}
                                        className="w-14 text-center"
                                    ></Input>
                                    <Input
                                        ref={IngredientUnitInputRef}
                                        type="text"
                                        placeholder="unit"
                                        className="w-24"
                                    ></Input>
                                    <Button
                                        type="button"
                                        onClick={addIngredient}
                                        className="grid aspect-square cursor-pointer place-content-center"
                                    >
                                        <PlusIcon />
                                    </Button>
                                </div>
                                <ul className="mt-2 space-y-2">
                                    {data?.ingredients?.map((ingredient, index) => {
                                        return (
                                            <li key={index} className="flex items-center gap-4">
                                                <div className="flex flex-1 gap-4 rounded-md border p-2">
                                                    <span className="flex-1">{ingredient.name}</span>
                                                    <span>
                                                        {ingredient.quantity} {ingredient.unit}
                                                    </span>
                                                </div>
                                                <Button
                                                    className="grid aspect-square cursor-pointer place-content-center rounded-full"
                                                    type="button"
                                                    onClick={() => removeIngredient(index)}
                                                >
                                                    <XIcon />
                                                </Button>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </label>
                        </div>
                        <label className="col-span-2 space-y-2">
                            <span className="text-sm font-medium text-foreground">Procedure</span>
                            <Textarea
                                onChange={captureValue('procedure')}
                                placeholder="Enter recipe instructions"
                                className="min-h-[50vh] w-full"
                                value={data.procedure}
                            />
                        </label>
                    </div>
                    <div className="flex justify-end">
                        <Button type="submit" disabled={processing} className="min-w-32">
                            Update Recipe
                        </Button>
                    </div>
                    <Button type="button" disabled={processing} onClick={deleteRecipe} className="m-4 mx-auto min-w-32">
                        Delete Recipe
                    </Button>
                </div>
            </form>
        </AppLayout>
    );
}
