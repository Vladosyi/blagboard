import React, {useContext} from "react";
import {useState} from "react";
import {Context} from "../index";
import "../styles/AuthStyle.css";
import RightBack from "../img/Subtract.png";
import LeftCenter from "../img/Left.png";
import LeftSmol from "../img/LeftSmol.png";
import Snou from "../img/Snou.png";
import RightBottom from "../img/RightBottom.png";
import RightBottom2 from "../img/RightBottom2.png";
import RightBottom3 from "../img/RightBottom3.png";
import {REGISTRATION_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {Link, useLocation} from "react-router-dom";
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import {AuthForm} from "../components/AuthForm";


//TODO: а не лучше ли было подготовить несколько изображений в условной фигме и подменять их уже в медиа?
// ну а если оставлять в таком формате, то вынести в отдельный компонент, чтобы не было этой скатерти файлов


const Auth = observer(() => {

    // const [emailDirty, setEmailDirty] = useState(false);
    // const [passwordDirty, setPasswordDirty] = useState(false);
    // const [emailError, setEmailError] = useState("Email не может быть пустым");
    // const [passwordError, setPasswordError] = useState(
    //   "Password не может быть пустым"
    // );

    return (
        <div className="auth-page">
            <div className="auth-page__container">
                <div className="auth-page__wrapper">
                    <div className="auth-page__block-with-img">
                        <img className="img-right-upp" src={RightBack} alt=""/>
                        <img className="img-left-center" src={LeftCenter} alt=""/>
                        <img className="img-left-smoll" src={LeftSmol} alt=""/>
                        <img className="img-snou" src={Snou}/>
                        <img className="img-right-bottom" src={RightBottom} alt=""/>
                        <img className="img-right-bottom2" src={RightBottom2} alt=""/>
                        <img className="img-right-bottom3" src={RightBottom3} alt=""/>
                    </div>
                    <AuthForm/>
                </div>
            </div>
        </div>
    );
});

export default Auth;
