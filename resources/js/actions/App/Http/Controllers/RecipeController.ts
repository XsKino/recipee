import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\RecipeController::user
* @see app/Http/Controllers/RecipeController.php:42
* @route '/user-recipes'
*/
export const user = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: user.url(options),
    method: 'get',
})

user.definition = {
    methods: ["get","head"],
    url: '/user-recipes',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RecipeController::user
* @see app/Http/Controllers/RecipeController.php:42
* @route '/user-recipes'
*/
user.url = (options?: RouteQueryOptions) => {
    return user.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RecipeController::user
* @see app/Http/Controllers/RecipeController.php:42
* @route '/user-recipes'
*/
user.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: user.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RecipeController::user
* @see app/Http/Controllers/RecipeController.php:42
* @route '/user-recipes'
*/
user.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: user.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RecipeController::user
* @see app/Http/Controllers/RecipeController.php:42
* @route '/user-recipes'
*/
const userForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: user.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RecipeController::user
* @see app/Http/Controllers/RecipeController.php:42
* @route '/user-recipes'
*/
userForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: user.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RecipeController::user
* @see app/Http/Controllers/RecipeController.php:42
* @route '/user-recipes'
*/
userForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: user.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

user.form = userForm

/**
* @see \App\Http\Controllers\RecipeController::index
* @see app/Http/Controllers/RecipeController.php:17
* @route '/recipes'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/recipes',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RecipeController::index
* @see app/Http/Controllers/RecipeController.php:17
* @route '/recipes'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RecipeController::index
* @see app/Http/Controllers/RecipeController.php:17
* @route '/recipes'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RecipeController::index
* @see app/Http/Controllers/RecipeController.php:17
* @route '/recipes'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RecipeController::index
* @see app/Http/Controllers/RecipeController.php:17
* @route '/recipes'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RecipeController::index
* @see app/Http/Controllers/RecipeController.php:17
* @route '/recipes'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RecipeController::index
* @see app/Http/Controllers/RecipeController.php:17
* @route '/recipes'
*/
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

/**
* @see \App\Http\Controllers\RecipeController::create
* @see app/Http/Controllers/RecipeController.php:72
* @route '/recipes/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/recipes/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RecipeController::create
* @see app/Http/Controllers/RecipeController.php:72
* @route '/recipes/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RecipeController::create
* @see app/Http/Controllers/RecipeController.php:72
* @route '/recipes/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RecipeController::create
* @see app/Http/Controllers/RecipeController.php:72
* @route '/recipes/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RecipeController::create
* @see app/Http/Controllers/RecipeController.php:72
* @route '/recipes/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RecipeController::create
* @see app/Http/Controllers/RecipeController.php:72
* @route '/recipes/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RecipeController::create
* @see app/Http/Controllers/RecipeController.php:72
* @route '/recipes/create'
*/
createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

create.form = createForm

/**
* @see \App\Http\Controllers\RecipeController::store
* @see app/Http/Controllers/RecipeController.php:80
* @route '/recipes'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/recipes',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RecipeController::store
* @see app/Http/Controllers/RecipeController.php:80
* @route '/recipes'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\RecipeController::store
* @see app/Http/Controllers/RecipeController.php:80
* @route '/recipes'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RecipeController::store
* @see app/Http/Controllers/RecipeController.php:80
* @route '/recipes'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RecipeController::store
* @see app/Http/Controllers/RecipeController.php:80
* @route '/recipes'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\RecipeController::show
* @see app/Http/Controllers/RecipeController.php:138
* @route '/recipes/{recipe}'
*/
export const show = (args: { recipe: number | { id: number } } | [recipe: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/recipes/{recipe}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RecipeController::show
* @see app/Http/Controllers/RecipeController.php:138
* @route '/recipes/{recipe}'
*/
show.url = (args: { recipe: number | { id: number } } | [recipe: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{recipe}', parsedArgs.recipe.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RecipeController::show
* @see app/Http/Controllers/RecipeController.php:138
* @route '/recipes/{recipe}'
*/
show.get = (args: { recipe: number | { id: number } } | [recipe: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RecipeController::show
* @see app/Http/Controllers/RecipeController.php:138
* @route '/recipes/{recipe}'
*/
show.head = (args: { recipe: number | { id: number } } | [recipe: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RecipeController::show
* @see app/Http/Controllers/RecipeController.php:138
* @route '/recipes/{recipe}'
*/
const showForm = (args: { recipe: number | { id: number } } | [recipe: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RecipeController::show
* @see app/Http/Controllers/RecipeController.php:138
* @route '/recipes/{recipe}'
*/
showForm.get = (args: { recipe: number | { id: number } } | [recipe: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RecipeController::show
* @see app/Http/Controllers/RecipeController.php:138
* @route '/recipes/{recipe}'
*/
showForm.head = (args: { recipe: number | { id: number } } | [recipe: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

/**
* @see \App\Http\Controllers\RecipeController::edit
* @see app/Http/Controllers/RecipeController.php:149
* @route '/recipes/{recipe}/edit'
*/
export const edit = (args: { recipe: number | { id: number } } | [recipe: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/recipes/{recipe}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RecipeController::edit
* @see app/Http/Controllers/RecipeController.php:149
* @route '/recipes/{recipe}/edit'
*/
edit.url = (args: { recipe: number | { id: number } } | [recipe: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return edit.definition.url
            .replace('{recipe}', parsedArgs.recipe.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RecipeController::edit
* @see app/Http/Controllers/RecipeController.php:149
* @route '/recipes/{recipe}/edit'
*/
edit.get = (args: { recipe: number | { id: number } } | [recipe: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RecipeController::edit
* @see app/Http/Controllers/RecipeController.php:149
* @route '/recipes/{recipe}/edit'
*/
edit.head = (args: { recipe: number | { id: number } } | [recipe: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\RecipeController::edit
* @see app/Http/Controllers/RecipeController.php:149
* @route '/recipes/{recipe}/edit'
*/
const editForm = (args: { recipe: number | { id: number } } | [recipe: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RecipeController::edit
* @see app/Http/Controllers/RecipeController.php:149
* @route '/recipes/{recipe}/edit'
*/
editForm.get = (args: { recipe: number | { id: number } } | [recipe: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\RecipeController::edit
* @see app/Http/Controllers/RecipeController.php:149
* @route '/recipes/{recipe}/edit'
*/
editForm.head = (args: { recipe: number | { id: number } } | [recipe: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

edit.form = editForm

/**
* @see \App\Http\Controllers\RecipeController::update
* @see app/Http/Controllers/RecipeController.php:158
* @route '/recipes/{recipe}'
*/
const updateeb97740d302af00d84a48d5f3824a0c0 = (args: { recipe: number | { id: number } } | [recipe: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateeb97740d302af00d84a48d5f3824a0c0.url(args, options),
    method: 'put',
})

updateeb97740d302af00d84a48d5f3824a0c0.definition = {
    methods: ["put","patch"],
    url: '/recipes/{recipe}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\RecipeController::update
* @see app/Http/Controllers/RecipeController.php:158
* @route '/recipes/{recipe}'
*/
updateeb97740d302af00d84a48d5f3824a0c0.url = (args: { recipe: number | { id: number } } | [recipe: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return updateeb97740d302af00d84a48d5f3824a0c0.definition.url
            .replace('{recipe}', parsedArgs.recipe.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RecipeController::update
* @see app/Http/Controllers/RecipeController.php:158
* @route '/recipes/{recipe}'
*/
updateeb97740d302af00d84a48d5f3824a0c0.put = (args: { recipe: number | { id: number } } | [recipe: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateeb97740d302af00d84a48d5f3824a0c0.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\RecipeController::update
* @see app/Http/Controllers/RecipeController.php:158
* @route '/recipes/{recipe}'
*/
updateeb97740d302af00d84a48d5f3824a0c0.patch = (args: { recipe: number | { id: number } } | [recipe: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: updateeb97740d302af00d84a48d5f3824a0c0.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\RecipeController::update
* @see app/Http/Controllers/RecipeController.php:158
* @route '/recipes/{recipe}'
*/
const updateeb97740d302af00d84a48d5f3824a0c0Form = (args: { recipe: number | { id: number } } | [recipe: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateeb97740d302af00d84a48d5f3824a0c0.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RecipeController::update
* @see app/Http/Controllers/RecipeController.php:158
* @route '/recipes/{recipe}'
*/
updateeb97740d302af00d84a48d5f3824a0c0Form.put = (args: { recipe: number | { id: number } } | [recipe: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateeb97740d302af00d84a48d5f3824a0c0.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RecipeController::update
* @see app/Http/Controllers/RecipeController.php:158
* @route '/recipes/{recipe}'
*/
updateeb97740d302af00d84a48d5f3824a0c0Form.patch = (args: { recipe: number | { id: number } } | [recipe: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateeb97740d302af00d84a48d5f3824a0c0.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

updateeb97740d302af00d84a48d5f3824a0c0.form = updateeb97740d302af00d84a48d5f3824a0c0Form
/**
* @see \App\Http\Controllers\RecipeController::update
* @see app/Http/Controllers/RecipeController.php:158
* @route '/recipes/{recipe}'
*/
const updateeb97740d302af00d84a48d5f3824a0c0 = (args: { recipe: number | { id: number } } | [recipe: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateeb97740d302af00d84a48d5f3824a0c0.url(args, options),
    method: 'post',
})

updateeb97740d302af00d84a48d5f3824a0c0.definition = {
    methods: ["post"],
    url: '/recipes/{recipe}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\RecipeController::update
* @see app/Http/Controllers/RecipeController.php:158
* @route '/recipes/{recipe}'
*/
updateeb97740d302af00d84a48d5f3824a0c0.url = (args: { recipe: number | { id: number } } | [recipe: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return updateeb97740d302af00d84a48d5f3824a0c0.definition.url
            .replace('{recipe}', parsedArgs.recipe.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RecipeController::update
* @see app/Http/Controllers/RecipeController.php:158
* @route '/recipes/{recipe}'
*/
updateeb97740d302af00d84a48d5f3824a0c0.post = (args: { recipe: number | { id: number } } | [recipe: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateeb97740d302af00d84a48d5f3824a0c0.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RecipeController::update
* @see app/Http/Controllers/RecipeController.php:158
* @route '/recipes/{recipe}'
*/
const updateeb97740d302af00d84a48d5f3824a0c0Form = (args: { recipe: number | { id: number } } | [recipe: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateeb97740d302af00d84a48d5f3824a0c0.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RecipeController::update
* @see app/Http/Controllers/RecipeController.php:158
* @route '/recipes/{recipe}'
*/
updateeb97740d302af00d84a48d5f3824a0c0Form.post = (args: { recipe: number | { id: number } } | [recipe: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: updateeb97740d302af00d84a48d5f3824a0c0.url(args, options),
    method: 'post',
})

updateeb97740d302af00d84a48d5f3824a0c0.form = updateeb97740d302af00d84a48d5f3824a0c0Form

export const update = {
    '/recipes/{recipe}': updateeb97740d302af00d84a48d5f3824a0c0,
    '/recipes/{recipe}': updateeb97740d302af00d84a48d5f3824a0c0,
}

/**
* @see \App\Http\Controllers\RecipeController::destroy
* @see app/Http/Controllers/RecipeController.php:208
* @route '/recipes/{recipe}'
*/
export const destroy = (args: { recipe: number | { id: number } } | [recipe: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/recipes/{recipe}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\RecipeController::destroy
* @see app/Http/Controllers/RecipeController.php:208
* @route '/recipes/{recipe}'
*/
destroy.url = (args: { recipe: number | { id: number } } | [recipe: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{recipe}', parsedArgs.recipe.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RecipeController::destroy
* @see app/Http/Controllers/RecipeController.php:208
* @route '/recipes/{recipe}'
*/
destroy.delete = (args: { recipe: number | { id: number } } | [recipe: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\RecipeController::destroy
* @see app/Http/Controllers/RecipeController.php:208
* @route '/recipes/{recipe}'
*/
const destroyForm = (args: { recipe: number | { id: number } } | [recipe: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\RecipeController::destroy
* @see app/Http/Controllers/RecipeController.php:208
* @route '/recipes/{recipe}'
*/
destroyForm.delete = (args: { recipe: number | { id: number } } | [recipe: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

const RecipeController = { user, index, create, store, show, edit, update, destroy }

export default RecipeController