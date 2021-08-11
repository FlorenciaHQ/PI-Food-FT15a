import React from 'react';
import { getByName } from '../../actions';
import { useState } from 'react';
import {useDispatch } from 'react-redux';
import './SearchBar.css';

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
        setName('')
    }
    return(
        <div className='search'>
            <input 
                type='text'
                value={name}
                placeholder='Search by recipe name...'
                onChange={(e)=> handleOnChange(e)}
            />
            <button type='submit' onClick={(e) => handleOnClick(e)}>Search</button>
        </div>
    )
}