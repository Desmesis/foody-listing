import React from "react";
import Home from '../../views/Home';
import { Routes, Route } from 'react-router-dom';

function Main() {
    return(
        <Routes> {}
            <Route path='/' element={ <Home /> }></Route>
        </Routes>
    )
}

export default Main;