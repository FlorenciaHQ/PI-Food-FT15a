import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTypeDiets, postRecipe } from '../../actions';
import './RecipeCreate.css'

function validate(input) {
    let error = {}
    input.title ? error.title = '' : error.title = 'Obligatory field'
    !input.summary ? error.summary = 'Obligatory field' : error.summary = ''
    input.diets.length < 1 ? error.diets = 'You must place at least one type of diet' : error.diets = ''
    if(!input.image.includes('https://') && !input.image.includes('http://')){
        error.image = 'It is not a valid address' 
    } else{
          error.image = ''
    }
    return error
}

export default function RecipeCreate() {
    const dispatch = useDispatch()
    const diets = useSelector((state) => state.diets)

    const [error, setError] = useState({})
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
        setInput(input => ({
            ...input,
            [e.target.name]: e.target.value
        }))
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

    function handleRemoveDiet(e, diet) {
        e.preventDefault()
        setInput({
            ...input,
            diets: input.diets.filter(r => r !== diet)
        })
    }

    function handleSubmit(e) {
        if (input.title && input.summary && input.diets.length > 0) {
            e.preventDefault();
            dispatch(postRecipe(input))
            alert('Recipe successfully loaded')
            setInput({
                title: "",
                summary: "",
                aggregateLikes: 0,
                healthScore: 0,
                analyzedInstructions: '',
                image: "",
                diets: []
            })
        } else {
            e.preventDefault();
            alert('Name, Sumary and Diet are required fields')
        }
    }

    return (
        <div className='create'>
            <div className='buttonHome'>
                <Link to='/home'><button>Home</button></Link>
            </div>
            <h1>Upload your own recipe!!</h1>
            <div className='formulario'>
            <form id='general' onSubmit={(e) => handleSubmit(e)}>
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
                        <textarea
                            type='text'
                            className='instruction'
                            placeholder="Instruction"
                            rows='7'
                            value={input.analyzedInstructions}
                            name='analyzedInstructions'
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                </div>
                <div className='diets'>
                    <span>Diets:</span>
                    <select onChange={(e) => handleAddDiet(e)}>
                        {diets.map((r) => (
                            <option value={r.name} key={r.id}>{r.name}</option>
                        ))
                        }
                    </select>
                    {input.diets.map((r, i) => (
                        <ul key={i}>
                            <li>{r}</li>
                            <button onClick={(e) => handleRemoveDiet(e, r)}>X</button>
                        </ul>
                    ))}
                    {error.diets && <p>{error.diets}</p>}
                </div>                
                <div className='buttonCreate'>
                    <button type='reset' form='general'>Create another recipe</button>
                </div>
                <div className='buttonSave'>
                    <button type='submit' >Save recipe</button>
                </div>
            </form>
            </div>
        </div>
    )

}
