import axios from "../../axios/adminaxios";
import { Dispatch } from "@reduxjs/toolkit";
import { fetchLinksSuperAdmin,fetchErrorLinksSuperAdmin,fetchingLinksSuperAdmin } from "../slice/LinksSuperAdmin";

const URL = process.env.REACT_APP_BASE_URL;
let LocalValue:any; 
if(localStorage.getItem("language")){
    let local:any = localStorage.getItem("language");
    LocalValue = JSON.parse(local);  
}

export const getLinksSuperAdmin = () => {
    return async (dispatch:Dispatch)=>{
        try{
        
           dispatch(fetchingLinksSuperAdmin())
            const response =await axios.get(`${URL}aeroSpace/getLinksAdmin/${LocalValue}`);  
          
             dispatch(fetchLinksSuperAdmin(response?.data));
        }
        catch(error){
            dispatch(fetchErrorLinksSuperAdmin(error as Error ));
        }

    }
}

export const addLinksSuperAdmin = (obj:any) => {
    return async (dispatch:Dispatch)=>{
        
        try{
        
            await axios.post(`${URL}aeroSpace/addLinksAdmin/${LocalValue}`,obj); 
            
        }
        catch(error){
          
            console.error(error);
            
        }

    }
}
export const editLinksSuperAdmin = (obj:any) => {
    
    return async (dispatch:Dispatch)=>{
        
        try{
        
            await axios.put(`${URL}aeroSpace/editLinksAdmin/${LocalValue}/${obj.id}`,obj); 
            
        }
        catch(error){
          
            console.error(error);
            
        }

    }
}

export const deleteLinksSuperAdmin = (id:any) => {
    return async (dispatch:Dispatch)=>{
        
        try{
     
        
            const res=await axios.delete(`${URL}aeroSpace/deleteLinksAdmin/${LocalValue}/${id}`); 
            
            getLinksSuperAdmin()
        }
        catch(error){
          
            console.error(error);
            
        }

    }
}

// export const deleteTeacher = (id:any) => {

//     return async (dispatch:any)=>{
//         try{
        
//            dispatch(fetchingTeacher())
//             await axios.delete(`${URL}v2/deleteTeacher/${id}`);  
//             await dispatch(getTeacher('admin'))
          
//         }
//         catch(error){
//             dispatch(fetchErrorTeacher(error as Error ));
//         }

//     }
// }