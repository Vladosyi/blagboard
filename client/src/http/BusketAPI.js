import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";

export const getAllDeviceBasket = async () => {
    const response = await $host.get('api/basket')
    console.log("this is response",response)
    return response;

}


export const addDevice = async (device, user) => {
    const response = await $host.post('api/basket', {device, user})
    console.log(response)
    return response

}
