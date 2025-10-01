import { useForm } from '@inertiajs/react';
import { useRoute } from 'ziggy';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { StarIcon, UserIcon, EditIcon, TrashIcon } from 'lucide-react';

interface Review {
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
}

interface Props {
    reviews: Review[];
    currentUserId?: number;
    onEditReview?: (review: Review) => void;
}

export default function ReviewList({ reviews, currentUserId, onEditReview }: Props) {
    const route = useRoute();
    const { delete: destroy } = useForm();

    const deleteReview = (reviewId: number) => {
        if (confirm('Are you sure you want to delete your review?')) {
            destroy(route('reviews.destroy', reviewId));
        }
    };

    const renderStars = (rating?: number) => {
        if (!rating) return null;
        
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <StarIcon
                    key={i}
                    className={`h-4 w-4 ${
                        i <= rating 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-300'
                    }`}
                />
            );
        }
        return (
            <div className="flex gap-0.5">
                {stars}
                <span className="ml-2 text-sm text-muted-foreground">
                    {rating}/5
                </span>
            </div>
        );
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    if (!reviews || reviews.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-muted-foreground">
                    No reviews yet. Be the first to review this recipe!
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {reviews.map((review) => {
                const isCurrentUserReview = currentUserId === review.user.id;
                const isEdited = review.updated_at !== review.created_at;
                
                return (
                    <Card key={review.id}>
                        <CardContent className="p-4">
                            <div className="space-y-3">
                                {/* Review Header */}
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage 
                                                src={review.user.avatar} 
                                                alt={review.user.name} 
                                            />
                                            <AvatarFallback>
                                                <UserIcon className="h-4 w-4" />
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-medium text-sm">
                                                {review.user.name}
                                                {isCurrentUserReview && (
                                                    <span className="ml-2 text-xs text-muted-foreground">
                                                        (You)
                                                    </span>
                                                )}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {formatDate(review.created_at)}
                                                {isEdited && (
                                                    <span className="ml-1">(edited)</span>
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    {/* Action Buttons */}
                                    {isCurrentUserReview && (
                                        <div className="flex gap-1">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => onEditReview?.(review)}
                                                className="h-7 w-7 p-0"
                                            >
                                                <EditIcon className="h-3 w-3" />
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => deleteReview(review.id)}
                                                className="h-7 w-7 p-0 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                                            >
                                                <TrashIcon className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    )}
                                </div>

                                {/* Rating */}
                                {review.rating && (
                                    <div>
                                        {renderStars(review.rating)}
                                    </div>
                                )}

                                {/* Comment */}
                                {review.comment && (
                                    <div>
                                        <p className="text-sm leading-relaxed">
                                            {review.comment}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}