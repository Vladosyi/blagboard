import React, { useContext } from "react";
import "../styles/DeviceItem.css";
import Image from "react-bootstrap/Image";
import { useNavigate } from "react-router-dom";
import { DEVICE_ROUTE } from "../utils/consts";
import { addDeviceToBasket } from "../http/deviceAPI";
import { Context } from "..";
import BUSKET_ICON from "../img/busket_icon.svg";
import RATING from "../img/rating.svg";
import { addDevice } from "../http/BusketAPI";

const DeviceItem = ({ device }) => {
  const { busketDevice, user } = useContext(Context);
  const navigate = useNavigate();
  const addToBasket = (device, user) => {
    console.log("Добавлено в корзину");
    addDevice(device.id, user.id);
  };
  return (
    <div className="device-item">
      <div className="device-item__container">
        <div className="device-item__wrapper">
          <div className="device-item__header">
            <div className="device-item__name-device">{device.name}</div>
            <img
              src={BUSKET_ICON}
              alt="busket_icon"
              className="device-item__busket-icon"
              onClick={() => addToBasket(device, user)}
            />
          </div>
          <div
            className="device-item__container-img"
            onClick={() => navigate(DEVICE_ROUTE + "/" + device.id)}
          >
            <img
              className="device-item__img"
              src={process.env.REACT_APP_API_URL + device.img}
            />
          </div>
          {/* .device-item__ */}
          <div className="device-item__footer">
            <div className="device-item__price">{device.price}₽</div>

            <div className="rating__container">
              <img src={RATING} alt="rating" className="rating__img" />{" "}
              {device.rating}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceItem;
