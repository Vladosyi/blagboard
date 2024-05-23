import React, { useContext, useEffect } from "react";
import Col from "react-bootstrap/Col";
import TypeBar from "../components/TypeBar";
import Form from "react-bootstrap/Form";
import BrandBar from "../components/BrandBar";
import "../styles/Shop.css";
import DeviceList from "../components/DeviceList";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import Pages from "../components/Pages";
import { fetchBrands, fetchDevices, fetchTypes } from "../http/deviceAPI";

const Shop = observer(() => {
  const { device, basketDevice } = useContext(Context);
  console.log(basketDevice);

  // useEffect( () => {

  //   fetchDevices(null, null, 1, 2).then((data) => {
  //     device.setDevices(data.rows);
  //     device.setTotalCount(data.count);
  //   });
  // }, []);

  useEffect(() => {
    fetchTypes().then((data) => device.setTypes(data));

    fetchBrands().then((data) => device.setBrands(data));

    fetchDevices(
      device.selectedType.id,
      device.selectedBrand.id,
      device.page,
      6
    ).then((data) => {
      device.setDevices(data.rows);
      device.setTotalCount(data.count);
    });
  }, [device.page, device.selectedType, device.selectedBrand]);

  return (
    <div className="root__main main">
      <TypeBar />
      <section className="main__hero-section hero-section">
        <div className="hero-section__container">
          <div className="hero-section__wrapper">
            <BrandBar />
            <DeviceList />
          </div>
        </div>
      </section>
    </div>
  );
});

export default Shop;
