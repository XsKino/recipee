import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\IngredientController::index
* @see app/Http/Controllers/IngredientController.php:17
* @route '/ingredients'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/ingredients',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\IngredientController::index
* @see app/Http/Controllers/IngredientController.php:17
* @route '/ingredients'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\IngredientController::index
* @see app/Http/Controllers/IngredientController.php:17
* @route '/ingredients'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IngredientController::index
* @see app/Http/Controllers/IngredientController.php:17
* @route '/ingredients'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\IngredientController::index
* @see app/Http/Controllers/IngredientController.php:17
* @route '/ingredients'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IngredientController::index
* @see app/Http/Controllers/IngredientController.php:17
* @route '/ingredients'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IngredientController::index
* @see app/Http/Controllers/IngredientController.php:17
* @route '/ingredients'
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
* @see \App\Http\Controllers\IngredientController::create
* @see app/Http/Controllers/IngredientController.php:41
* @route '/ingredients/create'
*/
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/ingredients/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\IngredientController::create
* @see app/Http/Controllers/IngredientController.php:41
* @route '/ingredients/create'
*/
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\IngredientController::create
* @see app/Http/Controllers/IngredientController.php:41
* @route '/ingredients/create'
*/
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IngredientController::create
* @see app/Http/Controllers/IngredientController.php:41
* @route '/ingredients/create'
*/
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\IngredientController::create
* @see app/Http/Controllers/IngredientController.php:41
* @route '/ingredients/create'
*/
const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IngredientController::create
* @see app/Http/Controllers/IngredientController.php:41
* @route '/ingredients/create'
*/
createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: create.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IngredientController::create
* @see app/Http/Controllers/IngredientController.php:41
* @route '/ingredients/create'
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
* @see \App\Http\Controllers\IngredientController::show
* @see app/Http/Controllers/IngredientController.php:71
* @route '/ingredients/{ingredient}'
*/
export const show = (args: { ingredient: number | { id: number } } | [ingredient: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/ingredients/{ingredient}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\IngredientController::show
* @see app/Http/Controllers/IngredientController.php:71
* @route '/ingredients/{ingredient}'
*/
show.url = (args: { ingredient: number | { id: number } } | [ingredient: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { ingredient: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { ingredient: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            ingredient: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        ingredient: typeof args.ingredient === 'object'
        ? args.ingredient.id
        : args.ingredient,
    }

    return show.definition.url
            .replace('{ingredient}', parsedArgs.ingredient.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\IngredientController::show
* @see app/Http/Controllers/IngredientController.php:71
* @route '/ingredients/{ingredient}'
*/
show.get = (args: { ingredient: number | { id: number } } | [ingredient: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IngredientController::show
* @see app/Http/Controllers/IngredientController.php:71
* @route '/ingredients/{ingredient}'
*/
show.head = (args: { ingredient: number | { id: number } } | [ingredient: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\IngredientController::show
* @see app/Http/Controllers/IngredientController.php:71
* @route '/ingredients/{ingredient}'
*/
const showForm = (args: { ingredient: number | { id: number } } | [ingredient: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IngredientController::show
* @see app/Http/Controllers/IngredientController.php:71
* @route '/ingredients/{ingredient}'
*/
showForm.get = (args: { ingredient: number | { id: number } } | [ingredient: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IngredientController::show
* @see app/Http/Controllers/IngredientController.php:71
* @route '/ingredients/{ingredient}'
*/
showForm.head = (args: { ingredient: number | { id: number } } | [ingredient: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\IngredientController::edit
* @see app/Http/Controllers/IngredientController.php:79
* @route '/ingredients/{ingredient}/edit'
*/
export const edit = (args: { ingredient: number | { id: number } } | [ingredient: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/ingredients/{ingredient}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\IngredientController::edit
* @see app/Http/Controllers/IngredientController.php:79
* @route '/ingredients/{ingredient}/edit'
*/
edit.url = (args: { ingredient: number | { id: number } } | [ingredient: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { ingredient: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { ingredient: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            ingredient: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        ingredient: typeof args.ingredient === 'object'
        ? args.ingredient.id
        : args.ingredient,
    }

    return edit.definition.url
            .replace('{ingredient}', parsedArgs.ingredient.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\IngredientController::edit
* @see app/Http/Controllers/IngredientController.php:79
* @route '/ingredients/{ingredient}/edit'
*/
edit.get = (args: { ingredient: number | { id: number } } | [ingredient: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IngredientController::edit
* @see app/Http/Controllers/IngredientController.php:79
* @route '/ingredients/{ingredient}/edit'
*/
edit.head = (args: { ingredient: number | { id: number } } | [ingredient: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\IngredientController::edit
* @see app/Http/Controllers/IngredientController.php:79
* @route '/ingredients/{ingredient}/edit'
*/
const editForm = (args: { ingredient: number | { id: number } } | [ingredient: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IngredientController::edit
* @see app/Http/Controllers/IngredientController.php:79
* @route '/ingredients/{ingredient}/edit'
*/
editForm.get = (args: { ingredient: number | { id: number } } | [ingredient: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: edit.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\IngredientController::edit
* @see app/Http/Controllers/IngredientController.php:79
* @route '/ingredients/{ingredient}/edit'
*/
editForm.head = (args: { ingredient: number | { id: number } } | [ingredient: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\IngredientController::update
* @see app/Http/Controllers/IngredientController.php:87
* @route '/ingredients/{ingredient}'
*/
export const update = (args: { ingredient: number | { id: number } } | [ingredient: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/ingredients/{ingredient}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\IngredientController::update
* @see app/Http/Controllers/IngredientController.php:87
* @route '/ingredients/{ingredient}'
*/
update.url = (args: { ingredient: number | { id: number } } | [ingredient: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { ingredient: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { ingredient: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            ingredient: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        ingredient: typeof args.ingredient === 'object'
        ? args.ingredient.id
        : args.ingredient,
    }

    return update.definition.url
            .replace('{ingredient}', parsedArgs.ingredient.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\IngredientController::update
* @see app/Http/Controllers/IngredientController.php:87
* @route '/ingredients/{ingredient}'
*/
update.put = (args: { ingredient: number | { id: number } } | [ingredient: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\IngredientController::update
* @see app/Http/Controllers/IngredientController.php:87
* @route '/ingredients/{ingredient}'
*/
update.patch = (args: { ingredient: number | { id: number } } | [ingredient: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\IngredientController::update
* @see app/Http/Controllers/IngredientController.php:87
* @route '/ingredients/{ingredient}'
*/
const updateForm = (args: { ingredient: number | { id: number } } | [ingredient: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\IngredientController::update
* @see app/Http/Controllers/IngredientController.php:87
* @route '/ingredients/{ingredient}'
*/
updateForm.put = (args: { ingredient: number | { id: number } } | [ingredient: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\IngredientController::update
* @see app/Http/Controllers/IngredientController.php:87
* @route '/ingredients/{ingredient}'
*/
updateForm.patch = (args: { ingredient: number | { id: number } } | [ingredient: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PATCH',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

update.form = updateForm

/**
* @see \App\Http\Controllers\IngredientController::destroy
* @see app/Http/Controllers/IngredientController.php:106
* @route '/ingredients/{ingredient}'
*/
export const destroy = (args: { ingredient: number | { id: number } } | [ingredient: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/ingredients/{ingredient}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\IngredientController::destroy
* @see app/Http/Controllers/IngredientController.php:106
* @route '/ingredients/{ingredient}'
*/
destroy.url = (args: { ingredient: number | { id: number } } | [ingredient: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { ingredient: args }
    }

    if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
        args = { ingredient: args.id }
    }

    if (Array.isArray(args)) {
        args = {
            ingredient: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        ingredient: typeof args.ingredient === 'object'
        ? args.ingredient.id
        : args.ingredient,
    }

    return destroy.definition.url
            .replace('{ingredient}', parsedArgs.ingredient.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\IngredientController::destroy
* @see app/Http/Controllers/IngredientController.php:106
* @route '/ingredients/{ingredient}'
*/
destroy.delete = (args: { ingredient: number | { id: number } } | [ingredient: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\IngredientController::destroy
* @see app/Http/Controllers/IngredientController.php:106
* @route '/ingredients/{ingredient}'
*/
const destroyForm = (args: { ingredient: number | { id: number } } | [ingredient: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\IngredientController::destroy
* @see app/Http/Controllers/IngredientController.php:106
* @route '/ingredients/{ingredient}'
*/
destroyForm.delete = (args: { ingredient: number | { id: number } } | [ingredient: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm

/**
* @see \App\Http\Controllers\IngredientController::store
* @see app/Http/Controllers/IngredientController.php:49
* @route '/ingredients'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/ingredients',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\IngredientController::store
* @see app/Http/Controllers/IngredientController.php:49
* @route '/ingredients'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\IngredientController::store
* @see app/Http/Controllers/IngredientController.php:49
* @route '/ingredients'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\IngredientController::store
* @see app/Http/Controllers/IngredientController.php:49
* @route '/ingredients'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\IngredientController::store
* @see app/Http/Controllers/IngredientController.php:49
* @route '/ingredients'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

const ingredients = {
    index: Object.assign(index, index),
    create: Object.assign(create, create),
    show: Object.assign(show, show),
    edit: Object.assign(edit, edit),
    update: Object.assign(update, update),
    destroy: Object.assign(destroy, destroy),
    store: Object.assign(store, store),
}

export default ingredients