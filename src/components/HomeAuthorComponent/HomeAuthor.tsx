import { useEffect, useState } from 'react';
import './HomeAuthor.scss';
import { useAppDispatch,useAppSelector } from '../../hooks';
import {
  CloseOutlined,
  EditOutlined,
  CheckSquareOutlined,
  PlusCircleFilled,
} from "@ant-design/icons";
import axios from "../../axios/adminaxios";
import { editHomeAuthor, getfetchHomeAuthor } from '../../store/action/HomeAction';
import Swal from 'sweetalert2';
const URL = process.env.REACT_APP_BASE_URL;

export function HomeAuthorComponent() {
  const dispatch = useAppDispatch();
  const { HomeAuthor } = useAppSelector((state:any) => state.HomeAuthor);
  const [eng,setEng]=useState(false);
  const [done,setDone] = useState(false);
  const [show,setShow] = useState(false);
  const [editValue,setEditValue] = useState<any>({});
  const [addImg,setAddImg] = useState<any>();
  const location=window.location
  let LocalValue: any;
  if (localStorage.getItem("language")) {
    let local: any = localStorage.getItem("language");
    LocalValue = JSON.parse(local);
  }
  useEffect(()=>{
    setEng(location.href.includes("US"));
  },[location]);
  const doneShow = sessionStorage.getItem("done");
  useEffect(() => {
    if (!doneShow) {
      setDone(false)
    }else{
      setDone(JSON.parse(doneShow));

    }

  }, [doneShow]);


  async function uploadImageHandler(e: any) {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    if (formData.has('image')) {
      try {
        const response = await axios.post(`${URL}aeroSpace/addPicture`, formData,{
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

  async function homeAuthorEdit(){
    const obj = {
      ...editValue,
      image:addImg,
    }
    await dispatch(editHomeAuthor(obj));
    await dispatch (getfetchHomeAuthor());
    setShow(false);
    setAddImg('')
  }


  async function validateAndEditPerson() {
    if (!editValue?.text.trim() || !editValue?.title.trim()) {
      Swal.fire({
        title:(LocalValue==="AM"? 'չի կարող դատարկ լինել':"cannot be empty") ,
        icon: 'error',
        confirmButtonText:(LocalValue==="AM"? 'Լավ':"OK")})
    } else {
      await homeAuthorEdit();
    }
  
  }


  return (
    <div className="HomeAuthor">
      <div className='homeAuthorContainer'>
        <div className={eng?"homeAuthorWords engText":"homeAuthorWords"}>
          { !show && <p className='collapse' id='collapseSummary'>{HomeAuthor?.title}</p>}
            {
              show && <div className='inputTitle'>
                <textarea 
                cols={28}
                rows={7}
                 value={editValue?.title}
                onChange={(e)=>{setEditValue({
                  
                  text:editValue?.text,
                  title:e.target.value,
                })}}
                 />
              </div>
            }

        </div>
        <div className='imageAuthor' >
          <img src={ addImg?.length>0?addImg: HomeAuthor?.image} alt={HomeAuthor?.text} />
          
       
        </div>
        <div className="authorClass">
          { !show &&<p>{HomeAuthor?.text}</p>}

          {
            show&&<div className='inputText' >
              <input type={"text"} 
              value={editValue?.text}
              onChange={(e)=>{setEditValue({
                
                text:e.target.value,
                title:editValue?.title,
              })}}
               />
              
            </div>
          }
     
          <div className='lineDivHomeAuthot'></div>
        </div>
      </div>
      {
         show &&   done&&<div className='addImageBUtton'>
              <label htmlFor='addAuthorImage' >
               <PlusCircleFilled className="iconantd"  />
              </label>
              <input type="file" accept="image/*" id="addAuthorImage" name="addAuthorImage" value={""} style={{ display: 'none' }} onChange={(e) => uploadImageHandler(e)} />
            
            
            
             </div>
          }
      {
          done&& !show&& <div className='editAuthorButton' > <EditOutlined className="iconantd" onClick={
            ()=>{
            setEditValue({
            text:HomeAuthor?.text,
            title:HomeAuthor?.title,
          });
          
        setShow(true)
      }

        } /> </div>
          }

          {show&&<div className='checkButton' >
          <CloseOutlined className="iconantd" 
            onClick={()=>setShow(false)}
            />
            
            
            <CheckSquareOutlined className="iconantd"
            onClick={()=>validateAndEditPerson()}
            />

            
            </div>}
    </div>
  );
}