import { GET_RECIPES, GET_BY_NAME, GET_TYPE_DIETS, GET_BY_TYPE_OF_DIET, ORDER_BY_NAME, ORDER_BY_LIKES, RECIPE_DETAIL, POST_RECIPE} from '../actions'

const initialState= {
    recipes: [],
    allRecipes: [],
    diets: [],
    detail: []
}

function rootReducer(state= initialState, action) {
    switch(action.type) {
        case GET_RECIPES:
            return {
                ...state,
                recipes: action.payload,
                allRecipes: action.payload
            }
        case GET_BY_NAME:
            return {
                ...state,
                recipes: action.payload
            }
        case GET_TYPE_DIETS:
            return{
                ...state,
                diets: action.payload
            }
        case GET_BY_TYPE_OF_DIET:
            let allRecipes= state.allRecipes
            const recipesApi= allRecipes.filter(r => !r.createdDb)
            const filteredRcipesApi= recipesApi.filter(r=> r.diets.includes(action.payload))
            const recipeDb= allRecipes.filter(r => r.createdDb)
            const filteredRcipesDb= recipeDb.filter(r=> r.diets.name === action.payload)
            const filtered= filteredRcipesDb.concat(filteredRcipesApi)
            const vegetarianDb= recipeDb.filter(r=> r.diets.name === 'vegetarian')
            const vegetarianAPI= allRecipes.filter(r => r.vegetarian === true)
            const vegetarian= vegetarianDb.concat(vegetarianAPI)
            return{
                ...state,
                recipes: action.payload === 'vegetarian'? vegetarian : filtered
            }
        case ORDER_BY_NAME:
            let todosRecipes= [...state.allRecipes]
            let orderName= action.payload === 'A-Z'? todosRecipes.sort((a,b) => {
                if(a.title < b.title) return -1
                if(a.title > b.title) return 1
                return 0
            }) : todosRecipes.sort((a,b) => {
                if(a.title < b.title) return 1
                if(a.title > b.title) return -1
                return 0
            })
            return {
                ...state,
                recipes: action.payload === 'default'? state.allRecipes : orderName
            }
        case ORDER_BY_LIKES:
                let todos= [...state.allRecipes]
                let orderLike= action.payload === 'menor'? 
                todos.sort((a,b) => a.aggregateLikes - b.aggregateLikes) 
                : todos.sort((a,b) => b.aggregateLikes - a.aggregateLikes)
                
                return {
                    ...state,
                    recipes: action.payload === 'todos'? state.allRecipes : orderLike
                }
        case RECIPE_DETAIL:            
            return {
                ...state,
                detail: action.payload
            }
        case POST_RECIPE:
            return {
                ...state
            }
        default:
            return state;
    }


}

export default rootReducer;