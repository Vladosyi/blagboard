import React, { useContext } from "react";
import { useState } from "react";
import { Context } from "../index";
import "../styles/NavBarStyle.css";
import {
  REGISTRATION_ROUTE,
  LOGIN_ROUTE,
  SHOP_ROUTE,
  ADMIN_ROUTE,
  BASKET_ROUTE,
  ABOUTUS_ROUTE,
  SUPPORT_ROUTE
} from "../utils/consts";
import { NavLink, useLocation } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

const NavBar = observer(() => {
  const location = useLocation();
  const here = location.pathname === LOGIN_ROUTE;

  const location1 = useLocation();
  const here2 = location1.pathname === REGISTRATION_ROUTE;

  const location2 = useLocation();
  const here3 = location2.pathname === SHOP_ROUTE;

  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
    localStorage.removeItem("token");
  };

  const navigate = useNavigate();

  const { user } = useContext(Context);

  return (
    <div className="main-container-navbar">
      {here || here2 ? null : (
        <div className="first-container">
          <div className="navbar-container-hidenn">
            <div className="blagboard-shop">
              <p className="blagboard-shop-p">BlagBoard</p>
            </div>
          </div>
          <div className="container1">
            <dib className="navbar-hindenn-2">
              <div className="blagboard-shop">
                <a className="blagboard-shop-p" href={SHOP_ROUTE}>
                  BlagBoard
                </a>
              </div>
            </dib>
            <div className="market">
              <a className="market-text" href={SHOP_ROUTE}>
                Магазин
              </a>
            </div>
            <div className="about-us">
              <a className="about-us-p" href={ABOUTUS_ROUTE}>
                О нас
              </a>
            </div>
            <div className="support">
              <a className="support-p" href={SUPPORT_ROUTE}>Поддержка</a>
            </div>
          </div>
          <div className="container-right-more">
            <div className="bucket" href={BASKET_ROUTE}>
              <div className="busket-second-second">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi-bag23"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                </svg>
              </div>
              <a className="busket-word">Корзина</a>
            </div>
            {user.isAuth ? (
              <div className="container-right">
                <div className="container-right-exit" onClick={() => logOut()}>
                  <div className="container-right-icons">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="19"
                      height="19"
                      fill="currentColor"
                      class="bi bi-box-arrow-right"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                      />
                    </svg>
                  </div>
                  <a className="contairer-right-word"> Выход</a>
                </div>
                {user.User.role === "ADMIN" ? (
                  <div
                    className="container-admin-container"
                    onClick={() => navigate(ADMIN_ROUTE)}
                  >
                    <div className="admin-icon2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi-box-seam-22"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2l-2.218-.887zm3.564 1.426L5.596 5 8 5.961 14.154 3.5l-2.404-.961zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z" />
                      </svg>
                    </div>
                    <a className="container-admin-panel">Админ панель</a>
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="container-right">
                <p
                  className="container-admin-panel"
                  onClick={() => navigate(LOGIN_ROUTE)}
                >
                  Авторизация
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
});

export default NavBar;
