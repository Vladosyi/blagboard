import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Card, Form, Row } from "react-bootstrap";
import "../styles/BrandBar.css";
import BrandBarAnim from "../animations/BrandBarAnim";
import { ListGroup } from "react-bootstrap";
import Pages from "./Pages";

const BrandBar = observer(() => {
  const { device } = useContext(Context);

  const getAllDevices = () => {
    device.setSelectedType("all");
    device.setSelectedBrand("all");
  };
  return (
    <div>
      <div className="container-main-brand">
        <div className="container-filter-second">Все для сноубординга</div>
        {/* <div className="solid"></div> */}
        <div className="container-first">
          <div className="container-second">
            <div>
              {device.brands.map((brand) => (
              
                
                
                  <div className="p-2"
                  // style={{cursor:'pointer'}}
                  key={brand.id}
                  onClick={() => device.setSelectedBrand(brand)}
                  
                  >{brand.name}</div>
              )).reverse()}
            </div>
          </div>
        </div>
        <button
          className="show-all-device"
          // active={"all" === device.selectedType}
          onClick={getAllDevices}
        >Показать все товары
          {/* <div className="all-device-first">Показать все товары </div> */}
          {/* <div className="all-device-second"></div> */}
        </button>
        
        <div className="pagination-shop"> 
        <Pages  />
       </div>
      </div>
    </div>
  );
});

export default BrandBar;
