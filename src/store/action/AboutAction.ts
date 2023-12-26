import axios from "../../axios/adminaxios";
import { Dispatch } from "@reduxjs/toolkit";
import { fetchingAbout, fetchAbout, fetchErrorAbout } from "../slice/AboutSlice";
import { fetchAboutOurTeam, fetchErrorAboutOurTeam, fetchingAboutOurTeam } from "../slice/AboutOurTeamSlice";
const URL = process.env.REACT_APP_BASE_URL;
let LocalValue: any;
if (localStorage.getItem("language")) {
  let local: any = localStorage.getItem("language");
  LocalValue = JSON.parse(local);
}

export const getFetchAbout = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(fetchingAbout());
      const response = await axios({
        method: 'get',
        url: `${URL}aeroSpace/about/${LocalValue ? LocalValue : "AM"}`,
      });
      dispatch(fetchAbout(response?.data));
    }
    catch (error: any) {
      dispatch(fetchErrorAbout(error));
    }
  }
}


export const getAboutOutTeam = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(fetchingAboutOurTeam());
      const response = await axios.get(`${URL}aeroSpace/getOurTeam/${LocalValue ? LocalValue : "AM"}`);
      dispatch(fetchAboutOurTeam(response?.data));
    }
    catch (error) {
      console.log(error, 'error');
      dispatch(fetchErrorAboutOurTeam(error as Error));
    }
  }
}


export const uploadImage = (e: any, id: number, setImage: (e: string) => void) => {

  return async () => {

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
      
      setImage(response?.data?.dirname)

    } catch (error) {
      console.log(error);
    }

  }

}

export const editePerson = (id: number, editvalue: any) => {

  return async () => {
    try {

      await axios.put(`${URL}aeroSpace/editAboutPage/${LocalValue}/${id}`, editvalue)
    } catch (error) {
      console.log(error as Error);
    }
  }
}


export const addPerson = (obj: any, image: any) => {
  const objj = {
    ...obj,
    image: image
  }
  return async (dispatch: Dispatch) => {
    try {
      await axios.post(`${URL}aeroSpace/addNewAboutBox/${LocalValue}`, objj);
    } catch (error) {
      console.log(error as Error);
    }
  }
}


export const addPersonImage = (e: any,setAddImage:any) => {
  return async (dispatch: Dispatch) => {
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
      setAddImage(response?.data?.dirname);
    } catch (error) {
      console.log(error);
    }
  }

}


export const deletePersons = (id: number) => {

  return async (dispatch: any) => {
    try {
      await axios.delete(`${URL}aeroSpace/deleteExistAboutBox/${LocalValue}/${id}`)
      dispatch(getAboutOutTeam())
    }
    catch (error) {
      console.log(error as Error);
    }
  }
}


export const editeTeam = (id: number, editvalue: any) => {

  return async (dispatch: Dispatch) => {
    try {
      await axios.put(`${URL}aeroSpace/editAbout/${LocalValue}/${id}`, editvalue)
    } catch (error) {
      console.log(error as Error);
    }
  }
}
export const editeTeamImage = (id: number, addImg: any) => {

  return async (dispatch: Dispatch) => {
    try {
      await axios.put(`${URL}aeroSpace/editAbout/${LocalValue}/${id}`, { image: addImg })
    } catch (error) {
      console.log(error as Error);
    }
  }
}