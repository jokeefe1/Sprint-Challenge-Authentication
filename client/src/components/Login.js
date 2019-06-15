import React, { useState } from 'react'
import axios from 'axios'

export default function Login() {
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
            const response = await axios.post('http://localhost:5000/api/login', credentials)
            const token = response.data.Authorization
            localStorage.setItem('token', token)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <h3>Login</h3>
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
