import React from 'react';

export default function Paginado({ recipes, recipesPerPage, paginado }) {
    const numbersPage = []

    for (let i = 1; i <= Math.ceil(recipes / recipesPerPage); i++) {
        numbersPage.push(i)
    }

    return (
        <nav>
            <ul>
                {numbersPage && numbersPage.map(number => (
                    <li key={number}>
                        <a onClick={() => paginado(number)}>{number}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}