import axios from "axios";
const URL = process.env.REACT_APP_BASE_URL;



export const fetchAddTeacher = (obj:any) => {
    const FormData = {
        ...obj,
        role:"teacher"
    }
    return async ()=>{
        try{
            await axios.post(URL + 'addteacher',FormData);            
        }
        catch(error){
            console.error(error as Error);
        }

    }
}