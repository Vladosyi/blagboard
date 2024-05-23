import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import "../styles/BrandBar.css";
import Pages from "./Pages";

const BrandBar = observer(() => {
  const { device } = useContext(Context);

  const getAllDevices = () => {
    device.setSelectedType("all");
    device.setSelectedBrand("all");
  };
  return (
    <div className="brand-bar">
      <div className="brand-bar__container">
        <div className="brand-bar__wrapper">
          <h1 className="brand-bar__h1">{device.selectedType.name}</h1>
          <ul className="brand-bar__list">
            {device.brands.map((brand) => (
              <li
                className="brand-bar__item"
                key={brand.id}
                onClick={() => device.setSelectedBrand(brand)}
                // border={brand.id === device.setSelectedBrand.id ? "red" : "black"}
              >
                {brand.name}
              </li>
            ))}
          </ul>
          <button className="brand-bar__button" onClick={getAllDevices}>
            Показать все товары
          </button>
          <div className="pagination-shop">
            <Pages />
          </div>
        </div>
      </div>
    </div>
  );
});

export default BrandBar;
