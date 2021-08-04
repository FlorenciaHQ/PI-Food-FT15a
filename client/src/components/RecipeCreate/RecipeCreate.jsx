import React, { useState } from 'react';
import { useEffect} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {Link, LinK, useHistory } from 'react-router-dom';
import { getTypeDiets } from '../../actions';

export default function RecipeCreate(){
    const dispatch= useDispatch()
    const diets= useSelector((state)=> state.diets)

    const [input, setInput]= useState({
        title: "", 
        summary: "" , 
        aggregateLikes: 0, 
        healthScore: 0, 
        analyzedInstructions: [{steps:[]}], 
        image: "", 
        diets: []
    })

    useEffect(()=> {
        dispatch(getTypeDiets())
    }, [dispatch])

    return (
        <div>
            <Link to='/home'><button>Home</button></Link>
            <h1>Cargá tu propia receta!!!</h1>
            <form>
                <div>
                    <label>Name: </label>
                    <input 
                        type= 'text'
                        value= {input.title}
                        name='title'
                    />
                </div>
                <div>
                    <label>Image: </label>
                    <input 
                        type= 'text'
                        value= {input.image}
                        name='image'
                    />
                </div>
                <div>
                    <label>Summary: </label>
                    <input 
                        type= 'text'
                        value= {input.summary}
                        name='summary'
                    />
                </div>
                <div>
                    <label>Punctuation: </label>
                    <input 
                        type= 'number'                        
                        value= {input.aggregateLikes}
                        name='aggregateLikes'
                    />
                </div>
                <div>
                    <label>Health Score: </label>
                    <input 
                        type= 'number'
                        value= {input.healthScore}
                        name='healthScore'
                    />
                </div>
                <div>
                    <select>
                        {diets.lengt? diets.map((r)=> {
                            <ocupation value={r.name} key={r.id}>{r.name}</ocupation>
                        }) : <p>Cargando..</p>
                        }
                    </select>
                </div>
                <div>
                    <label>Step by step instructions: </label>
                    <input 
                        type= 'number'
                        placeholder= 'Step number'
                        value= {input.analyzedInstructions}
                        name='analyzedInstructions.number'
                    />
                    <input 
                        type= 'text'
                        placeholder= 'Instruction'
                        value= {input.analyzedInstructions}
                        name='analyzedInstructions.step'
                    />
                </div>
            </form>
        </div>
    )

}
// Ruta de creación de recetas: debe contener

// [ ] Un formulario controlado con los siguientes campos
// Nombre
// Resumen del plato
// Puntuación
// Nivel de "comida saludable"
// Paso a paso          [{steps:[...input,{number: 0, step:"" }]}]
// [ ] Posibilidad de seleccionar/agregar uno o más tipos de dietas
// [ ] Botón/Opción para crear una nueva receta