import React from "react"
import {BrowserRouter, Route, Switch} from "react-router-dom";

import Login from "./assets/Pages/Login"
import Books from "./assets/Pages/Books"
import NewBook from './assets/Pages/NewBook'

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/Books" component={Books}/>
                <Route path="/book/New/:bookId" component={NewBook}/>
            </Switch>
        </BrowserRouter>
    )
}
