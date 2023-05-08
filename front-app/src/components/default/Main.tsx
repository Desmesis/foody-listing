// These default components aren't useful for a Single Page Application
// But provide a good base if we want to add more features
// Like a map that indicated every restaurants given

import React from "react";
import Home from '../../views/Home';
import { Routes, Route } from 'react-router-dom';

function Main() {
    return (
        <Routes> { }
            <Route path='/' element={<Home />}></Route>
        </Routes>
    )
}

export default Main;