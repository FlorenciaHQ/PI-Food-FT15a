import React from 'react';
import { Link } from 'react-router-dom';
import { recipeDetail } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function Detail(props){
    const dispatch= useDispatch()
    const detail= useSelector((state)=> state.detail)
    const [cambio,setCambio]= useState(false)

    const recipe= detail[0]

    useEffect(()=> {
        console.log('eeeeeeeeeeee')
        dispatch(recipeDetail(props.match.params.id));
        setCambio(true)
    },[props.match.params.id, dispatch])

    return (
        <div>
            <Link to='/home'>Home</Link>
            {detail.length?
                <div>
                    <h1>{recipe.title}</h1>
                    <img src={recipe.image? recipe.image : 
                     <img src='https://www.ecestaticos.com/image/clipping/e46e7340ef608f85706bdfb3dd69818f/la-proxima-dieta-efectiva-que-seguiras-se-basa-en-tu-plato.jpg' alt='img plato' />} alt='img comida' />
                    <h3>{recipe.dishTypes.join(', ')}</h3>
                    <h4>{recipe.diets.join(', ')}</h4>
                    <h5>Resumen del plato:</h5>
                    <p>{recipe.summary}</p>
                    <h5>Puntuación: {recipe.aggregateLikes}</h5>
                    <h5>Nivel de "comida saludable": {recipe.healthScore}</h5>
                    <h5>Paso a paso: </h5>
                    <ol>{recipe.analyzedInstructions[0].steps.map((p)=> <li key={p.number}>{p.number} {p.step}</li>)}</ol>
                </div> : <p>Cargando..</p>

            }
        </div>
    )
}
// Ruta de detalle de receta: debe contener

// [ ] Los campos mostrados en la ruta principal para cada receta (imagen, nombre, tipo de plato y tipo de dieta)
// [ ] Resumen del plato
// [ ] Puntuación
// [ ] Nivel de "comida saludable"
// [ ] Paso a paso