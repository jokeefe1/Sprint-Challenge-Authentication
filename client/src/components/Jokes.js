import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function Jokes(props) {
    const [ jokes, setJokes ] = useState([])

    useEffect( () => {
        getJokes()
    }, [])

    async function getJokes() {
        try {
            const response = await axios.get('http://localhost:5000/api/jokes', {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })
            const jokes = response.data
            setJokes(jokes)
        } catch (error) {
            console.error(error)
        }
    }

    function logout() {
        if (localStorage.getItem('token')) {
            localStorage.removeItem('token')
            props.history.push('/login')
        }
    }


    return (
       <>
        <h3>Joke's</h3>
        {localStorage.getItem('token') && <button onClick={logout}>Log Out</button>}
        <ul>
            {jokes.map( joke => (<li key={joke.id}>
                <p>{joke.joke}</p>
            </li>))}
        </ul>
       </> 
    )
}
