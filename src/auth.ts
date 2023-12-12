interface authInterface {
    id: number,
    email: string,
    username:string,
    role: string,
    accessToken: string,
    refreshToken: string,
}


const auth = (): authInterface => {
    const authString = localStorage.getItem('auth');
    if (authString) {
        const auth = JSON.parse(authString)
        if (Date.now() < auth.lifetime) {
            return auth;
        } else {
            localStorage.removeItem('auth');
        }
    }

    return {
    id: 1,
    email: "",
    username:"",
    role: "",
    accessToken: "",
    refreshToken: "",
    };
}

export default auth