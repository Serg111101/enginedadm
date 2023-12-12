import React, { useEffect, useState } from "react";
import { PlusCircleFilled, EditOutlined, CloseOutlined, CheckSquareOutlined ,DeleteOutlined} from "@ant-design/icons";
import "./EditFooter.scss";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getFetchLogo } from "../../store/action/LogoAction";
import { addFooterSociall, editFooter, editFooterSociall, getFetchFooter,DeleteFooter } from "../../store/action/FooterAction";
import axios from "axios";
import Swal from "sweetalert2";
const URL = process.env.REACT_APP_BASE_URL;


function EditFooter() {
  const url = window.location.href;
  const { Footer } = useAppSelector((state: any) => state.Footer);
  const { Logo } = useAppSelector((state: any) => state.Logo);
  const [done, setDone] = useState<boolean>(false);
  const [show, setShow] = useState<any>(0);
  const [value, setValue] = useState<string>("");
  const [addImg, setAddImg] = useState("");
  const [editValue, setEditValue] = useState<any>({});
  const [addShow, setAddShow] = useState(false);
  const [addValue, setAddValue] = useState<any>({});
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getFetchLogo());
    dispatch(getFetchFooter());
  }, [dispatch]);

  useEffect(() => {
    setDone(sessionStorage.getItem("done") === "true");
  }, [url]);


  async function editFooterr(id: number) {
    if (!value.trim()) {
      Swal.fire({
        title: (LocalValue === "AM" ? 'չի կարող դատարկ լինել' : "cannot be empty"),
        icon: 'error',
        confirmButtonText: (LocalValue === "AM" ? 'Լավ' : "OK")
      })
    } else {
      await dispatch(editFooter(id, value));
      await dispatch(getFetchFooter());
      await dispatch(getFetchLogo());
    }
  }

