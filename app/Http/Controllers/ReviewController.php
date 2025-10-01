<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\Recipe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'recipe_id' => ['required', 'exists:recipes,id'],
            'rating' => ['nullable', 'integer', 'min:1', 'max:5'],
            'comment' => ['nullable', 'string', 'max:1000'],
        ]);

        // Ensure at least rating or comment is provided
        if (!$request->rating && !$request->comment) {
            return back()->withErrors(['review' => 'Please provide either a rating or a comment.']);
        }

        $userId = Auth::id();
        $recipeId = $request->recipe_id;

        // Check if user already reviewed this recipe
        $existingReview = Review::where('user_id', $userId)
            ->where('recipe_id', $recipeId)
            ->first();

        if ($existingReview) {
            return back()->withErrors(['review' => 'You have already reviewed this recipe.']);
        }

        // Create the review
        Review::create([
            'user_id' => $userId,
            'recipe_id' => $recipeId,
            'rating' => $request->rating,
            'comment' => $request->comment,
        ]);

        return back()->with('success', 'Review added successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Review $review)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Review $review)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Review $review)
    {
        // Check if user owns this review
        if ($review->user_id !== Auth::id()) {
            abort(403, 'Unauthorized to update this review.');
        }

        $request->validate([
            'rating' => ['nullable', 'integer', 'min:1', 'max:5'],
            'comment' => ['nullable', 'string', 'max:1000'],
        ]);

        // Ensure at least rating or comment is provided
        if (!$request->rating && !$request->comment) {
            return back()->withErrors(['review' => 'Please provide either a rating or a comment.']);
        }

        $review->update([
            'rating' => $request->rating,
            'comment' => $request->comment,
        ]);

        return back()->with('success', 'Review updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Review $review)
    {
        // Check if user owns this review
        if ($review->user_id !== Auth::id()) {
            abort(403, 'Unauthorized to delete this review.');
        }

        $review->delete();

        return back()->with('success', 'Review deleted successfully!');
    }
}
