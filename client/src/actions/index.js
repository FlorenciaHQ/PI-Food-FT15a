import axios from 'axios';

export const GET_RECIPES= 'GET_RECIPES'
export const GET_BY_NAME= 'GET_BY_NAME'
export const GET_TYPE_DIETS= 'GET_TYPE_DIETS'
export const GET_BY_TYPE_OF_DIET= 'GET_BY_TYPE_OF_DIET'
export const ORDER_BY_NAME= 'ORDER_BY_NAME'
export const ORDER_BY_LIKES= 'ORDER_BY_LIKES'
export const RECIPE_DETAIL= 'RECIPE_DETAIL'

export function getRecipes(){
    return async function(dispatch) {
        const info= await axios.get('http://localhost:3001/recipes')
        return dispatch({
            type: GET_RECIPES,
            payload: info.data
        })
    }
}

export function getByName(name){
    return async function(dispatch){
        try{
            const info= await axios.get('http://localhost:3001/recipes?name=' + name)
            return dispatch({
                type: GET_BY_NAME,
                payload: info.data
            })
        } catch(error) {
            alert('Upss!! No existe ninguna receta con ese nombre.')
        }
    }
}

export function getTypeDiets(){
    return async function(dispatch){
        try{
            const info= await axios.get('http://localhost:3001/types')
            return dispatch({
                type: GET_TYPE_DIETS,
                payload: info.data
            })
        }catch(error){
            console.log(error)
        }
    }
}

export function getByTypeOfDiet(payload){
    return {
        type: GET_BY_TYPE_OF_DIET,
        payload
    }
}

export function orderByName(payload){
    return {
        type: ORDER_BY_NAME,
        payload
    }
}

export function orderByLikes(payload){
    return {
        type: ORDER_BY_LIKES,
        payload
    }
}

export function recipeDetail(id){
    return async function(dispatch){
        const info= await axios.get('http://localhost:3001/recipes/' + id)
        return dispatch({
            type: RECIPE_DETAIL,
            payload: info.data
        })
    }
}