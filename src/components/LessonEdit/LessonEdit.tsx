/*eslint-disable*/
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import './LessonEdit.scss'
import { useNavigate } from 'react-router-dom';
import { uploadImageFunction, getFetchLesson, editLessonAction, deleteLesson, addnewLesson } from '../../store/action/LessonAction';
import { Loading } from '../Loading';
import { EditOutlined, CheckSquareOutlined, PlusCircleFilled, CloudDownloadOutlined, DeleteOutlined, CloseOutlined, } from '@ant-design/icons'
import { RemoveItem } from '../removeItem';
import { EditInformation } from './EditInformation';
import Swal from 'sweetalert2';
import DeleteAll from '../DeleteComponent';
let LocalValue: any;
if (localStorage.getItem("language")) {
    let local: any = localStorage.getItem("language");
    LocalValue = JSON?.parse(local);
}

export function LessonEdit() {
    const { Lesson, loading } = useAppSelector((state) => state.Lesson);
    const dispatch = useAppDispatch();
    const [editLesson, setEditLesson] = useState<any>()
    const [deleteState, setDeleteState] = useState([-1, ''])
    const [editInformation, setEditInformation] = useState('')
    const [editInformationID, setEditInformationID] = useState(-1)
    const [lectures, setLectures] = useState<any>([{ text: "", color: "" }, { text: "", color: "" }, { text: "", color: "" }, { text: "", color: "" }, { text: "", color: "" }])
    const [image, setImage] = useState("")
    const [addLesson, setAddLesson] = useState<any>({
        lesson: "",
        icon: "",
        lectures: lectures,
    })
    let LocalValue: any;
    if (localStorage.getItem("language")) {
        let local: any = localStorage.getItem("language");
        LocalValue = JSON.parse(local);
    }

    const [add, setAdd] = useState(false)
    const [done, setDone] = useState(false);
    const sesion = sessionStorage.getItem("done")
    const navigate = useNavigate()
    useEffect(() => {
        if (sesion) {
            setDone(JSON.parse(sesion))
        }
    }, [sesion])

    useEffect(() => {
        dispatch(getFetchLesson())

    }, [dispatch])
    useEffect(() => {

        if (image !== undefined && image !== null && image && image.length && !add) {
            setEditLesson({
                lesson: editLesson.lesson,
                background: editLesson.background,
                id: editLesson?.id,
                button: editLesson.button,
                color: editLesson.color,
                icon: image,
                iconka: editLesson.iconka,
                lectures: editLesson.lectures
            })
            setImage('')
        }
    }, [image])
    async function editLessons(lesson: string) {
        let errorLectures = false
        editLesson?.lectures.map((el: any) => {
            if (el.text === '') {
                errorLectures = true
            }
        })
        if (errorLectures || !editLesson?.lesson?.trim() || !editLesson?.icon?.trim()) {
            Swal.fire({
                title: (LocalValue === "AM" ? 'չի կարող դատարկ լինել' : "cannot be empty"),
                icon: 'error',
                confirmButtonText: (LocalValue === "AM" ? 'Լավ' : "OK")
            })
        }
        else {
            await dispatch(editLessonAction(editLesson.id, editLesson, lesson))
            await dispatch(getFetchLesson())
            setEditLesson({})
        }

    }
    async function uploadedImage(e: any) {
        await dispatch(uploadImageFunction(e, setImage))
    }

   


    async function DeleteLesson(id: number,title:string) {
        try {
            await DeleteAll({
                title: LocalValue === 'AM' ? "Ցանկանում եք ջնջե՞լ" : 'Do you want to delete?',
                text: LocalValue === 'AM' ? "Ջնջելու դեպքում վերականգնել չեք կարող" : 'If you delete it, you cannot restore it',
                deleteItem: () => dispatch(deleteLesson(id,title))
                
                
            });

        } catch (error) {
            console.error(error);

        }

    }



    async function editLecturess(e: any, i: number, par: any) {

        if (par === "text") {
            setLectures(lectures?.map((element: any, idx: number) => {
                if (i === idx) {
                    let newaa = {
                        color: element?.color,
                        text: e.target.value
                    };
                    element = newaa;
                    return element
                }

                return element;

            }))
        } else {
            setLectures(lectures?.map((element: any, idx: number) => {
                if (i === idx) {
                    let newaa = {
                        text: element?.text,
                        color: e.target.value
                    };
                    element = newaa;
                    return element
                }

                return element;

            }))

        }

        
        // setLectures(lectures)        
        
    }
    
    async function addLessons() {
        if (image.length > 0 
            && addLesson?.lesson?.trim() &&
            lectures[0].text.trim() && lectures[0].color.trim() &&
            lectures[1].text.trim() && lectures[1].color.trim() &&
            lectures[2].text.trim() && lectures[2].color.trim() &&
            lectures[3].text.trim() && lectures[3].color.trim() &&
            lectures[4].text.trim() && lectures[4].color.trim()) {
                
                
            let newLesson={
                lesson: addLesson.lesson,
                icon: image,
                lectures: lectures,

            }

            if (newLesson.icon) {
                await dispatch(addnewLesson(newLesson))
            } else {
                newLesson.icon = image
                await dispatch(addnewLesson(newLesson))
            }
            await dispatch(getFetchLesson());

            await setfalse()

        } else {
            Swal.fire({
                title: LocalValue === "AM" ? 'չի կարող դատարկ լինել' : "cannot be empty",
                icon: 'error',
                confirmButtonText: (LocalValue === "AM" ? 'Լավ' : "OK")
            })
        }
    }
    async function setfalse() {
        setLectures([{ text: "", color: "" }, { text: "", color: "" }, { text: "", color: "" }, { text: "", color: "" }, { text: "", color: "" }])
        setAddLesson({
            lesson: "",
            icon: "",
            lectures: lectures,

        })
        setImage('')
        setAdd(false)
    }
    function text(id: any, lesson: any) {

        localStorage.setItem("lessons", JSON.stringify(lesson))
        if ((lectures.length - 1) === id && done) {
            navigate("/EditQuiz")
        }
    }


    



    return (<>
        {
            loading ?
                <Loading /> :
                <>
                    <div className='EditLesson_Component'>
                        {
                            Lesson?.map((el) =>
                                <div className='Lesson_option' key={el.id}>
                                    {editLesson?.id === el.id ? <>
                                        <div className='Lesson_item' >
                                            <input type="text" value={editLesson.lesson} onChange={(e) => setEditLesson({
                                                lesson: e.target.value,
                                                background: editLesson.background,
                                                id: editLesson?.id,
                                                button: editLesson.button,
                                                color: editLesson.color,
                                                icon: editLesson.icon,
                                                iconka: editLesson.iconka,
                                                lectures: editLesson.lectures
                                            })} />
                                            <img src={editLesson?.icon} alt={'icon' + el.id} />
                                            <div className="uploadImage">
                                                <label htmlFor="files_Lesson" >{LocalValue === "AM" ? "Ներբեռնել նոր նկար" : "Upload a new image"}<CloudDownloadOutlined /></label>
                                                <input
                                                    value={""}
                                                    type="file"
                                                    onChange={(e) => { setImage(""); uploadedImage(e) }}
                                                    accept="image/*"
                                                    id="files_Lesson"
                                                    name="files_Lesson"
                                                    style={{ display: "none" }}
                                                />
                                            </div>
                                        </div>
                                        <div className='Lesson_mini_map'>

                                            {
                                                editLesson?.lectures?.map((elem: any, index: number) => <div className="Lesson_mini_div">
                                                    <div key={index} className='Lesson_mini_item' style={{ background: elem.color }}>
                                                        <textarea value={elem.text} rows={5} onChange={(e) =>
                                                            setEditLesson({
                                                                lesson: editLesson.lesson,
                                                                background: editLesson.background,
                                                                id: editLesson.id,
                                                                button: editLesson.button,
                                                                color: editLesson.color,
                                                                icon: editLesson.icon,
                                                                iconka: editLesson.iconka,
                                                                lectures: editLesson?.lectures?.map((element: any, idx: number) => {
                                                                    if (index === idx) {
                                                                        let newaa = {
                                                                            color: element?.color,
                                                                            text: e.target.value
                                                                        };
                                                                        element = newaa;
                                                                        return element
                                                                    }

                                                                    return element;

                                                                })
                                                            })
                                                        } />
                                                        <input type="color" value={elem.color} onChange={(e) =>
                                                            setEditLesson({
                                                                lesson: editLesson.lesson,
                                                                background: editLesson.background,
                                                                id: editLesson.id,
                                                                button: editLesson.button,
                                                                color: editLesson.color,
                                                                icon: editLesson.icon,
                                                                iconka: editLesson.iconka,
                                                                lectures: editLesson?.lectures?.map((element: any, idx: number) => {
                                                                    if (index === idx) {
                                                                        let newaa = {
                                                                            text: element?.text,
                                                                            color: e.target.value
                                                                        };
                                                                        element = newaa;
                                                                        return element
                                                                    }

                                                                    return element;

                                                                })
                                                            })
                                                        } />
                                                    </div>
                                                </div>)
                                            }

                                            <button className='save_button_Lesson' onClick={() => editLessons(el.lesson)}><CheckSquareOutlined /></button>
                                            <button className='save_button_Lesson' onClick={() => setEditLesson('')}><CloseOutlined /></button>
                                        </div>
                                    </> :
                                        <>



                                            <div className='Lesson_item' >
                                                <p>{el?.lesson}</p>
                                                <img src={el?.icon} alt={'icon' + el.id} />

                                            </div>
                                            <div className='Lesson_mini_map'>

                                                {
                                                    el?.lectures.map((elem: any, index: number) =>
                                                        <div key={index} className='Lesson_mini_div'>
                                                            <div className='Lesson_mini_item' style={{ background: elem.color }}>
                                                                {elem.text}
                                                            </div>
                                                            <div className='Editmini_leson' style={{ background: elem.color }}
                                                                onClick={() => {
                                                                    setEditInformation(el.lesson); setEditInformationID(index); text(index, el.lesson);
                                                                }}>
                                                                <p>{LocalValue === "AM" ? "Փոփոխել ներքին նյութերը" : "Modify internal materials"} <EditOutlined /></p>
                                                            </div>
                                                        </div>)
                                                }
                                                <div>
                                                    <button className='Edit_button_Lesson' onClick={() => setEditLesson(el)}><EditOutlined /></button>
                                                    <button className='Delete_button_Lesson' onClick={() => DeleteLesson(el.id,el.lesson)}><DeleteOutlined /></button></div>
                                            </div></>}

                                </div>)
                        }
                    </div>
                    <div className="AddLesson_component">
                        <button className='AddLesson_button'><PlusCircleFilled onClick={() => { setAdd(!add); }} /></button>
                        {add && <div className="AddLesson_div">
                            <div className='Lesson_item' >
                                <label htmlFor="">{LocalValue === "AM" ? "Դասընթացի անվանումը" : "Lessone name"}</label>
                                <input type="text" onChange={(e) => {
                                    setAddLesson({
                                        lesson: e.target.value,
                                        icon: addLesson.icon,
                                        lectures: addLesson.lectures,
                                    })
                                }} />
                                {image && <img src={image} alt="" />}
                                <div className="uploadImage">
                                    <label htmlFor="files_Lesson" style={{ color: "#FFFFFF" }}>{LocalValue === "AM" ? "Ներբեռնել նոր նկար" : "Upload a new image"} <CloudDownloadOutlined /></label>
                                    <input
                                        value={""}
                                        type="file"
                                        onChange={(e) => { setImage(""); uploadedImage(e) }}
                                        accept="image/*"
                                        id="files_Lesson"
                                        name="files_Lesson"
                                        style={{ display: "none" }}
                                    />
                                </div>

                            </div>
                            <div className='Lesson_mini_map'>

                                {

                                    lectures?.map((elem: any, i: any) =>
                                        <div key={i} className='Lesson_mini_item' style={{ background: elem?.color }}>
                                            <label htmlFor="">{LocalValue === "AM" ? "Թեմայի անվանումը" : "Theme Name"}</label>
                                            <input type="text" onChange={(e) => editLecturess(e, i, "text")
                                            } />
                                            <label htmlFor="">{LocalValue === "AM" ? "Դաշտի գույնը" : "The color of the field"}</label>
                                            <input type="color" value={elem?.color} onChange={(e) => editLecturess(e, i, "color")} />
                                        </div>)
                                }

                            </div>
                            <div className='btn_box'>
                                <CheckSquareOutlined className='iconantd' onClick={() => { addLessons() }
                                } />
                                < CloseOutlined className='iconantd' onClick={() => { setfalse() }} />
                            </div>

                        </div>}
                    </div>
                    {/* {deleteState[0] !== -1 && <RemoveItem deleteItem={DeleteLesson} name={'lesson'} setDeletePage={setDeleteState} id={deleteState} />} */}
                    {editInformation && <EditInformation title={editInformation} indexing={editInformationID} setEditInformation={setEditInformation} />}
                </>}
    </>
    )
}