import React from 'react';

export default function Paginado({ recipes, recipesPerPage, paginado }) {
    const numbersPage = []

    for (let i = 1; i <= Math.ceil(recipes / recipesPerPage); i++) {
        numbersPage.push(i)
    }

    return (
        <nav>
            {numbersPage && numbersPage.map(number => (
                    <button key={number} onClick={() => paginado(number)}>{number}</button>
                ))}
            
        </nav>
    )
}