async function editSocial(id: number) {
    if (!editValue?.title?.trim() || !editValue?.text?.trim()) {
      Swal.fire({
        title: (LocalValue === "AM" ? 'չի կարող դատարկ լինել' : "cannot be empty"),
        icon: 'error',
        confirmButtonText: (LocalValue === "AM" ? 'Լավ' : "OK")
      })
    }
    else {
      const obj = {
        ...editValue,
        logo: addImg||editValue?.logo,
      }
      await dispatch(editFooterSociall(id, obj));
      await dispatch(getFetchFooter());
      await dispatch(getFetchLogo());
      setShow(0)
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

async function addSocialItems() {
  if (!addValue?.text?.trim() || !addValue?.title?.trim() || !addImg) {
    Swal.fire({
      title: (LocalValue === "AM" ? 'չի կարող դատարկ լինել' : "cannot be empty"),
      icon: 'error',
      confirmButtonText: (LocalValue === "AM" ? 'Լավ' : "OK")
    })
  } else {
    const obj = {
      ...addValue,
      logo: addImg || addValue?.logo,
    }
    await dispatch(addFooterSociall(obj));
    await dispatch(getFetchFooter());
    setAddValue({});
    setAddShow(false);
    setAddImg("");
  }
}
async function deleteFooter(id:number) {
  await dispatch(DeleteFooter(id))
  await dispatch(getFetchFooter())
}
let LocalValue: any;
if (localStorage.getItem("language")) {
  let local: any = localStorage.getItem("language");
  LocalValue = JSON.parse(local);
}


return (
  <section className="globalEditFooter">
    <div className="editfooter">
      <div className="containerFooter">
        <div className="imageFooter">
          <img src={Logo?.logo ? Logo?.logo : Footer[0]?.logo} alt={Footer[0]?.title} />
        </div>
        {show !==Footer[0]?.id && <div className="item"><p>{Footer[0]?.text}</p></div>}
        {show !==Footer[0]?.id && (
          <button onClick={() => { setShow(Footer[0]?.id); setValue(Footer[0]?.text); }}><EditOutlined className="iconantd" /></button>
        )}
        {done && show === Footer[0]?.id && (
          <div className="item">
            <input type="text" name="text" value={value} id="text" onChange={(e) => setValue(e.target.value)} />

            <div className="deleteButton" onClick={() => setShow(0)}><CloseOutlined className="iconantd" /></div>
            <div className="okButton" onClick={() => { editFooterr(Footer[0]?.id); setShow(0); }}><CheckSquareOutlined className="iconantd" /></div>
          </div>
        )}
        <div className="socialItem" id="socialItem">
          {Footer?.map((el: any, index: number) => {
            return index > 0 && (
              <div key={index}>
                <div className="socialLogo" title={el?.title}>
                  <a href={el?.text} target="_black">
                    <img src={addImg && show === el?.id ? addImg : el?.logo} alt={el?.title} />
                  </a>
                  {done && el?.id === show && (
                    <div className="uploadImage" >
                      <div>
                        <label htmlFor="file">
                          <div className="fIlePlus" >
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

                          </div>
                        </label>
                      </div>

                    </div>
                  )}


                  {show !== el?.id && <div className="editButton" > 
                  <DeleteOutlined className="iconantd" onClick={()=>{
                    deleteFooter(el?.id)
                  }}/>
                  <EditOutlined className="iconantd" onClick={() => {
                    setShow(el?.id); setEditValue({
                      text: el?.text,
                      title: el?.title,
                      logo: el?.logo
                    })
                  }}/></div>}

                </div>
                {done && show === el?.id && (
                  <div  >
                    <div>  <input
                      type="text"
                      value={editValue?.text}
                      onChange={(e) => setEditValue({
                        title: editValue?.title,
                        text: e.target.value,
                        logo: editValue?.logo
                      })}
                      required={true}
                    />
                    </div>

                  </div>
                )}
                {done && show === el?.id && (
                  <div  >
                    <div>  <input
                      type="text"
                      value={editValue?.title}
                      onChange={(e) => setEditValue({
                        title: e.target.value,
                        text: editValue?.text,
                        logo: editValue?.logo
                      })}
                      required={true}
                    />
                    </div>
                    <div className="okCloseButton" >

                      <CloseOutlined className="iconantd" onClick={() => setShow(0)} />
                      <CheckSquareOutlined className="iconantd" onClick={() => { editSocial(el?.id) }} />

                    </div>
                  </div>
                )}

              </div>
            );
          })}
          {!addShow && (
            <div className="addIcon">

              <p>{LocalValue === "AM" ? 'Ավելացնել նորը' : 'Add new'}  </p>
              <div>
                <PlusCircleFilled
                  onClick={() => setAddShow(true)}
                  className="iconantd"
                />
              </div>
            </div>
          )}

          {done && addShow && (
            <div className="addPerson">
              <label htmlFor="fil">
                <div className="addImageDiv">
                  <input
                    value={""}
                    type="file"
                    onChange={(e: any) => {
                      uploadImageHandler(e);
                    }}
                    accept="image/*"
                    id="fil"
                    name="fil"
                    style={{ display: "none" }}
                  />
                  {addImg?.length > 0 ? <img src={addImg} alt="Upload " /> : <></>}
                </div>
              </label>
              <div className="addTextInput">
                <input
                  type="text"
                  placeholder="add Navigate Link"
                  value={addValue.title}
                  onChange={(e) => {
                    setAddValue({
                      logo: addImg,
                      text: addValue.text,
                      title: e.target.value,
                    });
                  }}
                />
                <input
                  type="text"
                  placeholder="add Icon Title"
                  value={addValue.text}
                  onChange={(e) => {
                    setAddValue({
                      logo: addImg,
                      text: e.target.value,
                      title: addValue.title,
                    });
                  }}
                />
                <div className="saveButton">
                  <CloseOutlined
                    className="iconantd"
                    onClick={() => {
                      setAddShow(false); setAddImg("");
                      setAddValue({});
                    }}
                  />
                  <CheckSquareOutlined
                    className="iconantd"
                    onClick={() => addSocialItems()
                    }
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  </section>
);
}

export { EditFooter };
