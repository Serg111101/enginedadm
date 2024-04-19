/*eslint-disable*/
import { Routes, Route, useNavigate, } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About us";
import { Header } from "./components/Header";
import { EditHeader } from "./components/EditHeader";
import { Footer } from "./components/Footer";
import { ContactUs } from "./pages/ContactUs/ContactUs";
import { Lesson } from "./pages/Lessons";
import Infomation from "./pages/infoBlock/infomation";
import { Quiz } from "./pages/Quiz/quiz";
import { EditQuiz } from "./pages/EditQuizLesson"
import { Scrollbars } from "react-custom-scrollbars";
import { Satellites } from "./pages/Satellites";
import { QuizSatelite } from "./pages/QuizSatelite";
import { EditQuizSatelite } from "./pages/EditQuizSatelite";
import { NotFoundPage } from "./pages/NotFoundPage";
import { Login } from "./pages/Login";
import { Settings } from "./pages/PageSettings/Settings";
import { useEffect, useState } from "react";
// import { UsefulMaterialsInfo } from "./pages/UsefulMaterialsInfo";
// import axios from "./axios/axios";
import { Loading } from "./components/Loading";
import { AdminSatelite } from "./pages/AdminSatelite";
import { AboutPerson } from "./pages/AboutPerson";


function App() {
  let LocalValue: any;
  if (localStorage.getItem("language")) {
    let local: any = localStorage.getItem("language");
    LocalValue = JSON.parse(local);
  }

  const navigate = useNavigate();
  const [auth, setAuth] = useState<any>("")
  const [auth1, setAuth1] = useState<any>(true)
  
  useEffect(() => {
    if (localStorage?.getItem("auth")) {
      const loc: any = localStorage.getItem("auth")
      const json = JSON?.parse(loc)
      if (json?.accessToken) {
        setAuth(json);
      }
    } else {
      navigate(`/`)
    }
  }, [localStorage?.getItem("auth")])
  
  const url = window.location.href;
  const path = window.location.pathname;

  useEffect(() => {
    if (!path.includes("/Setting") && sessionStorage.getItem("done")) {
      sessionStorage.removeItem("done");
    } 
   
  }, [url, path]);
  useEffect(() => {
    let path = window.location.pathname.slice(window.location.pathname.length - 2, window.location.pathname.length);
   if(path !== "/"){
    
     localStorage.setItem("language",JSON.stringify(path))
   }else{
     localStorage.setItem("language",JSON.stringify("AM"))

   }

     
     if (path !== `/Leqtures/${LocalValue}` && localStorage.getItem("elem")) {
       localStorage.removeItem("elem");
     } 
  
 }, [url, path]);

  useEffect(() => {

    if (!auth?.accessToken && !localStorage.getItem("auth")) {
      navigate(`/`)
      setAuth1(false)
    }else{
      setAuth1(true)
    }
  }, [auth,window.location.pathname])


  useEffect(() => {
    return () => {
      window.location.reload();
    };
  }, [LocalValue]);

  return (
    <Scrollbars
      style={{
        width: "100vw",
        height: "100vh",
        background: "gray",

      }}
      autoHide
      autoHideTimeout={1000}
      autoHideDuration={200}
    >
      <div className="App">
        {auth1 && window.location.pathname!=="/" && <Header />}

        { !auth.accessToken && window.location.pathname!=="/"  ? <Loading/>: <Routes> 
          <Route path={`/home/${LocalValue}`} element={<Home />} />
          <Route path={`/about/${LocalValue}`} element={<About />} />
          <Route path={`/aboutPersons/${LocalValue}`} element={<AboutPerson/>}/>
          <Route path={`/ContactUS/${LocalValue}`} element={<ContactUs />} />
          <Route path={`/Lessons/${LocalValue}`} element={<Lesson />} />
          <Route path={`/Leqtures/${LocalValue}`} element={<Infomation />} />
          <Route path={`/Quiz/${LocalValue}`} element={<Quiz />} />
          <Route path={`/EditQuiz/${LocalValue}`} element={<EditQuiz />} />
          <Route path={`/Satellites/${LocalValue}`} element={<Satellites />} />
          <Route path={`/Setting/${LocalValue}`} element={<Settings />} />
          <Route path={`/`} element={<Login />} />
          <Route path={`/SatelliteQuiz/${LocalValue}`} element={<QuizSatelite />} />
          <Route path={`/EditSatelliteQuiz/${LocalValue}`} element={<EditQuizSatelite />} />
          <Route path={`/EditHeader/${LocalValue}`} element={<EditHeader />} />
          <Route path={`/UserSatelite/${LocalValue}`} element={<AdminSatelite/>}/>
          {/* <Route path="/UsefulMaterials" element={<UsefulMaterialsInfo />} /> */}
          {/* <Route path="/UsefulMaterialsInfo/:name" element={<UsefulMaterialsInfo />} /> */}

          <Route path="*" element={<NotFoundPage />} />
        </Routes>}
        {auth1 && window.location.pathname!=="/" && <Footer />}
      </div>
    </Scrollbars>
  );
}

export default App;