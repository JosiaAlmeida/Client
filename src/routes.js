import React from "react"
import {BrowserRouter, Route, Switch} from "react-router-dom";

import Login from "./assets/Pages/Login"
import Book from "./assets/Pages/Book"

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/Book" component={Book}/>
            </Switch>
        </BrowserRouter>
    )
}
