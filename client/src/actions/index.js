import axios from 'axios';

export const GET_RECIPES = 'GET_RECIPES'
export const GET_BY_NAME = 'GET_BY_NAME'
export const GET_TYPE_DIETS = 'GET_TYPE_DIETS'
export const GET_BY_TYPE_OF_DIET = 'GET_BY_TYPE_OF_DIET'
export const ORDER_BY_NAME = 'ORDER_BY_NAME'
export const ORDER_BY_LIKES = 'ORDER_BY_LIKES'
export const RECIPE_DETAIL = 'RECIPE_DETAIL'
export const POST_RECIPE= 'POST_RECIPE'


export function getRecipes() {
    return async function (dispatch) {
        const info = await axios.get('/recipes')
        return dispatch({
            type: GET_RECIPES,
            payload: info.data
        })
    }
}

export function getByName(name) {
    return async function (dispatch) {
        try {
            const info = await axios.get('/recipes?name=' + name)
            return dispatch({
                type: GET_BY_NAME,
                payload: info.data
            })
        } catch (error) {
            alert('Oops !! There is no recipe with that name.')
        }
    }
}

export function getTypeDiets() {
    return async function (dispatch) {
        try {
            const info = await axios.get('/types')
            return dispatch({
                type: GET_TYPE_DIETS,
                payload: info.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function getByTypeOfDiet(payload) {
    return {
        type: GET_BY_TYPE_OF_DIET,
        payload
    }
}

export function orderByName(payload) {
    return {
        type: ORDER_BY_NAME,
        payload
    }
}

export function orderByLikes(payload) {
    return {
        type: ORDER_BY_LIKES,
        payload
    }
}

export function recipeDetail(id) {
    return async function (dispatch) {
        try {
            const info = await axios.get('/recipes/' + id)
            return dispatch({
                type: RECIPE_DETAIL,
                payload: info.data
            })
        } catch (error) {
            alert('Oops !! There is no recipe with that id.')
        }
    }
}

export function postRecipe(payload) {
    return async function () {
        const info = await axios.post('/recipe', payload)
        return {
            type: POST_RECIPE,
            info
        }
    }
}