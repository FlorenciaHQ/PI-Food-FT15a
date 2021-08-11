import React from 'react';
import { Link } from 'react-router-dom';
import { recipeDetail } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import './Detail.css'

export default function Detail(props) {
    const dispatch = useDispatch()
    const detail = useSelector((state) => state.detail)
    const [cambio, setCambio] = useState(false)

    const recipe = detail[0]

    useEffect(() => {
        dispatch(recipeDetail(props.match.params.id));
        setCambio(true)
    }, [props.match.params.id, dispatch])


    return (
        <div className='detail'>
            <Link to='/home'><button>Home</button></Link>
            {detail.length ?
                <div>
                    <h1>{recipe.title}</h1>
                    <img src={recipe.image ? recipe.image :
                        <img src='https://www.ecestaticos.com/image/clipping/e46e7340ef608f85706bdfb3dd69818f/la-proxima-dieta-efectiva-que-seguiras-se-basa-en-tu-plato.jpg' alt='img plato' />} alt='img comida' />
                    <div className='titulos'>
                        <h3>{recipe.createdDb ? null : recipe.dishTypes.join(', ')}</h3>
                        {recipe.createdDb ?
                        <h2>{recipe.diets.map(r => r.name).join(', ')}</h2> :
                        <h2>{recipe.vegetarian === true ? recipe.diets.join(', ') + ', vegetarian' : recipe.diets.join(', ')}</h2>
                        }
                    </div>
                    <div className='items'>
                        {recipe.aggregateLikes !== 0 ? <h3>Puntuación: {recipe.aggregateLikes}</h3> : <h3>Puntuación: -</h3>}
                        {recipe.healthScore !== 0 ? <h3>Nivel de "comida saludable": {recipe.healthScore}</h3> : <h3>Nivel de "comida saludable": -</h3>}
                        <h3>Resumen del plato:</h3>
                        <p>{recipe.summary.replace(/<[^>]*>?/g, '')}</p>
                        {recipe.analyzedInstructions ? <h3>Paso a paso: </h3> : <h3>Paso a paso: - </h3>}
                        { recipe.analyzedInstructions.length > 0 ?
                        <ul>{recipe.createdDb ? <li>{recipe.analyzedInstructions}</li>
                            : recipe.analyzedInstructions[0].steps.map((p) => <li key={p.number}>{p.step}</li>)}
                        </ul> : <p></p>
                        }
                    </div>
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
// [ ] Paso a paso--         dangerouslySetInnerHTML={{__html: recipe.summary}}

//{/* <ol>{recipe.createdDb? recipe.analyzedInstructions.map((p)=><li key={Math.random()}>{p}</li>)
//                     :recipe.analyzedInstructions[0].steps.map((p)=> <li key={p.number}>{p.step}</li>)}</ol> */}