<?php

namespace App\Http\Controllers;

use App\Models\Ingredient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

use function Illuminate\Log\log;

class IngredientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->get('search');
        
        $ingredients = Ingredient::query()
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%")
                      ->orWhereJsonContains('categories', $search);
            })
            ->orderBy('name')
            ->paginate(40)
            ->withQueryString();

            log::info('Ingredients retrieved', ['count' => $ingredients->count(), 'search' => $search]);
            
        return Inertia::render('ingredients/index', [
            'ingredients' => $ingredients,
            'filters' => ['search' => $search],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('ingredients/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $request->validate([
            'ingredients' => ['required', 'array'],
            'ingredients.*.name' => ['required', 'string'],
            'ingredients.*.categories' => ['sometimes', 'array'],
            'ingredients.*.categories.*' => ['string'],
        ]);

        $ingredients = $request->ingredients;
        $count = count($ingredients);
        
        foreach ($ingredients as $ingredientData) {
            Ingredient::create($ingredientData);
        }
        return redirect()->route('ingredients.index')->with('success', "$count Ingredients added successfully.");
    }

    /**
     * Display the specified resource.
     */
    public function show(Ingredient $ingredient)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Ingredient $ingredient)
    {
        return Inertia::render('ingredients/edit', compact('ingredient'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Ingredient $ingredient)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'categories' => ['sometimes', 'array'],
            'categories.*' => ['string'],
        ]);

        $ingredient->update([
            'name' => $request->name,
            'categories' => $request->categories ?? [],
        ]);

        return redirect()->route('ingredients.index')->with('success', 'Ingredient updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ingredient $ingredient)
    {
        $ingredient->delete();
        return redirect()->route('ingredients.index')->with('success', 'Ingredient deleted successfully.');
    }
}
