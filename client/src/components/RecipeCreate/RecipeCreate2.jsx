import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTypeDiets, postRecipe } from '../../actions';

function validate(input) {
    let error = {}
    input.title ? error.title = '' : error.title ='Obligatory field'
    !input.summary? error.summary = 'Obligatory field' : error.summary = ''
    !input.image.includes('https://')? error.image = 'It is not a valid address' : error.image = ''
    input.diets.length < 1? error.diets= 'You must place at least one type of diet': error.diets= ''
    return error
}

export default function RecipeCreate() {
    const dispatch = useDispatch()
    const diets = useSelector((state) => state.diets)
    const [render, setRender]= useState('')
    const [error, setError]= useState({})
    const [step, setStep] = useState([])
    const [input, setInput] = useState({
        title: "",
        summary: "",
        aggregateLikes: 0,
        healthScore: 0,
        analyzedInstructions: '',
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
        console.log(input.title)
        setError(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function handleAddDiet(e) {
        setInput(input => ({
            ...input,
            diets: [...input.diets, e.target.value]
        }))
        setError(validate({
            ...input,
            diets: [...input.diets, e.target.value]
        }))
    }

    function handleSteps(e) {
        e.preventDefault();
        setInput({
            ...input,
            analyzedInstructions: e.target.value
        })
    }

    function handleSaveSteps(e) {
        e.preventDefault();
        setStep([...step, input.analyzedInstructions])
        setInput({
            ...input,
            analyzedInstructions: ''
        })
    }

    function handleChangeStep(e, i){  
        setRender(e.target.value)
        var algo = [...step]
        algo[i] = render
        setStep(algo)
        console.log(algo)
    }

    function handleRemoveDiet(diet){
        setInput({
            ...input,
            diets: input.diets.filter(r=> r !== diet)
        })
    }

    function handleRemoveStep(el){
        setStep(step.filter(r=> r !== el))
    }

    function handleSubmit(e) {
        e.preventDefault();
        setInput({
            ...input,
            analyzedInstructions: step
        })
        dispatch(postRecipe(input))
        setInput({
            title: "",
            summary: "",
            aggregateLikes: 0,
            healthScore: 0,
            analyzedInstructions: '',
            image: "",
            diets: []
        })
        setStep([])
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
                    {error.title && <p>{error.title}</p>}
                </div>
                <div>
                    <label>Image: </label>
                    <input
                        type='text'
                        placeholder='Example: https://...'
                        value={input.image}
                        name='image'
                        onChange={(e) => handleChange(e)}
                    />
                    {error.image && <p>{error.image}</p>}
                </div>
                <div>
                    <label>Summary: </label>
                    <input
                        type='text'
                        value={input.summary}
                        name='summary'
                        onChange={(e) => handleChange(e)}
                    />
                    {error.summary && <p>{error.summary}</p>}
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
                    {step.map((r, i) => (
                        <div key={Math.random()}>
                            <label >Step {i +1}</label>
                            <input 
                            type='text'
                            id={i}
                            value={r}
                            name={`Paso ${i+1}`}
                            onChange={(e)=> handleChangeStep(e, i)}
                            />
                            <button onClick={()=> handleRemoveStep(r)}>X</button>
                        </div>
                    ))}
                </div>
                <div>
                    <select onChange={(e) => handleAddDiet(e)}>
                        {diets.map((r) => (
                            <option value={r.name} key={r.id}>{r.name}</option>
                        ))
                        }
                    </select>
                    {input.diets.map((r, i)=> (
                        <div key={i}>
                            <p>{r}</p>
                            <button onClick={() => handleRemoveDiet(r)}>X</button>
                        </div>
                    ))}
                    {error.diets && <p>{error.diets}</p>}
                </div>
                <div>
                    <button type='submit' onClick={(e) => handleSubmit(e)}>Save recipe</button>
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

// function handleSteps(e) {
//     e.preventDefault();
//     setStep(e.target.value)
// }

// function handleSaveSteps(e){
//     e.preventDefault();
//     setInput({
//         ...input,
//         analyzedInstructions: [...input.analyzedInstructions,step]
//     })
//     setStep('')
// }



// <ol>{step.map((r) => (
//     <li key={Math.random()}>{r}</li>
// ))}</ol> 

// function handleChangeStep(e, i){  
//     console.log(e)
//     var algo = [...step]
//     algo[i] = e.target.value
//     setStep(algo)
//     console.log(algo)
// }