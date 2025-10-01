/* eslint-disable @typescript-eslint/no-unused-vars */
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';
import { useRoute } from 'ziggy';

import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface Props {
    ingredient: {
        id: number;
        name: string;
        categories: string[];
    };
}

export default function EditIngredient({ ingredient }: Props) {
    const route = useRoute();
    
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Ingredients',
            href: route('ingredients.index'),
        },
        {
            title: 'Edit Ingredient',
            href: route('ingredients.edit', ingredient.id),
        },
    ];

    const categoryInputRef = useRef<HTMLInputElement>(null);
    const form = useForm({
        name: ingredient.name,
        categories: ingredient.categories || [],
    });
    const { data, setData, put, processing, errors, reset } = form;

    const addCategory = () => {
        const categoryValue = categoryInputRef.current?.value.trim() || '';
        if (categoryValue && !data.categories.includes(categoryValue)) {
            setData('categories', [...data.categories, categoryValue]);
            if (categoryInputRef.current) {
                categoryInputRef.current.value = '';
            }
        }
    };

    const removeCategory = (categoryToRemove: string) => {
        setData('categories', data.categories.filter(cat => cat !== categoryToRemove));
    };

    const handleCategoryKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addCategory();
        }
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('ingredients.update', ingredient.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${ingredient.name}`} />
            <form onSubmit={submit} className="container mx-auto max-w-2xl space-y-6">
                <div className="rounded-xl border bg-card p-6 shadow-sm">
                    <h2 className="text-lg font-semibold mb-4">Edit Ingredient</h2>
                    
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">
                                Ingredient Name
                            </label>
                            <Input 
                                type="text" 
                                placeholder="Enter ingredient name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="w-full"
                            />
                            {errors.name && <div className="text-sm text-red-600">{errors.name}</div>}
                        </div>
                        
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">
                                Categories
                            </label>
                            <div className="space-y-3">
                                <div className="flex gap-2">
                                    <Input 
                                        type="text" 
                                        placeholder="Add category"
                                        ref={categoryInputRef}
                                        onKeyPress={handleCategoryKeyPress}
                                        className="flex-1"
                                    />
                                    <Button 
                                        type="button" 
                                        variant="outline" 
                                        onClick={addCategory}
                                        size="sm"
                                    >
                                        Add
                                    </Button>
                                </div>
                                
                                {data.categories.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {data.categories.map((category, index) => (
                                            <Badge 
                                                key={index} 
                                                variant="secondary" 
                                                className="flex items-center gap-1 pr-1"
                                            >
                                                {category}
                                                <button
                                                    type="button"
                                                    onClick={() => removeCategory(category)}
                                                    className="ml-1 rounded-full p-0.5 hover:bg-destructive hover:text-destructive-foreground transition-colors"
                                                >
                                                    <X className="h-3 w-3" />
                                                </button>
                                            </Badge>
                                        ))}
                                    </div>
                                )}
                                {errors.categories && <div className="text-sm text-red-600">{errors.categories}</div>}
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex justify-between mt-6">
                        <Button 
                            type="button" 
                            variant="outline"
                            onClick={() => window.history.back()}
                        >
                            Cancel
                        </Button>
                        <Button 
                            type="submit" 
                            disabled={processing}
                            className="min-w-32"
                        >
                            {processing ? 'Updating...' : 'Update Ingredient'}
                        </Button>
                    </div>
                </div>
            </form>
        </AppLayout>
    );
}