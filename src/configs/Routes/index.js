import React from 'react'
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

// components
import {Main} from '../../pages';

const Routes = () => {
    return (
        <Router>
            <Route path="/">
                <Main />
            </Route>
        </Router>
    )
}

export default Routes
