import React, { useState } from 'react'
import './EditClassModal.scss'
import { CloseOutlined } from '@ant-design/icons'

export const EditClassModal = ({ seteditTeacher, editTeacher,EditTeacher}) => {
    const [error, setError] = useState(false)
    return (
        <div className='AddClassModal'>
            <div className='AddClassDiv'>
            <CloseOutlined className=' CloseModal' onClick={()=>{seteditTeacher(false)}} />
                <form action="" onSubmit={(e) => { e.preventDefault(); EditTeacher(editTeacher, setError) }}>
                    <h3>Փոփոխել</h3>
                    <p className='namep'>Անուն Ազգանուն</p>
                    <input className={error && "errorInput"} type="text" maxLength={30} placeholder='Անուն Ազգանուն' value={editTeacher?.fullName} onChange={(e) => { seteditTeacher({...editTeacher,fullName:e.target.value}); setError(false) }} />
                    <p className='positionp'>Առարկան</p>
                    <input className={error && "errorInput"} type="text" maxLength={30} placeholder='Առարկան' value={editTeacher?.position} onChange={(e) => { seteditTeacher({...editTeacher,position:e.target.value}); setError(false) }} />
                    {error && <p>Դաշտը չի կարող դատարկ լինել *</p>}
                    

                    <button onClick={(e) => { e.preventDefault(); EditTeacher(editTeacher, setError) }}>Փոփոխել</button>
                </form>
            </div>
        </div>
    )
}

