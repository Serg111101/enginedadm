import React, { useState,useEffect } from 'react'
import './EditClassModal.scss'
import { CloseOutlined } from '@ant-design/icons'
// import Swal from 'sweetalert2'
// import { useAppDispatch } from 'react-redux'
import { useAppDispatch } from '../../hooks'



export const EditClassModal = ({ seteditTeacher, editTeacher,EditTeacher}) => {
    const [error, setError] = useState(false)
    const [error1, setError1] = useState(false);
    const [error2, setError2] = useState(false);

    const dispatch = useAppDispatch();

    const obj={...editTeacher}

useEffect(()=>{
    console.log(25);
  delete obj.password
},[])


console.log(obj);
    // useEffect(() => {
    //     setEdite(auth);
    //   }, [auth]);
    
    //   console.log("====================================");
    //   console.log(edite);
    //   console.log("====================================");
    //   useEffect(() => {
    //     if (oldUsername.length > 0) {
    //       setError(true);
    //     }
    //     if (oldUsername === auth?.login) {
    //       setError(false);
    //     }
    //   }, [oldUsername]);
    //   useEffect(() => {
    //     if (repeatPassword.length > 0) {
    //       setError1(true);
    //     }
    
    //     if (edite?.password?.length > 0 && repeatPassword === edite.password) {
    //       setError1(false);
    //     }
    //   }, [repeatPassword]);
    //   async function editInfo(e) {
    //     e.preventDefault();
    
    //     if (!error && !error1 && auth?.role === "admin") {
    //       if (!repeatPassword && !oldUsername) {
    //         setError2(true);
    //       } else {
    //         console.log(edite);
    //         if (edite.login === "") {
    //           delete edite.login;
    //         }
    //         if (edite.password === "") {
    //           delete edite.password;
    //         }
    //         localStorage.setItem("auth", JSON.stringify(edite));
    //         await delete edite.accessToken;
    //         await delete edite.refreshToken;
            
    //         try {
              
    //           dispatch(editTeacher(edite));
    //           Swal.fire({
    //             position: "center",
    //             icon: "success",
    //             title:LocalValue === "AM"
    //             ? "Փոփոխությունը հաստատված է"
    //             : "The change is approved",
    //             showConfirmButton: false,
    //             timer: 2500
    //         }).then(()=>{
    //            setOldUserName("");
    //            setRepeatPassword("");
    //            setEdite();
    //            navigate("/")
    //         })
    //         } catch (error) {
    //           console.log(error, "error");
    //         }
    //       }
    //     }
    // }








    
    return (
        <div className='AddClassModal'>
            <div className='AddClassDiv'>
            <CloseOutlined className=' CloseModal' onClick={()=>{seteditTeacher(false)}} />
                <form action="" onSubmit={(e) => { e.preventDefault(); EditTeacher(obj, setError) }}>
                    <h3>Փոփոխել</h3>
                    <p className='namep'>Անուն Ազգանուն</p>
                    <input className={error && "errorInput"} type="text" maxLength={30} placeholder='Անուն Ազգանուն' value={obj?.fullName} onChange={(e) => { seteditTeacher({...obj,fullName:e.target.value}); setError(false) }} />
                    <p className='positionp'>Առարկան</p>
                    <input className={error && "errorInput"} type="text" maxLength={30} placeholder='Առարկա' value={obj?.position} onChange={(e) => { seteditTeacher({...obj,position:e.target.value}); setError(false) }} />


                    <p className='namep'>Մուտքանուն</p>
                    <input className={error && "errorInput"} type="text" maxLength={30} placeholder='Մուտքանուն' value={obj?.login} onChange={(e) => { seteditTeacher({...obj,login:e.target.value}); setError(false) }} />

                    <p className='namep'>Գաղտնաբառ</p>
                    <input className={error && "errorInput"} type="text" maxLength={30} placeholder='Գազտնաբառ'  onChange={(e) => { seteditTeacher({...obj,password:e.target.value}); setError(false) }} />

                    {error && <p>Դաշտը չի կարող դատարկ լինել *</p>}
                    

                    <button onClick={(e) => { e.preventDefault(); EditTeacher(obj, setError) }}>Փոփոխել</button>
                </form>
            </div>
        </div>
    )
}

