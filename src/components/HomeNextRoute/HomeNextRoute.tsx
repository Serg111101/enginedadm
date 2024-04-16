/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import './HomeNextRoute.scss';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { IHomeNextRout } from '../../models';
import { useAppDispatch } from '../../hooks';
import { editNextRoute, getfetchHomeNextRout } from '../../store/action/HomeAction';
import axios from "../../axios/adminaxios";
import {
  CloseOutlined,
  EditOutlined,
  CheckSquareOutlined,

} from "@ant-design/icons";
const URL = process.env.REACT_APP_BASE_URL

export function HomeNextRoute() {
  const navigate = useNavigate();
  const { HomeNextRout } = useSelector((state: any) => state.HomeNextRout);
  const [done, setDone] = useState(false);
  const [edit, setEdit] = useState<any>();
  const [text, setText] = useState<any>();
  const [color, setColor] = useState<any>();
  const [addImg, setAddImg] = useState<any>();
  const dispatch = useAppDispatch();
  let cou: any;
  if (sessionStorage.getItem('count')) {
    const loc: any = sessionStorage.getItem('count');
    cou = JSON.parse(loc);
  }
  let loacal: any;
  if (localStorage?.getItem('language')) {
    let languageLocal: any = localStorage?.getItem('language');
    loacal = JSON.parse(languageLocal)
  }

  function navigateTo(id: number) {
    if (!done) {


      if (id === 0) {
        navigate('/Lessons');
      } else if (id === 1) {
        navigate('/UsefulMaterials');
      } else if (id === 2) {
        navigate('/Satellites');
      } else if (id === 3) {
        navigate("/UserSatelite")
      } else {
        navigate("/home")
      }
    }

  }
  const doneShow = sessionStorage.getItem("done");
  useEffect(() => {
    if (!doneShow) {
      setDone(false)
    } else {
      setDone(JSON.parse(doneShow));

    }

  }, [doneShow]);



  async function edits(id: number) {

    const obj = {
      color: color || edit?.color,
      title: text || edit?.title,
      logo: addImg || edit?.logo
    }



    await dispatch(editNextRoute(obj, id));
    await dispatch(getfetchHomeNextRout());
    setColor('');
    setText('');
    setAddImg('');
    setEdit(null);
  }
  async function uploadImageHandler(e: any) {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    if (formData.has('image')) {
      try {
        const response = await axios.post(`${URL}aeroSpace/addPicture`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        setAddImg(response.data.dirname)
      } catch (error) {
        return "Server request is failed";
      }
    }


  }

  async function validateAndEditPerson(id: number) {
    if (!edit?.title.trim()) {
      Swal.fire({
        title: (loacal === "AM" ? 'Չի կարող դատարկ լինել' : "Cannot be empty"),
        icon: 'error',
        confirmButtonText: (loacal === "AM" ? 'Լավ' : "OK")
      })
    } else {
      await edits(id,);
    }

  }




  return (
    <div className="HomeNextRoute">
      <div className="nextRouteContainer">
        {HomeNextRout?.map((el: IHomeNextRout, index: number) => (

          <div key={index}>

            <div
              className="nextRouteItem"
              style={{ backgroundColor: el.color }}
              onClick={() => navigateTo(index)}
            >
              <div className="nextRouteIcon"
              >
                <img style={{ background: el.color }} src={el?.logo} alt={el?.title} />
              </div>
              <div className="nextRouteTitle">
                <p>{el?.title}</p>
              </div>
              {done && <div className='nextRouteButton'><button
                onClick={() => {
                  setEdit({
                    ...el,
                    id: index,

                  });
                  setColor(el.color);
                  setText(el.title)

                }}
              ><EditOutlined className="iconantd" /></button>
              </div>
              }
            </div>
          </div>
        ))}
      </div>
      {edit && <h3>Փոփոխել</h3>}
      {
        done && edit && <div className='editoring'>
          <div className='editDiv' style={{ background: color || edit?.color }}>
            <div className='fotoText'>
              {edit?.logo ? <>
                <label htmlFor='img'>

                  <img src={addImg || edit?.logo} alt="" />

                </label>
                <input type="file" accept="image/*" id="img" name="img" value={""} style={{ display: 'none' }} onChange={(e) => uploadImageHandler(e)} />
              </> :
                <div className='foto'>
                  <label htmlFor="img" >+</label>
                  <input type="file" accept="image/*" id="img" name="img" value={""} style={{ display: 'none' }} onChange={(e) => uploadImageHandler(e)} />
                </div>}
              <input className='nameText' maxLength={38} type="text" onChange={(e) => { setText(e.target.value) }} value={text || edit?.title} placeholder='anun' />
            </div>
            <div>
              <input type="color" value={color || edit?.color} onChange={(e) => { setColor(e.target.value) }} />
            </div>
          </div>
          <div className='buttonsEdit' >
            <button onClick={() => { validateAndEditPerson(edit?.id) }}><CheckSquareOutlined className="iconantd" /></button><br />
            <button onClick={() => { setEdit(null); setColor(''); setText(''); setAddImg(''); }}><CloseOutlined className="iconantd" /></button>
          </div>
        </div>
      }
    </div>
  );
}
