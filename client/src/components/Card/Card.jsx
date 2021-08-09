import React from 'react';

export default function Card({image, name, diets, vegetarian}){
    return(
        <div className='card'>
            <img src={image} alt='Img receta' width="250px" height="250px"/>
            <h3>{name}</h3>
            <h5>{diets}</h5>
            <h5>{vegetarian}</h5>
        </div>
    )
}

{/* <img src={image} alt='Img receta' width="250px" height="250px"/> */}