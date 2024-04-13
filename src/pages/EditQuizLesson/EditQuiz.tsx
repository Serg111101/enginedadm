import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import "./EditQuiz.scss";
import { useEffect } from 'react'
import { getFetchQuiz, editFetchQuiz, addFetchQuiz, deleteFetchQuiz, getFetchQuizSuperadmin } from '../../store/action/LessonAction';
import { Loading } from '../../components/Loading/Loading';
import Swal from "sweetalert2";

import {
    CloseOutlined,
    EditOutlined,
    CheckSquareOutlined,
    PlusCircleFilled,
    DeleteOutlined
} from "@ant-design/icons";
import { RemoveItem } from '../../components/removeItem';
import { useNavigate } from 'react-router-dom';

export const EditQuiz = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const { Quiz, loading } = useAppSelector((state: any) => state.Quiz);
    const [active, setActive] = useState('');
    const [value, setValue] = useState('');
    const [add, setAdd] = useState(false);
    const [question, setQuestion] = useState('')
    const [correctAnswer, setCorrectAnswer] = useState('')
    const [incorrectAnswer, setIncorrectAnswer] = useState(['', '', ''])

    const [deleteState, setDeleteState] = useState([-1, ''])
    let LocalValue: any;
    if (localStorage.getItem("language")) {
        let local: any = localStorage.getItem("language");
        LocalValue = JSON.parse(local);
    }


    let title: any;
    if (localStorage.getItem('lessons')) {
        const loc: any = localStorage.getItem('lessons');
        title = JSON.parse(loc)
    }
    useEffect(() => {
        dispatch(getFetchQuizSuperadmin(title));
    }, [dispatch,title])

    async function editQuestion(value: any, index: any, indexItem: any, id: any, keys: string) {
        if ( value?.incorrectAnswer !== undefined) {
            if (!value?.incorrectAnswer?.trim()) {
                Swal.fire({
                    title: LocalValue === "AM" ? 'չի կարող դատարկ լինել' : "cannot be empty",
                    icon: 'error',
                    confirmButtonText: (LocalValue === "AM" ? 'Լավ' : "OK")
                })
            } else {
                let item = [...Quiz[index]?.incorrectAnswer]
                item[indexItem] = value?.incorrectAnswer
                await dispatch(editFetchQuiz({ [keys]: item }, id))
                setActive('')
                setValue('')
                dispatch(getFetchQuiz(title));
            }
        } else {
            if (!value?.trim()) {
                Swal.fire({
                    title: LocalValue === "AM" ? 'չի կարող դատարկ լինել' : "cannot be empty",
                    icon: 'error',
                    confirmButtonText: (LocalValue === "AM" ? 'Լավ' : "OK")
                })
            } else {
                await dispatch(editFetchQuiz({ [keys]: value }, id))
                setActive('')
                setValue('')
                dispatch(getFetchQuiz(title));
            }
        }

    }

    async function addQuestion(e: any) {

        if (question?.length === 0 && correctAnswer?.length === 0 && incorrectAnswer[0]?.length === 0 && incorrectAnswer[1]?.length === 0 && incorrectAnswer[2]?.length === 0) {
            Swal.fire({
                title: LocalValue === "AM" ? 'չի կարող դատարկ լինել' : "cannot be empty",
                icon: 'error',
                confirmButtonText: (LocalValue === "AM" ? 'Լավ' : "OK")
            })
        } else {


            let obj = {
                button: ["Հետ", "Առաջ", "Հետ դեպի հարցաշար"],
                lesson: title,
                question: question,
                correctAnswer: correctAnswer,
                incorrectAnswer: incorrectAnswer,
                unique_key:title
            }
            await dispatch(addFetchQuiz(obj))
            setAdd(false)
            setCorrectAnswer('')
            setIncorrectAnswer(["", "", ""])
            setQuestion('')
            dispatch(getFetchQuizSuperadmin(title));
        }
    }
    async function deleteQuestion(id: number) {
        await dispatch(deleteFetchQuiz(id))
        await dispatch(getFetchQuizSuperadmin(title))
        setDeleteState([-1, ''])
    }


    return (
        <>

            <div className='answer' >
            <div className='prevButton'>
          <button onClick={() => { navigate("/Setting") }} >
          {LocalValue==="AM" ? "Հետ":"Go back"}
          </button>
        </div>
                {loading ? <Loading />
                    :
                     <div className='quiz'>
                          
                        {Quiz.map((el: any, i: any) =>
                         <div key={i} >
                            <div className='head' >
                                {active === el.question ? <input type="text" value={value} onChange={(e) => { setValue(e.target.value) }} /> : <h3>{el.question}</h3>}
                                {active === el.question ? <div> <CloseOutlined className="iconantd" onClick={() => { setActive('') }} /> < CheckSquareOutlined className="iconantd" onClick={() => { editQuestion(value, i, "", el.id, "question") }} /> </div> : <EditOutlined className="iconantd" onClick={() => { setValue(el.question); setActive(el.question) }} />}
                            </div>

                            { <div className='answer_box'>
                                <div className='answer_correct'>
                                    <h4>{LocalValue === "AM" ? "Ճիշտ պատասխան" : "CorrectAnswer"}</h4>
                                    <div className='answer_text'>
                                        {active === el.correctAnswer  ? <input type="text" value={value} onChange={(e) => { setValue(e.target.value) }} /> : <p>{el.correctAnswer}</p>}
                                        {active === el.correctAnswer ? <div> <CloseOutlined className="iconantd" onClick={() => { setActive('') }} /> < CheckSquareOutlined className="iconantd" onClick={() => { editQuestion(value, i, '', el.id, "correctAnswer") }} /> </div> : <EditOutlined className="iconantd" onClick={() => { setValue(el.correctAnswer); setActive(el.correctAnswer) }} />}
                                    </div>

                                </div>
                                <div className='answer_wrong'  >
                                    <h4  >{LocalValue === "AM" ? "Սխալ պատասխան" : "IncorrectAnswer"}</h4>
                                    <div className='answer_wrongtext'>
                                        {el.incorrectAnswer.map((elem: any, index: number) => <div key={index +43}>
                                            {active === elem ? <input type="text" value={value} onChange={(e) => { setValue(e.target.value) }} /> : <p>{index + 1}.{elem}</p>}
                                            {active === elem ? <div> <CloseOutlined className="iconantd" onClick={() => { setActive('') }} /> < CheckSquareOutlined className="iconantd" onClick={() => { editQuestion({ incorrectAnswer: value }, i, index, el.id, 'incorrectAnswer') }} /> </div> : <EditOutlined className="iconantd" onClick={() => { setValue(elem); setActive(elem) }} />}

                                        </div>)}
                                    </div>

                                </div>
                            </div>}


                            <DeleteOutlined className="iconantd" onClick={() => setDeleteState([el.id, ''])} />
                        </div>)}
                    </div>
                    }

                < PlusCircleFilled onClick={() => { setAdd(!add) }} />
                {add && <form className='addQuestion'>
                    { <p>{LocalValue === "AM" ? "Լացնել բոլոր դաշտորը" : "fill in all fields"}</p>}
                    <label htmlFor="">{LocalValue === "AM" ? "Հարց" : "Question"}  </label>
                    <input type="text" onChange={(e) => { setQuestion(e.target.value) }} />
                    <label htmlFor="">{LocalValue === "AM" ? "Ճիշտ պատասխան" : "CorrectAnswer"}</label>
                    <input type="text" onChange={(e) => { setCorrectAnswer(e.target.value) }} />
                    <label htmlFor=""> {LocalValue === "AM" ? "Սխալ պատասխան" : "IncorrectAnswer"}</label>
                    <input type="text" onChange={(e) => { setIncorrectAnswer([e.target.value, incorrectAnswer[1], incorrectAnswer[2]]) }} />
                    <input type="text" onChange={(e) => { setIncorrectAnswer([incorrectAnswer[0], incorrectAnswer[1], e.target.value]) }} />
                    <input type="text" onChange={(e) => { setIncorrectAnswer([incorrectAnswer[0], e.target.value, incorrectAnswer[2]]) }} />
                    <button>
                        <CloseOutlined className="iconantd" onClick={() => { setAdd(false) }} />
                        <CheckSquareOutlined className="iconantd" onClick={(e) => { addQuestion(e) }} />
                    </button>
                </form>}
            </div>
            {deleteState[0] !== -1 && <RemoveItem deleteItem={deleteQuestion} name={'Quiz'} setDeletePage={setDeleteState} id={deleteState} />}
        </>
    )
}