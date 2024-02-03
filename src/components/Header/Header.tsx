/*eslint-disable */
import "./Header.scss";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  CloseOutlined,
  MenuOutlined,
 
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {  getFetchHeader } from "../../store/action/HeaderAction";
import { getFetchLogo, uploadImage } from "../../store/action/LogoAction";
import { IHeader } from "../../models";
import ReactFlagsSelect from "react-flags-select";
const URL = process.env.REACT_APP_BASE_URL;

export function Header() {
  const { Logo, Header } = useAppSelector((state: any) => ({
    Logo: state.Logo.Logo,
    Header: state.Header.Header,
  }));
  const url = window.location.href;
  const [done, setDone] = useState<boolean>(false);
  const navigate = useNavigate();
  const [mobile, setMobile] = useState(false);
  const [editShow, setEditShow] = useState<any>(0);
  const [edit, setEdit] = useState<string>("");
  const [image,setImage] = useState(Logo?.logo||"") ;
  const [languages, setLanguages] = useState<string | any >("AM");
  const [auth,setAuth]= useState<any>('');

  
  let bb: any = window.location.pathname;
  let LocalValue: any;
  if (localStorage.getItem("language")) {
      let local: any = localStorage.getItem("language");
      LocalValue = JSON.parse(local);
  }
  useEffect(() => {
    if (window.location.pathname === "/Setting") {
      sessionStorage.setItem("done", "true");
    } else {
      sessionStorage.removeItem("done");
    }
    setDone(sessionStorage.getItem("header") === "true");

  }, [url,bb]);


  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getFetchLogo());
    dispatch(getFetchHeader());
  }, [dispatch]);
  useEffect(() => {
    handleLanguageChange();
  }, [languages, bb]);

  
  let role:any = localStorage.getItem('auth')
  let roles:any
  if(role){
    roles = JSON.parse(role)
  }
  useEffect(()=>{
    if(roles){
   setAuth(roles?.accessToken)

  }else{
    setAuth('')
   }
  },[localStorage.getItem('auth')])
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

  function changeLanguage(e: any) {
    localStorage.setItem("language", JSON.stringify(e));
    setLanguages(e);
    navigate("/home");
    window.location.reload();
  }

  function navigateTo(val:any) {
    switch (val.id) {
      case 1:
        navigate("/home");
        break;
      case 2:
        navigate("/about");
        break;
      case 3:
        window.open(val.link,"_blank")
        break;
      case 4:
        navigate("/ContactUS");
        break;
      default:
        navigate("/home");
    }
  }


  return (
    <header className="header">
      <div className="constainerHeader">
        <div className="imageHeader">
          <a
            
            onClick={(e) => {
              e.preventDefault();
              navigate("/home");
            }}
          >
            <img src={Logo?.logo?Logo?.logo:image} alt={"Web Page Logo is not difind"} />
          </a>
         
                 </div>

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
          {mobile && (
                <div className="closeHeader" id="closeHeader">
                  <CloseOutlined className="iconantdd" onClick={() => setMobile(false)}  />
                </div>
              )}
            {  Header?.map((el: IHeader, index: number) => (
              <div
                className={
                  (index === 0 && bb === "/home") ||
                  (index === 1 && bb === "/about") ||
                  (index === 3 && bb === "/ContactUS")
                    ? "item active"
                    : "item"
                }
                
                key={index}
              >
                <p onClick={() => navigateTo(el)} >{el?.title}</p>
                
              
              </div>
            ))}
            {auth && <div
              className={url === `${URL}aeroSpace/Settings` ? "item active" : "item"}
              onClick={() => navigate("/Setting")}
              >
             {LocalValue === "AM"?"Կարգավորումներ":" Settings"}
            </div>}
           {auth ? <div
              className={url === `${URL}aeroSpace/Login` ? "item active" : "item"}
              onClick={() => {localStorage.removeItem('auth');setAuth('');navigate("/")}}
              >
             {LocalValue === "AM"?"Դուրս գալ":" Log out"}

           
            </div> : <div
              className={url === `${URL}aeroSpace/Login` ? "item active" : "item"}
              onClick={() => navigate("/")}
            >
              {LocalValue === "AM"?"Մուտք":" Log in"}
            </div>}
             
            <div className="selectDiv">
             
              <ReactFlagsSelect
                id="selBtn"
                selectedSize={18}
                optionsSize={14}
                countries={["US", "AM"]}
                customLabels={{ "US": " ", "AM": " " }}
                selected={languages}
                onSelect={(countryCode:any) => {
                  changeLanguage(countryCode);
                }}
              />
            </div>
          </div>
        </div>
      </div>

                



    </header>
  );
}
