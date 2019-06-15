import axios from 'axios'
import React, { useState } from 'react'

export default function Registration() {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    })

    function handleChange(e) {
        const { name, value } = e.target
        setCredentials({
            ...credentials,
            [name]: value
        })
    }

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            await axios.post('http://localhost:5000/api/register', credentials)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <h3>Registration</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={credentials.username}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={credentials.password}
                    onChange={handleChange}
                />
                <button type="submit">Submit</button>
            </form>
        </>
    )
}
