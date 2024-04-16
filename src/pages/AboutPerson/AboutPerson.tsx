import React, { useEffect, useState } from 'react'
import "./AboutPerson.scss"
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addPerson, addPersonImage, deletePersons, editePerson, getAboutOutTeam } from '../../store/action/AboutAction';
import { uploadImage } from "../../store/action/AboutAction";
import Swal from 'sweetalert2';
import DeleteAll from '../../components/DeleteComponent';
import { IAboutOurTeam } from "../../models";
import {
  CloseOutlined,
  EditOutlined,
  CheckSquareOutlined,
  PlusCircleFilled,
  DeleteOutlined,
} from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';
const AboutPerson = () => {

    const { AboutOurTeam } = useAppSelector((state) => state?.AboutOurTeam);
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const [done, setDone] = useState<boolean | string | any>(false);
    const [show, setShow] = useState(0);
    const [editvalue, setEditValue] = useState<any>({});
    const [addShow, setAddShow] = useState(false);
    const [addValue, setAddValue] = useState<any>({});
    const [active, setActive] = useState<any>(sessionStorage.getItem("done"));
    const [addimage,setAddImage] = useState("")
    let LocalValue: any;
    if (localStorage.getItem("language")) {
      let local: any = localStorage.getItem("language");
      LocalValue = JSON.parse(local);
    }
    
  
    useEffect(() => {
      dispatch(getAboutOutTeam());
    }, [dispatch]);
  
  
  
    useEffect(() => {
      if (active) {
        setActive(JSON.parse(active));
        setDone(active);
      }
    }, [active]);
  
    async function uploadededImage(event: any) {
      await dispatch(uploadImage(event, editvalue.id,setAddImage));
    }
  
    async function editPersons(id: number, editvalue: any) {
      let obj={
        ...editvalue,
        image:addimage
      }
      
      await dispatch(editePerson(id, addimage?obj:editvalue));
      await dispatch(getAboutOutTeam());
  
      setShow(0);
      setAddImage("");
  
    }
    async function addPersons() {
      await dispatch(addPerson(addValue, addimage));
      await dispatch(getAboutOutTeam());
      setAddShow(false);
      setAddValue({});
      setAddImage("");
    }
    async function addPersonsImage(event: any) {
      await dispatch(addPersonImage(event,setAddImage));
    }
  
    // async function deletePerson(id: number) {
    //   await dispatch(deletePersons(id));
    //   await dispatch(getAboutOutTeam());
    //   setAddImage("");
    // }
  
  
    async function validateAndEditPerson(id: number, newTitle: string) {
      if (!editvalue?.text.trim() || !editvalue?.name.trim()) {
        Swal.fire({
          title:(LocalValue==="AM"? 'Չի կարող դատարկ լինել':"Cannot be empty") ,
          icon: 'error',
          confirmButtonText:(LocalValue==="AM"? 'Լավ':"OK")})
      } else {
        await editPersons(id, newTitle);
        
      }
  
    }
  
    async function validateAndaAddPerson() {
      if (!addValue?.text?.trim() || !addValue?.name?.trim()) {
        Swal.fire({
          title:(LocalValue==="AM"? 'Չի կարող դատարկ լինել':"Cannot be empty") ,
          icon: 'error',
          confirmButtonText:(LocalValue==="AM"? 'Լավ':"OK")})
      } else {
        await addPersons();
      }
  
    }
  
  
  
    async function deleteItemm(id: number) {
      try {
          await DeleteAll({
              title: LocalValue === 'AM' ? "Ցանկանում եք ջնջե՞լ" : 'Do you want to delete?',
              text: LocalValue === 'AM' ? "Ջնջելու դեպքում վերականգնել չեք կարող" : 'If you delete it, you cannot restore it',
              deleteItem: () => dispatch(deletePersons(id))
          });
  
  
      } catch (error) {
          console.error(error);
  
      }
  
  }
  
  


  return (
    <div className='AboutPerson' >
         {!done&&<div className="button">
        <button onClick={()=>{navigate("/about")}} >{LocalValue==="AM" ? "Հետ":"Go back"}</button>
     </div>}

         <div className="AboutPersons">
      <div className="aboutPersonCont">
        {AboutOurTeam?.map((el: IAboutOurTeam, index: number) => {
          return (
            <div className="itemPeople" key={index}>
              {done && show===el?.id&& (
                <label htmlFor="file">

                  <div className="uploadImage">
                    <label htmlFor="file">
                      {editvalue?.id === el?.id && (
                        <PlusCircleFilled
                          className="iconantd"
                          onClick={() =>
                            setEditValue({
                              name: editvalue.name,
                              text: editvalue.text,
                              id: el?.id,
                            })
                          }
                        />
                      )}
                    </label>
                    <input
                      value={""}
                      type="file"
                      onChange={(e) => {
                        uploadededImage(e);
                      }}
                      accept="image/*"
                      id="file"
                      name="file"
                      style={{ display: "none" }}
                    />
                  </div>
                </label>
              )}
              <div className="imageDiv">
                <img src={show===el?.id&&addimage||el?.image} alt={el?.name} />
              </div>


              <div className="PersonTitle">
                {show !== el?.id && <p>{el?.name}</p>}

                {done && el?.id === show && (
                  <div>
                    <input
                      type="text"
                      value={editvalue.name}
                      onChange={(e) =>
                        setEditValue({
                          name: e.target.value,
                          text: editvalue.text,
                          id: editvalue.id,
                        })
                      }
                    />
                  </div>
                )}
              </div>
              <div className="infoPerson">
                {show !== el?.id && <p>{el?.text}</p>}

                {done && el?.id === show && (
                  <div>
                    <input
                      type="text"
                      value={editvalue.text}
                      onChange={(e) =>
                        setEditValue({
                          name: editvalue.name,
                          text: e.target.value,
                          id: editvalue.id,
                        })
                      }
                    />
                    <div className="okclosButtons">

                      <CloseOutlined
                        className="iconantd"
                        onClick={() => {
                          setShow(0);
                          setEditValue({
                            name: editvalue?.name,
                            text: editvalue?.text,
                            id: 0,
                          });
                        }}
                      />
                      <CheckSquareOutlined
                        className="iconantd"
                        onClick={() => {
                          validateAndEditPerson(el?.id, editvalue);
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="allButton">
                {done && show !== el?.id && (
                  <div className={"editButtons"}>
                    <button className="editBtn" onClick={() => setShow(el?.id)}>
                      <EditOutlined
                        className="iconantd"
                        onClick={() =>
                          setEditValue({
                            name: el?.name,
                            text: el?.text,
                            id: el?.id,
                          })
                        }
                      />
                    </button>
                  </div>
                )}
                {done && show !== el?.id && (
                  <div className="deleteButton">
                    <DeleteOutlined
                      className="iconantd"
                      onClick={() => {
                        deleteItemm(el?.id);
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {done && !addShow && (
        <div className="addIcon" onClick={() => setAddShow(true)}>
         <div> <PlusCircleFilled
            
            className="iconantd"
          />
          </div>
          <p className="adddd" > {LocalValue === "AM" ? "Ավելացնել թիմի նոր  անդամ" : "Add a new team member"}</p>
        </div>
      )}
      {done && addShow && (
        <div className="addPerson">
          <label htmlFor="fil">
            <div className="addImageDiv">
              {/* <PlusCircleFilled className="iconantd" /> */}
              <input
                value={""}
                type="file"
                onChange={(e: any) => {
                  addPersonsImage(e);
                }}
                accept="image/*"
                id="fil"
                name="fil"
                style={{ display: "none" }}
              />
              {addimage?.length > 0 ? <img src={addimage} alt="Upload " /> : <></>}
            </div>
          </label>
          <div className="addTextInput">
            <input
              type="text"
              placeholder="add Name"
              value={addValue.name}
              onChange={(e) => {
                setAddValue({
                  image: addimage,
                  name: e.target.value,
                  text: addValue.text,
                });
              }}
            />

            <input
              type="text"
              placeholder="add role"
              value={addValue.text}
              onChange={(e) => {
                setAddValue({
                  name: addValue.name,
                  text: e.target.value,
                });
              }}
            />
            <div className="saveButton">
              <CloseOutlined
                className="iconantd"
                onClick={() => { setAddShow(false); setAddImage("") }}
              />

              <CheckSquareOutlined
                className="iconantd"
                onClick={() => validateAndaAddPerson()}
              />

            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  )
}

export default AboutPerson