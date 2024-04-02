/*eslint-disable*/
import React, { useEffect, useState } from 'react'
import './Teacher.scss'
import { getTeacher, editeTeacher, deleteTeacher } from '../../store/action/TeacherAction'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { AddTeacher } from '../AddTeacher'
import { EditOutlined, DeleteOutlined, ArrowRightOutlined, EyeFilled, CheckSquareOutlined, PlusCircleFilled, CloseCircleFilled } from '@ant-design/icons'
import { EditClassModal } from '../EditClassRoom/EditClassModal'
import DeleteAll from '../DeleteComponent'

import Swal from 'sweetalert2'
import axios from '../../axios/axios'
import Password from 'antd/es/input/Password'

const URL = process.env.REACT_APP_BASE_URL;

export function Teacher() {

    const dispatch = useAppDispatch()
    const { Teacher } = useAppSelector((state) => state.Teacher)
    const [open, setOpen] = useState(false)
    const [editTeacher, seteditTeacher] = useState<any>(false)
    const [openLinks, setOpenLinks] = useState<any>(false);
    const [linkVal, setLinkVal] = useState("");
    const [editLink, setEditLink] = useState<any>(false);
    const [teacherIndex, setTeacherIndex] = useState(0)
    const [error, setError] = useState<any>()
    const [loading, setLoadnig] = useState(false);
    const [image, setImage] = useState("");
    const [cameraLink, setCameraLink] = useState("")
    useEffect(() => {
        dispatch(getTeacher("admin"))
    }, [dispatch])

    async function EditTeacher(item: any, setError: any, setLoading: any) {
       
        
        
        try {
            
            setLoading(true);
            await dispatch(editeTeacher(item, setError))
            setLoading(false)
            await dispatch(getTeacher('admin'))
            seteditTeacher(false)
        } catch (error) {
            console.error(error);
        }

    }



    let LocalValue: any;
    if (localStorage.getItem("language")) {
        let local: any = localStorage.getItem("language");
        LocalValue = JSON.parse(local);
    }

    async function deleteItemm(id: number) {
        try {
            await DeleteAll({
                title: LocalValue === 'AM' ? "Ցանկանում եք ջնջե՞լ" : 'Do you want to delete?',
                text: LocalValue === 'AM' ? "Ջնջելու դեպքում վերականգնել չեք կարող" : 'If you delete it, you cannot restore it',
                deleteItem: () => dispatch(deleteTeacher(id))
            });


        } catch (error) {
            console.error(error);

        }

    }
    async function addLinks() {
        if (linkVal?.length > 2 ) {
            const obj = { ...openLinks, links: [...openLinks?.links, { cubesat_link: linkVal, camera_link: cameraLink, image: image }] }
            setOpenLinks(obj);
        }
        
    }

    useEffect(() => {
        if (openLinks && linkVal?.length > 2 ) {
            EditTeacher(openLinks, setError, setLoadnig);
            setOpen(false);
            setEditLink(false);
            setLinkVal("");
            setCameraLink("");
            setImage("");


        }
    }, [openLinks])

    useEffect(() => {

        if (error === 'ok') {
            Swal.fire({
                position: "center",
                icon: "success",
                title: LocalValue === 'AM' ? "Տվյալները հաջողությամբ հաստատվել են" : 'Data has been successfully verified',
                showConfirmButton: false,
                timer: 2500
            }).then(() => {
                // setOpen(false)
                setError("");
                setLoadnig(false)


            });
        }
        if (error?.response?.status < 200 || error?.response?.status >= 400) {
            Swal.fire({
                position: "center",
                icon: "error",
                showConfirmButton: false,
                timer: 2500
            }).then(() => {
                setError("");
                setLoadnig(false)
            });
        }
    }, [error, loading]);




    async function editLinks() {
        const newLinks = openLinks?.links.map((el: any, index: any) => {
            if (index !== editLink[1]) {
                return el
            } else {
                if(image){
                    return {...editLink[0],image:image}
                }else{
                    return {...editLink[0]}
                }
          
                
            }
        })
        await EditTeacher({ ...openLinks, links: newLinks }, setError, setLoadnig);
        setOpen(false);
        setLinkVal("")
        setEditLink(false);
        setImage("")

    }


    async function deleteLinks(el: any) {
        try {
            await DeleteAll({
                title: LocalValue === 'AM' ? "Ցանկանում եք ջնջե՞լ" : 'Do you want to delete?',
                text: LocalValue === 'AM' ? "Ջնջելու դեպքում վերականգնել չեք կարող" : 'If you delete it, you cannot restore it',
                deleteItem: () => deleteLink(el)
            });


        } catch (error) {
            console.error(error);

        }
    }




    async function deleteLink(item: any) {
        const newLinks = openLinks?.links.filter((el: any) => {
            if (el?.camera_link !== item?.camera_link && el?.cubesat_link !== item?.cubesat_link) {
                return el
            }
        })


        EditTeacher({ ...openLinks, links: newLinks }, setError, setLoadnig);
        setOpenLinks({ ...openLinks, links: newLinks })
        setOpen(false);
        setLinkVal("")
        setEditLink(false);
    }




    async function uploadImageHandler(e: any) {
        const formData = new FormData();
        formData.append("image", e.target.files[0]);
        if (formData.has("image")) {
            try {
                const response = await axios.post(`${URL}aeroSpace/addPicture`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
           
                
                setImage(response?.data?.dirname);
            } catch (error) {
                return "Server request is failed";
            }
        }
    }

console.log(Teacher,"ttttttttttt");



    return (
        <div className='ClassItem'>
            {!openLinks ? <div className='teacherContainer'>
                {!open && <div className='ClassTable'>
                    <table>
                        <thead>
                            <tr>
                                <th>{LocalValue === 'AM' ? "Անուն Ազգանուն" : 'Name Surname'}</th>
                                <th>{LocalValue === 'AM' ? 'Առարկա' : 'Subject'}</th>
                                <th >{LocalValue === 'AM' ? "Արբանյակներ" : 'Satellites'}</th>
                                <th colSpan={2} ><EyeFilled /></th>
                            </tr>
                        </thead>

                        <tbody>
                            {Teacher?.map((el, index: number) => <tr key={el.id}>
                                <td>{el?.fullName}</td>
                                <td><strong>{el?.position}</strong></td>
                                <td className=' editdelete'>
                                    <ArrowRightOutlined className='edit' onClick={() => { setOpenLinks(el); setTeacherIndex(index); setLinkVal("") }} />
                                </td>
                                <td className=' editdelete'>
                                    <EditOutlined className='edit' onClick={() => { seteditTeacher(el) }} />
                                </td>
                                <td>
                                    <DeleteOutlined className='delete' onClick={() => { deleteItemm(el?.id) }} />
                                </td>
                            </tr>)
                            }

                        </tbody>
                    </table>
                    <button className='button' onClick={() => setOpen(true)}>{LocalValue === 'AM' ? 'Ավելացնել ուսուցիչ' : 'Add teacher'}</button>
                </div>}
                {open && <AddTeacher setOpen={setOpen} />}
            </div>
                :
                <>
                    <div className='teacherContainer'>
                        {!open && !editLink && <div className='ClassTable'>
                            <button className='button' onClick={() => { setOpenLinks(false); setEditLink(false); setOpen(false) }} >{LocalValue === 'AM' ? "Հետ" : 'go back'}</button>

                            <table>
                                <thead>
                                    <tr>
                                        <th >{LocalValue === 'AM' ? "Հղումներ" : 'Links'}</th>
                                        <th>{LocalValue === 'AM' ? "Արբանյակի հղում" : 'Satellite link'}</th>
                                        <th>{LocalValue === 'AM' ? "Տեսախցիկի հղում" : 'Camera link'}</th>
                                        <th colSpan={2} ><EyeFilled /></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Teacher[teacherIndex]?.links?.map((el: any, index: number) => <tr key={index + 1}>

                                        <td className=' editdelete'>
                                            <img src={el?.image} alt={el?.cubesat_link} />
                                        </td>
                                        <td className=' editdelete'>
                                            {el?.cubesat_link}
                                        </td>
                                        <td className=' editdelete'>
                                            {el?.camera_link}
                                        </td>
                                        <td className=' editdelete'>
                                            <EditOutlined className='edit' onClick={() => { setEditLink([el, index]); setLinkVal(el) }} />
                                        </td>
                                        <td>
                                            < DeleteOutlined className='delete' onClick={() => { deleteLinks(el) }} />
                                        </td>

                                    </tr>)
                                    }

                                </tbody>
                            </table>
                            <button className='button' onClick={() => setOpen(true)}>{LocalValue === 'AM' ? 'Ավելացնել հղում' : 'Add link'}</button>
                        </div>}
                        {open && <div className='otherInput' >
                            <div className="uploadImage">
                                <input
                                    value={""}
                                    type="file"
                                    onChange={(e) => {
                                        uploadImageHandler(e);
                                    }}
                                    accept="image/*"
                                    id="filess2"
                                    name="filess2"
                                    style={{ display: "none" }}
                                />

                                {
                                    image?.length > 0 && <div className='cubesatImage' > <img src={image} alt='cubesat image' /></div>
                                }
                                <div className='uploadButton' > {image?.length > 0 ? (
                                    <>
                                        <CloseCircleFilled className="iconantd" onClick={() => { setImage("") }} />
                                    </>

                                ) : (
                                    <label htmlFor="filess2">
                                        <PlusCircleFilled className="iconantd" />
                                    </label>
                                )}
                                </div>

                            </div>
                            {image?.length > 0 && <div className='inputContainer' >
                                <div>
                                    <label htmlFor="linkVal">{LocalValue === 'AM' ? "Ավելացրեք արբանյակի հղում" : 'Add a satellite link'}</label>
                                    <input type='text' id='linkVal' name='linkVal' value={linkVal} onChange={(e) => { setLinkVal(e.target.value) }} />
                                </div>

                                <div>
                                    <label htmlFor="cameraLinkVal">{LocalValue === 'AM' ? "Ավելացրեք տեսախցիկի հղում" : 'Add a camera link'}</label>
                                    <input type='text' id='cameraLinkVal' name='cameraLinkVal' value={cameraLink} onChange={(e) => { setCameraLink(e.target.value) }} />
                                </div>




                            </div>}





                            <div className="contaButton">
                                <button className='button' onClick={() => { setOpen(false) }} >{LocalValue === 'AM' ? "Հետ" : 'go back'}</button>
                                <button className='button' onClick={() => { addLinks() }} >{LocalValue === 'AM' ? "Պահպանել" : 'Save'}</button>
                            </div>
                        </div>}
                        {editLink &&
                         <div className='otherInput'>
                            <div> <img src={image || editLink[0]?.image} alt="Edited image" />
                                <div className='uploadButton' > {image?.length > 0 ? (
                                    <>
                                        <CloseCircleFilled className="iconantd" onClick={() => { setImage("") }} />
                                    </>

                                ) : (
                                    <label htmlFor="filess2">
                                        <PlusCircleFilled className="iconantd" />
                                    </label>
                                )}


                                    <input
                                        value={""}
                                        type="file"
                                        onChange={(e) => {
                                            uploadImageHandler(e);
                                        }}
                                        accept="image/*"
                                        id="filess2"
                                        name="filess2"
                                        style={{ display: "none" }}
                                    />

                                </div>

                            </div>
                            <div className='inputContainer' >
                                <div>
                                    <label htmlFor="linkVal">{LocalValue === 'AM' ? "Ավելացրեք արբանյակի հղում" : 'Add a satellite link'}</label>
                                    <input type='text' name='linkVal' id='linkVal' value={editLink[0]?.cubesat_link} onChange={(e) => { setEditLink([{ ...editLink[0], cubesat_link: e.target.value }, editLink[1]]) }} />

                                </div>
                                <div>
                                    <label htmlFor="cameraLinkVal">{LocalValue === 'AM' ? "Ավելացրեք տեսախցիկի հղում" : 'Add a camera link'}</label>
                                    <input type='text' id='cameraLinkVal' name='cameraLinkVal' value={editLink[0]?.camera_link} onChange={(e) => { setEditLink([{ ...editLink[0], camera_link: e.target.value }, editLink[1]]) }} />
                                </div>
                            </div>


                            <div className="contaButton">
                                <button className='button' onClick={() => { setEditLink(false); setLinkVal("") }} >{LocalValue === 'AM' ? "Հետ" : 'go back'}</button>
                                <button className='button' onClick={() => { editLinks(); }} >Save</button>
                            </div>

                        </div>}
                    </div>
                </>
            }



            {editTeacher && <EditClassModal error={error} setError={setError} loading={loading} setLoadnig={setLoadnig} seteditTeacher={seteditTeacher} editTeacher={editTeacher} EditTeacher={EditTeacher}
            //  setErorr={setErorr} erorr={erorr} looading={looading}  setLooading={setLooading}
            />}


        </div>
    )
}
