/*eslint-disable*/
import React, { useEffect, useState } from 'react'
import './Teacher.scss'
import { getTeacher, editeTeacher, deleteTeacher } from '../../store/action/TeacherAction'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { AddTeacher } from '../AddTeacher'
import { EditOutlined, DeleteOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { EditClassModal } from '../EditClassRoom/EditClassModal'
import DeleteAll from '../DeleteComponent'

import { EyeFilled } from "@ant-design/icons"
import Swal from 'sweetalert2'


export function Teacher() {

    const dispatch = useAppDispatch()
    const { Teacher } = useAppSelector((state) => state.Teacher)
    const [open, setOpen] = useState(false)
    const [editTeacher, seteditTeacher] = useState<any>(false)
    const [openLinks, setOpenLinks] = useState<any>(false);
    const [linkVal, setLinkVal] = useState("");
    const [editLink, setEditLink] = useState(false);
    const [teacherIndex, setTeacherIndex] = useState(0)
    const [error, setError] = useState<any>()
    const [loading, setLoadnig] = useState(false);
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
        if (linkVal?.length > 2) {
            setOpenLinks({ ...openLinks, cubesat_link: [...openLinks.cubesat_link, linkVal] })
        }


    }

    useEffect(() => {
        if (openLinks?.cubesat_link && linkVal?.length > 2) {
            EditTeacher(openLinks, setError, setLoadnig);
            setOpen(false);
            setEditLink(false);
            setLinkVal("")
        }
    }, [openLinks?.cubesat_link])

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
        const newLinks = openLinks?.cubesat_link.filter((el: any,) => el !== editLink)
        const arr = [
            ...newLinks,
            linkVal
        ]
        await EditTeacher({ ...openLinks, cubesat_link: arr }, setError, setLoadnig);
        setOpen(false);
        setOpenLinks({ ...openLinks, cubesat_link: arr });
        setLinkVal("")
        setEditLink(false);

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
    async function deleteLink(el: any) {

        const newLinks = openLinks?.cubesat_link.filter((item: any,) => item !== el)


        EditTeacher({ ...openLinks, cubesat_link: newLinks }, setError, setLoadnig);
        setOpenLinks({ ...openLinks, cubesat_link: newLinks })
        setOpen(false);
        setLinkVal("")
        setEditLink(false);

    }
    return (
        <div className='ClassItem'>
            {!openLinks ? <div className='teacherContainer'>
                {!open && <div className='ClassTable'>
                    <table>
                        <thead>
                            <tr>
                                <th>{LocalValue === 'AM' ? "Անուն Ազգանուն" : 'Name Surname'}</th>
                                <th>{LocalValue === 'AM' ? 'Առարկա' : 'Subject'}</th>
                                <th >{LocalValue === 'AM' ? "Հղումներ" : 'Links'}</th>
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
                                        <th colSpan={2} ><EyeFilled /></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {Teacher[teacherIndex]?.cubesat_link?.map((el: any, index: number) => <tr key={index + 1}>
                                        {/* <td>{el?.fullName}</td> */}
                                        {/* <td><strong>{el?.position}</strong></td> */}
                                        <td className=' editdelete'>
                                            {el}
                                        </td>
                                        <td className=' editdelete'>
                                            <EditOutlined className='edit' onClick={() => { setEditLink(el); setLinkVal(el) }} />
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
                            <input type='text' value={linkVal} onChange={(e) => { setLinkVal(e.target.value) }} />
                            <div className="contaButton">
                                <button className='button' onClick={() => { addLinks() }} >Save</button>
                                <button className='button' onClick={() => { setOpen(false) }} >{LocalValue === 'AM' ? "Հետ" : 'go back'}</button>
                            </div>
                        </div>}
                        {editLink && <div className='otherInput'>
                            <input type='text' value={linkVal} onChange={(e) => { setLinkVal(e.target.value) }} />
                            <div className="contaButton">
                                <button className='button' onClick={() => { editLinks(); }} >Save</button>
                                <button className='button' onClick={() => { setEditLink(false); setLinkVal("") }} >{LocalValue === 'AM' ? "Հետ" : 'go back'}</button>
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
