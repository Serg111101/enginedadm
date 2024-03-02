import { Dispatch } from "@reduxjs/toolkit";
import axios from "../../axios/adminaxios";
import {  fetchingHomeHeaderr, fetchHomeHeaderr, fetchErrorHomeHeaderr } from "../slice/HomeHeaderSlice";
import { fetchingHomeNextRout,fetchErrorHomeNextRout,fetchHomeNextRout } from "../slice/HomeNextRoutSlice";
import { fetchHomeAuthor,fetchErrorHomeAuthor,fetchingHomeAuthor } from "../slice/HomeAuthorSlice";
import { fetchingHomeInfo,fetchHomeInfo,fetchErrorHomeInfo } from "../slice/HomeInfoSlice";
import { fetchingContact,fetchContact,fetchErrorContact } from "../slice/ContactSlice";
import { fetchingMail,fetchMail,fetchErrorMail } from "../slice/MailSlice";
import { fetchingSendMail,fetchSendMail,fetchErrorSendMail } from "../slice/SendMailSlice";
const URL = process.env.REACT_APP_BASE_URL;
let LocalValue:any; 
if(localStorage.getItem("language")){
    let local:any = localStorage.getItem("language");
    LocalValue = JSON.parse(local);  
}

export const getfetchHomeHeader = () => {
    return async (dispatch:Dispatch)=>{
        try{
            dispatch(fetchingHomeHeaderr());
            const response =await axios.get(`${URL}aeroSpace/homeIcons/text/${LocalValue ? LocalValue:"AM"}`);  
            dispatch (fetchHomeHeaderr(response.data[0]?.information[0]));
            
        }
        catch(error){
            dispatch(fetchErrorHomeHeaderr(error as Error ));
        }

    }
}


export const   getfetchHomeNextRout= () => {
   

    return async (dispatch:Dispatch)=>{
        try{
            dispatch(fetchingHomeNextRout());
            const response =await axios.get(`${URL}aeroSpace/homeIcons/lessonBox/${LocalValue ? LocalValue:"AM"}`);
            dispatch(fetchHomeNextRout(response?.data[0]?.information));
            
        }
        catch(error ){
            dispatch(fetchErrorHomeAuthor(error as Error));
        }

    }
}


export const getfetchHomeAuthor   = () => {
    return async (dispatch:Dispatch)=>{
        try{
            dispatch(fetchingHomeAuthor());
            const response =await axios.get(`${URL}aeroSpace/homeIcons/Box/${LocalValue ? LocalValue:"AM"}`);
            dispatch(fetchHomeAuthor(response.data[0].information[0]));
            
        }
        catch(error){
            dispatch(fetchErrorHomeNextRout(error as Error));
        }

    }
}


export const getfetchHomeInfo = () => {
    return async (dispatch:Dispatch)=>{
        try{
            dispatch(fetchingHomeInfo());
            const response =await axios.get(`${URL}aeroSpace/homeIcons/downBox/${LocalValue ? LocalValue:"AM"}`);
            dispatch(fetchHomeInfo(response?.data[0].information));
            
        }
        catch(error){
            dispatch(fetchErrorHomeInfo(error as Error ));
        }

    }
}

export const getfetchSendMail = () => {
    return async (dispatch:Dispatch)=>{
        try{
            dispatch(fetchingSendMail());
            const response =await axios.get(`${URL}aeroSpace/homeIcons/sendMail/${LocalValue ? LocalValue:"AM"}`);
            dispatch(fetchSendMail(response?.data[0].information));
            
        }
        catch(error){
            dispatch(fetchErrorSendMail(error as Error));
        }

    }
}
export const getfetchContact = () => {
    return async (dispatch:Dispatch)=>{
        try{
            dispatch(fetchingContact());
            const response =await axios.get(`${URL}aeroSpace/homeIcons/contact/${LocalValue ? LocalValue:"AM"}`);
            dispatch(fetchContact(response?.data[0]?.information));
            
        }
        catch(error){
            dispatch(fetchErrorContact(error as Error ));
        }

    }
}

export const SendMaill = (obj:any) => {
    return async (dispatch:Dispatch)=>{
        try{        
            dispatch(fetchingMail())    
            const response = await axios.post(`${URL}aeroSpace/sendMail`,obj);
            dispatch(fetchMail(response?.data));
    
            }
            catch(error){
                dispatch(fetchErrorMail(error as Error));
            }

    }
}





export const editHomeHeaderText=(editvalue:any)=>{

    return async (dispatch:Dispatch)=>{
        try{
            await axios.put(`${URL}aeroSpace/editBlok/${LocalValue}/text/0/0`,{title:editvalue})
          }catch(error){
            console.error(error as Error);
            
          }
    }
}

export const deleteHomeHeaderImages =(index:number)=>{
    
    return async (dispatch:any) => {
        try{
              await axios.delete(`${URL}aeroSpace/blok/${LocalValue}/text/0?arrIndex=${index}`)
              dispatch(getfetchHomeHeader())
        }
        catch(error){
          console.error(error as Error);
        }
    }
}
export const editeHomeHeaderImage=(index:number,addImg:any)=>{
    return async (dispatch:Dispatch)=>{
        try{
            await axios.put(`${URL}aeroSpace/editBlok/${LocalValue}/text/${index-1}/${index-1}`,{logo:addImg,index:index-1})
            
        }catch(error){
            console.error(error as Error);
        }

    }

}
export const addHomeHeaderImages =(addImg:string)=>{
    return async (dispatch:Dispatch) => {
        
        try{
              await axios.post(`${URL}aeroSpace/addNewBlok/${LocalValue}/text/`,{logo:addImg},)
        }
        catch(error){
          console.error(error as Error);
        }
    }
}



export const editNextRoute = (obj:any,id:number) => {

    return async (dispatch:Dispatch)=>{
        
        try{
            await axios.put(`${URL}aeroSpace/editBlok/${LocalValue}/lessonBox/${id}/${id}`,obj)
        }catch(error){
            console.error(error as Error);
            
        }
    }
}

export const editHomeAuthor = (obj:any) => {
    
    return async (dispatch:Dispatch)=>{
        try{
            await axios.put(`${URL}aeroSpace/editBlok/${LocalValue}/Box/${0}/${0}`,obj)
        }catch(error){
            console.error(error as Error);
        }
    }
}

export const editHomeInfo = (obj:any,index:number) => {
    return async (dispatch:Dispatch)=>{
        try{
            await axios.put(`${URL}aeroSpace/editBlok/${LocalValue}/downBox/${index}/${index}`,obj)
        }catch(error){
            console.error(error as Error);
        }
    }
}


export const editSendMail=(index:number,obj:any)=>{

    return async (dispatch:Dispatch)=>{
        try{
            await axios.put(`${URL}aeroSpace/editBlok/${LocalValue}/sendMail/${index}/${index}`,obj)
        }catch(error){
            console.error(error as Error);
        }

    }

}

export const editInfo = (obj:any,index:number) => {
    
    return async (dispatch:Dispatch)=>{
        try{
            await axios.put(`${URL}aeroSpace/editBlok/${LocalValue}/contact/${index}/${index}`,obj)
        }catch(error){
            console.error(error as Error);
        }
    }
}
