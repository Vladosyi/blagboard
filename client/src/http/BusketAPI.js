import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";

export const getAllDeviceBasket = async () => {
    const response = await $authHost.get('api/basket')
    console.log("this is response",response)
    return response;

}


export const addDevice = async (deviceId, userId) => {
    const response = await $authHost.post('api/basket', {deviceId, userId})
    console.log(response)
    return response

}
