/*eslint-disable */
import './EditInformation.scss'
import { useEffect, useState } from 'react'
import { getFetchSlides, uploadImageFunction, editLessonSlides, addTopics } from '../../../store/action/LessonAction'
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { DeleteOutlined, CloudDownloadOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { Loading } from '../../Loading';
import { fetchDelete } from '../../../store/slice/SlideSlice';

export const EditInformation = ({name, title, indexing, setEditInformation,setEditInformationID }: {name:string, title: string, indexing: number, setEditInformation: (text: string) => void,setEditInformationID: (text: number) => void }) => {
    
    const { Slide, loading } = useAppSelector((state) => state.Slide);
    const [slideState, setSlideState] = useState<any>()
    const [loadingSlide, setLoadingSlide] = useState(true)
    const [image, setImage] = useState("")
    const [imageHome, setImageHome] = useState("")
    const [imageMargin, setImageMarrgin] = useState("")
    const [imageSlides, setImageSlides] = useState("")
    const [addImageArr, setAddImageArr] = useState("")
    const [addImageMargin, setAddImageMargin] = useState("")
    const [addImageSlide, setAddImageSlide] = useState("")
    const [valueArr, setValueArr] = useState('')
    const [valueMargin, setValueMargin] = useState('')
    const [index, setIndex] = useState(-1)
    const [newSlide, setNewSlide] = useState(false)
    const dispatch = useAppDispatch()

    let LocalValue:any;
    
    if(localStorage.getItem("language")){
        let local:any = localStorage.getItem("language");
        LocalValue = JSON.parse(local);  
    }
    useEffect(() => {
        
        dispatch(getFetchSlides(title))
    }, [dispatch])

    useEffect(() => {
        if (Slide?.length && !slideState?.id) {
            Slide?.map((el, index) => {
                if (index === indexing) {
                    setSlideState(el)
                    setLoadingSlide(loading)
                    setNewSlide(false)
                }
            })

        }
        else if (!Slide?.length && slideState === undefined) {
            setSlideState({
                lesson: name,
            })
            setLoadingSlide(loading)
            setNewSlide(true)
        }
    }, [Slide, slideState])

    useEffect(() => {
        if (image !== undefined && image !== null && image && image.length) {
            setSlideState({
                id: slideState.id,
                button: slideState?.button,
                image: slideState.image,
                lectures: slideState?.lectures,
                lesson: slideState.lesson,
                slides: slideState.slides,
                text1: slideState.text1,
                text2: slideState.text2,
                text3: slideState.text3,
                text_arr_margin: slideState.text_arr_margin,
                text_arr: slideState.text_arr.map((element: any, ind: number) => {
                    if (index === ind) {
                        let newelem = image
                        return newelem
                    }
                    return element
                })
            })

            setImage('')
            setIndex(-1)
        }
    }, [image, index])
    useEffect(() => {
        if (imageMargin !== undefined && imageMargin !== null && imageMargin && imageMargin.length) {
            setSlideState({
                id: slideState.id,
                button: slideState?.button,
                image: slideState.image,
                lectures: slideState?.lectures,
                lesson: slideState.lesson,
                slides: slideState.slides,
                text1: slideState.text1,
                text2: slideState.text2,
                text3: slideState.text3,
                text_arr: slideState.text_arr,
                text_arr_margin: slideState.text_arr_margin.map((element: any, ind: number) => {
                    if (index === ind) {
                        let newelem = imageMargin
                        return newelem
                    }
                    return element
                })
            })

            setImageMarrgin('')
            setIndex(-1)
        }
    }, [imageMargin, index])
    useEffect(() => {
        if (imageSlides !== undefined && imageSlides !== null && imageSlides && imageSlides.length) {
            setSlideState({
                id: slideState.id,
                button: slideState?.button,
                image: slideState.image,
                lectures: slideState?.lectures,
                lesson: slideState.lesson,
                slides: slideState.slides.map((element: any, ind: number) => {
                    if (index === ind) {
                        let newelem = imageSlides
                        return newelem
                    }
                    return element
                }),
                text1: slideState.text1,
                text2: slideState.text2,
                text3: slideState.text3,
                text_arr: slideState.text_arr,
                text_arr_margin: slideState.text_arr_margin
            })

            setImageSlides('')
            setIndex(-1)

        }
    }, [imageSlides, index])
    useEffect(() => {
        if (imageHome !== undefined && imageHome !== null && imageHome && imageHome.length) {
            setSlideState({
                id: slideState.id,
                button: slideState?.button,
                image: imageHome,
                lectures: slideState?.lectures,
                lesson: slideState.lesson,
                slides: slideState.slides,
                text1: slideState.text1,
                text2: slideState.text2,
                text3: slideState.text3,
                text_arr: slideState.text_arr,
                text_arr_margin: slideState.text_arr_margin
            })

            setImageHome('')
            setIndex(-1)
        }
    }, [imageHome])
    useEffect(() => {
        if (addImageArr !== undefined && addImageArr !== null && addImageArr && addImageArr.length) {
            let newArr;
            if (slideState?.text_arr) {
                newArr = [...slideState?.text_arr]
                newArr.push(addImageArr)

            } else {
                newArr = [addImageArr]

            }
            setSlideState({
                id: slideState.id,
                button: slideState?.button,
                image: slideState.image,
                lectures: slideState?.lectures,
                lesson: slideState.lesson,
                slides: slideState.slides,
                text1: slideState.text1,
                text2: slideState.text2,
                text3: slideState.text3,
                text_arr: newArr,
                text_arr_margin: slideState.text_arr_margin
            })

            setAddImageArr('')
        }
    }, [addImageArr])
    useEffect(() => {
        if (addImageMargin !== undefined && addImageMargin !== null && addImageMargin && addImageMargin.length) {
            let newArr;
            if (slideState?.text_arr_margin) {
                newArr = [...slideState?.text_arr_margin]
                newArr.push(addImageMargin)

            } else {
                newArr = [addImageMargin]

            }
            setSlideState({
                id: slideState.id,
                button: slideState?.button,
                image: slideState.image,
                lectures: slideState?.lectures,
                lesson: slideState.lesson,
                slides: slideState.slides,
                text1: slideState.text1,
                text2: slideState.text2,
                text3: slideState.text3,
                text_arr: slideState.text_arr,
                text_arr_margin: newArr
            })

            setAddImageMargin('')
        }
    }, [addImageMargin])
    useEffect(() => {
        if (addImageSlide !== undefined && addImageSlide !== null && addImageSlide && addImageSlide.length) {
            let newArr;
            if (slideState?.slides) {
                newArr = [...slideState?.slides]
                newArr.push(addImageSlide)

            } else {
                newArr = [addImageMargin]

            }
            setSlideState({
                id: slideState.id,
                button: slideState?.button,
                image: slideState.image,
                lectures: slideState?.lectures,
                lesson: slideState.lesson,
                slides: newArr,
                text1: slideState.text1,
                text2: slideState.text2,
                text3: slideState.text3,
                text_arr: slideState.text_arr,
                text_arr_margin: slideState.text_arr_margin
            })

            setAddImageSlide('')
        }
    }, [addImageSlide])

    async function uploadedImage(e: any, setImg: (image: string) => void) {
        await dispatch(uploadImageFunction(e, setImg))
    }
    function DeleteImageSlides(id: number) {
        setSlideState({
            id: slideState.id,
            button: slideState?.button,
            image: slideState.image,
            lectures: slideState?.lectures,
            lesson: slideState.lesson,
            slides: slideState.slides.filter((element: any, ind: number) => ind !== id),
            text1: slideState.text1,
            text2: slideState.text2,
            text3: slideState.text3,
            text_arr: slideState.text_arr,
            text_arr_margin: slideState.text_arr_margin
        })
    }
    function DeleteImageArr(id: number) {
        setSlideState({
            id: slideState.id,
            button: slideState?.button,
            image: slideState.image,
            lectures: slideState?.lectures,
            lesson: slideState.lesson,
            slides: slideState.slides,
            text1: slideState.text1,
            text2: slideState.text2,
            text3: slideState.text3,
            text_arr: slideState.text_arr.filter((element: any, ind: number) => ind !== id),
            text_arr_margin: slideState.text_arr_margin
        })
    }
    function DeleteImageMargin(id: number) {
        setSlideState({
            id: slideState.id,
            button: slideState?.button,
            image: slideState.image,
            lectures: slideState?.lectures,
            lesson: slideState.lesson,
            slides: slideState.slides,
            text1: slideState.text1,
            text2: slideState.text2,
            text3: slideState.text3,
            text_arr: slideState.text_arr,
            text_arr_margin: slideState.text_arr_margin.filter((element: any, ind: number) => ind !== id)
        })
    }
    function AddValueArr() {
        let newArr;
        if (slideState?.text_arr) {
            newArr = [...slideState?.text_arr]
            newArr.push(valueArr)

        } else {
            newArr = [valueArr]

        }
        setSlideState({
            id: slideState.id,
            button: slideState?.button,
            image: slideState.image,
            lectures: slideState?.lectures,
            lesson: slideState.lesson,
            slides: slideState.slides,
            text1: slideState.text1,
            text2: slideState.text2,
            text3: slideState.text3,
            text_arr: newArr,
            text_arr_margin: slideState.text_arr_margin
        })

        setValueArr('')
    }
    function AddValueMargin() {
        let newArr;
        if (slideState?.text_arr_margin) {
            newArr = [...slideState?.text_arr_margin]
            newArr.push(valueMargin)

        } else {
            newArr = [valueMargin]

        }

        setSlideState({
            id: slideState.id,
            button: slideState?.button,
            image: slideState.image,
            lectures: slideState?.lectures,
            lesson: slideState.lesson,
            slides: slideState.slides,
            text1: slideState.text1,
            text2: slideState.text2,
            text3: slideState.text3,
            text_arr: slideState.text_arr,
            text_arr_margin: newArr
        })

        setValueMargin('')
    }
    async function saveChangeSlides() {
        let newArr = slideState.text_arr ? slideState.text_arr.filter((el: any) => el.trim() !== '') : slideState.text_arr
        let newArrMargin = slideState.text_arr_margin ? slideState.text_arr_margin.filter((el: any) => el.trim() !== '') : slideState.text_arr_margin
        const newState = {
            id: slideState.id,
            button: slideState?.button,
            image: slideState.image,
            lectures: slideState?.lectures,
            lesson: slideState.lesson,
            slides: slideState.slides,
            text1: slideState.text1,
            text2: slideState.text2,
            text3: slideState.text3,
            text_arr: newArr,
            text_arr_margin: newArrMargin
        }
        await dispatch(editLessonSlides(newState?.id, newState))
        await dispatch(getFetchSlides(title))
        setEditInformation('')
    }
    async function saveNewSlides() {
        const newState = {
            button: ["Հետ","Առաջ","Հետ դեպի հարցաշար"],
            image: slideState.image||null,
            lectures: slideState?.lectures||null,
            lesson: slideState.lesson||null,
            slides: slideState.slides||null,
            text1: slideState.text1||null,
            text2: slideState.text2||null,
            text3: slideState.text3||null,
            text_arr: slideState.text_arr||null,
            text_arr_margin: slideState.text_arr_margin||null,
            unique_key:title
        }
        
        await dispatch(addTopics(newState))
        await dispatch(getFetchSlides(title))
        setEditInformation('')
        setSlideState({})
    }

    return (<>{
        loadingSlide ? <Loading /> :

            <div className='EditInformation'>
                {
                    !slideState ? <div>loading...</div> :

                        <div className='EditInformation_div'>

                            <div >
                                <input type="text" placeholder={LocalValue==="AM"?'Ներմուծել վերնագիր':"Import title"} value={slideState?.lectures} style={{ fontSize: '20px' }} onChange={(e) =>
                                    setSlideState({
                                        id: slideState.id,
                                        button: slideState?.button,
                                        image: slideState.image,
                                        lectures: e.target.value,
                                        lesson: slideState.lesson,
                                        slides: slideState.slides,
                                        text1: slideState.text1,
                                        text2: slideState.text2,
                                        text3: slideState.text3,
                                        text_arr: slideState.text_arr,
                                        text_arr_margin: slideState.text_arr_margin
                                    })
                                } />
                                <hr />
                                {<textarea cols={10} placeholder={LocalValue==="AM"?'Ներմուծել վերնագիր':"Import title"} value={slideState.text1} onChange={(e) =>
                                    setSlideState({
                                        id: slideState.id,
                                        button: slideState?.button,
                                        image: slideState.image,
                                        lectures: slideState.lectures,
                                        lesson: slideState.lesson,
                                        slides: slideState.slides,
                                        text1: e.target.value,
                                        text2: slideState.text2,
                                        text3: slideState.text3,
                                        text_arr: slideState.text_arr,
                                        text_arr_margin: slideState.text_arr_margin
                                    })
                                } />}
                                <hr />
                                {<div className='imageDiv' ><img className='inputImage' src={slideState.image} alt="" />
                                    <div className="uploadImage">
                                        <label htmlFor="files_Lesson1" ><CloudDownloadOutlined /></label>
                                        <input
                                            value={""}
                                            type="file"
                                            onChange={(e) => { setImageHome(""); uploadedImage(e, setImageHome) }}
                                            accept="image/*"
                                            id="files_Lesson1"
                                            name="files_Lesson1"
                                            style={{ display: "none" }}
                                        />
                                        <DeleteOutlined onClick={() => {
                                            setSlideState({
                                                id: slideState.id,
                                                button: slideState?.button,
                                                image: '',
                                                lectures: slideState.lectures,
                                                lesson: slideState.lesson,
                                                slides: slideState.slides,
                                                text1: slideState.text1,
                                                text2: slideState.text2,
                                                text3: slideState.text3,
                                                text_arr: slideState.text_arr,
                                                text_arr_margin: slideState.text_arr_margin
                                            })
                                        }} className="deleteImages" />

                                    </div></div>}
                                <hr />
                                {<textarea placeholder={LocalValue==="AM"?'Ներմուծել վերնագիր':"Import title"} value={slideState.text2} onChange={(e) =>
                                    setSlideState({
                                        id: slideState.id,
                                        button: slideState?.button,
                                        image: slideState.image,
                                        lectures: slideState.lectures,
                                        lesson: slideState.lesson,
                                        slides: slideState.slides,
                                        text1: slideState.text1,
                                        text2: e.target.value,
                                        text3: slideState.text3,
                                        text_arr: slideState.text_arr,
                                        text_arr_margin: slideState.text_arr_margin
                                    })
                                } />}
                                <hr />
                                <div>
                                    {
                                        slideState?.text_arr?.map((elem: any, index: number) => {
                                            if (elem?.includes('http')) {
                                                return <div className='imageDiv' ><img key={index} src={elem} alt="nkar" />
                                                    <div className="uploadImage">
                                                        <label htmlFor="files_Lesson2" onClick={() => { setIndex(index) }} ><CloudDownloadOutlined /></label>
                                                        <input
                                                            value={""}
                                                            type="file"
                                                            onChange={(e) => { setImage(""); uploadedImage(e, setImage) }}
                                                            accept="image/*"
                                                            id="files_Lesson2"
                                                            name="files_Lesson2"
                                                            style={{ display: "none" }}
                                                        />
                                                        <DeleteOutlined onClick={() => { DeleteImageArr(index) }} className="deleteImages" />

                                                    </div></div>
                                            } else {
                                                return <textarea value={elem} onChange={(e) =>
                                                    setSlideState({
                                                        id: slideState.id,
                                                        button: slideState?.button,
                                                        image: slideState.image,
                                                        lectures: slideState?.lectures,
                                                        lesson: slideState.lesson,
                                                        slides: slideState.slides,
                                                        text1: slideState.text1,
                                                        text2: slideState.text2,
                                                        text3: slideState.text3,
                                                        text_arr: slideState.text_arr.map((element: any, ind: number) => {
                                                            if (index === ind) {
                                                                let newelem = e.target.value
                                                                return newelem
                                                            }
                                                            return element
                                                        }),
                                                        text_arr_margin: slideState.text_arr_margin
                                                    })
                                                } />
                                            }

                                        })
                                    }
                                    <div>
                                        <div className="addTextArr">
                                            <textarea value={valueArr} onChange={(e) => setValueArr(e.target.value)} placeholder={LocalValue==="AM"?'Ավելացնել տեքստ':"Add text"} />
                                            <div className="saveCancle">

                                                < CloseOutlined className='CloseOutlined' onClick={() => setValueArr('')} />
                                                < CheckOutlined onClick={() => AddValueArr()} />
                                            </div>
                                        </div>
                                        <label htmlFor="files_Lesson3" className='uploadImage_Add_label'  >
                                            <div className="uploadImage_Add" >
                                                <CloudDownloadOutlined />
                                                <input
                                                    value={""}
                                                    type="file"
                                                    onChange={(e) => { setAddImageArr(""); uploadedImage(e, setAddImageArr) }}
                                                    accept="image/*"
                                                    id="files_Lesson3"
                                                    name="files_Lesson3"
                                                    style={{ display: "none" }}
                                                />
                                            </div>
                                        </label>
                                    </div>
                                </div>
                                <hr />
                                <div >
                                    {
                                        slideState?.text_arr_margin?.map((elem: any, index: number) => {
                                            if (elem?.includes('http')) {
                                                return <div className='imageDiv' key={index} > <img src={elem} alt='nkar' />
                                                    <div className="uploadImage">
                                                        <label htmlFor="files_Lesson4" onClick={() => { setIndex(index) }} ><CloudDownloadOutlined /></label>
                                                        <input
                                                            value={""}
                                                            type="file"
                                                            onChange={(e) => { setImageMarrgin(""); uploadedImage(e, setImageMarrgin) }}
                                                            accept="image/*"
                                                            id="files_Lesson4"
                                                            name="files_Lesson4"
                                                            style={{ display: "none" }}
                                                        />

                                                        <DeleteOutlined onClick={() => { DeleteImageMargin(index) }} className="deleteImages" />
                                                    </div></div>
                                            } else {
                                                return <textarea key={index} value={elem} onChange={(e) =>
                                                    setSlideState({
                                                        id: slideState.id,
                                                        button: slideState?.button,
                                                        image: slideState.image,
                                                        lectures: slideState?.lectures,
                                                        lesson: slideState.lesson,
                                                        slides: slideState.slides,
                                                        text1: slideState.text1,
                                                        text2: slideState.text2,
                                                        text3: slideState.text3,
                                                        text_arr: slideState.text_arr,
                                                        text_arr_margin: slideState.text_arr_margin.map((element: any, ind: number) => {
                                                            if (index === ind) {
                                                                let newelem = e.target.value
                                                                return newelem
                                                            }
                                                            return element
                                                        })
                                                    })
                                                } />
                                            }
                                        })
                                    }
                                    <div>
                                        <div className="addTextArr">
                                            <textarea value={valueMargin} onChange={(e) => setValueMargin(e.target.value)} placeholder={LocalValue==="AM"?'Ավելացնել տեքստ':"Add text"}  />
                                            <div className="saveCancle">
                                                <CloseOutlined className='CloseOutlined' onClick={() => setValueMargin('')} />
                                                <CheckOutlined onClick={() => AddValueMargin()} />
                                            </div>
                                        </div>
                                        <label htmlFor="files_Lesson4" className='uploadImage_Add_label'  >
                                            <div className="uploadImage_Add" >
                                                <CloudDownloadOutlined />
                                                <input
                                                    value={""}
                                                    type="file"
                                                    onChange={(e) => { setAddImageMargin(""); uploadedImage(e, setAddImageMargin) }}
                                                    accept="image/*"
                                                    id="files_Lesson4"
                                                    name="files_Lesson4"
                                                    style={{ display: "none" }}
                                                />
                                            </div>
                                        </label>

                                    </div>
                                </div>
                                <hr />
                                <div className='gridContainer'>
                                    {
                                        slideState?.slides && slideState.slides.map((elem: any, index: number) =>
                                            <div className='SlidesImage'>
                                                <div>
                                                    <img src={elem} alt="" />
                                                    <div className="deleteviewDiv">
                                                        <div className="uploadImage">
                                                            <label htmlFor="files_Lesson_slide" onClick={() => { setIndex(index) }} > <CloudDownloadOutlined /></label>
                                                            <input
                                                                value={""}
                                                                type="file"
                                                                onChange={(e) => { setImageSlides(""); uploadedImage(e, setImageSlides) }}
                                                                accept="image/*"
                                                                id="files_Lesson_slide"
                                                                name="files_Lesson_slide"
                                                                style={{ display: "none" }}
                                                            />
                                                        </div>
                                                        <DeleteOutlined onClick={() => { DeleteImageSlides(index) }} className="deleteImages" />
                                                    </div>
                                                </div>
                                            </div>)
                                    }
                                    <label htmlFor="files_Lesson5" className='uploadImage_Add_Slide'  >
                                        <div className="uploadImage_Add" >
                                            <CloudDownloadOutlined />
                                            <input
                                                value={""}
                                                type="file"
                                                onChange={(e) => { setAddImageSlide(""); uploadedImage(e, setAddImageSlide) }}
                                                accept="image/*"
                                                id="files_Lesson5"
                                                name="files_Lesson5"
                                                style={{ display: "none" }}
                                            />
                                        </div>
                                    </label>
                                </div>
                                <hr />
                            </div>
                            {
                                newSlide ? <div className="SaveChange_Edit">
                                    <button onClick={() => saveNewSlides()}>
                                    {LocalValue==="AM"?'Պահպանել':"Save"} 
                                    </button></div> :
                                    <div className='SaveChange_Edit'>
                                        <button onClick={() => saveChangeSlides()}>
                                        {LocalValue==="AM"?'Պահպանել փոփոխությունները':"Save changes"} 
                                        </button>
                                    </div>
                            }
                        </div>}

                <div className="CloseEdit" onClick={() => { setSlideState({}); setEditInformation('');setEditInformationID(-1);setSlideState('');dispatch(fetchDelete()) }}><CloseOutlined /></div>
            </div>
    }</>)
}