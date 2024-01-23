import React, { useState,useEffect } from 'react'
import './EditClassModal.scss'
import { CloseOutlined } from '@ant-design/icons'
import Swal from 'sweetalert2'
import { useAppDispatch } from '../../hooks'

interface props{
    seteditTeacher:any,
    editTeacher:any,
    EditTeacher:any,
    error:any,
    setError:any,
    loading:boolean,
    setLoadnig:(loading:boolean) => void,
}

export const EditClassModal = ({error,setError,loading, setLoadnig,seteditTeacher, editTeacher,EditTeacher,}:props) => {
  
    
    const dispatch = useAppDispatch();

    const obj={...editTeacher}

useEffect(()=>{
    console.log(25);
  delete obj.password
},[])


let LocalValue:any
if (localStorage.getItem("language")) {
  let local:any = localStorage.getItem("language");
  LocalValue = JSON.parse(local);
}




useEffect(() => {

    if (error === 'ok') {

      Swal.fire({
        position: "center",
        icon: "success",
        title: LocalValue === 'AM' ? "Տվյալները հաջողությամբ հաստատվել են" : 'Data has been successfully verified' ,
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
  }, [error, loading])





    
    return (
        <div className='AddClassModal'>
            <div className='AddClassDiv'>
            <CloseOutlined className=' CloseModal' onClick={()=>{seteditTeacher(false)}} />
                <form action="" onSubmit={(e) => { e.preventDefault(); EditTeacher(obj, setError,setLoadnig) }}>
                    <h3>{LocalValue === 'AM' ? "Փոփոխել" : 'Change'}</h3>
                    <p className='namep'>{LocalValue === 'AM' ? "Անուն Ազգանուն" : 'Name Surname'}</p>
                    <input className={error && "errorInput"} type="text" maxLength={30} placeholder={LocalValue === 'AM' ? "Անուն Ազգանուն" : 'Name Surname'} value={obj?.fullName} onChange={(e) => { seteditTeacher({...obj,fullName:e.target.value}); setError(false) }} />
                    <p className='positionp'>{LocalValue === 'AM' ? "Առարկան" : 'Subject'}</p>
                    <input className={error && "errorInput"} type="text" maxLength={30} placeholder={LocalValue === 'AM' ? "Առարկան" : 'Subject'} value={obj?.position} onChange={(e) => { seteditTeacher({...obj,position:e.target.value}); setError(false) }} />


                    <p className='namep'>{LocalValue === 'AM' ? "Մուտքանուն" : 'Username'}</p>
                    <input className={error && "errorInput"} type="text" maxLength={30} placeholder={LocalValue === 'AM' ? "Մուտքանուն" : 'Username'} value={obj?.login} onChange={(e) => { seteditTeacher({...obj,login:e.target.value}); setError(false) }} />

                    <p className='namep'>{LocalValue === 'AM' ? "Գաղտաբառը" : 'Password'}</p>
                    <input className={error && "errorInput"} type="text" maxLength={30} placeholder={LocalValue === 'AM' ? "Գաղտաբառը" : 'Password'}  onChange={(e) => { seteditTeacher({...obj,password:e.target.value}); setError(false) }} />

                    {error && <p>{LocalValue === 'AM' ? "Դաշտը չի կարող դատարկ լինել" : 'The field cannot be empty'} *</p>}
                    

                    <button>{LocalValue === 'AM' ? "Փոփոխել" : 'Change'}</button>
                </form>
            </div>
        </div>
    )
}

