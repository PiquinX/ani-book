'use server'

import { User } from "next-auth"

export const onLogin = async (data : User) => {
    console.log(data)
    await fetch('http://localhost:777/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}