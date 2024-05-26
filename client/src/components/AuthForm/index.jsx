import {Link, useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../../utils/consts";
import React, {useContext, useState} from "react";
import {login, registration} from "../../http/userAPI";
import {Context} from "../../index";


export const AuthForm = () => {
    const location = useLocation();
    const isLogin = location.pathname === LOGIN_ROUTE;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const {user} = useContext(Context);
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

    // TODO: вынес, тк ререндерилась ВСЯ страница при нажатии каждой кнопки,
    //  тут стоит по хорошему еще сильнее декомпозировать и вынести все элементы, что не относятся к форме из нее,
    //  чтобы избежать их ререндера
    return <form className="auth-page__form">
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

}
