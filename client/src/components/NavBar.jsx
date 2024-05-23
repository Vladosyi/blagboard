import React, { useContext } from "react";
import { Context } from "../index.js";
import "../styles/NavBarStyle.css";
import {
  REGISTRATION_ROUTE,
  LOGIN_ROUTE,
  SHOP_ROUTE,
  ADMIN_ROUTE,
  BASKET_ROUTE,
  ABOUTUS_ROUTE,
  SUPPORT_ROUTE,
} from "../utils/consts";
import USER from "../img/user.svg";
import CROSS from "../img/cross.svg";
import ADMIN from "../img/admin.svg";
import SHOPPINGCART from "../img/shopping-cart.svg";

import { Link, useLocation } from "react-router-dom";
import { observer } from "mobx-react-lite";

const NavBar = observer(() => {
  const location = useLocation();
  const isPathAuth =
    location.pathname === REGISTRATION_ROUTE ||
    location.pathname === LOGIN_ROUTE;

  const { user } = useContext(Context);

  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
    localStorage.removeItem("token");
  };


  if (!isPathAuth) {
    return (
      <header className="header">
        <div className="header__container _container">
          <div className="header__wrapper">
            <nav className="header__menu menu">
              <Link to={SHOP_ROUTE} className="header__logo">
                BlagBoard
              </Link>
              <ul className="menu__list">
                <li className="menu_item">
                  <Link to={SHOP_ROUTE} className="menu__link">
                    Магазин
                  </Link>
                </li>
                <li className="menu_item">
                  <Link to={ABOUTUS_ROUTE} className="menu__link">
                    О нас
                  </Link>
                </li>
                <li className="menu_item">
                  <Link to={SUPPORT_ROUTE} className="menu__link">
                    Поддержка
                  </Link>
                </li>
              </ul>
            </nav>
            <nav className="header__control control">
              <ul className="control__list">
                <li className="control_item">
                  <Link to={BASKET_ROUTE} className="control__link">
                    <img
                      className="control__img"
                      src={SHOPPINGCART}
                      alt="shopping-cart"
                    />
                    Корзина
                  </Link>
                </li>
                {user.isAuth ? (
                  <li className="control_item">
                    <Link className="control__link" onClick={logOut}>
                      <img className="control__img" src={CROSS} alt="cross" />
                      Выход
                    </Link>
                  </li>
                ) : (
                  <li className="control_item">
                    <Link to={LOGIN_ROUTE} className="control__link">
                      <img className="control__img" src={USER} alt="cross" />
                      Авторизация
                    </Link>
                  </li>
                )}
                {user.User.role === "ADMIN" ? (
                  <li className="control_item">
                    <Link to={ADMIN_ROUTE} className="control__link">
                      <img className="control__img" src={ADMIN} alt="user" />
                      Админ панель
                    </Link>
                  </li>
                ) : (
                  <li />
                )}
              </ul>
            </nav>
          </div>
        </div>
      </header>
    );
  } else return null;
});

// return (
//   <div className="main-container-navbar">
//     {here || here2 ? null : (
//       <div className="first-container">
//         <div className="navbar-container-hidenn">
//           <div className="blagboard-shop">
//             <p className="blagboard-shop-p">BlagBoard</p>
//           </div>
//         </div>
//         <div className="container1">
//           <div className="navbar-hindenn-2">
//             <div className="blagboard-shop">
//               <Link className="blagboard-shop-p" to={SHOP_ROUTE}>
//                 BlagBoard
//               </Link>
//             </div>
//           </div>
//           <div className="market">
//             <Link className="market-text" to={SHOP_ROUTE}>
//               Магазин
//             </Link>
//           </div>
//           <div className="about-us">
//             <Link className="about-us-p" to={ABOUTUS_ROUTE}>
//               О нас
//             </Link>
//           </div>
//           <div className="support">
//             <Link className="support-p" to={SUPPORT_ROUTE}>
//               Поддержка
//             </Link>
//           </div>
//         </div>
//         <div className="container-right-more">
//           <div className="bucket" href={BASKET_ROUTE}>
//             <div className="busket-second-second">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="18"
//                 height="18"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="feather feather-shopping-bag"
//               >
//                 <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
//                 <line x1="3" y1="6" x2="21" y2="6"></line>
//                 <path d="M16 10a4 4 0 0 1-8 0"></path>
//               </svg>
//             </div>
//             <Link className="busket-word" to={BASKET_ROUTE}>
//               Корзина
//             </Link>
//           </div>
//           {user.isAuth ? (
//             <div className="container-right">
//               <div className="container-right-exit" onClick={logOut}>
//                 <div className="container-right-icons">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="18"
//                     height="18"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     className="feather feather-log-out"
//                   >
//                     <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
//                     <polyline points="16 17 21 12 16 7"></polyline>
//                     <line x1="21" y1="12" x2="9" y2="12"></line>
//                   </svg>
//                 </div>
//                 <a className="contairer-right-word"> Выход</a>
//               </div>
//               {user.User.role === "ADMIN" ? (
//                 <div
//                   className="container-admin-container"
//                   onClick={() => navigate(ADMIN_ROUTE)}
//                 >
//                   <div className="admin-icon2">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       width="18"
//                       height="18"
//                       strokeWidth="2"
//                       fill="currentColor"
//                       className="bi-box-seam-22"
//                       viewBox="0 0 18 18"
//                     >
//                       <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2l-2.218-.887zm3.564 1.426L5.596 5 8 5.961 14.154 3.5l-2.404-.961zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z" />
//                     </svg>
//                   </div>
//                   <a className="container-admin-panel">Админ панель</a>
//                 </div>
//               ) : null}
//             </div>
//           ) : (
//             <div className="container-right">
//               <p
//                 className="container-admin-panel"
//                 onClick={() => navigate(LOGIN_ROUTE)}
//               >
//                 Авторизация
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     )}
//   </div>
// );

export default NavBar;
