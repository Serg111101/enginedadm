/*eslint-disable */

import  { useState, useEffect } from "react";
import "./HomeInfo.scss";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { IHomeInfo } from "../../models";
import {
  CloseOutlined,
  EditOutlined,
  CheckSquareOutlined,
  PlusCircleFilled,
} from "@ant-design/icons";
import axios from "../../axios/adminaxios";
import { editHomeInfo, getfetchHomeInfo } from "../../store/action/HomeAction";
import Swal from "sweetalert2";
const URL = process.env.REACT_APP_BASE_URL

export function HomeInfo() {
  const { HomeInfo } = useAppSelector((state: any) => state.HomeInfo);
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const [done, setDone] = useState(false);
  const [show, setShow] = useState(0);
  const [addImg, setAddImg] = useState<any>();
  const [editValue, setEditValue] = useState<any>({});

  let LocalValue: any;
  if (localStorage.getItem("language")) {
    let local: any = localStorage.getItem("language");
    LocalValue = JSON.parse(local);
  }
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
    formData.append("image", e.target.files[0]);
    
    
    if (formData.has("image")) {
      try {
        const response = await axios.post(`${URL}aeroSpace/addPicture`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setAddImg(response.data.dirname);
        
      } catch (error) {
        return "Server request is failed";
      }
    }
  }


  async function homeInfoEdit(index:number,obj:any){
   
    await dispatch(editHomeInfo(obj,index));
    await dispatch(getfetchHomeInfo());
    setShow(0);
    setAddImg("");
  }



  async function validateAndEditHomeInfo(index: number, ) {
    const obj ={
      ...editValue,
      logo:addImg,
  }
    if (!editValue?.title.trim()||!editValue?.readmore.trim()) {
      Swal.fire({
        title:(LocalValue==="AM"? 'չի կարող դատարկ լինել':"cannot be empty") ,
        icon: 'error',
        confirmButtonText:(LocalValue==="AM"? 'Լավ':"OK")})
    } else {
      await homeInfoEdit(index, obj);
    }

    
  }
 

  return (
    <div className="HomeInfo">
      <div className="homeInfoContainer" id="homeInfoContainer">
        {HomeInfo?.map((el: IHomeInfo, index: number) => {
          return (
            <div className="homeInfoItem" key={index}>
              {show !== index + 1 && <p className="homeInfoTitle">{el?.title}</p>}

              {show === index + 1 && (
                <div className="inputText">
                  <input
                    type={"text"}
                    value={editValue?.title}
                    onChange={(e) => {
                      setEditValue({
                        title: e.target.value,
                        readmore: editValue?.readmore,
                      });
                    }}
                  />
                </div>
              )}
              <div className="homeInfoImageDiv">
                <img src={ show === index + 1 && addImg || el?.logo} alt={el?.title} />
              </div>
              {show === index + 1 && done && (
                <div className="addImageBUtton">
                  <label htmlFor="addAuthorImage">
                    <PlusCircleFilled className="iconantd" />
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    id="addAuthorImage"
                    name="addAuthorImage"
                    value={""}
                    style={{ display: "none" }}
                    onChange={(e) => uploadImageHandler(e)}
                  />
                  <CloseOutlined className="iconantd" onClick={()=>{setShow(0)}} />
                  <CheckSquareOutlined className="iconantd" onClick={()=>{validateAndEditHomeInfo(index)}} />
                </div>
              )}
              {show !== index + 1 && (
                <div className="homeInfoButton">
                  <button
                    onClick={() => {
                      if (index === 1) {
                        sessionStorage.setItem("friend", "true");
                        navigate("/about");
                        setTimeout(() => {
                          sessionStorage.removeItem("friend");
                        }, 5000);
                      }
                    }}
                  >
                    {el?.readmore}
                  </button>
                </div>
              )}
              {show === index + 1 && (
                <div className="inputText">
                  <input
                    type={"text"}
                    value={editValue?.readmore}
                    onChange={(e) => {
                      setEditValue({
                        title: editValue?.title,
                        readmore: e.target.value,
                      });
                    }}
                  />
                </div>
              )}
              {done && show !== index + 1 && (
                <div className="editAuthorButton">
                  <EditOutlined
                    className="iconantd"
                    onClick={() => {
                      setEditValue({
                        title: el?.title,
                        readmore: el?.readmore,
                      });
                      setShow(index+1);
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
