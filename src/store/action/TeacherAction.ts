import axios from "../../axios/adminaxios";
import { Dispatch } from "@reduxjs/toolkit";
import { fetchTeacher,fetchErrorTeacher,fetchingTeacher } from "../slice/TeacherSlice";

const URL = process.env.REACT_APP_BASE_URL;

export const fetchAddTeacher = (obj:any,setError:any,setLoading:any) => {
    
    const FormData = {
        ...obj,
        role:"teacher"
    }
    return async ()=>{
        try{
            setLoading(true);
            await axios.post(URL + 'v2/addteacher',FormData);            
            setLoading(false);
            setError("ok")
        }
        catch(error){
            setError(error)
            console.error(error as Error);
        }

    }
}

export const getTeacher = (role:any) => {
    return async (dispatch:Dispatch)=>{
        try{
        
           dispatch(fetchingTeacher())
            const response =await axios.get(`${URL}v2/getTeacher/${role}`);  
          
             dispatch(fetchTeacher(response?.data));
        }
        catch(error){
            dispatch(fetchErrorTeacher(error as Error ));
        }

    }
}

export const editeTeacher = (obj:any,setError:any) => {
    return async (dispatch:Dispatch)=>{
        try{
        
            await axios.put(`${URL}v2/putTeacher/${obj.id}`,obj); 
            setError("ok") 
        }
        catch(error){
            setError(error)
            console.error(error);
            
        }

    }
}

export const deleteTeacher = (id:any) => {

    return async (dispatch:any)=>{
        try{
        
           dispatch(fetchingTeacher())
            await axios.delete(`${URL}v2/deleteTeacher/${id}`);  
            await dispatch(getTeacher('admin'))
          
        }
        catch(error){
            dispatch(fetchErrorTeacher(error as Error ));
        }

    }
}