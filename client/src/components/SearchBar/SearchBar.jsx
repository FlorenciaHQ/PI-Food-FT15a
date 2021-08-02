import React from 'react';
import { getByName } from '../../actions';
import { useState } from 'react';
import {useDispatch } from 'react-redux'

export default function SearchBar(){
    const dispatch= useDispatch()
    const [name, setName]= useState('')

    function handleOnChange(e){
        e.preventDefault()
        setName(e.target.value)
    }

    function handleOnClick(e){
        e.preventDefault();
        dispatch(getByName(name))
    }
    return(
        <div>
            <input 
                type='text'
                placeholder='Nombre de receta a buscar...'
                onChange={(e)=> handleOnChange(e)}
            />
            <button type='submit' onClick={(e) => handleOnClick(e)}>Buscar</button>
        </div>
    )
}