import React from "react";


const Basket = () => {
  // const {device}
  return (
    <div className="basket">
      В разработке
      <div className="basket__container">
        <div className="basket__wrapper">
          <div class="device__list-devices">
            <h1>Корзина</h1>
            <div class="cart-items">
              {/* <!-- Список товаров в корзине --> */}
            </div>
            <div class="cart-summary">
              {/* <!-- Итоговая информация по заказу --> */}
            </div>
            <div class="cart-actions">
              {/* <!-- Кнопки "Продолжить покупки", "Оформить заказ" --> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Basket;
