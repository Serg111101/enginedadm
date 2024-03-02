import axios from "../../axios/adminaxios";
import { Dispatch } from "@reduxjs/toolkit";
// import { fetchingHeader,fetchHeader,fetchErrorHeader } from "../slice/HeaderSlice";
import  {fetchingFooter,fetchFooter,fetchErrorFooter} from '../slice/FooterSlice'
const URL = process.env.REACT_APP_BASE_URL;

let LocalValue:any; 
if(localStorage.getItem("language")){
    let local:any = localStorage.getItem("language");
    LocalValue = JSON.parse(local);  
}

export const getFetchFooter = () => {
    return async (dispatch:Dispatch)=>{
        try{
            dispatch(fetchingFooter());
            const response =await axios.get(`${URL}aeroSpace/footer/${LocalValue?LocalValue:"AM"}`); 
            dispatch(fetchFooter(response?.data));
        }
        catch(error:any){
            dispatch(fetchErrorFooter(error));
        }

    }
}

export const editFooter = (id:number,value:any)=>{
    return async (dispatch:Dispatch)=>{
        try{
            await axios.put(`${URL}aeroSpace/editFooter/${LocalValue}/${id}`,{text:value})
          }catch(error){
            console.error(error as Error);
            
          }
    }
}
export const editFooterSociall = (id:number,value:any)=>{
    return async (dispatch:Dispatch)=>{
        try{
            await axios.put(`${URL}aeroSpace/editFooter/${LocalValue}/${id}`,value)
          }catch(error){
            console.error(error as Error);
            
          }
    }
}
export const addFooterSociall = (obj:any)=>{
    return async (dispatch:Dispatch)=>{
        try{
            await axios.post(`${URL}aeroSpace/addFooter/${LocalValue}`,obj)
          }catch(error){
            console.error(error as Error);
            
          }
    }
}
export const DeleteFooter=(id:number)=>{
    return async(dispatch:any)=>{
        try{
            await axios.delete(`${URL}aeroSpace/deleteFooter/${id}/${LocalValue}`)
            dispatch(getFetchFooter())
        }catch(error){
            console.error(error as Error)
        }
    }
}