import axios from 'axios';
const URL = process.env.REACT_APP_BASE_URL
const BASE_URL = `${URL}api/v1/superAdmin/`

export default axios.create({
    baseURL: BASE_URL
});
export const useraxios = axios.create({
    baseURL: `${URL}api/v1/users`
});