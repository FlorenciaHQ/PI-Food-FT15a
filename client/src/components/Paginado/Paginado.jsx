import React from 'react';
import './Paginado.css'

export default function Paginado({ recipes, recipesPerPage, paginado }) {
    const numbersPage = []

    for (let i = 1; i <= Math.ceil(recipes / recipesPerPage); i++) {
        numbersPage.push(i)
    }

    return (
        <nav className='button'>
            {numbersPage && numbersPage.map(number => (
                    <button key={number} onClick={() => paginado(number)}>{number}</button>
                ))}
            
        </nav>
    )
}