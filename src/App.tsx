import { Routes, Route, } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About us";
import { Header } from "./components/Header";
import { EditHeader } from "./components/EditHeader";

import { Footer } from "./components/Footer";
import { ContactUs } from "./pages/ContactUs/ContactUs";
import { Lesson } from "./pages/Lessons";
import Infomation from "./pages/infoBlock/infomation";
import { Quiz } from "./pages/Quiz/quiz";
import {EditQuiz} from "./pages/EditQuizLesson"
import { Scrollbars } from "react-custom-scrollbars";
import { Satellites } from "./pages/Satellites";
import { QuizSatelite } from "./pages/QuizSatelite";
import { EditQuizSatelite } from "./pages/EditQuizSatelite";
import { NotFoundPage } from "./pages/NotFoundPage";
import { Login } from "./pages/Login";
import { Settings } from "./pages/PageSettings/Settings";
import { useEffect } from "react";


function App() {
  // const logd:any = localStorage.getItem('auth') 
  // const locc = JSON?.parse(logd);
  // const navigate = useNavigate()
  
  // useEffect(()=>{
  //   if(logd && logd !== null && locc?.accessToken && locc?.id === "1" ){
  //     navigate("/Login")
  //   }
  // },[logd]);


  const url = window.location.href;
  const path = window.location.pathname;

  useEffect(() => {
    if (path !== "/Setting" && sessionStorage.getItem("done") ) {
      sessionStorage.removeItem("done");
    } else {
      sessionStorage.setItem("done", "true");
    }

  }, [url,path]);

  


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
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/ContactUS" element={<ContactUs />} />
          <Route path="/Lessons" element={<Lesson />} />
          <Route path="/Leqtures" element={<Infomation />} />
          <Route path="/Quiz" element={<Quiz />} />
          <Route path="/EditQuiz" element={<EditQuiz />} />
          <Route path="/Satellites" element={<Satellites />} />
          <Route path="/Setting" element={<Settings />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/SatelliteQuiz" element={<QuizSatelite />} />
          <Route path="/EditSatelliteQuiz" element={<EditQuizSatelite />} />
          <Route path="/EditHeader" element={<EditHeader />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </div>
    </Scrollbars>
  );
}

export default App;