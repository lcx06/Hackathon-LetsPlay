export const clearSession = () => {
    localStorage.removeItem('AT')
    localStorage.removeItem('RT')
    window.location.href = '/login'
}

export const setTokens = (accessToken, refreshToken) => {
    localStorage.setItem('AT', accessToken)
    localStorage.setItem('RT', refreshToken)
}