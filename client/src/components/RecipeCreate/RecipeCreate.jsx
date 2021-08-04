import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { getTypeDiets } from '../../actions';

export default function RecipeCreate() {
    const dispatch = useDispatch()
    const diets = useSelector((state) => state.diets)
    
    const [step, setStep ]= useState([])
    const [input, setInput] = useState({
        title: "",
        summary: "",
        aggregateLikes: 0,
        healthScore: 0,
        analyzedInstructions: "",
        image: "",
        diets: []
    })

    useEffect(() => {
        dispatch(getTypeDiets())
    }, [dispatch])

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    function handleAddDiet(e) {
        setInput({
            ...input,
            diets: [...input.diets, e.target.value]
        })
    }

    function handleSteps(e) {
        e.preventDefault();
        setInput({
            ...input,
            analyzedInstructions: e.target.value
        })
        console.log(input.analyzedInstructions)
    }

    function handleSaveSteps(e){
        e.preventDefault();
        setStep([...step, input.analyzedInstructions])
        setInput({
            ...input,
            analyzedInstructions: ''
        })
    }

    return (
        <div>
            <Link to='/home'><button>Home</button></Link>
            <h1>Cargá tu propia receta!!!</h1>
            <form id='general'>
                <div>
                    <label>Name: </label>
                    <input
                        type='text'
                        value={input.title}
                        name='title'
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <label>Image: </label>
                    <input
                        type='text'
                        value={input.image}
                        name='image'
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <label>Summary: </label>
                    <input
                        type='text'
                        value={input.summary}
                        name='summary'
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <label>Punctuation: </label>
                    <input
                        type='number'
                        value={input.aggregateLikes}
                        name='aggregateLikes'
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <label>Health Score: </label>
                    <input
                        type='number'
                        value={input.healthScore}
                        name='healthScore'
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <label>Step by step instructions: </label>
                    <div>
                        <input
                            type='text'
                            placeholder="Instruction"
                            value={input.analyzedInstructions}
                            name='analyzedInstructions'
                            onChange={(e) => handleSteps(e)}
                        />
                        <button type='submit' onClick={(e) => handleSaveSteps(e)}>Save step</button>
                    </div>
                    <ol>{step.map((r) => (
                        <li key={Math.random()}>{r}</li>
                    ))}</ol>
                </div>
                <div>
                    <select onChange={(e) => handleAddDiet(e)}>
                        {diets.map((r) => (
                            <option value={r.name} key={r.id}>{r.name}</option>
                        ))
                        }
                    </select>
                </div>
                <div>
                    <button type='submit'>Save recipe</button>
                </div>
                <div>
                    <button type='reset' form='general'>Create another recipe</button>
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
