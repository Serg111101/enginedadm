import  { useState } from "react";
import "./Login.scss";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input } from "antd";
import { useNavigate } from "react-router-dom";
import axioss from "../../axios/adminaxios";
import axios from "axios";
import auth from "../../auth";

const URL = process.env.REACT_APP_BASE_URL;

export const Login = () => {

  let LocalValue: any;
  if (localStorage.getItem("language")) {
    let local: any = localStorage.getItem("language");
    LocalValue = JSON.parse(local);
  }

  const [active, setActive] = useState(false);
  const navigate = useNavigate();
  const [checkLogin, setCheckLogin] = useState<any>({});
  const [loginError, setLoginError] = useState<any>({});
  const [password, setPassword] = useState<any>({});
  const [passwordError, setPasswordError] = useState<any>({});

  const loginRequest = async () => {
    try {
      const user = await axios.post(`${URL}auth/login`, {
        login: checkLogin?.login.trim(),
        password: password.password.trim(),
      });
      const lifetime = active
        ? new Date().setDate(new Date().getDate() + 6)
        : new Date().setDate(new Date().getDate() + 1);


      localStorage.setItem(
        "auth",
        JSON.stringify({ ...user.data, lifetime: lifetime })
      );
      axioss.interceptors.request.use(function (config: any) {
        config.headers.Authorization = `Bearer ${user?.data?.accessToken}`;
    return config;
});

if(user.data.role==="superadmin"){
  navigate(`/home/${LocalValue}`);
}
else{
  throw new Error
}

      



    } catch (error) {
      loginError.login =LocalValue === "AM"? "Սխալ": "error";
      setLoginError({ ...loginError });
    }
  };

  
  const checkValidation = async (e: any) => {
    e.preventDefault();
    let check = 0;

    if (
      checkLogin["login"] &&
      checkLogin["login"].length >= 3 &&
      checkLogin["login"].length <= 38
    ) {
      check++;
      setLoginError({});
    } else if (!checkLogin["login"]) {
      loginError.login = LocalValue === "AM"?"Պարտադիր դաշտ":"Required Field";
      setLoginError({ ...loginError });
    } else {
      loginError.login = LocalValue ==="AM"?"Նվազագույնը 3, առավելագույնը 38 նիշ":'Min 3, Max 38 characters';
      setLoginError({ ...loginError });
    }

    if (
      password["password"] &&
      password["password"].length >= 3 &&
      password["password"].length <= 38
    ) {
      check++;
      setPasswordError({});
    } else if (!password["password"]) {
      passwordError.password = LocalValue === "AM"?"Պարտադիր դաշտ":"Required Field";
      setPasswordError({ ...passwordError });
    } else {
      passwordError.password = LocalValue ==="AM"?"Նվազագույնը 3, առավելագույնը 38 նիշ":'Min 3, Max 38 characters' ;
      setPasswordError({ ...passwordError });
    }

    if (check === 2 && auth().role === "superAdmin") {
      navigate(`/home/${LocalValue}`);
    }
    await loginRequest();
  };

  return (
    <div className="dashboard" >
      <h1>{LocalValue === "AM" ? 'Մուտք' : "Login"} </h1>
    <div className="login">
      <div className="main">
        <div className="containeri" id="container">
          <div className="containerHeader" id="containerHeader">
            <h3 id={"containerHeaderH1"}>{LocalValue === "AM" ? 'Ադմինիստրատորի վահանակի մուտք' : "Admin panel login"}</h3>
          </div>
          <div className="containerMain">
            <form className="loginForm" onSubmit={checkValidation}>
              <div id="loginFormChildLogin" className="loginFormChild">
              <label>{LocalValue === "AM" ? 'Մուտքանուն' : "Username"}</label>

                <Input
                  placeholder={LocalValue === "AM" ? 'Մուտքանուն' : "Username"}
                  name="login"
                  onChange={(e) =>
                    setCheckLogin({ ...checkLogin, [e.target.name]: e.target.value })
                  }
                  className="loginFormChildid"
                />
                <p className="login_p">{loginError.login}</p>
              </div>

              <div id="loginFormChildPassword" className="loginFormChild">
                <label> {LocalValue === "AM" ? 'Գաղտնաբառ' : "Password"}</label>
                <Input.Password
                  placeholder={LocalValue === "AM" ? 'Գաղտնաբառ' : "Password"}
                  iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  name="password"
                  onChange={(e) =>
                    setPassword({ ...password, [e.target.name]: e.target.value })
                  }
                  className="loginFormChildid"
                />
                <p className="password_p">{passwordError.password}</p>
              </div>

              <div id="loginFormChildCheckbox" className="loginFormCheckbox">
                <div className="remcheck">
                  <input type="checkbox" onChange={() => setActive(!active)} />
                  <label id={active ? "unCheked" : "saveCheck"}> {LocalValue === "AM" ? 'Հիշել' : "Remember Me"}</label>
                </div>
              </div>

              <button id="loginFormChildButton" className="loginFormButton">
                {LocalValue === "AM" ? 'Մուտք' : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};
