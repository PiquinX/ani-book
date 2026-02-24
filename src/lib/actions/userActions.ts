'use server'

import { User } from "next-auth"
import { APIstring } from "../consts"

export const onLogin = async (data : User) => {
    console.log(data)
    await fetch(`${APIstring}/user`, { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}
