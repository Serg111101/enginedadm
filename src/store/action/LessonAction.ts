import axios from "../../axios/adminaxios";
import { Dispatch } from "@reduxjs/toolkit";
import { fetchingLesson, fetchLesson, fetchErrorLesson } from "../slice/LessonSlice";
import { fetchingQuiz, fetchQuiz, fetchErrorQuiz } from "../slice/QuizSlice";
import { fetchingLectures, fetchLectures, fetchErrorLectures } from "../slice/LecturesSlice";
import { fetchingSlide, fetchSlide, fetchErrorSlide } from "../slice/SlideSlice";
const URL = process.env.REACT_APP_BASE_URL
let LocalValue: any;
if (localStorage.getItem("language")) {
    let local: any = localStorage.getItem("language");
    LocalValue = JSON.parse(local);
}
export const getFetchLesson = () => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(fetchingLesson());
            const response = await axios.get(`${URL}aeroSpace/lessons/${LocalValue ? LocalValue : "AM"}`);

            dispatch(fetchLesson(response?.data));
        }
        catch (error) {
            dispatch(fetchErrorLesson(error as Error));
        }
    }
}

export const getFetchQuiz = (titlee: any) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(fetchingQuiz());
            const response = await axios.get(`${URL}aeroSpace/getQuiz/${titlee}/${LocalValue ? LocalValue : "AM"}`);
            if (!localStorage.getItem("quizz")) {
                localStorage.setItem('quizz', JSON.stringify(response?.data));
            }
            else {
                localStorage.setItem('quizz', JSON.stringify(response?.data));
            }
            
            dispatch(fetchQuiz(response?.data));
        }
        catch (error) {
            dispatch(fetchErrorQuiz(error as Error));
        }
    }
}

export const editFetchQuiz = (value:any,id:any) => {
    return async (dispatch:Dispatch)=>{
        try{
            
           
            const response =await axios.put(`${URL}aeroSpace/editExistQuestion/${LocalValue ? LocalValue:"AM"}/${id}`,value);  
          
             dispatch(fetchQuiz(response?.data));
        }
        catch(error){
            dispatch(fetchErrorQuiz(error as Error ));
        }

    }
}
export const addFetchQuiz = (value:any) => {
    
    return async (dispatch:Dispatch)=>{
        try{
        
           
            const response =await axios.post(`${URL}aeroSpace/addNewQuestion/${LocalValue ? LocalValue:"AM"}`,value);  
          
             dispatch(fetchQuiz(response?.data));
        }
        catch(error){
            dispatch(fetchErrorQuiz(error as Error ));
        }

    }
}
export const deleteFetchQuiz = (id:any) => {
    return async (dispatch:Dispatch)=>{
        try{
        
           
            const response =await axios.delete(`${URL}aeroSpace/deleteExistQuestion/${LocalValue ? LocalValue:"AM"}/${id}`);  
          
             dispatch(fetchQuiz(response?.data));
        }
        catch(error){
            dispatch(fetchErrorQuiz(error as Error ));
        }

    }
}

export const getFetchLectures = (titlee: any) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(fetchingLectures());
            const response = await axios.get(`${URL}aeroSpace/getLectures/${titlee}/${LocalValue ? LocalValue : "AM"}`);


            if (!localStorage.getItem('Lectures')) {

                localStorage.setItem("Lectures", JSON.stringify(response?.data[0]?.lectures));
            }
            else {
                localStorage.setItem("Lectures", JSON.stringify(response?.data[0]?.lectures));

            }

            dispatch(fetchLectures(response?.data));
        }
        catch (error) {
            dispatch(fetchErrorLectures(error as Error));
        }

    }
}

export const getFetchSlides = (id: any) => {

    return async (dispatch: Dispatch) => {
        try {
            dispatch(fetchingSlide());
            const response = await axios.get(`${URL}aeroSpace/topics/${id}/${LocalValue ? LocalValue : "AM"}`);

            dispatch(fetchSlide(response?.data));
        }
        catch (error) {
            dispatch(fetchErrorSlide(error as Error));
        }

    }
}
export const editLessonSlides = (id: number, props: any) => {
    return async () => {
        
        try {
            await axios.put(`${URL}aeroSpace/editExistTopics/${LocalValue}/${id}`, props)
        }
        catch (error) {
            console.error(error as Error);
        }
    }
}

export const editLessonAction = (id: number, props: any,title:string) => {
   
    
    return async () => {
        try {
            await axios.put(`${URL}aeroSpace/editExistLesson/${LocalValue}/${id}`, [props,title])
        }
        catch (error) {
            console.error(error as Error);
        }
    }
}
export const uploadImageFunction = (e: any, setImage: any) => {
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
            console.error(error);
        }

    }
}

export const addLesson = (obj: any) => {

    return async () => {
        try {
            await axios.put(`${URL}aeroSpace/addNewLesson/${LocalValue}`, obj)
        }
        catch (error) {
            console.error(error as Error);
        }

    }
}
export const addTopics = (obj: any) => {

    return async () => {
        try {
            await axios.post(`${URL}aeroSpace/addNewTopics/${LocalValue}`, obj)
        }
        catch (error) {
            console.error(error as Error);
        }

    }
}

export const deleteLesson = (id: number,title:string) => {

    return async (dispatch:any) => {
        try {
            await axios.delete(`${URL}aeroSpace/deleteExistLesson/${LocalValue}/${id}/${title}`)
             dispatch(getFetchLesson())
        }
        catch (error) {
            console.error(error as Error);
        }

    }
}


export const addnewLesson = (obj:any) => {
    
    return async () => {
        try {
            await axios.post(`${URL}aeroSpace/addNewLesson/${LocalValue? LocalValue :"AM"}`, obj)
        }
        catch (error) {
            console.error(error as Error);
        }
    }
}