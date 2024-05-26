import React from "react";
import {ShoppingCartItems} from "../components/ShoppingCartItems";

//TODO: так Basket или Cart?)))
const Basket = () => {
    // const {device}
    return (
        <div className="basket">
            <div className="basket__container">
                <div className="basket__wrapper">
                    <div class="device__list-devices">
                        <h1>Корзина</h1>
                        <ShoppingCartItems/>
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
