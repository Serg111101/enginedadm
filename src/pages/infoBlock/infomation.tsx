import { useEffect, useState } from 'react';
import './infoStyle.scss';
import { useNavigate } from 'react-router-dom';
import { getFetchLectures, getFetchQuiz, getFetchSlides } from '../../store/action/LessonAction';
import { UndoOutlined } from '@ant-design/icons';
import { Loading } from "../../components/Loading/Loading";
import { useAppDispatch, useAppSelector } from '../../hooks';

const Informatoin = () => {
  let LocalValue: any;
  if (localStorage.getItem("language")) {
    let local: any = localStorage.getItem("language");
    LocalValue = JSON.parse(local);
  }
  const { Lectures, loading } = useAppSelector((state: any) => state.Lectures);
  const { Slide } = useAppSelector((state: any) => state.Slide);
  const { Quiz } = useAppSelector((state) => state.Quiz)
  const [lectures, setLectures] = useState(Lectures);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [elem, setElem] = useState<any>(false);
  const [infoState, setInfoState] = useState<any>(0);

  useEffect(() => {
    let titlee: any;
    if (localStorage.getItem('lessons')) {
      const loc: any = localStorage.getItem('lessons');
      titlee = JSON.parse(loc);
    }
    if (localStorage.getItem('elem')) {
      const loc: any = localStorage.getItem('elem');
      let title = JSON.parse(loc);
      setElem(title)
    }
    dispatch(getFetchLectures(titlee));
    dispatch(getFetchSlides(titlee));
    dispatch(getFetchQuiz(titlee))
  }, [dispatch]);

  useEffect(() => {
    if (Lectures.length <= 0) {
      if (localStorage.getItem('Lectures')) {
        const locc: any = localStorage.getItem('Lectures');
        const Lecture = JSON.parse(locc);
        setLectures(Lecture);
      }
    } else {
      setLectures(Lectures);
    }
  }, [lectures.length, Lectures]);



  let prev = () => {
    if (infoState !== 0) {
      setInfoState((prevState: any) => prevState - 1);

    }
  };

  let next = () => {
    if (Slide[elem - 1].slides.length !== infoState) {
      setInfoState((prevState: any) => prevState + 1);
    } else if (infoState === Slide[elem - 1].slides.length) {
      setInfoState(0);
    }
  };

  function text(id: any) {
    setElem(id);
    localStorage.setItem("elem", id)
    if (lectures[0]?.lectures?.length === id) {
      navigate(`/Quiz/${LocalValue}`)
    }
  }




  const Background = Lectures[0]?.background;
  const showQuiz = Quiz?.length > 0 ? true : false;
  return (
    <>
      <div className="Lecturee" style={elem ? { display: "none" } : { backgroundImage: `url(${Background})`, }}>
        {!elem && lectures?.length > 0 && <div className='prevButton'>
          <button onClick={() => navigate(`/Lessons/${LocalValue}`)} >
            {LocalValue === "AM" ? 'Հետ' : "Go back"}
          </button>
        </div>}
        <div className={!elem ? 'lectureTitle' : ''}>
          {loading ? (
            <Loading />
          ) : (
            <>

              {!elem && lectures?.length > 0 && (
                <>
                  {lectures[0]?.lectures?.map((el: any, index: number) => {
                    if ((lectures[0]?.lectures?.length - 1 !== index)) {
                     return( <div
                        className="itemLecture"
                        key={index}
                        onClick={() => {
                          text(index + 1);
                        }}
                        style={{ background: el.color }}
                      >
                        <p>{el.text}</p>
                      </div>)
                    }
                    if (showQuiz && (lectures[0]?.lectures?.length - 1 === index)) {
                      return( <div
                        className="itemLecture"
                        key={index}
                        onClick={() => {
                          text(index + 1);
                        }}
                        style={{ background: el.color }}
                      >
                        <p>{el.text}</p>
                      </div>)
                    }

                  })}
                </>
              )}
            </>
          )}
        </div>
      </div>

      {elem && elem !== 8 && (


        <div className="infoParent" style={{ backgroundImage: `url(${Background}` }}>
          <div className='infoParentSlide'>
            {Slide.length > 0 && infoState !== 0 && <div className="prev" onClick={() => prev()}>
              <p>  {Slide[0].button[0]} </p>
            </div>}
            {infoState === 0 && <div className="infoParentContainer">
              <h1>{Slide[0]?.lessons}</h1>
              <div>{Slide.length > 0 ? <div>
                {
                  Slide?.map((el: any, index: number) => {
                    return index + 1 === elem && <div className='info'>
                      {el?.lectures && <h2>{el?.lectures}</h2>}
                      {el?.text1 && el?.text1?.length > 0 && <p key={index} className='text1' >{el?.text1}</p>}
                      {el?.image && el?.image?.length > 0 && <div key={index} className='imageDiv'> <img src={el?.image} alt={el?.text1} /> </div>}
                      {el?.text2 && el?.text2?.length > 0 && <p key={index} className='text2' >{el.text2}</p>}
                      {
                        el?.text_arr?.map((elem: any, index: number) => {
                          if (elem?.includes('http')) {
                            return <div className='imageDiv' ><img key={index} src={elem} alt="nkar" /></div>
                          } else {
                            return <p  >{elem}</p>
                          }
                        })
                      }
                      {
                        el?.text_arr_margin?.map((elem: any, index: number) => {
                          if (elem?.includes('http')) {
                            return <div className='imageDiv' key={index} > <img src={elem} alt='Image not found' /> </div>
                          } else {
                            return <p key={index} style={{ marginLeft: elem?.startsWith("●") ? "80px" : "40px" }}>{elem}</p>
                          }
                        })
                      }
                    </div>
                  })
                }</div>
                : (
                  <div className="infoParent" style={{ backgroundImage: `url(${Background}` }}>
                    <div className='infoParentSlide1'>{LocalValue === "AM" ? "Այս թեմայի համար նյութ չկա" : "There is no material for this topic"}</div></div>
                )
              }</div>  </div>}

            {infoState !== 0 && Slide[elem - 1]?.slides !== null && Slide[elem - 1]?.slides?.length > 0 && (
              <>
                <div className="slideImage">
                  <img src={Slide[elem - 1]?.slides[infoState - 1]} alt="slideImage" />
                </div>
              </>
            )}
            {Slide.length > 0 && infoState !== Slide[elem - 1]?.slides?.length && Slide[elem - 1]?.slides !== null && <div className="next" onClick={() => next()}>
              <p>  {Slide[0]?.button[1]} </p>
            </div>}
          </div>
          {/* <div className="info_next"> */}
          {/* {Slide[elem - 1].slides !== null && Slide[elem - 1]?.slides.length > 0 && (
              <div className="nextPrevButtons">


              </div>
            )} */}
          {<div className="prevvButton">
            <button onClick={() => { setElem(false); setInfoState(0); localStorage.removeItem('elem') }}>
            {LocalValue === "AM" ? 'Հետ դեպի հարցաշար' : "Back to the questionnaire"} <span> <UndoOutlined /> </span>
            </button>
          </div>}
          {/* </div> */}
        </div>
      )}

    </>
  );
};

export default Informatoin;