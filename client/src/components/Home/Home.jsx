import React from 'react';
import { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getRecipes, getTypeDiets, getByTypeOfDiet, orderByName, orderByLikes} from '../../actions'
import SearchBar from '../SearchBar/SearchBar';
import Paginado from '../Paginado/Paginado';
import Card from '../Card/Card';

export default function Home(){
    const dispatch= useDispatch()
    const recipes= useSelector((state) => state.recipes)
    const diet= useSelector((state) => state.diets)
    const [orderName, setOrderName]= useState('')
    const [orderLikes, setOrderLikes]= useState('')
    const [actualPage, setActualPage]= useState(1)
    const [recipesPerPage, setRecipesPerPage]= useState(9)
    const indexOfLastRecipe= actualPage * recipesPerPage 
    const indexOfFirstRecipe= indexOfLastRecipe - recipesPerPage 
    const actualRecipes= recipes.slice(indexOfFirstRecipe,indexOfLastRecipe)

    const paginado= (numPage) => {
        setActualPage(numPage)
    }

    useEffect(()=> {
        dispatch(getRecipes())
    }, [dispatch])

    useEffect(()=> {
        dispatch(getTypeDiets())
    },[dispatch])

    function handleSelectTypeOfDiet(e){
        e.preventDefault();
        dispatch(getByTypeOfDiet(e.target.value))
    }

    function handleOrderName(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setActualPage(1)
        setOrderName('Order' + e.target.value)
    }

    function handleOrderLikes(e){
        e.preventDefault();
        dispatch(orderByLikes(e.target.value))
        setActualPage(1)
        setOrderLikes('Order' + e.target.value)
    }

    function handleOnClick(e){
        e.preventDefault();
        dispatch(getRecipes())
    }

    return (
        <div>
            <h1>FOOD</h1>
            <Link to='/recipe'>Creá tu propia receta!!</Link>
            <SearchBar />
            <div>
                <select onChange={(e)=> handleSelectTypeOfDiet(e)}>
                    {diet.map((diet) => (
                        <option value={diet.name} key={diet.id}>{diet.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <select onChange={(e) => handleOrderName(e)}>
                    <option value='default'>Default</option>
                    <option value='A-Z'>A-Z</option>
                    <option value='Z-A'>Z-A</option>
                </select>
                <select onChange={(e)=> handleOrderLikes(e)}>
                    <option value='todos'>Default</option>
                    <option value='mayor'>Mayor a menor puntuación</option>
                    <option value='menor'>Menor a mayor puntuación</option>
                </select>
            </div>
            <button onClick={(e) => handleOnClick(e)}>
                Mostrar todas las recetas
            </button>
            <Paginado 
                    recipes={recipes.length}
                    recipesPerPage={recipesPerPage}
                    paginado={paginado}
                />
            { actualRecipes.map(r=> {                
                return (
                    <div key={r.id}>
                        <Link to={'/home/' + r.id}>
                            <Card image={r.image? r.image: <img src='https://www.ecestaticos.com/image/clipping/e46e7340ef608f85706bdfb3dd69818f/la-proxima-dieta-efectiva-que-seguiras-se-basa-en-tu-plato.jpg' alt='plato'/> } 
                            name={r.title} 
                            diets={r.createdDb? r.diets.map(r=> <p>{r.name}</p>) : r.diets.map(r=> <p>{r}</p>)}
                            vegetarian={r.vegetarian === true? <p>vegetarian</p> : <p></p> }                            
                            />
                        </Link>
                    </div>
                )                
            })

            }

        </div>
    )
}