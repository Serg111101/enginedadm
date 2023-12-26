import React, { useEffect, useState } from 'react'
import './Teacher.scss'
import { getTeacher, editeTeacher, deleteTeacher } from '../../store/action/TeacherAction'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { AddTeacher } from '../AddTeacher'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { EditClassModal } from '../EditClassRoom/EditClassModal'
import DeleteAll from '../DeleteComponent'

import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons"


export function Teacher() {

    const dispatch = useAppDispatch()
    const { Teacher } = useAppSelector((state) => state.Teacher)
    const [open, setOpen] = useState(false)
    const [editTeacher, seteditTeacher] = useState<any>(false)
    useEffect(() => {
        dispatch(getTeacher("admin"))
    }, [dispatch])

    async function EditTeacher(item: any, setError: any, setLoading: any) {
        try {
            
            setLoading(true);
            await dispatch(editeTeacher(item,setError))
            setLoading(false)
            await dispatch(getTeacher('admin'))
        seteditTeacher(false)

        } catch (error) {
            console.log(error);
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

    return (
        <div className='ClassItem'>
            <div className='teacherContainer'>
                {!open && <div className='ClassTable'>
                    <table>
                        <thead>
                            <tr>
                                <th>{LocalValue === 'AM' ? "Անուն Ազգանուն" : 'Name Surname'}</th>
                                <th>{LocalValue === 'AM' ? 'Առարկա' : 'Subject'}</th>
                                <th colSpan={2} ><EyeFilled /></th>
                            </tr>
                        </thead>

                        <tbody>
                            {Teacher?.map((el) => <tr key={el.id}>
                                <td>{el?.fullName}</td>
                                <td><strong>{el?.position}</strong></td>
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



            {editTeacher && <EditClassModal seteditTeacher={seteditTeacher} editTeacher={editTeacher} EditTeacher={EditTeacher}
            //  setErorr={setErorr} erorr={erorr} looading={looading}  setLooading={setLooading}
            />}


        </div>
    )
}
