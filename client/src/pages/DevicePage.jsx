import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { Col } from "react-bootstrap";
import { Image } from "react-bootstrap";
import { Form } from "react-router-dom";
import "../styles/DevicePage.css";
import { useParams } from "react-router-dom";
import { fetchOneDevice } from "../http/deviceAPI";
import { Carousel } from "react-bootstrap";

const DevicePage = () => {
  const [device, setDevices] = useState({ info: [] });
  const { id } = useParams();
  useEffect(() => {
    fetchOneDevice(id).then((data) => setDevices(data));
  }, []);

  return (
    <div className="container-devicePage-first">
      <div className="container-DevicePage">
        <div className="devicePage-img">
          <div className="devicePage-img-main-container devicePage-img-main-container-second">
            <img
              className="devicePage-img-main"
              src={process.env.REACT_APP_API_URL + device.img}
              alt="First slide"
            />
          </div>
          <div className="deviceName">
            <div className="deviceName-container">
              <h2 className="deviceName-word">{device.name}</h2>
              <div className="container-devicepage-between"></div>
            </div>
            <div className="aracteristics-contahiner">
              <div className="haracteristics-text">Характеристики:</div>

              {device.info.map((info) => (
                <div key={info.id}>
                  {info.title}; {info.description}
                </div>
              ))}
            </div>
            <div className="price-container">
              <div className="praice-container-word">
                Цена: {device.price} рублей{" "}
              </div>
            </div>

            <div className="busket-container">
              <div className="busket-main">
                <div className="busket-main-text">Добавить в корзину</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevicePage;
