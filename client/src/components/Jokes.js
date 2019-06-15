import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function Jokes() {
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

    return (
       <>
        <h3>Joke's</h3>
        <ul>
            {jokes.map( joke => (<li key={joke.id}>
                <p>{joke.joke}</p>
            </li>))}
        </ul>
       </> 
    )
}
