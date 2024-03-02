import axios from "../../axios/adminaxios";
import { Dispatch } from "@reduxjs/toolkit";
import {  fetchingHeader, fetchHeader, fetchErrorHeader } from "../slice/HeaderSlice";
const URL = process.env.REACT_APP_BASE_URL

let LocalValue:any; 
if(localStorage.getItem("language")){
    let local:any = localStorage.getItem("language");
    LocalValue = JSON.parse(local);  
}

export const getFetchHeader = () => {
    return async (dispatch:Dispatch)=>{
     
        try{
            dispatch(fetchingHeader());
            const response =await axios.get(`${URL}aeroSpace/header/${LocalValue?LocalValue:"AM"}`); 
            dispatch(fetchHeader(response?.data));
        }
        catch(error:any){
            dispatch(fetchErrorHeader(error));
        }

    }
}

export const editHeader=(id: number,edit:any)=> {
    return async()=>{

      try {
      await axios.put(`${URL}aeroSpace/editHeader/${LocalValue}/${id}`, edit);
       
    } catch (error) {
      console.error(error as Error);
    }
  }

}


