import React, {useContext, useEffect, useState} from "react";


import s from "./ShoppingCartItems.module.css"
import {Context} from "../../index";
import {getDeviceFromBasket} from "../../http/deviceAPI";
import {Spinner} from "react-bootstrap";

export const ShoppingCartItems = () => {
    const {user, basketDevice} = useContext(Context)
    const [isLoading, setIsLoading] = useState(true)
    console.log({basketDevice})

    useEffect(() => {
        console.log("fetch")
        getDeviceFromBasket()
            .then(data => console.log("data: ", data))
            .catch(console.error)
            .finally(() => setIsLoading(false))
    }, [user])


    if (isLoading) {
        return <Spinner animation={"grow"}/>
    }

    return (<div className={s.items}>
        {/* <!-- Список товаров в корзине --> */}
    </div>)
}
