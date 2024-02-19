import "./Satellites.scss";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getFetchSatellites } from "../../store/action/SatelitesAction";
import { getFetchQuizSatelite } from "../../store/action/QuizSateliteAction";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../components/Loading/Loading";
import DeleteAll from "../../components/DeleteComponent";
import axios from "../../axios/adminaxios";
import { CloseOutlined, EditOutlined, CheckSquareOutlined, PlusCircleFilled, DeleteOutlined, } from "@ant-design/icons";
import ReactPlayer from "react-player";
const URL = process.env.REACT_APP_BASE_URL;
let LocalValue: any;
if (localStorage.getItem("language")) {
  let local: any = localStorage.getItem("language");
  LocalValue = JSON.parse(local);
}

export function Satellites() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [upload, setupload] = useState<any>();
  const [loadingVideo, setLoadingVideo] = useState<any>();
  const { Satellites, loading } = useAppSelector((state: any) => state.Satellites);
  const background = Satellites?.background;
  
  const [done, setDone] = useState(false);
  const [value, setValue] = useState<any>();
  const [edit, setEdit] = useState(["", -1]);
  const [added, setAdd] = useState<any>("");
  const doneShow = sessionStorage.getItem("done");

  useEffect(() => {
    dispatch(getFetchSatellites());
    dispatch(getFetchQuizSatelite());
  }, [dispatch]);

  useEffect(() => {
    if (!doneShow) {
      setDone(false);
    } else {
      setDone(JSON?.parse(doneShow));
    }
  }, [doneShow]);

  function navigateTo() {
    if (!done) {
      navigate("/SatelliteQuiz");

    } else {
      navigate("/EditSatelliteQuiz");

    }
  }

  async function VideoUpload(e: any, name: any) {
    if (e) {
      const formData = new FormData();
      const videofile = e.target.files[0];
      formData.append("video", videofile);
      formData.append("title", "A beautiful video!");
      try {
        setLoadingVideo(name)
        const response = await axios.post(`${URL}aeroSpace/addVideo`, formData, {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        });

        setupload(response.data.dirname);
        setLoadingVideo('')
      } catch (error) {
        return "Server request is failed";
      }
    }
  }

  async function handleSubmit(name: string) {
    let name1 = name;
    await axios.put(`${URL}aeroSpace/editSatellite/${LocalValue ? LocalValue : "AM"}/1`, {
      [name1]: upload,
    });
    dispatch(getFetchSatellites());
    setupload("");
  }

  async function saveData(name: any, i: any) {
    let newarr;
    if (typeof Satellites[name] === "string") {
      newarr = Satellites[name];
      newarr = value[0];
    } else {
      newarr = [...Satellites[name]];
      newarr[i] = value;
    }

    await axios.put(`${URL}aeroSpace/editSatellite/${LocalValue ? LocalValue : "AM"}/1`, {
      [name]: newarr,
    });

    await dispatch(getFetchSatellites());
    setEdit(["", -1]);
    setValue("");
  }
  async function add(name: string, value: string) {
    await axios.put(`${URL}aeroSpace/editSatellite/${LocalValue ? LocalValue : "AM"}/1`, {
      [name]: [value],
    });
    setValue("");
    setAdd("");
    dispatch(getFetchSatellites());
  }
  async function deleteItemmm(name: string, index: number, id: number) {
    await axios.delete(
      `${URL}aeroSpace/deleteSatellite/${LocalValue ? LocalValue : "AM"
      }/${id}/${name}/${index}`
    );
    dispatch(getFetchSatellites());
  }


  async function deleteItemm( name:string,index:number, id: number) {
    try {
        await DeleteAll({
            title: LocalValue === 'AM' ? "Ցանկանում եք ջնջե՞լ" : 'Do you want to delete?',
            text: LocalValue === 'AM' ? "Ջնջելու դեպքում վերականգնել չեք կարող" : 'If you delete it, you cannot restore it',
            deleteItem: () => deleteItemmm(name,index, id)
        });


    } catch (error) {
        console.error(error);

    }

}


  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div
          className="Satellites"
          style={{ background: `url(${background})` }}
        >
          <div className="satcontainer">
            {edit[0] === "title" && done === true ? (
              <>
                <div className="inputcont">
                  <input type="text" className="input" value={value} onChange={(e) => setValue([e.target.value])} />
                </div>


                <div className="okCloseButton" >
                  <CloseOutlined className="iconantd" onClick={() => setEdit([" "])} />
                  <CheckSquareOutlined className="iconantd" onClick={() => saveData("title", value)} />
                </div>
              </>
            ) : 
              <div className="editBlock">
                <h1>{Satellites?.title}</h1>
                {done && Satellites.title && (
                  <div className="editbutton" >
                    <EditOutlined className="iconantd" onClick={() => { setEdit(["title", 1]); setValue(Satellites.title); setAdd(""); }} />
                  </div>
                )}
              </div>
            }
          </div>
          {Satellites?.text1?.map((el: any, i: number) => 
            <div className="satcontainer" key={i}>
              {edit[0] === "text1" && edit[1] === i && done ? (
                <>
                  <div className="inputcont">
                    <input type="text" className="input" value={value} onChange={(e) => { setValue(e.target.value); }} />
                  </div>
                  <div className="okCloseButton" >
                    <CloseOutlined className="iconantd" onClick={() => setEdit([" ", i])} />
                    <CheckSquareOutlined className="iconantd" onClick={() => saveData("text1", i)} />
                  </div>
                </>
              ) : (
                <div className="editBlock">
                  <p>{el}</p>
                  {done && <>
                    <div className="editbutton1" >
                      <DeleteOutlined className="iconantd" onClick={() => { deleteItemm("text1", i, Satellites.id); }} />
                      <EditOutlined className="iconantd" onClick={() => { setEdit(["text1", i]); setValue(el); setAdd(""); }} />
                    </div>


                  </>}
                </div>
              )}
            </div>
          )}
          <div className="addsatcontainer">
            {added === "text1" && done && 
              <>
                <div className="inputcont">
                  <input type="text" className="input" onChange={(e) => { setValue(e.target.value); }} />
                </div>
                <div className="editbutton1" >
                  <CloseOutlined className="iconantd" onClick={() => setAdd("")} />
                  <CheckSquareOutlined className="iconantd" onClick={() => add("text1", value)} />
                </div>

              </>
            }
            {Satellites.text1 && done && added === '' && (
              <div className="editbutton" >
                <PlusCircleFilled className="iconantd" onClick={() => { setAdd("text1"); setEdit(["", -1]); }} />
              </div>
            )}
          </div>
          {loadingVideo==='video1' ? <h2 className="editbutton">Loading...</h2> : <ReactPlayer key={1} url={upload ? upload : Satellites?.animationCubeSat1} width="100%" height="auto" controls={true} autoplayer={"false"} />}
          <div className="editbutton1">
            {!upload && Satellites?.animationCubeSat1 && done && (
              <DeleteOutlined className="iconantd" onClick={() => { deleteItemmm("animationCubeSat1", 0, Satellites.id); }} />
            )}
            {!upload && done && (
              <label htmlFor="video1" >
                {LocalValue === "AM" ? "Ներբեռնել վիդեո" : "Upload video"} {<PlusCircleFilled className="iconantd" />}
              </label>
            )}


            <input type="file" accept="video/*" style={{ display: "none" }} id="video1" name="video1" onChange={(e) => VideoUpload(e, 'video1')} />

            {done && upload && (
              <div className="editbutton1" >
                <CloseOutlined className="iconantd" onClick={() => { setupload(""); setAdd("") }} />
                <CheckSquareOutlined className="iconantd" onClick={() => handleSubmit("animationCubeSat1")} />
              </div>
            )}
          </div>

          {Satellites?.text2?.map((el: any, i: number) => 
            <div key={i} className="satcontainer">
              {done && edit[0] === "text2" && edit[1] === i ?
                <>
                  <div className="inputcont">
                    <input
                      type="text"
                      className="input"
                      value={value}
                      onChange={(e) => {
                        setValue(e.target.value);
                      }}
                    /> </div>
                  <div className="editbutton1">
                    <CloseOutlined onClick={() => setEdit([" ", i])} className="iconantd" />

                    <CheckSquareOutlined onClick={() => saveData("text2", i)} className="iconantd" />
                  </div>

                </> : 
                  <div className="editBlock">
                    <p>{el}</p>
                   { done &&  <>
                    <div className="editbutton1">
                    <DeleteOutlined
                        className="iconantd"
                        onClick={() => {
                          deleteItemmm("text2", i, Satellites.id);
                        }}
                      />
                      <EditOutlined onClick={() => {
                        setEdit(["text2", i]);
                        setValue(el);
                        setAdd("");
                      }} className="iconantd" />
                      
                    </div>
                    </>}
                  </div>
                }
              {edit[0] === "text2" && edit[1] === i && done && <div></div>}
            </div>
          )}
          <div className="addsatcontainer">
            {added === "text2" && done && (
              <><div className="inputcont">
                <input
                  type="text"
                  className="input"
                  onChange={(e) => {
                    setValue(e.target.value);
                  }}
                />
              </div>
                <div className="editbutton1">
                  <CloseOutlined onClick={() => setAdd("")} className="iconantd" />
                  <CheckSquareOutlined onClick={() => add("text2", value)} className="iconantd" />
                </div>
              </>
            )}
            {added === '' && done && 
              <div className="editbutton">
                <PlusCircleFilled onClick={() => {
                  setAdd("text2");
                  setEdit(["", -1]);
                }} className="iconantd" />
              </div>
            }
          </div>

          {Satellites?.margin_text1?.map((el: any, i: number) => 
            <div key={i} className="satcontainer">
              {edit[0] === "margin_text1" && edit[1] === i && done ? (
                <>
                  <div className="inputcont">
                    <input
                      type="text"
                      value={value}
                      className="input"
                      onChange={(e) => {
                        setValue(e.target.value);
                      }}
                    />
                  </div>

                  <div className="editbutton1">
                    <CloseOutlined onClick={() => setEdit([" ", i])} className="iconantd" />
                    <CheckSquareOutlined onClick={() => saveData("margin_text1", i)} className="iconantd" />
                  </div>
                </>
              ) : 
                <>
                  <div className="editBlock">
                    <p className="margin_text">{el}</p>
                     {done &&
                      <div className="editbutton1">
                         <DeleteOutlined
                          onClick={() => {
                            deleteItemmm("margin_text1", i, Satellites.id);
                          }}
                          className="iconantd"
                        />

                        <EditOutlined onClick={() => {
                          setEdit(["margin_text1", i]);
                          setValue(el);
                          setAdd("");
                        }} className="iconantd" />

                       
                      </div>
                    }
                  </div>
                </>}
            </div>
          )}
          <div className="addsatcontainer">
            {added === "margin_text1" && done && 
              <><div className="inputcont">
                <input
                  type="text"
                  className="input"
                  onChange={(e) => {
                    setValue(e.target.value);
                  }}
                />
              </div>
                <div className="editbutton1" >
                  <CloseOutlined onClick={() => setAdd("")} className="iconantd" />
                  <CheckSquareOutlined onClick={() => add("margin_text1", value)} className="iconantd" />

                </div>
              </>
          }
            {added === '' && done && (
              <div className="editbutton">
                <PlusCircleFilled onClick={() => {
                  setAdd("margin_text1");
                  setEdit(["", -1]);
                }} className="iconantd" />
              </div>
            )}
          </div>

          {loadingVideo==='video2' ? <h2 className="editbutton">Loading...</h2> : <ReactPlayer
            key={2}
            url={upload || Satellites?.animationCubeSat2}
            width="100%"
            height="auto"
            controls={true}
            autoplayer={"false"}
          />}
          <div className="satcontainer">
            <div className="editBlock">


              {!upload && done && added === '' && 
                <div className="editbutton1">
                  <DeleteOutlined
                    className="iconantd"
                    onClick={() => {
                      deleteItemmm("animationCubeSat2", 0, Satellites.id);
                    }}
                  />

                  <div>
                    <label htmlFor="video2" >
                      {LocalValue === "AM" ? "Ներբեռնել վիդեո" : "Upload video"}  <PlusCircleFilled className="iconantd" />
                    </label>

                    <input
                      type="file"
                      accept="video/*"
                      style={{ display: "none" }}
                      id="video2"
                      name="video2"
                      onChange={(e) => VideoUpload(e, 'video2')}
                    />
                  </div>
                </div>}

              {upload && done && (
                <div className="editbutton1">
                  <CloseOutlined onClick={() => { setAdd(''); setupload('') }} className="iconantd" />
                  <CheckSquareOutlined onClick={() => handleSubmit("animationCubeSat2")} className="iconantd" />
                </div>
              )}
            </div>
          </div>
          {Satellites?.text3?.map((el: any, i: number) => (
            <div key={i} className="satcontainer">
              {edit[0] === "text3" && done && edit[1] === i ? (
                <>
                  <div className="inputcont">
                    <input
                      type="text"
                      className="input"
                      value={value}
                      onChange={(e) => {
                        setValue(e.target.value);
                      }}
                    />
                  </div>

                  <div className="editbutton1" >
                    <CloseOutlined className="iconantd" onClick={() => setEdit([" ", i])} />

                    <CheckSquareOutlined className="iconantd" onClick={() => saveData("text3", i)} />
                  </div>
                </>
              ) : 
                <div className="editBlock">
                  {i === 0 ? <h2>{el}</h2> : <p>{el}</p>}
                  {Satellites.text3 && done && (
                    <div className="editbutton1" >

<DeleteOutlined
                        className="iconantd"
                        onClick={() => {
                          deleteItemmm("text3", i, Satellites.id);
                        }}
                      />
                      <EditOutlined className="iconantd" onClick={() => {
                        setEdit(["text3", i]);
                        setValue(el);
                        setAdd("");
                      }} />
                    
                    </div>
                  )}
                </div>
              }
            </div>
          ))}
          <div className="addsatcontainer">
            {added === "text3" && 
              <>
                <div className="inputcont">
                  <input
                    type="text"
                    className="input"
                    onChange={(e) => {
                      setValue(e.target.value);
                    }}
                  />
                </div>
                <div className="editbutton1" >
                  <CloseOutlined className="iconantd" onClick={() => setAdd("")} />

                  <CheckSquareOutlined className="iconantd" onClick={() => add("text3", value)} />
                </div>
              </>
          }
            {Satellites.text3 && added === "" && done && (
              <div className="editbutton" >
                <PlusCircleFilled onClick={() => {
                  setAdd("text3");
                  setEdit(["", -1]);
                }} className="iconantd" />
              </div>
            )}
          </div>
          {Satellites?.margin_text2?.map((el: any, i: number) => (
            <div key={i} className="satcontainer">
              {edit[0] === "margin_text2" && done && edit[1] === i ? (
                <>
                  <div className="inputcont">
                    <input
                      type="text"
                      className="input"
                      value={value}
                      onChange={(e) => {
                        setValue(e.target.value);
                      }}
                    />
                  </div>

                  <div className="editbutton1" >
                    <CloseOutlined className="iconantd" onClick={() => setEdit([" ", i])} />
                    <CheckSquareOutlined className="iconantd" onClick={() => saveData("margin_text2", i)} />
                  </div>

                </>
              ) : 
                <div className="editBlock">
                  <p className="margin_text">{el}</p>
                  {Satellites.margin_text2 && done && (
                    <div className="editbutton1" >
                        <DeleteOutlined
                        className="iconantd"
                        onClick={() => {
                          deleteItemmm("margin_text2", i, Satellites.id);
                        }}
                      />

                      <EditOutlined className="iconantd" onClick={() => {
                        setEdit(["margin_text2", i]);
                        setValue(el);
                        setAdd("");
                      }} />
                    
                    </div>
                  )}
                </div>
              }
            </div>
          ))}
          <div className="addsatcontainer">
            {added === "margin_text2" && done && (
              <>
                <div className="inputcont">
                  <input
                    type="text"
                    onChange={(e) => {
                      setValue(e.target.value);
                    }}
                  />
                </div>
                <div className="editbutton1" >
                  <CloseOutlined onClick={() => setAdd("")} className="iconantd" />
                  <CheckSquareOutlined onClick={() => add("margin_text2", value)} className="iconantd" />
                </div>
              </>
            )}
            {Satellites.margin_text2 && added === "" && done && (
              <div className="editbutton" >
                <PlusCircleFilled className="iconantd" onClick={() => {
                  setAdd("margin_text2");
                  setEdit(["", -1]);
                }} />
              </div>
            )}
          </div>
          {Satellites?.text4?.map((el: any, i: number) => (
            <div key={i} className="satcontainer">
              {edit[0] === "text4" && done && edit[1] === i ? (
                <>
                  <div className="inputcont">
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => {
                        setValue(e.target.value);
                      }}
                    />
                  </div>
                  <div className="editbutton1" >
                    <CloseOutlined onClick={() => setEdit(["", i])} className="iconantd" />

                    <CheckSquareOutlined onClick={() => saveData("text4", i)} className="iconantd" />
                  </div>
                </>
              ) : 
                <div className="editBlock">
                  {i === 0 ? <h2>{el}</h2> : <p>{el}</p>}
                  {done && <div className="editbutton1" >
                  <DeleteOutlined
                      className="iconantd"
                      onClick={() => {
                        deleteItemmm("text4", i, Satellites.id);
                      }}
                    />
                  
                  
                    <EditOutlined className="iconantd" onClick={() => {
                      setEdit(["text4", i]);
                      setValue(el);
                      setAdd("");
                    }} />
                  
                  </div>
                  }
                </div>
              }
            </div>
          ))}
          <div className="addsatcontainer">
            {added === "text4" && done && (
              <>
                <div className="inputcont">

                  <input
                    type="text"
                    onChange={(e) => {
                      setValue(e.target.value);
                    }}
                  />
                </div>

                <div className="editbutton1" >
                  <CloseOutlined onClick={() => setAdd("")} className="iconantd" />
                  <CheckSquareOutlined onClick={() => add("text4", value)} className="iconantd" />
                </div>
              </>

            )}
            {Satellites.text4 && added === "" && done && (
              <div
                className="editbutton">
                <PlusCircleFilled onClick={() => {
                  setAdd("text4");
                  setEdit(["", -1]);
                }} className="iconantd" />
              </div>
            )}
          </div>

          {Satellites?.margin_text3?.map((el: any, i: number) => (
            <div key={i} className="satcontainer">
              {edit[0] === "margin_text3" && edit[1] === i && done ? (
                <>
                  <div className="inputcont">

                    <input
                      type="text"
                      value={value}
                      onChange={(e) => {
                        setValue(e.target.value);
                      }}
                    />
                  </div>

                  <div className="editbutton1" >
                    <CloseOutlined className="iconantd" onClick={() => setEdit([" ", i])} />
                    <CheckSquareOutlined onClick={() => saveData("margin_text3", i)} className="iconantd" />
                  </div>

                </>
              ) : 
                <div className="editBlock">
                  <p className="margin_text">{el}</p>
                  {
                    done && <>
                      <div
                        className="editbutton1">
                          <DeleteOutlined
                          className="iconantd"
                          onClick={() => {
                            deleteItemmm("margin_text3", i, Satellites.id);
                          }}
                        />

                        <EditOutlined onClick={() => {
                          setEdit(["margin_text3", i]);
                          setValue(el);
                          setAdd("");
                        }} className="iconantd" />
                        
                      </div>
                    </>

                  }
                </div>
              }
            </div>
          ))}

          <div className="addsatcontainer">
            {added === "margin_text3" && done && (
              <>
                <div className="inputcont">
                  <input
                    type="text"
                    onChange={(e) => {
                      setValue(e.target.value);
                    }}
                  />
                </div>

                <div className="editbutton1" >
                  <CloseOutlined onClick={() => setAdd("")} className="iconantd" />
                  <CheckSquareOutlined onClick={() => add("margin_text3", value)} className="iconantd" />
                </div>

              </>
            )}
            {Satellites.margin_text3 && done && (
              <div
                className="editbutton"

              >
                <PlusCircleFilled onClick={() => {
                  setAdd("margin_text3");
                  setEdit(["", -1]);
                }} className="iconantd" />
              </div>
            )}
          </div>

          {loadingVideo ==='video3'? <h2 className="editbutton">Loading...</h2> : <ReactPlayer
            key={3}
            url={upload || Satellites?.animationCubeSat3}
            width="100%"
            height="auto"
            controls={true}
            autoplayer={"false"}
          />}
          {!upload && done && added === '' && (
            <div className="editbutton1">
              <DeleteOutlined
                className="iconantd"
                onClick={() => {
                  deleteItemmm("animationCubeSat3", 0, Satellites.id);
                }}
              />

              <label htmlFor="video3" >
                {LocalValue === "AM" ? "Ներբեռնել վիդեո" : "Upload video"} <PlusCircleFilled className="iconantd" />
              </label>

              <input
                type="file"
                accept="video/*"
                style={{ display: "none" }}
                id="video3"
                name="video3"
                onChange={(e) => VideoUpload(e, 'video3')}
              />
            </div>
          )}

          {done && upload && (
            <div className="editbutton1" >
              <CloseOutlined onClick={() => { setAdd(''); setupload('') }} className="iconantd" />
              <CheckSquareOutlined onClick={() => handleSubmit("animationCubeSat1")} className="iconantd" />
            </div>
          )}
          {Satellites?.text5?.map((el: any, i: number) => (
            <div key={i} className="satcontainer">
              {edit[0] === "text5" && edit[1] === i && done ? (
                <>
                  <div className="inputcont">
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => {
                        setValue(e.target.value);
                      }}
                    />
                  </div>

                  <div className="editbutton1" >
                    <CloseOutlined onClick={() => setEdit([" ", i])} className="iconantd" />
                    <CheckSquareOutlined onClick={() => saveData("text5", i)} className="iconantd" />
                  </div>

                </>
              ) : 
                <div className="editBlock">
                  {i === 0 ? <h2>{el}</h2> : <p>{el}</p>}
                  {done && <> <div
                    className="editbutton1">
                      <DeleteOutlined
                      className="iconantd"
                      onClick={() => {
                        deleteItemmm("text5", i, Satellites.id);
                      }}
                    />

                    <EditOutlined onClick={() => {
                      setEdit(["text5", i]);
                      setValue(el);
                      setAdd("");
                    }} className="iconantd" />
                    
                  </div>
                  </>
                  }
                </div>
              }
            </div>
          ))}
          <div className="addsatcontainer">
            {done && added === "text5" && (
              <>
                <div className="inputcont">
                  <input
                    type="text"
                    onChange={(e) => {
                      setValue(e.target.value);
                    }}
                  />
                </div>
                <div className="editbutton1" >
                  <CloseOutlined onClick={() => setAdd("")} className="iconantd" />
                  <CheckSquareOutlined onClick={() => add("text5", value)} className="iconantd" />
                </div>


              </>
            )}
            {Satellites.text5 && done && added === "" && (
              <div
                className="editbutton">
                <PlusCircleFilled onClick={() => {
                  setAdd("text5");
                  setEdit(["", -1]);
                }} className="iconantd" />
              </div>
            )}
          </div>
          {loadingVideo==='video4' ? <h2 className="editbutton">Loading...</h2> : <ReactPlayer
            // key={4}
            url={upload || Satellites?.animationCubeSat4}
            width="100%"
            height="auto"
            controls={true}
            autoplayer={"false"}
          />}
          <div className="satcontainer">
            <div className="editBlock">
              {done && !upload && Satellites.animationCubeSat4 && (
                <div className="editbutton1" >
                  <DeleteOutlined
                    className="iconantd"
                    onClick={() => {
                      deleteItemmm("animationCubeSat4", 0, Satellites.id);
                    }}
                  />
                  <label htmlFor="video4" className="editlabel">
                    {LocalValue === "AM" ? "Ներբեռնել վիդեո" : "Upload video"}  <PlusCircleFilled className="iconantd" />
                  </label>

                </div>
              )}

              <input
                type="file"
                accept="video/*"
                style={{ display: "none" }}
                id="video4"
                name="video4"
                onChange={(e) => VideoUpload(e, 'video4')}
              />
              {upload && done && (
                <div className="editbutton1" >
                  <CloseOutlined className="iconantd" onClick={() => { setAdd(""); setupload("") }} />
                  <CheckSquareOutlined onClick={() => handleSubmit("animationCubeSat1")} className="iconantd" />
                </div>
              )}
            </div>
          </div>
          {Satellites?.margin_text4?.map((el: any, i: number) => (
            <div key={i} className="satcontainer">
              {edit[0] === "margin_text4" && edit[1] === i && done ? (
                <>
                  <div className="inputcont">
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => {
                        setValue(e.target.value);
                      }}
                    />
                  </div>
                  <div className="editbutton1" >
                    <CloseOutlined onClick={() => setEdit([" ", i])} className="iconantd" />
                    <CheckSquareOutlined onClick={() => saveData("margin_text4", i)} className="iconantd" />
                  </div>


                </>
              ) : 
                <div className="editBlock">
                  <p className="margin_text">{el}</p>
                  {done && <> <div
                    className="editbutton1">
                       <DeleteOutlined
                      className="iconantd"
                      onClick={() => {
                        deleteItemmm("margin_text4", i, Satellites.id);
                      }}
                    />

                    <EditOutlined onClick={() => {
                      setEdit(["margin_text4", i]);
                      setValue(el);
                      setAdd("");
                    }} className="iconantd" />
                   
                  </div>
                  </>
                  }
                </div>
              }
            </div>
          ))}
          <div className="addsatcontainer">
            {added === "margin_text4" && done && (
              <>
                <div className="inputcont">
                  <input
                    type="text"
                    onChange={(e) => {
                      setValue(e.target.value);
                    }}
                  />
                </div>

                <div className="editbutton1" >
                  <CloseOutlined onClick={() => setAdd("")} className="iconantd" />
                  <CheckSquareOutlined onClick={() => add("margin_text4", value)} className="iconantd" />
                </div>

              </>
            )}
            {Satellites.margin_text4 && done && added === "" && (
              <div className="editbutton">
                <PlusCircleFilled onClick={() => {
                  setAdd("margin_text4");
                  setEdit(["", -1]);
                }} className="iconantd" />
              </div>
            )}
          </div>
          <div className="quizButton">
            <button
              onClick={() => {
                navigateTo()
              }}
            >
              {LocalValue === "AM" ? "Հարցաշար" : "Questions"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
