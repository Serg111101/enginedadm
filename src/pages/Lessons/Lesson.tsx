/*eslint-disable*/
import  { useEffect, useState } from 'react';
import "./Lesson.scss";
import { getFetchLectures, getFetchLesson } from '../../store/action/LessonAction';
import { PlusCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../components/Loading/Loading";
import { useAppDispatch, useAppSelector } from '../../hooks';

export function Lesson() {
  let LocalValue:any
  if (localStorage.getItem("language")) {
    let local: any = localStorage.getItem("language");
    LocalValue = JSON.parse(local);
  }
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(false);
  const dispatch = useAppDispatch();
  const { Lesson,loading } = useAppSelector((state) => state.Lesson);
  const Background = Lesson[0]?.background;
 
  // const [count,setCount]=useState(1)

  // useEffect(() => {
  //   if (!sessionStorage.getItem('count')) {
  //     sessionStorage.setItem('count', '1');
  //   }else{
  //     let counting:any=sessionStorage.getItem('count');
  //     setCount(JSON.parse(counting))
  //   }
  // }, []);

  useEffect(() => {
    dispatch(getFetchLesson());
  }, [dispatch]);

  async function Quizz(unique_key:string) {
    localStorage.setItem("lessons", JSON.stringify(unique_key));
    setQuiz(!quiz);
    navigate(`/Leqtures/${LocalValue}`);
  }
  
  return (

    <>
    {loading?<Loading/>:
    <div className='LessonContainer' style={{ backgroundImage: `url(${Background})` }}>
      <div className="Lesson">
        <div className='prevButton'>
    <button onClick={()=>navigate(`/home/${LocalValue}`)} >
      {Lesson[0]?.button}
    </button>
        </div>
        {!quiz && (
          <div className="product-grid">
            {Lesson && Lesson.map((item, index) => {
             return (

              <div key={index} className=
               "product-card"
                 onClick={() => Quizz(item?.unique_key)}
                >
                <img className='imageDiv' src={item?.icon} alt={item.lesson} />
                <div className="color" id='color' style={{ background: item?.color }}>
                  <div className='ikonkaDiv'>
                    <img src={item?.ikonka} alt={item.lesson} />
                  </div>
                  <h3>{item?.lesson}</h3>
                  <span>
                    <PlusCircleOutlined />
                  </span>
                </div>
              </div>
            )})}
          </div>
        )}
      </div>
    </div>}
    </>
  );
}

export default Lesson;