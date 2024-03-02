import axios from "../../axios/adminaxios";
import { Dispatch } from "@reduxjs/toolkit";
import {  fetchingLogo, fetchLogo, fetchErrorLogo } from "../slice/LogoSlice";
const URL = process.env.REACT_APP_BASE_URL
let LocalValue:any; 
if(localStorage.getItem("language")){
    let local:any = localStorage.getItem("language");
    LocalValue = JSON.parse(local);  
}
export const getFetchLogo = () => {
    return async (dispatch:Dispatch)=>{
        try{
            dispatch(fetchingLogo());
            const response =await axios.get(`${URL}aeroSpace/homeIcons/logo/${LocalValue ? LocalValue:"AM"}`);     
            dispatch(fetchLogo(response?.data[0].information[0]));
        }
        catch(error){
            dispatch(fetchErrorLogo(error as Error ));
        }

    }
}


export const uploadImage=(e: any,setImage:any)=> {
    return async (dispatch:Dispatch)=>{

        e.preventDefault();
        const formData = new FormData();
        formData.append("image", e.target.files[0]);
        formData.has("image");
        try {
          const response = await axios.post(`${URL}aeroSpace/addPicture`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          await axios.put(`${URL}aeroSpace/editBlok/${LocalValue}/logo/0/0`, {
            logo: response.data.dirname,
          });
          setImage(response?.data?.dirname)
          
        } catch (error) {
          console.error(error);
        }

    }
   
  }
