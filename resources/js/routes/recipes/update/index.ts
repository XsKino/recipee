import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\RecipeController::post
* @see app/Http/Controllers/RecipeController.php:158
* @route '/recipes/{recipe}'
*/
export const post = (args: { recipe: number | { id: number } } | [recipe: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: post.url(args, options),
    method: 'post',
})

post.definition = {
    methods: ["post"],
    url: '/recipes/{recipe}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RecipeController::post
* @see app/Http/Controllers/RecipeController.php:158
* @route '/recipes/{recipe}'
*/
post.url = (args: { recipe: number | { id: number } } | [recipe: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { recipe: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { recipe: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            recipe: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        recipe: typeof args.recipe === 'object'
        ? args.recipe.id
        : args.recipe,
    }

    return post.definition.url
            .replace('{recipe}', parsedArgs.recipe.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RecipeController::post
* @see app/Http/Controllers/RecipeController.php:158
* @route '/recipes/{recipe}'
*/
post.post = (args: { recipe: number | { id: number } } | [recipe: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: post.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RecipeController::post
* @see app/Http/Controllers/RecipeController.php:158
* @route '/recipes/{recipe}'
*/
const postForm = (args: { recipe: number | { id: number } } | [recipe: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: post.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RecipeController::post
* @see app/Http/Controllers/RecipeController.php:158
* @route '/recipes/{recipe}'
*/
postForm.post = (args: { recipe: number | { id: number } } | [recipe: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: post.url(args, options),
    method: 'post',
})

post.form = postForm

const update = {
    post: Object.assign(post, post),
}

export default update