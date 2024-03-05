import axios from "../../axios/adminaxios";
import { Dispatch } from "@reduxjs/toolkit";
import {fetchingSatellites,fetchSatellites,fetchErrorSatellites} from '../slice/SatelitesSlice'
const URL = process.env.REACT_APP_BASE_URL
let LocalValue:any; 
if(localStorage.getItem("language")){
    let local:any = localStorage.getItem("language");
    LocalValue = JSON.parse(local);  
}

export const getFetchSatellites = () => {
    return async (dispatch:Dispatch)=>{
        try{
            dispatch(fetchingSatellites());
            const response =await axios.get(`${URL}aeroSpace/satellite/${LocalValue ? LocalValue:"AM"}`);
            
            dispatch(fetchSatellites(response?.data[0]));
            
        }
        
        catch(error){
            dispatch(fetchErrorSatellites(error as Error ));
        }

    }
}
