/* eslint-disable @typescript-eslint/no-explicit-any */
import { TrashIcon, EditIcon } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

type Props = {
    ingredients?: any[];
    onEdit?: (ingredient: any) => void;
    onDelete?: (ingredient: any) => void;
};

export default function IngredientList({ ingredients, onEdit, onDelete }: Props) {
    if (!ingredients || ingredients.length === 0) {
        return <p className="text-center">No ingredients.</p>;
    }

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {ingredients.map((ingredient, index) => (
                <div
                    key={ingredient.id || index}
                    className="rounded-lg border bg-card p-4 shadow-sm transition-shadow hover:shadow-md"
                >
                    <div className="space-y-3">
                        <div className="flex">
                            <h3 className="truncate text-lg font-semibold">{ingredient.name}</h3>
                            <div className="flex flex-1 justify-end gap-2">
                                {onEdit && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => onEdit?.(ingredient)}
                                        className="h-8 w-8 p-0 hover:bg-blue-100 hover:text-blue-600"
                                    >
                                        <EditIcon className="h-4 w-4" />
                                    </Button>
                                )}
                                {onDelete && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => onDelete?.(ingredient)}
                                        className="h-8 w-8 p-0 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                                    >
                                        <TrashIcon className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                        </div>

                        {ingredient.categories && ingredient.categories.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                                {ingredient.categories.map((category: string, catIndex: number) => (
                                    <Badge key={catIndex} variant="outline" className="text-xs">
                                        {category}
                                    </Badge>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
