import axios from "../../axios/adminaxios";
import { Dispatch } from "@reduxjs/toolkit";
// import {  fetchingLogo, fetchLogo, fetchErrorLogo } from "../slice/LogoSlice";
import { fetchingQuizSatelite,fetchQuizSatelite,fetchErrorQuizSatelite } from "../slice/QuizSateliteSlice";
const URL = process.env.REACT_APP_BASE_URL
let LocalValue:any; 
if(localStorage.getItem("language")){
    let local:any = localStorage.getItem("language");
    LocalValue = JSON.parse(local);  
}
export const getFetchQuizSatelite = () => {
    return async (dispatch:Dispatch)=>{
        try{
            dispatch(fetchingQuizSatelite());
            const response =await axios.get(`${URL}aeroSpace/satelliteQuestions/${LocalValue ? LocalValue:"AM"}`);  
            
            if(!localStorage.getItem("quizzsat")){
                localStorage.setItem('quizzsat',JSON.stringify(response?.data));   
            }
            else{
            localStorage.setItem('quizzsat',JSON.stringify(response?.data));   
        }
            await dispatch(fetchQuizSatelite(response?.data));
        }
        catch(error){
            dispatch(fetchErrorQuizSatelite(error as Error ));
        }

    }
}
export const editFetchQuizSatelite = (value:any,id:any) => {
    return async (dispatch:Dispatch)=>{
        try{
    
           
            const response =await axios.put(`${URL}aeroSpace/editSatelliteQuestion/${LocalValue ? LocalValue:"AM"}/${id}`,value);  
          
             dispatch(fetchQuizSatelite(response?.data));
        }
        catch(error){
            dispatch(fetchErrorQuizSatelite(error as Error ));
        }

    }
}
export const addFetchQuizSatelite = (value:any) => {
    return async (dispatch:Dispatch)=>{
        try{
        
           
            const response =await axios.post(`${URL}aeroSpace/addSatelliteQuestion/${LocalValue ? LocalValue:"AM"}`,value);  
          
             dispatch(fetchQuizSatelite(response?.data));
        }
        catch(error){
            dispatch(fetchErrorQuizSatelite(error as Error ));
        }

    }
}
export const deleteFetchQuizSatelite = (id:any) => {
    return async (dispatch:Dispatch)=>{
        try{
        
           
            const response =await axios.delete(`${URL}aeroSpace/deleteSatelliteQuestion/${LocalValue ? LocalValue:"AM"}/${id}`);  
          
             dispatch(fetchQuizSatelite(response?.data));
        }
        catch(error){
            dispatch(fetchErrorQuizSatelite(error as Error ));
        }

    }
}
