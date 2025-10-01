<?php

namespace App\Http\Controllers;

use App\Models\Ingredient;
use App\Models\Recipe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class RecipeController extends Controller 
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->get('search'); 
        
        $recipes = Recipe::with(['user', 'reviews', 'ingredients'])
        ->withAvg('reviews', 'rating')
        ->when($search, function ($query, $search) {
            $query->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%")
                  ->orWhereHas('ingredients', function ($q) use ($search): void {
                      $q->where('name', 'like', "%{$search}%")
                        ->orWhereJsonContains('categories', $search);
                  });
        })->latest()->paginate(20)->withQueryString();
        $user_id = Auth::id();
        return Inertia::render('recipes/index', [
            'recipes' => $recipes,
            'user_id' => $user_id,
            'filters' => ['search' => $search],
        ]);
    }

    /**
     * Display a listing of the resource associated with a user.
     */
    public function user(Request $request)
    {
        $user_id = Auth::id();
        $search = $request->get('search');
        
        $recipes = Recipe::where("user_id", $user_id)
            ->with(['user', 'reviews', 'ingredients'])
            ->withAvg('reviews', 'rating')
            ->when($search, function ($query, $search) {
                $query->where('title', 'like', "%{$search}%")
                      ->orWhere('description', 'like', "%{$search}%")
                      ->orWhereHas('ingredients', function ($q) use ($search): void {
                          $q->where('name', 'like', "%{$search}%")
                            ->orWhereJsonContains('categories', $search);
                      });
            })
            ->latest()
            ->paginate(24)
            ->withQueryString();
            
        return Inertia::render('recipes/user', [
            'recipes' => $recipes,
            'user_id' => $user_id,
            'filters' => ['search' => $search],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('recipes/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $request->validate([
            'title'=> ['required'],
            'description'=> ['required'],
            'procedure'=>['required'],
            'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif'],
            'ingredients'=>['sometimes', 'array']
        ]);

        // Handle image upload
        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = '/storage/' . $request->file('image')->store('img/recipes', 'public');
        }

        $recipe = Recipe::create([
            'user_id' => Auth::id(),
            'title'=> $request->input('title'),
            'description'=> $request->input('description'),
            'procedure'=> $request->input('procedure'),
            'image' => $imagePath
        ]); 

        // store ingredients relation in the recipes_x_ingredients table
        // first, check if every ingredient in the request exists in the ingredients table
        $ingredientsToInsert = [];
        foreach($request->input('ingredients', []) as $ingredientData) {
            $dbIngredient = Ingredient::where('name', $ingredientData['name'])->first();
            if(!$dbIngredient) {
                // if not, create it
                $dbIngredient = Ingredient::create(['name' => $ingredientData['name']]);
            }

            // append ingredient with its data to array
            $ingredientsToInsert[] = [
                'ingredient' => $dbIngredient,
                'quantity' => $ingredientData['quantity'] ?? null,
                'unit' => $ingredientData['unit'] ?? null,
            ];
        }

        // then store them
        foreach($ingredientsToInsert as $data) {
            $recipe->ingredients()->attach($data['ingredient']->id, [
                'quantity' => $data['quantity'], 
                'unit' => $data['unit']
            ]);
        }


        return redirect()->route('recipes.index')->with('success', 'Recipe created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Recipe $recipe)
    {
        $recipe->load(['user', 'reviews.user', 'ingredients']);
        $recipe->loadAvg('reviews', 'rating');
        $user_id = Auth::id();
        return Inertia::render('recipes/show', compact('recipe', 'user_id'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Recipe $recipe)
    {
        $recipe->load(['ingredients']);
        return Inertia::render('recipes/edit', compact('recipe'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Recipe $recipe)
    {

        // dd($request->all());

        $request->validate([
            'title'=> ['required'],
            'description'=> ['required'],
            'procedure'=>['required'],
            'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif'],
            'ingredients'=>['sometimes', 'array']
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            $imagePath = '/storage/' . $request->file('image')->store('img/recipes', 'public');
            $recipe->image = $imagePath;
        }

        $recipe->title = $request->input('title');
        $recipe->description = $request->input('description');
        $recipe->procedure = $request->input('procedure');
        $recipe->save();

        // update ingredients relation in the recipes_x_ingredients table
        // first, check if every ingredient in the request exists in the ingredients table
        $ingredientsToSync = [];
        foreach($request->input('ingredients', []) as $ingredientData) {
            $dbIngredient = Ingredient::where('name', $ingredientData['name'])->first();
            if(!$dbIngredient) {
                // if not, create it
                $dbIngredient = Ingredient::create(['name' => $ingredientData['name']]);
            }

            // append ingredient with its data to array
            $ingredientsToSync[$dbIngredient->id] = [
                'quantity' => $ingredientData['quantity'] ?? null,
                'unit' => $ingredientData['unit'] ?? null,
            ];
        }

        // then sync them
        $recipe->ingredients()->sync($ingredientsToSync);

        return redirect()->route('recipes.show', $recipe)->with('success', 'Recipe updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Recipe $recipe)
    {
        $recipe->delete();
        return redirect()->route('recipes.index')->with('success', 'Recipe deleted successfully.');
    }
}
