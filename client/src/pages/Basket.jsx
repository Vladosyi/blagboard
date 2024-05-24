import React from "react";
import { useEffect } from "react";
import { getAllDeviceBasket } from "../http/BusketAPI";



const Basket = () => {
  // const {device}

  useEffect(() => {
    
    const devices = getAllDeviceBasket();
    console.log(devices)
    


  })
  return (
    <div className="basket">
      В разработке
      <div className="basket__container">
        <div className="basket__wrapper">
          <div className="device__list-devices">
            <h1>Корзина</h1>
            <div className="cart-items">
              {/* <!-- Список товаров в корзине --> */}
            </div>
            <div className="cart-summary">
              {/* <!-- Итоговая информация по заказу --> */}
            </div>
            <div className="cart-actions">
              {/* <!-- Кнопки "Продолжить покупки", "Оформить заказ" --> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Basket;
