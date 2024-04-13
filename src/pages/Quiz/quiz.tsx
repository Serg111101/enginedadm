import { useState } from 'react'
import {  useSelector } from 'react-redux'
import './quiz.scss'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loading } from '../../components/Loading/Loading'
import { useAppDispatch } from '../../hooks'
import { getFetchQuiz } from '../../store/action/LessonAction'
import { Divider } from 'antd'
export const Quiz = () => {
    let LocalValue: any;
    if (localStorage.getItem("language")) {
        let local: any = localStorage.getItem("language");
        LocalValue = JSON.parse(local);
    }
    let les:any;
    if(localStorage.getItem("lessons")){
        let getLes:any = localStorage.getItem("lessons");
        les = JSON?.parse(getLes);
    }
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const { Quiz,loading } = useSelector((state:any) => state.Quiz);
    const [item,setItem]= useState(Quiz)
    const [active,setActive] = useState<any>(false)
        useEffect(()=>{
            if(Quiz.length<=0){
        if(localStorage.getItem('quizz')){
           const quz:any = localStorage.getItem('quizz')
           const Quizs = JSON.parse(quz);
            setItem(Quizs)
        }}else{
            setItem(Quiz)
        }
    
    },[Quiz])
  
    

    useEffect(()=>{
        if(les?.length>0){

            dispatch(getFetchQuiz(les))
        }
    },[dispatch])

  
    let [question, setQuestion] = useState(0)
    let [count, setCount] = useState(0)
    const [finish, setFinish] = useState(false)
    let  [answer,setAnswer]= useState<any>([])
    const [corectAnswers,setCorectAnswers]=useState()
    useEffect(()=>{
        if(item[question]?.correctAnswer){
     let answers = [
        item[question]?.correctAnswer,
            ...item[question]?.incorrectAnswer
        ].map((a)=>({sort:Math.random(),value:a})).sort((a,b)=>a.sort-b.sort)
        .map((a)=>a.value)
        setAnswer(answers)
    }
    },[question,item])
    
    function next() {
        if(question < item.length-1){
            if (item[question]?.correctAnswer === corectAnswers && count <= question) {
                setCount(++count)
            }
            setQuestion(++question)
            setActive(false)
        }else{
            if (item[question]?.correctAnswer === corectAnswers && count <= question) {
                setCount(++count)
            }

            const sum:any = sessionStorage?.getItem('count');
            let countStorag = JSON.parse(sum);
            const les:any = localStorage.getItem('lessons')
            const lesons = JSON.parse(les)
            let fff = lesons.slice(0,5)
            if(count >= 7 && fff === "Դաս "+ countStorag){
                const sumo:any = sessionStorage.getItem('count');
                let countStorage = JSON.parse(sumo);
                
                sessionStorage.setItem('count',JSON.stringify(++countStorage));
                
            }
            setFinish(true)
        }

    }
    function correctAnswer(el:any) {
        setCorectAnswers(el);
        setActive(el)
    }
    const Background = item[0]?.background;
    
        
        
    return (
        <div className='answer' style={{ backgroundImage: `url(${Background})`}} >
            <div className='prevButton'>
    <button onClick={()=>{navigate("/Leqtures");localStorage.removeItem('elem')}}>
    {LocalValue === "AM" ? 'Հետ' : "Back"}
    </button>
    </div>
            {loading ? <Loading/>:
          finish ? <div className='answer_next'>
            <p>{LocalValue === "AM" ? 'Դուք հավաքեցիք' : "You collected"+ "  "}{count}/{item.length}</p>
            <button onClick={()=>{ navigate('/Lessons')}}> {LocalValue === "AM" ? 'Դասնթացներ' : "Lessons"+ "  "}  </button>
          </div> : Quiz.length > 0 ? <div className='quiz'>
                <div>
                    <h1>{question+1+" . " + item[question]?.question}</h1>
                </div>
                <div className='item'>
                    {answer.length>0 && answer?.map((el:any,index:number) =>
                     <div key={index} className={(active === el)  ? 'itemdivs' : 'itemdiv'}  onClick={() => {correctAnswer(el)}}> 
                        <p >{el}</p>
                     </div>)}
                </div>
                <button className={active ? "btnActive":"btnDisable"} onClick={() => {next()}}><p>{LocalValue === "AM" ? 'Առաջ' : "Next"}</p></button>
            </div>:  <div className='infoParentSlide1'>{LocalValue==="AM"?"Այս թեմայի համար նյութ չկա":"There is no material for this topic"}</div>
}

        </div>
    )
}