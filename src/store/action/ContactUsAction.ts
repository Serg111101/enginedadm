import axios from "axios";
import { Dispatch } from "@reduxjs/toolkit";

import { fetchingContactUs,fetchContactUs,fetchErrorContactUs } from "../slice/ContactUsSlice";
const URL = process.env.REACT_APP_BASE_URL;

let LocalValue:any; 
if(localStorage.getItem("language")){
    let local:any = localStorage.getItem("language");
    LocalValue = JSON.parse(local);  
}


export const getFetchContactUs = () => {
    return async (dispatch:Dispatch)=>{
        try{
            dispatch(fetchingContactUs());
            const response =await axios.get(`${URL}aeroSpace/homeIcons/contactUs/${LocalValue?LocalValue:"AM"}`); 
            dispatch(fetchContactUs(response?.data[0].information));
        }
        catch(error : any){
            dispatch(fetchErrorContactUs(error));
        }

    }
}
export const editContactUsInfo = (obj:any,) => {

    return async (dispatch:Dispatch)=>{
        try{
            await axios.put(`${URL}aeroSpace/editBlok/${LocalValue}/contactUs/0/0`,obj)
        }catch(error){
            console.log(error as Error);
            
        }
    }
}