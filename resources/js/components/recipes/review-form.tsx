import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { useRoute } from 'ziggy';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { StarIcon } from 'lucide-react';

interface Props {
    recipeId: number;
    existingReview?: {
        id: number;
        rating?: number;
        comment?: string;
    } | null;
}

export default function ReviewForm({ recipeId, existingReview }: Props) {
    const route = useRoute();
    const [hoveredRating, setHoveredRating] = useState(0);
    
    const { data, setData, post, put, processing, errors, reset } = useForm({
        recipe_id: recipeId,
        rating: existingReview?.rating || 0,
        comment: existingReview?.comment || '',
    });

    const handleStarClick = (rating: number) => {
        setData('rating', rating);
    };

    const handleStarHover = (rating: number) => {
        setHoveredRating(rating);
    };

    const handleStarLeave = () => {
        setHoveredRating(0);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (existingReview) {
            put(route('reviews.update', existingReview.id), {
                onSuccess: () => reset(),
            });
        } else {
            post(route('reviews.store'), {
                onSuccess: () => reset(),
            });
        }
    };

    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            const isFilled = i <= (hoveredRating || data.rating);
            stars.push(
                <button
                    key={i}
                    type="button"
                    onClick={() => handleStarClick(i)}
                    onMouseEnter={() => handleStarHover(i)}
                    onMouseLeave={handleStarLeave}
                    className={`text-2xl transition-colors ${
                        isFilled 
                            ? 'text-yellow-400 hover:text-yellow-500' 
                            : 'text-gray-300 hover:text-gray-400'
                    }`}
                >
                    <StarIcon 
                        className={`h-6 w-6 ${isFilled ? 'fill-current' : ''}`} 
                    />
                </button>
            );
        }
        return stars;
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    {existingReview ? 'Edit Your Review' : 'Add a Review'}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={submit} className="space-y-4">
                    {/* Rating */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Rating (optional)
                        </label>
                        <div className="flex gap-1">
                            {renderStars()}
                        </div>
                        {data.rating > 0 && (
                            <p className="text-sm text-muted-foreground">
                                {data.rating} out of 5 stars
                            </p>
                        )}
                        {errors.rating && (
                            <div className="text-sm text-red-600">{errors.rating}</div>
                        )}
                    </div>

                    {/* Comment */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">
                            Comment (optional)
                        </label>
                        <Textarea
                            placeholder="Share your thoughts about this recipe..."
                            value={data.comment}
                            onChange={(e) => setData('comment', e.target.value)}
                            rows={4}
                            maxLength={1000}
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                            <span>{data.comment.length}/1000 characters</span>
                        </div>
                        {errors.comment && (
                            <div className="text-sm text-red-600">{errors.comment}</div>
                        )}
                    </div>

                    {/* Form Errors */}
                    {errors.review && (
                        <div className="text-sm text-red-600">{errors.review}</div>
                    )}

                    {/* Submit Button */}
                    <div className="flex justify-end gap-2">
                        {existingReview && (
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => reset()}
                                disabled={processing}
                            >
                                Cancel
                            </Button>
                        )}
                        <Button 
                            type="submit" 
                            disabled={processing || (!data.rating && !data.comment.trim())}
                        >
                            {processing 
                                ? (existingReview ? 'Updating...' : 'Submitting...') 
                                : (existingReview ? 'Update Review' : 'Submit Review')
                            }
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}