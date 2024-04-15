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
import axios from '../../axios/adminaxios';

let LocalValue: any;
if (localStorage.getItem("language")) {
    let local: any = localStorage.getItem("language");
    LocalValue = JSON?.parse(local);
}
const URL = process.env.REACT_APP_BASE_URL
export function LessonEdit() {
    let LocalValue: any;
    if (localStorage.getItem("language")) {
        let local: any = localStorage.getItem("language");
        LocalValue = JSON.parse(local);
    }
    const { Lesson, loading } = useAppSelector((state: any) => state.Lesson);
    const dispatch = useAppDispatch();
    const [editLesson, setEditLesson] = useState<any>()
    const [deleteState, setDeleteState] = useState([-1, ''])
    const [editInformation, setEditInformation] = useState('')
    const [editInformationID, setEditInformationID] = useState(-1)
    const [lectures, setLectures] = useState<any>([{ text: "", color: "" },])
    const [image, setImage] = useState("")
    const [indexElem, setIndexElem] = useState<any>('')
    const [colorQuestion, setColorQuestion] = useState({
        text: LocalValue === "AM" ? "Հարցաշար" : "Questions",
        color: ""
    })
    const [addLesson, setAddLesson] = useState<any>({
        lesson: "",
        icon: "",
        lectures: lectures,
    })
    const [showaddLectures, setShowAddLectures] = useState(false);
    const [showAddLec, setShowAddLec] = useState(false);
    const [addLecturesData, setAddLecturesData] = useState<any>({
        text: "",
        color: "",
    });
    const [createLec, setCreateLec] = useState({
        text: "",
        color: "",
    })


    const [add, setAdd] = useState(false)
    const [done, setDone] = useState(false);
    const [lessonName, setLessonName] = useState('');
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
                lectures: editLesson.lectures,
                unique_key: editLesson.unique_key
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
            const response = await axios.get(`${URL}aeroSpace/lessons/${LocalValue === "AM" ? "US":"AM"}`);
 
            
          let x = response.data.filter((el:any)=> el.id === editLesson.id)

    
            const newlec1 = x[0].lectures?.filter((el: any, i: number) => {
                if (indexElem !== i) {
                    return el
                }
            })
            console.log(newlec1,"editLesson");
            await axios.put(`${URL}aeroSpace/editExistLesson/${LocalValue === "AM" ? "US":"AM"}/${editLesson.unique_key}`, [{...editLesson, lectures:newlec1},editLesson.unique_key])
            await dispatch(getFetchLesson())
            setEditLesson({})
        }

    }
    async function uploadedImage(e: any) {
        await dispatch(uploadImageFunction(e, setImage))
    }
    async function DeleteLesson(id: number, title: string) {
        try {
            await DeleteAll({
                title: LocalValue === 'AM' ? "Ցանկանում եք ջնջե՞լ" : 'Do you want to delete?',
                text: LocalValue === 'AM' ? "Ջնջելու դեպքում վերականգնել չեք կարող" : 'If you delete it, you cannot restore it',
                deleteItem: () => dispatch(deleteLesson(id, title))


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
            lectures[0].text.trim()
            && lectures[0].color.trim()
            //  &&
            // lectures[1].text.trim() && lectures[1].color.trim() &&
            // lectures[2].text.trim() && lectures[2].color.trim() &&
            // lectures[3].text.trim() && lectures[3].color.trim() &&
            // lectures[4].text.trim() && lectures[4].color.trim()

        ) {


            let newLesson = {
                lesson: addLesson.lesson,
                icon: image,
                lectures: [...lectures, colorQuestion],

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
        setLectures([{ text: "", color: "" }])
        setAddLesson({
            lesson: "",
            icon: "",
            lectures: lectures,

        })
        setImage('')
        setAdd(false)
        setColorQuestion({
            text: LocalValue === "AM" ? "Հարցաշար" : "Question",
            color: ""
        })
    }
    function text(id: any, unique_key: any) {

        let item: any;
        Lesson.map((el: any) => {
            if (el.unique_key === unique_key) {
                item = el.lectures.length
            }
        })

        localStorage.setItem("lessons", JSON.stringify(unique_key))
        if ((item - 1) === id && done) {
            navigate("/EditQuiz")
        }
    }
    const clodeAddLectures = () => {
        setShowAddLectures(false);
        setImage("");
        setAddLecturesData({
            text: "",
            color: "",
        })
    }

    const addLectures = async () => {

        const rr = editLesson.lectures.slice(0, editLesson.lectures?.length - 1)



        rr.push(addLecturesData);
        rr.push(editLesson.lectures[editLesson.lectures?.length - 1]);

        const obj = {
            ...editLesson,
            lectures: rr
        }

        setEditLesson(obj);
        setShowAddLectures(false);
        setAddLecturesData({
            text: "",
            color: "",
        })
    }

    const createLectures = () => {
        setLectures([...lectures, createLec]);

        setShowAddLectures(false);
        // setColorQuestion({
        //     text: LocalValue === "AM" ? "Հարցաշար" : "Question",
        //     color: ""
        // });
        setCreateLec({ text: "", color: "", })
        setShowAddLec(false);



    }
    const closeCreatingLectures = () => {
        setShowAddLectures(false);
        setCreateLec({ text: "", color: "" })
        setColorQuestion({
            text: LocalValue === "AM" ? "Հարցաշար" : "Question",
            color: ""
        })
        setCreateLec({ text: "", color: "", });
        setShowAddLec(false)
    }

    const deleteAddedLecture = (state: any, index: number, setState: any) => {

        if (state.length > 2) {
            const newState = state.filter((el: any, i: number) => {
                if (i !== index) {
                    return el
                }
            });
            setState(newState)
        }
        setColorQuestion({
            text: LocalValue === "AM" ? "Հարցաշար" : "Question",
            color: ""
        });
        setCreateLec({ text: "", color: "", })

    }

    const  deleteAdL = async (elem: any, index: number) => {

        if (editLesson?.lectures?.length > 2) {

            const newlec = editLesson?.lectures?.filter((el: any, i: number) => {
                if (index !== i) {
                    return el
                }
            })
            setEditLesson({ ...editLesson, lectures: newlec })
        }
        setColorQuestion({
            text: LocalValue === "AM" ? "Հարցաշար" : "Question",
            color: ""
        });
        setCreateLec({ text: "", color: "", })
    
  setIndexElem(index)



    }

    return (<>
        {
            loading ?
                <Loading /> :
                <>
                    <div className='EditLesson_Component'>
                        {
                            Lesson?.map((el: any) =>
                                <div className='Lesson_option' key={el.id}>
                                    {editLesson?.id === el.id ? <>
                                        {!showaddLectures && <div className='Lesson_item' >
                                            <input type="text" value={editLesson.lesson} onChange={(e) => setEditLesson({
                                                lesson: e.target.value,
                                                background: editLesson.background,
                                                id: editLesson?.id,
                                                button: editLesson.button,
                                                color: editLesson.color,
                                                icon: editLesson.icon,
                                                iconka: editLesson.iconka,
                                                lectures: editLesson.lectures,
                                                unique_key: editLesson.unique_key
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
                                        </div>}
                                        <div className='Lesson_mini_map'>

                                            {
                                                !showaddLectures && editLesson?.lectures?.map((elem: any, index: number) => <div className="Lesson_mini_div">
                                                    <div key={index} className='Lesson_mini_item' style={{ background: elem.color }}>
                                                        {editLesson?.lectures?.length - 1 !== index ? <textarea value={elem.text} rows={5} onChange={(e) =>
                                                            setEditLesson({
                                                                lesson: editLesson.lesson,
                                                                background: editLesson.background,
                                                                id: editLesson.id,
                                                                button: editLesson.button,
                                                                color: editLesson.color,
                                                                icon: editLesson.icon,
                                                                iconka: editLesson.iconka,
                                                                unique_key: editLesson.unique_key,
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
                                                            :
                                                            <p>{LocalValue === "AM" ? "Հարցաշար" : "Question"}</p>

                                                        }
                                                        <input type="color" value={elem.color} onChange={(e) =>
                                                            setEditLesson({
                                                                lesson: editLesson.lesson,
                                                                background: editLesson.background,
                                                                id: editLesson.id,
                                                                button: editLesson.button,
                                                                color: editLesson.color,
                                                                icon: editLesson.icon,
                                                                iconka: editLesson.iconka,
                                                                unique_key: editLesson.unique_key,
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
                                                        {editLesson?.lectures?.length - 1 !== index && <button  className='Delete_button_Lesson' onClick={() => { deleteAdL(elem, index) }} ><DeleteOutlined /></button>}
                                                    </div>
                                                </div>)
                                            }
                                            {!showaddLectures ? <button className='save_button_Lesson' onClick={() => { setShowAddLectures(true) }} ><PlusCircleFilled /></button>
                                                : <div className="Lesson_mini_div" >

                                                    <div className='Lesson_mini_item' style={{ background: addLecturesData?.color }}>
                                                        <textarea value={addLecturesData.text} rows={5} onChange={(e) =>
                                                            setAddLecturesData({ ...addLecturesData, text: e.target.value })
                                                        } />
                                                        <input type="color" value={addLecturesData.color} onChange={(e) =>
                                                            setAddLecturesData({ ...addLecturesData, color: e.target.value })
                                                        } />
                                                    </div>

                                                    <button className='save_button_Lesson' onClick={() => { addLectures() }} ><CheckSquareOutlined /></button>
                                                    <button className='save_button_Lesson' onClick={() => { clodeAddLectures() }} ><CloseOutlined /></button>
                                                </div>
                                            }

                                            {!showaddLectures && <>
                                                <button className='save_button_Lesson' onClick={() => editLessons(el.lesson)}><CheckSquareOutlined /></button>
                                                <button className='save_button_Lesson' onClick={() => setEditLesson('')}><CloseOutlined /></button>
                                            </>}
                                        </div>
                                    </> :
                                        <>



                                            <div className='Lesson_item' >
                                                <p>{el?.lesson}</p>
                                                <img src={el?.icon} alt={'icon' + el.id} />

                                            </div>
                                            <div className='Lesson_mini_map'>
                                                {
                                                    el?.lectures?.map((elem: any, index: number) =>
                                                        <div key={index} className='Lesson_mini_div'>
                                                            {el?.lectures?.length-1 !== index ?<div className='Lesson_mini_item' style={{ background: elem.color }}>
                                                              <p>  {elem.text}</p>
                                                            </div>: <div className='Lesson_mini_item' style={{ background: elem.color }}>
                                                            <p>{LocalValue === "AM" ? "Հարցաշար" : "Question"}</p>
                                                            </div>}
                                                            
                                                            <div className='Editmini_leson' style={{ background: elem.color }}
                                                                onClick={() => {
                                                                    setEditInformation(el.unique_key); setEditInformationID(index); text(index, el.unique_key); setLessonName(el.lesson)
                                                                }}>
                                                                <p>{LocalValue === "AM" ? "Փոփոխել ներքին նյութերը" : "Modify internal materials"} <EditOutlined /></p>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                                <div>
                                                    <button className='Edit_button_Lesson' onClick={() => setEditLesson(el)}><EditOutlined /></button>
                                                    <button className='Delete_button_Lesson' onClick={() => DeleteLesson(el.id, el.unique_key)}><DeleteOutlined /></button></div>
                                            </div></>}

                                </div>)
                        }
                    </div>
                    <div className="AddLesson_component">
                        <button className='AddLesson_button'><PlusCircleFilled onClick={() => { setAdd(!add); }} /></button>
                        {add &&  <div className="AddLesson_div">
                           {!showAddLec&& <div className='Lesson_item' >
                                <label htmlFor="">{LocalValue === "AM" ? "Դասընթացի անվանումը" : "Lessone name"}</label>
                                <input type="text" value={addLesson.lesson} onChange={(e) => {
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
                            </div>}
                            {!showAddLec&& <div className='Lesson_mini_map'>
                                  <div className='addLec'>
                                {
                                    lectures?.map((elem: any, i: any) =>
                                        <div key={i} className='Lesson_mini_item' style={{ background: elem?.color }}>
                                            <label htmlFor="">{LocalValue === "AM" ? "Թեմայի անվանումը" : "Theme Name"}</label>
                                            <input type="text" value={elem?.text} onChange={(e) => editLecturess(e, i, "text")
                                            } />
                                            <label htmlFor="">{LocalValue === "AM" ? "Դաշտի գույնը" : "The color of the field"}</label>
                                            <input type="color" value={elem?.color} onChange={(e) => editLecturess(e, i, "color")} />
                                            <button onClick={() => { deleteAddedLecture(lectures, i, setLectures) }} ><DeleteOutlined /></button>
                                        </div>)
                                }
                                <div className='Lesson_mini_item' style={{ background: colorQuestion?.color }}>
                                    <p>{colorQuestion.text}</p>
                                    <label htmlFor="">{LocalValue === "AM" ? "Դաշտի գույնը" : "The color of the field"}</label>
                                    <input type="color" value={colorQuestion?.color} onChange={(e) => { setColorQuestion({ ...colorQuestion, color: e.target.value }) }} />
                                </div>
                                </div>
                            </div>}
                            {!showAddLec ? <button className='save_button_Lesson' onClick={() => { setShowAddLec(true) }} ><PlusCircleFilled /></button>
                                :
                                <div className='addLec1'>
                                    <div className='Lesson_mini_item' style={{ background: createLec?.color }}>
                                        <label htmlFor="">{LocalValue === "AM" ? "Թեմայի անվանումը" : "Theme Name"}</label>
                                        <input type="text" value={createLec.text} onChange={(e) => setCreateLec({ ...createLec, text: e.target.value })
                                        } />
                                        <label htmlFor="">{LocalValue === "AM" ? "Դաշտի գույնը" : "The color of the field"}</label>
                                        <input type="color" value={createLec.color} onChange={(e) => setCreateLec({ ...createLec, color: e.target.value })} />
                                    </div>
                                    <button className='Edit_button_Lesson' onClick={() => { createLectures() }} ><CheckSquareOutlined /></button>
                                    <button className='Delete_button_Lesson' onClick={() => { closeCreatingLectures() }} ><CloseOutlined /></button>
                                </div>
                            }
                            {!showAddLec && <div className='btn_box'>
                                <CheckSquareOutlined className='iconantd' onClick={() => { addLessons() }
                                } />
                                < CloseOutlined className='iconantd' onClick={() => { setfalse() }} />
                            </div>}
                        </div>}
                    </div>
                    {/* {deleteState[0] !== -1 && <RemoveItem deleteItem={DeleteLesson} name={'lesson'} setDeletePage={setDeleteState} id={deleteState} />} */}
                    {editInformation && <EditInformation name={lessonName} title={editInformation} indexing={editInformationID} setEditInformation={setEditInformation} setEditInformationID={setEditInformationID} />}
                </>}
    </>
    )
}