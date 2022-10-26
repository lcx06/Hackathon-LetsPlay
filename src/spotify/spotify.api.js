import { clearSession } from "app/session";

export const doAuthorizedCall = async ({ url, method, getState }) => {
    const accessToken = getState().session.accessToken

    try {
        const response = await fetch(url, {
            method,
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        })
        if (response.ok) {
            return await response.json()
        } else {
            if (response.status === 401) {
                clearSession()
            }
            console.error(response)
        }
    } catch (e) {
        console.error(e)
        throw e
    }
}

