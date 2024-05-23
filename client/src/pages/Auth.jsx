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
import { Link, useLocation } from "react-router-dom";
import { login, registration } from "../http/userAPI";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

const Auth = observer(() => {
  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { user } = useContext(Context);
  // const [emailDirty, setEmailDirty] = useState(false);
  // const [passwordDirty, setPasswordDirty] = useState(false);
  // const [emailError, setEmailError] = useState("Email не может быть пустым");
  // const [passwordError, setPasswordError] = useState(
  //   "Password не может быть пустым"
  // );
  const click = async () => {
    try {
      let data;
      isLogin
        ? (data = await login(email, password))
        : (data = await registration(email, password));
      user.setUser(data);
      user.setIsAuth(true);
      navigate(SHOP_ROUTE);
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-page__container">
        <div className="auth-page__wrapper">
          <div className="auth-page__block-with-img">
            <img className="img-right-upp" src={RightBack} alt="" />
            <img className="img-left-center" src={LeftCenter} alt="" />
            <img className="img-left-smoll" src={LeftSmol} alt="" />
            <img className="img-snou" src={Snou} />
            <img className="img-right-bottom" src={RightBottom} alt="" />
            <img className="img-right-bottom2" src={RightBottom2} alt="" />
            <img className="img-right-bottom3" src={RightBottom3} alt="" />
          </div>
          <form className="auth-page__form">
            <h1>{isLogin ? "Вход" : "Регистрация"}</h1>
            <div className="input">
              {/* {emailDirty && emailError && (
                <div style={{ color: "red" }}>{emailError} </div>
              )} */}
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div className="input">
              {/* {passwordDirty && passwordError && (
                <div style={{ color: "red" }}>{passwordError} </div>
              )} */}
              <input
                type="text"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <button onClick={click}>
              {isLogin ? "Войти" : "Зарегистрироваться"}
            </button>
            {isLogin ? (
              <div className="footer">
                Нет аккаунта?
                <Link className="registration" to={REGISTRATION_ROUTE}>
                  Зарегистрироваться
                </Link>
              </div>
            ) : (
              <div className="footer">
                Есть аккаунт?
                <Link className="registration" to={LOGIN_ROUTE}>
                  Войти
                </Link>
              </div>
            )}

            <Link className="blagboard" to={SHOP_ROUTE}>
              BLAGBOARD SHOP
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
});

export default Auth;
