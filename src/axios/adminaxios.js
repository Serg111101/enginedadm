import axios from 'axios';
const URL = process.env.REACT_APP_BASE_URL
const BASE_URL = `${URL}api/v1/superAdmin/`

const local=localStorage.getItem('auth')
const localAuth=JSON.parse(local)
const token=localAuth?.accessToken

export default axios.create({
    baseURL: BASE_URL,
    headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`},
});
