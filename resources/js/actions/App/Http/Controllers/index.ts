import Auth from './Auth'
import RecipeController from './RecipeController'
import ReviewController from './ReviewController'
import IngredientController from './IngredientController'
import Settings from './Settings'

const Controllers = {
    Auth: Object.assign(Auth, Auth),
    RecipeController: Object.assign(RecipeController, RecipeController),
    ReviewController: Object.assign(ReviewController, ReviewController),
    IngredientController: Object.assign(IngredientController, IngredientController),
    Settings: Object.assign(Settings, Settings),
}

export default Controllers