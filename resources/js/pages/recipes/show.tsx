import ReviewForm from '@/components/recipes/review-form';
import ReviewList from '@/components/recipes/review-list';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { Link } from '@inertiajs/react';
import { EditIcon, StarIcon, UserIcon } from 'lucide-react';
import { useState } from 'react';
import { useRoute } from 'ziggy';

type Recipe = {
    id: number;
    title: string;
    image?: string;
    description: string;
    procedure: string;
    user: {
        id: number;
        name: string;
        avatar?: string;
    };
    ingredients: Array<{
        id: number;
        name: string;
        categories: string[];
        pivot: {
            quantity?: string;
            unit?: string;
            notes?: string;
        };
    }>;
    reviews: Array<{
        id: number;
        rating?: number;
        comment?: string;
        user: {
            id: number;
            name: string;
            avatar?: string;
        };
        created_at: string;
        updated_at: string;
    }>;
    reviews_avg_rating?: number;
    created_at: string;
};

type Props = {
    recipe: Recipe;
    user_id?: number;
};

export default function Show({ recipe, user_id }: Props) {
    const route = useRoute();

    const [editingReview, setEditingReview] = useState<boolean | null>(null);

    const currentUserReview = user_id ? recipe.reviews?.find((review) => review.user.id === user_id) : null;

    const canAddReview = user_id && !currentUserReview && user_id !== recipe.user.id;

    const userIsOwner = user_id === recipe.user.id;

    const handleEditReview = (review: any) => {
        setEditingReview(review);
    };

    const handleCancelEdit = () => {
        setEditingReview(null);
    };

    const renderRatingStars = (rating?: number) => {
        if (!rating) return null;

        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <StarIcon
                    key={i}
                    className={`h-4 w-4 ${i <= rating ? 'fill-current text-yellow-400' : 'text-gray-300'}`}
                />,
            );
        }
        return <div className="flex gap-0.5">{stars}</div>;
    };
    return (
        <AppLayout
            endSlot={
                userIsOwner && (
                    <div className="flex gap-2">
                        <Link
                            href={route('recipes.edit', recipe)}
                            className="flex items-center gap-2 rounded-md bg-gray-100 p-1 px-2 text-neutral-900"
                        >
                            <EditIcon /> Edit
                        </Link>
                    </div>
                )
            }
        >
            <div className="container mx-auto max-w-4xl space-y-8 px-4 py-8">
                {/* Header */}
                <div className="space-y-6">
                    {/* Recipe Image */}
                    <div className="relative mb-6 h-64 w-full md:h-80">
                        <img
                            src={recipe.image ? `${recipe.image}` : '/recipe-img-placeholder.jpg'}
                            alt={recipe.title}
                            className="h-full w-full rounded-lg object-cover blur-md"
                            onError={(e) => {
                                e.currentTarget.src = '/recipe-img-placeholder.jpg';
                            }}
                        />
                        <img
                            src={recipe.image ? `${recipe.image}` : '/recipe-img-placeholder.jpg'}
                            alt={recipe.title}
                            className="absolute inset-0 size-full rounded-lg object-cover"
                            onError={(e) => {
                                e.currentTarget.src = '/recipe-img-placeholder.jpg';
                            }}
                        />
                    </div>

                    <div className="relative z-20 mx-6 -mt-16 perspective-dramatic">
                        <div className="-rotate-x-[-15deg] rounded-3xl border border-white/10 p-6 backdrop-blur-xl backdrop-brightness-75 transform-3d">
                            <h1 className="text-center text-5xl font-extrabold tracking-widest text-white/80 uppercase text-shadow-lg text-shadow-white/50">
                                {recipe.title}
                            </h1>
                        </div>
                    </div>

                    {/* Author Info & Rating */}
                    <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src={recipe.user.avatar} alt={recipe.user.name} />
                            <AvatarFallback>
                                <UserIcon />
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <div className="flex justify-between text-sm text-gray-500">
                                <p>Recipe by</p>
                                <p>
                                    {new Date(recipe.created_at).toLocaleTimeString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric',
                                    })}
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <p className="font-medium text-gray-200">{recipe.user.name}</p>
                                {recipe.reviews_avg_rating && (
                                    <div className="flex items-center gap-2">
                                        {renderRatingStars(Math.round(recipe.reviews_avg_rating))}
                                        <span className="text-sm text-gray-400">
                                            ({recipe.reviews_avg_rating.toFixed(1)}) • {recipe.reviews?.length || 0}{' '}
                                            review{recipe.reviews?.length !== 1 ? 's' : ''}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-lg leading-relaxed text-gray-200">{recipe.description}</p>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Ingredients */}
                    <div className="lg:col-span-1">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl font-semibold">Ingredients</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {recipe.ingredients.map((ingredient) => (
                                        <div key={ingredient.id} className="flex flex-col gap-2">
                                            <div className="flex items-center justify-between">
                                                <span className="font-medium">{ingredient.name}</span>
                                                {ingredient.pivot.quantity && (
                                                    <span className="text-sm text-gray-200">
                                                        {ingredient.pivot.quantity} {ingredient.pivot.unit}
                                                    </span>
                                                )}
                                            </div>

                                            {ingredient.pivot.notes && (
                                                <p className="text-sm text-gray-200 italic">{ingredient.pivot.notes}</p>
                                            )}

                                            {/* <div className="flex flex-wrap gap-1">
                                                {ingredient.categories.map((category) => (
                                                    <Badge key={category} variant="secondary" className="text-xs">
                                                        {category}
                                                    </Badge>
                                                ))}
                                            </div> */}

                                            <Separator className="mt-2" />
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Procedure */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl font-semibold">Instructions</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="prose prose-gray max-w-none">
                                    {recipe.procedure.split('\n').map((step, index) => {
                                        if (!step.trim()) return null;

                                        return (
                                            <div key={index} className="mb-4">
                                                <div className="flex gap-4">
                                                    <div className="flex-shrink-0">
                                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-700 text-sm font-medium text-white">
                                                            {index + 1}
                                                        </div>
                                                    </div>
                                                    <div className="flex-grow">
                                                        {/* remove number at start */}
                                                        <p className="leading-relaxed text-gray-200">
                                                            {step.trim().replace(/^\d+\.\s*/, '')}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold">Reviews & Comments</h2>

                    {/* Review Form */}
                    {(canAddReview || editingReview) && (
                        <div>
                            <ReviewForm recipeId={recipe.id} existingReview={editingReview} />
                            {editingReview && (
                                <div className="mt-2">
                                    <button
                                        onClick={handleCancelEdit}
                                        className="text-sm text-muted-foreground hover:text-foreground"
                                    >
                                        Cancel editing
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Existing Reviews */}
                    <div>
                        <ReviewList
                            reviews={recipe.reviews || []}
                            currentUserId={user_id}
                            onEditReview={handleEditReview}
                        />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
