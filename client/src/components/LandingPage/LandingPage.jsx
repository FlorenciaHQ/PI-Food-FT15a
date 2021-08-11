import React from 'react';
import {Link} from 'react-router-dom';
import './LandingPage.css'

export default function LandingPage(){
    return(
        <div className='vista'>
            <h1>Welcome !!!</h1>
            <h3> Search for the best recipes , or create and save your own recipes.</h3>
            <Link to='/home'><button>Login</button></Link>
        </div>
    )
}