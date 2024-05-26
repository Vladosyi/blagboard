import React, {createContext} from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import UserStore from "./store/UserStore";
import DeviceStore from "./store/DeviceStore";
import BasketDeviceStore from "./store/BasketDeviceStore";
import "./styles/root.css"


/**
 *
 * @type {React.Context<{
 *    user,
 *    device,
 *    basketDevice,
 * }>}
 */
export const Context = createContext(null);
// console.log(process.env.REACT_APP_API_URL);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Context.Provider
        value={{
            user: new UserStore(),
            device: new DeviceStore(),
            basketDevice: new BasketDeviceStore(),
        }}
    >

        <App />
    </Context.Provider>
);
