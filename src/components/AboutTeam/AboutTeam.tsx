import  { useEffect, useState } from "react";
import "./AboutTeam.scss";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { editeTeam, editeTeamImage, getFetchAbout } from "../../store/action/AboutAction";
import {
  CloseOutlined,
  EditOutlined,
  CheckSquareOutlined,
  PlusCircleFilled,
} from "@ant-design/icons";
import axios from "axios";
import Swal from "sweetalert2";

interface IAboutTeam {
  show: boolean;
  setShow: (show: boolean) => void;
  id: any;
}
const URL = process.env.REACT_APP_BASE_URL;

export function AboutTeam({ show, setShow, id }: IAboutTeam) {
  const { About } = useAppSelector((state) => state.About);
  const [done, setDone] = useState(false);
  const [editeValue, setEditValue] = useState<any>({});
  const [addImg, setAddImg] = useState<any>("");
  const [shows, setShows] = useState<any>("");
  const url = window.location.href;
  const dispatch = useAppDispatch();
let LocalValue: any;
  if (localStorage.getItem("language")) {
    let local: any = localStorage.getItem("language");
    LocalValue = JSON.parse(local);
  }

  useEffect(() => {
    setDone(sessionStorage.getItem("done") === "true");
  }, [url]);

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        setShow(false);
      }, 50000);
      return () => clearTimeout(timer);
    }
  }, [show, setShow]);

  useEffect(() => {
    dispatch(getFetchAbout());
  }, [dispatch]);

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
  async function editAbout(id: number) {
    await dispatch(editeTeam(id, editeValue));
    await dispatch(getFetchAbout());
    setShows('');
    setAddImg("");
  }

  async function saveAboutImage(id: number) {
    await dispatch(editeTeamImage(id, addImg))
    await dispatch(getFetchAbout());
    setShows("");
    setAddImg("");
  }

  async function validateAndAddTeam(id: number) {
    if (!addImg) {
      Swal.fire({
        title:(LocalValue==="AM"? 'չի կարող դատարկ լինել':"cannot be empty") ,
        icon: 'error',
        confirmButtonText:(LocalValue==="AM"? 'Լավ':"OK")})
    }
    else {
      await saveAboutImage(id);
    }

  }

  async function validateAndEditTeam(id: number) {


    if (!editeValue?.title?.trim() || !editeValue?.text?.trim() || !editeValue?.more?.trim()) {
      Swal.fire({
        title:(LocalValue==="AM"? 'չի կարող դատարկ լինել':"cannot be empty") ,
        icon: 'error',
        confirmButtonText:(LocalValue==="AM"? 'Լավ':"OK")})
    }
    else {
      await editAbout(id);
    }
 
  }




  return (
    <div className="AboutTeam">
      <section className="aboutSection">
        <div className="aboutSectionContainer">
          <div className="bigimg">
            <img src={addImg && shows === About[0]?.id ? addImg : About[0]?.image} alt="AboutImage" />
            {done && shows !== About[0]?.id && <EditOutlined className="iconantd" onClick={() => setShows(About[0]?.id)} />}

            {done && About[0]?.id === shows && (
              <div className="uploadImage" >
                <label htmlFor="file">
                  <>
                    <label htmlFor="file">
                      <PlusCircleFilled className="iconantd" />
                    </label>
                    <input
                      value={""}
                      type="file"
                      onChange={(e) => {
                        uploadImageHandler(e);
                      }}
                      accept="image/*"
                      id="file"
                      name="file"
                      style={{ display: "none" }}
                    />

                  </>
                </label>
                <CloseOutlined className="iconantd" onClick={() => { setShows(""); setAddImg("") }} />
                <CheckSquareOutlined className="iconantd" onClick={() => validateAndAddTeam(About[0]?.id)} />
              </div>
            )}
          </div>

          <div className="items">
            {About.map((el, index) => {
              if (el.id !== 1) {
                return (
                  <div key={index} className="aboutInfoBlock">
                    <img src={addImg && el?.id === shows ? addImg : el?.image} alt={el?.title} />
                    {done && shows === el?.id && el?.text === null && el?.title === null && (
                      <div className="uploadImage" >
                        <label htmlFor="file">
                          <>
                            <label htmlFor="file">
                              <PlusCircleFilled className="iconantd" />
                            </label>
                            <input
                              value={""}
                              type="file"
                              onChange={(e) => {
                                uploadImageHandler(e);
                              }}
                              accept="image/*"
                              id="file"
                              name="file"
                              style={{ display: "none" }}
                            />

                          </>
                        </label>
                        <CloseOutlined className="iconantd" onClick={() => { setShows(""); setAddImg("") }} />
                        <CheckSquareOutlined className="iconantd" onClick={() => validateAndAddTeam(el?.id)} />
                      </div>
                    )}

                    {el?.title !== null && el?.id !== shows && (
                      <h3 className="InfoBlockTitle">{el?.title}</h3>
                    )}

                    {shows===el?.id &&
                      // editeValue.title === el?.title &&
                      el?.text !== null &&
                      el?.title !== null && (
                        <div>

                          <input
                            type="text"
                            value={editeValue?.title}
                            onChange={(e) =>
                              setEditValue({
                                title: e.target.value,
                                text: editeValue?.text,
                                more: editeValue?.more,
                              })
                            }
                          />
                        </div>
                      )}
                    {el?.text !== null && el?.title !== null && shows !== el?.id && (
                      <p className="InfoBlockparagraph">{el?.text}</p>
                    )}

                    {shows &&
                      shows === el?.id &&
                      el.text !== null && (
                        <div>

                          <textarea
                            cols={30}
                            rows={10}
                            value={editeValue?.text}
                            onChange={(e) =>
                              setEditValue({
                                title: editeValue?.title,
                                text: e.target.value,
                                more: editeValue?.more,
                              })
                            }
                          />
                        </div>
                      )}

                    {el.id === 2 ? (
                      <div>
                        {el?.more !== null && shows !== el?.id && (
                          <button onClick={() => setShow(!show)}>
                            {el?.more}
                          </button>
                        )}
                        {shows &&
                          shows === el?.id &&
                          el.more !== null && (
                            <div>

                              <input
                                value={editeValue?.more}
                                onChange={(e) =>
                                  setEditValue({
                                    title: editeValue?.title,
                                    text: editeValue?.text,
                                    more: e.target.value,
                                  })
                                }
                              />
                              <div className="okCloseButton" >

                                <CloseOutlined onClick={() => { setShows(''); setAddImg("") }} className="iconantd" />
                                <CheckSquareOutlined className="iconantd" onClick={() => validateAndEditTeam(el?.id)} />
                              </div>
                            </div>
                          )}
                      </div>
                    ) : (
                      <div>
                        {el?.more !== null && shows !== el?.id && (
                          <button>{el?.more}</button>
                        )}

                        {shows &&
                          shows === el?.id &&

                          el.more !== null && (
                            <div>
                              <input
                                value={editeValue?.more}
                                onChange={(e) =>
                                  setEditValue({
                                    title: editeValue?.title,
                                    text: editeValue?.text,
                                    more: e.target.value,
                                  })
                                }
                              />
                              <div className="okCloseButton" >

                                <CloseOutlined onClick={() => { setShows(''); setAddImg("") }} className="iconantd" />
                                <CheckSquareOutlined className="iconantd" onClick={() => validateAndEditTeam(el?.id)} />
                              </div>
                            </div>

                          )}
                      </div>
                    )}

                    <div className="editebutton">
                      {done && shows !== el?.id && <EditOutlined
                        className="iconantd"
                        onClick={() => {
                          setEditValue({
                            title: el?.title,
                            text: el?.text,
                            more: el?.more,
                          });
                          setShows(el?.id);
                        }}
                      />}
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
