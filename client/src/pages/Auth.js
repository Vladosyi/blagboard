import React, { useContext } from "react";
import { useState } from "react";
import { Context } from "../index";
import "../styles/AuthStyle.css";
import RightBack from "../img/Subtract.png";
import LeftCenter from "../img/Left.png";
import LeftSmol from "../img/LeftSmol.png";
import Snou from "../img/Snou.png";
import RightBottom from "../img/RightBottom.png";
import RightBottom2 from "../img/RightBottom2.png";
import RightBottom3 from "../img/RightBottom3.png";
import { REGISTRATION_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { useLocation } from "react-router-dom";
import { login, registration } from "../http/userAPI";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

const Auth = observer(() => {
  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const click = async () => {
    try {
      let data;
      if (isLogin) {
        data = await login(email, password);
      } else {
        data = await registration(email, password);
      }
      user.setUser(data);
      user.setIsAuth(true);
      navigate(SHOP_ROUTE);
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  const { user } = useContext(Context);
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [emailError, setEmailError] = useState("Email не может быть пустым");
  const [passwordError, setPasswordError] = useState(
    "Password не может быть пустым"
  );

  return (
    <div className="first-div">
      <div className="first-div-img-all-auth">
        <img className="img-right-upp" src={RightBack} alt="" />
        <img className="img-left-center" src={LeftCenter} alt="" />
        <img className="img-left-smoll" src={LeftSmol} alt="" />
        <img className="img-snou" src={Snou} />
        <img className="img-right-bottom" src={RightBottom} alt="" />
        <img className="img-right-bottom2" src={RightBottom2} alt="" />
        <img className="img-right-bottom3" src={RightBottom3} alt="" />
      </div>
      <div>
        <form className="form-continer-first">
          <div className="form">
            {isLogin ? (
              <p className="p-Login" href={REGISTRATION_ROUTE}>
                Login
              </p>
            ) : (
              <p className="p-Login" href={LOGIN_ROUTE}>
                Sing in
              </p>
            )}
            <div className="input-login">
              {emailDirty && emailError && (
                <div style={{ color: "red" }}>{emailError} </div>
              )}
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div className="input-password">
              {passwordDirty && passwordError && (
                <div style={{ color: "red" }}>{passwordError} </div>
              )}
              <input
                type="text"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <div onClick={click} className="btn">
              Логин
            </div>
            <div className="second-big-box">
              {isLogin ? (
                <div className="registration-post">
                  Нет аккаунта?{" "}
                  <a className="registration" href={REGISTRATION_ROUTE}>
                    Регистрация
                  </a>
                </div>
              ) : (
                <div className="registration-post">
                  Есть аккаунт??{" "}
                  <a className="registration" href={LOGIN_ROUTE}>
                    Логин
                  </a>
                </div>
              )}
            </div>
            <div className="second-big-box-blagboard">
              <div>
                <a className="blagboard" href={SHOP_ROUTE}>
                  BLAGBOARD SHOP
                </a>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
});

export default Auth;
