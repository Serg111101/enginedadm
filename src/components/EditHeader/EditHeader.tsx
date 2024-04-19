/*eslint-disable */
import "./EditHeader.scss";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  CloseOutlined,
  MenuOutlined,
  EditOutlined,
  CheckSquareOutlined,
  PlusCircleFilled
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { editHeader, getFetchHeader } from "../../store/action/HeaderAction";
import { getFetchLogo, uploadImage } from "../../store/action/LogoAction";
import { IHeader } from "../../models";
import Swal from "sweetalert2";


export function EditHeader() {
  const { Logo, Header } = useAppSelector((state: any) => ({
    Logo: state.Logo.Logo,
    Header: state.Header.Header,
  }));

  
  const url = window.location.href;
  const [done, setDone] = useState<boolean>(false);
  const navigate = useNavigate();
  const [mobile, setMobile] = useState(false);
  const [editShow, setEditShow] = useState<any>(0);
  const [edit, setEdit] = useState<any>({
    title:"",
    link:"",
  });
  const [image,setImage] = useState(Logo?.logo||"") ;
  const [languages, setLanguages] = useState<string | any >("AM");
  const [item,setItem] = useState<any>() ;
  
  let bb: any = window.location.pathname;
  let LocalValue: any;
  
  if (localStorage.getItem("language")) {
    let local: any = localStorage.getItem("language");
    LocalValue = JSON.parse(local);
  }
  
  useEffect(() => {
    if (window.location.pathname === `/Setting/${LocalValue}`) {
      sessionStorage.setItem("done", "true");
    } else {
      sessionStorage.removeItem("done");
    }
    setDone(sessionStorage.getItem("Header") === "true");
    if (window.location.pathname === `/Setting/${LocalValue}`) {
      sessionStorage.setItem("Header", "true");
    } else {
      sessionStorage.removeItem("Header");
    }


  }, [url]);
  const sessionSetting = sessionStorage.getItem("settings");
  const urll = window.location.pathname !== `/Setting/${LocalValue}`;
  useEffect(()=>{
    if(sessionSetting&&sessionSetting==='"Header"'){
      setItem(sessionSetting)
    }else{
      setItem("")
    }
    if(urll){
      setItem("")
    }
  },[sessionSetting,urll]);


  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getFetchLogo());
    dispatch(getFetchHeader());
  }, [dispatch]);
  useEffect(() => {
    handleLanguageChange();
  }, [languages, bb]);

  

  function handleLanguageChange() {
    let language = localStorage.getItem("language");
    if (language === null) {
      localStorage.setItem("language", JSON.stringify(languages || "AM"));
      setLanguages(languages);
      window.location.hash = languages;
    } else {
      setLanguages(JSON.parse(language));
      window.location.hash = JSON.parse(language);
    }
  }



  function navigateTo(val:any) {
    switch (val.id) {
      case 1:
        navigate(`/home/${LocalValue}`);
        break;
      case 2:
        navigate(`/about/${LocalValue}`);
        break;
      case 3:
        window.open(val.link,"_blank")
        break;
      case 4:
        navigate(`/ContactUS/${LocalValue}`);
        break;
      default:
        navigate(`/home/${LocalValue}`);
    }
  }
  async function validateAndEditHeader(id: number, newTitle: any  ) {
    if (!newTitle?.title.trim()) {
      Swal.fire({
        title:(LocalValue==="AM"? 'Չի կարող դատարկ լինել':"Cannot be empty") ,
        icon: 'error',
        confirmButtonText:(LocalValue==="AM"? 'Լավ':"OK")})
    } else {
      await editHeaderr(id, newTitle);
    }
   
  }
 
  async function editHeaderr(id:number,edit:any) {
    await dispatch(editHeader(id,edit));
    await dispatch(getFetchHeader());
    setEditShow(0)
  }

  async function uploadedImage(e: any) {
    await dispatch(uploadImage(e,setImage))
    await dispatch(getFetchLogo());
  }
 
  
  return (
    <header className="editheader">
      <div className="editconstainerHeader">
        <div className="editimageHeader">
          <a
            href={`/home/${LocalValue}`}
            onClick={(e) => {
              e.preventDefault();
              navigate(`/home/${LocalValue}`);
            }}
          >
            <img src={Logo?.logo?Logo?.logo:image} alt={"Web Page Logo is not difind"} />
          </a>
         
                 </div>
                 {done && (
            <div className="uploadImage">
              <label htmlFor="files" ><PlusCircleFilled/></label>
              <input
                value={""}
                type="file"
                onChange={(e) =>{ setImage("");uploadedImage(e)}}
                accept="image/*"
                id="files"
                name="files"
                style={{ display: "none" }}
              />
            </div>
        )}
        <div
          className="headericone"
          id="headericone"
          onClick={() => setMobile(true)}
        >
          {!mobile && (
            <div onClick={() => setMobile(true)}>
              <MenuOutlined  />
            </div>
          )}
        </div>
        <div className={!mobile ? "items" : "items-mobile"}>
          <div className="itemsContainer" id="itemsContainer">
            {  Header?.map((el: IHeader, index: number) => (
              <div
                className={
                  (index === 0 && bb === `/home/${LocalValue}`) ||
                  (index === 1 && bb === `/about/${LocalValue}`) ||
                  (index === 3 && bb === `/ContactUS/${LocalValue}`)
                    ? "item active"
                    : "item"
                }
                
                key={index}
              >
                { editShow !== el?.id && <p onClick={() => navigateTo(el)} >{el?.title}</p>}
                
                {done  && editShow !== el?.id && item === '"Header"' && <div className={!mobile ? "items editButtons" : "items-mobile editButtons"} >
                    <button className="editBtn"   onClick={() => setEditShow(el?.id)}>
                      <EditOutlined className="iconantd"  onClick={()=>setEdit(el)} />
                    </button>
                  </div>
                }
                {done && editShow === el?.id && (
                  <div  >
                  <div>  <input
                      type="text"
                      value={edit.title}
                      onChange={(e) => setEdit({...edit,title:e.target.value})}
                      required={true}
                    />
                    </div>
                    <br/>
                    <div>
                    {
                      el?.link?.length>0&&<input
                      type="text"
                      value={edit.link}
                      onChange={(e) => setEdit({...edit,link:e.target.value})}
                      required={true}
                    />
                    }
                    </div>
                    <div className="okCloseButton" >
                    
                      <CloseOutlined className="iconantd" onClick={()=> setEditShow(0) } />
                    <CheckSquareOutlined onClick={() => {
                      validateAndEditHeader(el?.id,edit)
                      }} className="iconantd" />
                    
                    </div>
                  </div>
                )}
              </div>
            ))}
            {mobile && (
              <div className="closeHeader" id="closeHeader">
                <CloseOutlined className="iconantd" onClick={() => setMobile(false)}  />
              </div>
            )}

           
          </div>
        </div>
      </div>

                



    </header>
  );
}
