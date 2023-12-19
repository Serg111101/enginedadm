import { configureStore } from '@reduxjs/toolkit';
import HomeHeaderrReducer from './slice/HomeHeaderSlice';
import AboutReducer from './slice/AboutSlice';
import AboutOurTeamReducer from './slice/AboutOurTeamSlice';
import LogoReducer from './slice/LogoSlice';
import HomeNextRoutReducer from './slice/HomeNextRoutSlice'; 
import HomeAuthorReducer from './slice/HomeAuthorSlice';
import HomeInfoReducer from './slice/HomeInfoSlice';
import ContactReducer from './slice/ContactSlice';
import MailReducer from './slice/MailSlice';
import ContactUsReducer from './slice/ContactUsSlice';
import LessonReducer from './slice/LessonSlice';
import QuizReducer from './slice/QuizSlice';
import LecturesReducer from './slice/LecturesSlice';
import SlideReducer from './slice/SlideSlice';
import HeaderReducer from './slice/HeaderSlice';
import LoginReducer from './slice/LoginSlice';
import FooterReducer from './slice/FooterSlice';
import SendMailReducer from './slice/SendMailSlice';
import SatellitesSliceReducer from'./slice/SatelitesSlice';
import QuizSateliteReducer from './slice/QuizSateliteSlice';
import ImageReducer from './slice/ImageSlice';
import TeacherReducer from './slice/TeacherSlice'

export const store = configureStore({
  reducer: {
    HomeHeaderr:HomeHeaderrReducer,
    About:AboutReducer,
    AboutOurTeam:AboutOurTeamReducer,
    Logo:LogoReducer,
    HomeNextRout:HomeNextRoutReducer,
    HomeAuthor:HomeAuthorReducer,
    HomeInfo:HomeInfoReducer,
    Contact:ContactReducer,
    Mail:MailReducer,
    ContactUs:ContactUsReducer,
    Lesson:LessonReducer,
    Quiz:QuizReducer,
    Lectures:LecturesReducer,
    Slide:SlideReducer,
    Header:HeaderReducer,
    Login:LoginReducer,
    Footer:FooterReducer,
    SendMail:SendMailReducer,
    Satellites:SatellitesSliceReducer,
    QuizSatelite:QuizSateliteReducer,
    Image:ImageReducer,
    Teacher:TeacherReducer,
    
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch



