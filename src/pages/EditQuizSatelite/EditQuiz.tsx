import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import "./EditQuiz.scss";
import { useEffect } from 'react'
import { getFetchQuizSatelite, editFetchQuizSatelite, addFetchQuizSatelite, deleteFetchQuizSatelite } from '../../store/action/QuizSateliteAction';
import { Loading } from '../../components/Loading/Loading';
import Swal from "sweetalert2";

import {
    CloseOutlined,
    EditOutlined,
    CheckSquareOutlined,
    PlusCircleFilled,
    DeleteOutlined
} from "@ant-design/icons";
export const EditQuizSatelite = () => {
    const dispatch = useAppDispatch()
    const { QuizSatelite, loading } = useAppSelector((state: any) => state.QuizSatelite);
    const [active, setActive] = useState('');
    const [value, setValue] = useState('');
    const [add, setAdd] = useState(false);
    const [question, setQuestion] = useState('')
    const [correctAnswer, setCorrectAnswer] = useState('')
    const [incorrectAnswer, setIncorrectAnswer] = useState(['', '', ''])

    useEffect(() => {
        dispatch(getFetchQuizSatelite());
    }, [dispatch])
    let LocalValue: any;
    if (localStorage.getItem("language")) {
        let local: any = localStorage.getItem("language");
        LocalValue = JSON.parse(local);
    }

    // async function editQuestion(value: any, index: any, id: any, keys: string) {
        
    //     if (!value?.incorrectAnswer?.trim()) {
    //         Swal.fire({
    //             title: LocalValue === "AM" ? 'չի կարող դատարկ լինել' : "cannot be empty",
    //             icon: 'error',
    //             confirmButtonText: (LocalValue === "AM" ? 'Լավ' : "OK")
    //         })
    //     } else {
    //         if (value?.incorrectAnswer) {
    //             let item = [...QuizSatelite[id - 1]?.incorrectAnswer]
    //             item[index] = value.incorrectAnswer
    //             await dispatch(editFetchQuizSatelite({ [keys]: item }, id))
    //         } else {
    //             await dispatch(editFetchQuizSatelite({ [keys]: value }, id))
    //         }
    //         setActive('')
    //         setValue('')
    //         dispatch(getFetchQuizSatelite());
    //     }
    // }
    async function editQuestion(value: any, index: any, id: any, keys: string) {
        if ( value?.incorrectAnswer !== undefined) {
            if (!value?.incorrectAnswer?.trim()) {
                Swal.fire({
                    title: LocalValue === "AM" ? 'Չի կարող դատարկ լինել' : "Cannot be empty",
                    icon: 'error',
                    confirmButtonText: (LocalValue === "AM" ? 'Լավ' : "OK")
                })
            } else {
                let item = [...QuizSatelite[id - 1]?.incorrectAnswer]
                item[index] = value.incorrectAnswer
                await dispatch(editFetchQuizSatelite({ [keys]: item }, id))
                setActive('')
                setValue('')
                dispatch(getFetchQuizSatelite());
            }
        } else {
            if (!value?.trim()) {
                Swal.fire({
                    title: LocalValue === "AM" ? 'Չի կարող դատարկ լինել' : "Cannot be empty",
                    icon: 'error',
                    confirmButtonText: (LocalValue === "AM" ? 'Լավ' : "OK")
                })
            } else {
                await dispatch(editFetchQuizSatelite({ [keys]: value }, id))
                setActive('')
                setValue('')
                dispatch(getFetchQuizSatelite());
            }
        }

    }
    async function addQuestion(e: any) {

        if (question?.length === 0 && correctAnswer?.length === 0 && incorrectAnswer[0]?.length === 0 && incorrectAnswer[1]?.length === 0 && incorrectAnswer[2]?.length === 0) {
            Swal.fire({
                title: LocalValue === "AM" ? 'Չի կարող դատարկ լինել' : "Cannot be empty",
                icon: 'error',
                confirmButtonText: (LocalValue === "AM" ? 'Լավ' : "OK")
            })
        } else {

            let obj = {
                question: question,
                correctAnswer: correctAnswer,
                incorrectAnswer: incorrectAnswer
            }
            await dispatch(addFetchQuizSatelite(obj))
            setAdd(false)
            setCorrectAnswer('')
            setIncorrectAnswer(["", "", ""])
            setQuestion('')
            dispatch(getFetchQuizSatelite());
        }
    }
    async function deleteQuestion(id: number) {
        await dispatch(deleteFetchQuizSatelite(id))
        await dispatch(getFetchQuizSatelite())
    }


    return (
        <>

            <div className='answer' >

                {loading ? <Loading />
                    : <div className='quiz'>
                        {QuizSatelite.map((el: any, i: any) => <div key={i} >
                            <div className='head' >
                                {active === el.question ? <input type="text" value={value} onChange={(e) => { setValue(e.target.value) }} /> : <h3>{el.question}</h3>}
                                {active === el.question ? <div> <CloseOutlined className="iconantd" onClick={() => { setActive('') }} /> < CheckSquareOutlined className="iconantd" onClick={() => { editQuestion(value, "", el.id, "question") }} /> </div> : <EditOutlined className="iconantd" onClick={() => { setValue(el.question); setActive(el.question) }} />}
                            </div>

                            <div className='answer_box'>
                                <div className='answer_correct'>
                                    <h4>{LocalValue === "AM" ? "Ճիշտ պատասխան" : "Correct answer"}</h4>
                                    <div className='answer_text'>
                                        {active === el.correctAnswer ? <input type="text" value={value} onChange={(e) => { setValue(e.target.value) }} /> : <p>1.{el.correctAnswer}</p>}
                                        {active === el.correctAnswer ? <div> <CloseOutlined className="iconantd" onClick={() => { setActive('') }} /> < CheckSquareOutlined className="iconantd" onClick={() => { editQuestion(value, "", el.id, "correctAnswer") }} /> </div> : <EditOutlined className="iconantd" onClick={() => { setValue(el.correctAnswer); setActive(el.correctAnswer) }} />}
                                    </div>

                                </div>
                                <div className='answer_wrong'>
                                    <h4>{LocalValue === "AM" ? "Սխալ պատասխան" : "Incorrect answer"}</h4>
                                    <div className='answer_wrongtext'>
                                        {el.incorrectAnswer.map((elem: any, index: number) => <div>
                                            {active === elem ? <input type="text" value={value} onChange={(e) => { setValue(e.target.value) }} /> : <p>{index + 1}.{elem}</p>}
                                            {active === elem ? <div> <CloseOutlined className="iconantd" onClick={() => { setActive('') }} /> < CheckSquareOutlined className="iconantd" onClick={() => { editQuestion({ incorrectAnswer: value }, index, el.id, 'incorrectAnswer') }} /> </div> : <EditOutlined className="iconantd" onClick={() => { setValue(elem); setActive(elem) }} />}

                                        </div>)}
                                    </div>

                                </div>
                            </div>


                            <DeleteOutlined className="iconantd" onClick={() => deleteQuestion(el.id)} />
                        </div>)}
                    </div>}

                < PlusCircleFilled onClick={() => { setAdd(!add) }} />
                {add && <form className='addQuestion'>
                    { <p>{LocalValue === "AM" ? "Լրացնել բոլոր դաշտերը" : "Fill in all fields"}</p>}
                    <label htmlFor="">{LocalValue === "AM" ? "Հարց" : "Question"}  </label>
                    <input type="text" onChange={(e) => { setQuestion(e.target.value) }} />
                    <label htmlFor="">{LocalValue === "AM" ? "Ճիշտ պատասխան" : "Correct answer"}</label>
                    <input type="text" onChange={(e) => { setCorrectAnswer(e.target.value) }} />
                    <label htmlFor=""> {LocalValue === "AM" ? "Սխալ պատասխան" : "Incorrect answer"}</label>
                    <input type="text" onChange={(e) => { setIncorrectAnswer([e.target.value, incorrectAnswer[1], incorrectAnswer[2]]) }} />
                    <input type="text" onChange={(e) => { setIncorrectAnswer([incorrectAnswer[0], e.target.value, incorrectAnswer[2]]) }} />
                    <input type="text" onChange={(e) => { setIncorrectAnswer([incorrectAnswer[0], incorrectAnswer[1], e.target.value]) }} />
                    <button>
                        <CloseOutlined className="iconantd" onClick={() => { setAdd(false) }} />
                        <CheckSquareOutlined className="iconantd" onClick={(e) => { addQuestion(e) }} />
                    </button>
                </form>}
            </div>
        </>
    )
}