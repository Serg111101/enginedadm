import axios from "axios";
import { Dispatch } from "@reduxjs/toolkit";
import { fetchTeacher,fetchErrorTeacher,fetchingTeacher } from "../slice/TeacherSlice";

const URL = process.env.REACT_APP_BASE_URL1;

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

export const getTeacher = (role:any) => {
    return async (dispatch:Dispatch)=>{
        try{
        
           dispatch(fetchingTeacher())
            const response =await axios.get(`${URL}getTeacher/${role}`);  
          
             dispatch(fetchTeacher(response?.data));
        }
        catch(error){
            dispatch(fetchErrorTeacher(error as Error ));
        }

    }
}

export const editeTeacher = (obj:any) => {
    return async (dispatch:Dispatch)=>{
        try{
        
           dispatch(fetchingTeacher())
            await axios.put(`${URL}putTeacher/${obj.id}`,obj);  
        }
        catch(error){
            dispatch(fetchErrorTeacher(error as Error ));
        }

    }
}

export const deleteTeacher = (id:any) => {
    return async (dispatch:Dispatch)=>{
        try{
        
           dispatch(fetchingTeacher())
            await axios.delete(`${URL}deleteTeacher/${id}`);  
            
          
        }
        catch(error){
            dispatch(fetchErrorTeacher(error as Error ));
        }

    }
}