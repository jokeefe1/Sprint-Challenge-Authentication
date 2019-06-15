import React from 'react'
import { NavLink, Route, Switch } from 'react-router-dom'
import Jokes from './components/Jokes'
import Login from './components/Login'
import Registration from './components/Registration'

function App(props) {
    return (
        <>
            <h1>Dad Jokes</h1>
            <ul>
                <li>
                    <NavLink to="/registration">Registration</NavLink>
                </li>
                <li>
                    <NavLink to="/login">Login</NavLink>
                </li>
                <li>
                    <NavLink to="/jokes">Jokes</NavLink>
                </li>
            </ul>

            <section>
                <Switch>
                    <Route component={Registration} path="/registration" />
                    <Route component={Login} path="/login" />
                    <Route component={Jokes} path="/jokes" />
                </Switch>
            </section>
        </>
    )
}

export default App
