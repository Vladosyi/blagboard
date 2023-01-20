import React from "react";
import { Col } from "react-bootstrap";
import "../styles/DeviceItem.css";
import Image from "react-bootstrap/Image";
import { useNavigate } from "react-router-dom";
import { DEVICE_ROUTE } from "../utils/consts";

const DeviceItem = ({ device }) => {
  const navigate = useNavigate();
  return (
    <div md={3} className="market11">
      <div
        className="market-container-main"
        onClick={() => navigate(DEVICE_ROUTE + "/" + device.id)}
      >
        <div className="container-device-item-second">
          <span className="device-name-devicename-second">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-bag-fill"
              viewBox="0 0 16 16"
            >
              <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5z" />
            </svg>
          </span>
        </div>
        <div className="device-name-container">{device.name}</div>
        <div className="market-container-second">
          <img
            className="img-for-all"
            src={process.env.REACT_APP_API_URL + device.img}
          />

          <div>
            <div className="device-price">{device.price} ₽</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceItem;
