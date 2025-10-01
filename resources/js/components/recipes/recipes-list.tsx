import { Link } from '@inertiajs/react';
import { StarIcon } from 'lucide-react';
import { useRoute } from 'ziggy';
import { Badge } from '../ui/badge';

type Props = {
    recipes?: any[];
    userId?: number;
};

export default function RecipesList({ recipes, userId }: Props) {
    const route = useRoute();

    const renderRatingStars = (rating: number) => {
        const stars = [];
        const roundedRating = Math.round(rating);

        for (let i = 1; i <= 5; i++) {
            stars.push(
                <StarIcon
                    key={i}
                    className={`h-3 w-3 ${i <= roundedRating ? 'fill-current text-yellow-400' : 'text-gray-300'}`}
                />,
            );
        }
        return stars;
    };

    if (!recipes || recipes.length === 0) {
        return (
            <div className="py-12 text-center">
                <p className="text-lg text-muted-foreground">No recipes found.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {recipes.map((recipe) => {
                const userIsOwner = userId && recipe.user && recipe.user.id === userId;
                const averageRating = recipe.reviews_avg_rating || 0;
                const reviewCount = recipe.reviews?.length || 0;

                return (
                    <Link
                        href={route('recipes.show', recipe)}
                        key={recipe.id}
                        className="group block overflow-hidden rounded-xl border bg-card shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                    >
                        {/* Recipe Image */}
                        <div className="relative aspect-[4/3] overflow-hidden">
                            <img
                                src={recipe.image ? `${recipe.image}` : '/recipe-img-placeholder.jpg'}
                                alt={recipe.title}
                                className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = '/recipe-img-placeholder.jpg';
                                }}
                            />

                            {/* Overlay badges */}
                            <div className="absolute top-3 left-3 flex flex-col gap-2">
                                {userIsOwner && (
                                    <Badge className="border-0 bg-green-600 text-white shadow-sm">Your Recipe</Badge>
                                )}
                            </div>

                            {/* Rating overlay */}
                            {/* {averageRating > 0 && (
                                <div className="absolute top-3 right-3">
                                    <Badge variant="secondary" className="border-0 bg-black/70 text-white">
                                        ⭐ {averageRating.toFixed(1)}
                                    </Badge>
                                </div>
                            )} */}
                        </div>

                        {/* Card Content */}
                        <div className="space-y-3 p-4">
                            {/* Title and Description */}
                            <div>
                                <h3 className="mb-2 line-clamp-2 text-lg leading-tight font-semibold transition-colors group-hover:text-primary">
                                    {recipe.title}
                                </h3>
                                <p className="line-clamp-2 text-sm text-muted-foreground">{recipe.description}</p>
                            </div>

                            {/* Recipe Meta */}
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <span>By {recipe.user?.name || 'Unknown'}</span>
                                <div className="flex items-center gap-1">
                                    {averageRating > 0 && (
                                        <div className="flex items-center gap-1">
                                            <div className="flex">{renderRatingStars(averageRating)}</div>
                                            <span className="text-xs">{averageRating.toFixed(1)}</span>
                                        </div>
                                    )}
                                    {reviewCount > 0 && (
                                        <span>
                                            {averageRating > 0 && '•'} {reviewCount} review
                                            {reviewCount !== 1 ? 's' : ''}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Ingredients Preview */}
                            {recipe.ingredients && recipe.ingredients.length > 0 && (
                                <div className="space-y-2">
                                    <h4 className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                                        Ingredients ({recipe.ingredients.length})
                                    </h4>
                                    <div className="flex flex-wrap gap-1">
                                        {recipe.ingredients.slice(0, 3).map((ingredient: any, index: number) => (
                                            <Badge key={index} variant="outline" className="px-2 py-0.5 text-xs">
                                                {ingredient.name}
                                            </Badge>
                                        ))}
                                        {recipe.ingredients.length > 3 && (
                                            <Badge variant="secondary" className="px-2 py-0.5 text-xs">
                                                +{recipe.ingredients.length - 3} more
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}
