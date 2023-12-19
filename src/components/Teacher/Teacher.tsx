import React, { useEffect,useState } from 'react'
import './Teacher.scss'
import { getTeacher,editeTeacher, deleteTeacher } from '../../store/action/TeacherAction'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { AddTeacher } from '../AddTeacher'
import {EditOutlined,DeleteOutlined,FolderViewOutlined} from '@ant-design/icons'
import { EditClassModal } from '../EditClassRoom/EditClassModal'




export  function Teacher() {

    const dispatch=useAppDispatch()
const {Teacher}=useAppSelector((state)=>state.Teacher)
const [open,setOpen]=useState(false)
const [editTeacher, seteditTeacher] = useState<any>(false)
const [error,setError]=useState(false)
useEffect(()=>{
   dispatch(getTeacher("admin"))
},[dispatch])

async function EditTeacher(item:any, setError:any) {
 console.log(item);
 
    await dispatch(editeTeacher(item))
    await dispatch(getTeacher('admin'))
    seteditTeacher(false)
 }
   
 async function deleteItem(id:any){
     
    await dispatch(deleteTeacher(id))
   await dispatch(getTeacher('admin'))

}

let LocalValue;
if (localStorage.getItem("language")) {
  let local:any = localStorage.getItem("language");
  LocalValue = JSON.parse(local);
}


  return (
    <div className='ClassItem'>
    <div className='teacherContainer'>
{!open&&<div className='ClassTable'>
                    <table>
                        <thead>
                            <tr>
                                <th>{LocalValue=='AM'? "Անուն Ազգանուն":'Name Surname'}</th>
                                <th>{LocalValue=='AM'? 'Առարկա':'Subject'}</th>
                            </tr>
                        </thead>
                        <tbody>
                            { Teacher?.map((el) => <tr key={el.id}>
                                    <td>{el.fullName}</td>
                                    <td><strong>{el?.position}</strong></td>
                                    <td className=' editdelete'>
                                        <EditOutlined className='edit'  onClick={() => { seteditTeacher(el) }}/>
                                        <DeleteOutlined className='delete' onClick={()=>{deleteItem(el.id)}} />
                                    </td>
                                    {/* <td><FolderViewOutlined onClick={()=>navigate('/PupilExperince')} /></td> */}
                                </tr>)
                            }

                        </tbody>
                    </table>
                <button className='button' onClick={()=>setOpen(true)}>{LocalValue=='AM'?'Ավելացնել ուսուցիչ':'Add teacher'}</button>
                </div>}
                  {open&&<AddTeacher setOpen={setOpen}/>}
    </div>

                    <div className='addChild'>
                        {/* <button className='btn2' onClick={() => {navigate("/Class") }}> Հետ </button> */}
                        {/* <button className='btn1'  onClick={() => { setAddChild(true) }}> Ավելացնել աշակերտ </button> */}
                    </div>

            {/* {addChild && <AddChildModal setAddChild={setAddChild} saveChild={saveChild} />} */}
            {editTeacher && <EditClassModal seteditTeacher={seteditTeacher} editTeacher={editTeacher} EditTeacher={EditTeacher} />}


    </div>
  )
}
