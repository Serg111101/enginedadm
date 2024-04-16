import React, { useState, useEffect, } from 'react';
import "./Info.scss"
import { useAppSelector, useAppDispatch } from '../../hooks'
import { IContact } from '../../models';
import {
  CloseOutlined,
  EditOutlined,
  CheckSquareOutlined,
  EnvironmentOutlined
} from "@ant-design/icons";
import { editInfo } from '../../store/action/HomeAction'
import { getfetchContact } from '../../store/action/HomeAction'
import MyLocation from '../Mylocation/myLocation';
import Swal from 'sweetalert2';

export function Info() {
  let LocalValue: any;
  if (localStorage.getItem("language")) {
    let local: any = localStorage.getItem("language");
    LocalValue = JSON.parse(local);
  }
  const { Contact } = useAppSelector((state: any) => state.Contact);
  const dispatch = useAppDispatch()

  const [done, setDone] = useState(false);
  const [edit, setEdit] = useState<any>();
  const [text, setText] = useState<any>();
  const [links, setLinks] = useState<any>('');
  const doneShow = sessionStorage.getItem("done");
  useEffect(() => {
    if (!doneShow) {
      setDone(false)
    }else{
      setDone(JSON.parse(doneShow));

    }

  }, [doneShow]);
  async function InfoEdit(obj:any,index:number) {

    await dispatch(editInfo(obj, index));
    await dispatch(getfetchContact())
    setEdit(false)
  }

  async function validateAndEditInfo(index:number) {
    let obj={}
    let location:any = localStorage.getItem('mylocation')
     let locations = JSON.parse(location)
    if (locations) {
      obj = {
        text: text,
        link: locations,
      }
    } 
    else {
    obj = {
        text: text,
      }
    }
    if (!text.trim()) {
      Swal.fire({
        title:(LocalValue==="AM"? 'Չի կարող դատարկ լինել':"Cannot be empty") ,
        icon: 'error',
        confirmButtonText:(LocalValue==="AM"? 'Լավ':"OK")})
    } else {
      await InfoEdit(obj,index);
    }
   
  }
 

  return (
    <div className='Info'>
     {links ? <MyLocation setLinks={setLinks} links={links}/>: <div className='info_container'>
        {Contact?.map((el: IContact, index: number) =>

          <div key={index} className='conta'>
           
            {
              
              
             edit === el.text && el?.link ? (<>{!done?<a href={el?.link} target="_black">
                <img src={el?.logo} alt={el?.title} />
                <p>{el?.title}</p>
                 <p>{el?.text}</p>

              </a>: <div>
              <img src={el?.logo} alt={el?.title} />
                <p>{el?.title}</p>
                {edit === el.text  && el?.link &&<div className='infoURL'> <EnvironmentOutlined className="iconantd" onClick={(e) => setLinks( Contact[2].link.split("=")[1].split(","))} /> <input type="text" value={text} onChange={(e) => setText(e.target.value)} /></div> }
                 {done && <div className='nextRouteButton'>{edit === el.text ? <div><CloseOutlined className="iconantd" onClick={() => setEdit(false)} /> < CheckSquareOutlined className="iconantd" onClick={() => validateAndEditInfo(index)} /></div> : <button
                onClick={() => {
                  setEdit(
                    el.text

                  );
                  setText(el.text)


                }}
              ><EditOutlined className="iconantd" /></button>}
              </div>
                }</div>}</>)
                :
                !done&&index === 1 ?

                  (<><a href={"tel:" + el?.text} >
                    <img src={el?.logo} alt={el?.title} />
                    <p>{el?.title}</p>
                    {edit === el.text ? <input type="text" value={text} onChange={(e) => setText(e.target.value)} /> : <p>{el?.text}</p>}


                  </a>
                    {done && <div className='nextRouteButton'>{edit === el.text ? <div><CloseOutlined className="iconantd" onClick={() => setEdit(false)} /> < CheckSquareOutlined className="iconantd" onClick={() => validateAndEditInfo(index)} /></div> : <button
                      onClick={() => {
                        setEdit(
                          el.text
                        );
                        setText(el.text)

                      }}
                    ><EditOutlined className="iconantd" /></button>}
                    </div>
                    }
                  </>)

                  :
                  (<>
                    <img src={el?.logo} alt={el?.title} />
                    <p>{el?.title}</p>
                    {edit === el.text ? <input type="text" value={text} onChange={(e) => setText(e.target.value)} /> : <p>{el?.text}</p>}


                    {done && <div className='nextRouteButton'>{edit === el.text ? <div><CloseOutlined className="iconantd" onClick={() => setEdit(false)} /> < CheckSquareOutlined className="iconantd" onClick={() => validateAndEditInfo(index)} /></div> : <button
                      onClick={() => {
                        setEdit(
                          el.text
                        );
                        setText(el.text)

                      }}
                    ><EditOutlined className="iconantd" /></button>}
                    </div>
                    }
                  </>)

            }
          </div>
        )}
      </div>}
      
    </div>
  )
}

