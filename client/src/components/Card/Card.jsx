import React from 'react';

export default function Card({image, name, diets}){
    return(
        <div>
            <img src={image} alt='Img receta' width="250px" height="250px"/>
            <h3>{name}</h3>
            <h5>{diets}</h5>
        </div>
    )
}