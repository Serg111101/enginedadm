import "./HomeHeader.scss";

import { useAppSelector, useAppDispatch } from "../../hooks";
import {
  addHomeHeaderImages,
  deleteHomeHeaderImages,
  editHomeHeaderText,
  editeHomeHeaderImage,
  getfetchHomeHeader,
} from "../../store/action/HomeAction";
import { useState, useEffect } from "react";
import {
  CloseOutlined,
  EditOutlined,
  CheckSquareOutlined,
  PlusCircleFilled,
  DeleteOutlined,
} from "@ant-design/icons";
import axios from "axios";
import Swal from "sweetalert2";
const URL = process.env.REACT_APP_BASE_URL;

export function HomeHeader() {
  const { HomeHeaderr } = useAppSelector((state: any) => state.HomeHeaderr);
  const dispatch = useAppDispatch();
  const images: any = HomeHeaderr?.logo || [];
  const interval: number = 5000;
  const [currentImageIndex, setCurrentImageIndex] = useState<any>(0);
  const [done, setDone] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editValue, setEditValue] = useState("");
  const [addImg, setAddImg] = useState("");
  const [show, setShow] = useState(0);
  const [indexs, setIndexs] = useState<any>(0);
  const [addNewImage, setAddNewImage] = useState("");

  let LocalValue: any;
  if (localStorage.getItem("language")) {
    let local: any = localStorage.getItem("language");
    LocalValue = JSON.parse(local);
  }

  useEffect(() => {
    dispatch(getfetchHomeHeader());
  }, [dispatch]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex: any) => (prevIndex + 1) % images.length);
    }, interval);

    return () => {
      clearInterval(timer);
    };
  }, [images?.length, interval]);

  const doneShow = sessionStorage.getItem("done");
  useEffect(() => {
    if (!doneShow) {
      setDone(false)
    } else {
      setDone(JSON.parse(doneShow));

    }

  }, [doneShow]);



  async function validateAndEditHomeHeader() {
    if (!editValue.trim()) {
      Swal.fire({
        title:(LocalValue==="AM"? 'չի կարող դատարկ լինել':"cannot be empty") ,
        icon: 'error',
        confirmButtonText:(LocalValue==="AM"? 'Լավ':"OK")})
    } else {
      await dispatch(editHomeHeaderText(editValue));
      await dispatch(getfetchHomeHeader());
      setShowEdit(false);
    }


  }


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
  async function uploadImageHandleradd(e: any) {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    if (formData.has("image")) {
      try {
        const response = await axios.post(`${URL}aeroSpace/addPicture`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        setAddNewImage(response.data.dirname);
      } catch (error) {
        return "Server request is failed";
      }
    }

  }

  async function deleteHomeHeaderImage(index: number) {
    await dispatch(deleteHomeHeaderImages(index));
    await dispatch(getfetchHomeHeader());
    setIndexs(0);
    setAddImg("");
  }



  async function editImage(index: number) {
    await dispatch(editeHomeHeaderImage(index, addImg));
    await dispatch(getfetchHomeHeader());
    setShow(0);
    setAddImg("");

  }
  useEffect(() => {
  if (addNewImage !== undefined && addNewImage !== null && addNewImage && addNewImage.length) {
      dispatch(addHomeHeaderImages(addNewImage));
      dispatch(getfetchHomeHeader());
      setAddNewImage('')
    }
  }, [addNewImage,dispatch])


  return (
    <>
      {done === false ? (
        <div className="HomeHeader">
          <div
            className="HomeImageDiv"
            style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
          >
            <div className="homeHeaderP">
              <h1>{HomeHeaderr?.title}</h1>
            </div>
          </div>
        </div>
      ) : (
        <div className="HomeHeader">
          <div className="HomeImageDiv1">
            {HomeHeaderr?.logo?.map((el: string, index: number) => {
              return (
                <div key={index}>
                  <div className="imageContainer" key={index}>
                    <img
                      src={indexs === index && addImg ? addImg : el}
                      alt=" Home Slide"
                    />
                  </div>

                  <div className="addDeleteButton">
                    {show !== index + 1 && (
                      <div>
                        <EditOutlined
                          className="iconantd"
                          onClick={() => {
                            setShow(index + 1);
                            setIndexs(index);
                            setAddImg("");
                          }}
                        />
                      </div>
                    )}

                    {done && show === index + 1 && (
                      <>
                        <div>
                          <DeleteOutlined
                            className="iconantd"
                            onClick={() => deleteHomeHeaderImage(index)}
                          />
                        </div>
                        <label htmlFor="file">
                          <div className="uploadImage">
                            {addImg?.length <= 0 ? (
                              <label htmlFor="filess">
                                <PlusCircleFilled className="iconantd" />
                              </label>
                            ) : (
                              <CheckSquareOutlined
                                className="iconantd"
                                onClick={() => {
                                  editImage(index + 1);
                                }}
                              />
                            )}

                            {show === index + 1 && (
                              <input
                                value={""}
                                type="file"
                                onChange={(e) => {
                                  uploadImageHandler(e);
                                }}
                                accept="image/*"
                                id="filess"
                                name="filess"
                                style={{ display: "none" }}
                              />
                            )}
                          </div>
                        </label>
                        <CloseOutlined
                          className="iconantd"
                          onClick={() => {
                            setShow(0);
                            setIndexs(0);
                            setAddImg("");
                          }}
                        />
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="addButton">
            <label htmlFor="filesss">
              <PlusCircleFilled
                className="iconantd"

              />
              <input
                value={""}
                type="file"
                onChange={(e) => {
                  uploadImageHandleradd(e);
                }}
                accept="image/*"
                id="filesss"
                name="filesss"
                style={{ display: "none" }}
              />
            </label>
          </div>
          {showEdit && (
            <div className="inputt">
              <input
                type="text"
                className="inputValue"
                value={editValue}
                onChange={(e) => {
                  setEditValue(e.target.value);
                }}
              />
              <div className="buttons">
                <CheckSquareOutlined
                  className="iconantd"
                  onClick={() => validateAndEditHomeHeader()}
                />
                <CloseOutlined
                  className="iconantd"
                  onClick={() => {
                    setShowEdit(false);
                    setIndexs(0);
                  }}
                />
              </div>
            </div>
          )}
          <div className="textHomeEdit">
            {!showEdit && HomeHeaderr?.logo?.length > 0 && (
              <div className="homeHeaderP">
                <h1>{HomeHeaderr?.title}</h1>
              </div>
            )}
            {done && !showEdit && (
              <div>
                <EditOutlined
                  className="iconantd"
                  onClick={() => {
                    setShowEdit(true);
                    setEditValue(HomeHeaderr?.title);
                  }}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
