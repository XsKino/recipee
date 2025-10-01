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

// interface Props {}

interface Recipe {
    name: string;
    categories: string[];
}

interface Ingredient {
    name: string;
    quantity: number;
    unit: string;
}

export default function CreateRecipe() {
    const route = useRoute();
    const ingredientNameInputRef = useRef<HTMLInputElement>(null);
    const IngredientQuantityInputRef = useRef<HTMLInputElement>(null);
    const IngredientUnitInputRef = useRef<HTMLInputElement>(null);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Create Recipe',
            href: route('recipes.create'),
        },
    ];

    const form = useForm('CreateRecipe', {
        title: '',
        description: '',
        procedure: '',
        ingredients: [] as Ingredient[],
        image: null as File | null,
    });
    const { data, setData, post, processing, errors, reset } = form;

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

        post(route('recipes.store'), {
            forceFormData: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Recipes" />
            <form onSubmit={submit} className="container mx-auto max-w-7xl space-y-6 p-4">
                <div className="space-y-4 rounded-xl border bg-card p-6 shadow-sm">
                    <h2 className="mb-4 text-lg font-semibold">Create Recipe</h2>
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
                                />
                                <span className="text-sm font-medium text-foreground">Recipe Description</span>
                                <Textarea
                                    onChange={captureValue('description')}
                                    placeholder="Enter recipe description"
                                    className="w-full"
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
                            />
                        </label>
                    </div>
                    <div className="flex justify-end">
                        <Button type="submit" disabled={processing} className="min-w-32">
                            Create Recipe
                        </Button>
                    </div>
                </div>
            </form>
        </AppLayout>
    );
}
