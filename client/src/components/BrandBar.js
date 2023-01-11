import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Card, Form} from "react-bootstrap";
import "../styles/BrandBar.css"
import BrandBarAnim from "../animations/BrandBarAnim"
import {ListGroup} from "react-bootstrap";
import Pages from "../components/Pages";

const BrandBar = observer(() => {
    const {device} = useContext(Context)
    
    const getAllDevices = () => {
        device.setSelectedType("all");
        device.setSelectedBrand("all");
    }
    return(
        <div>
            <div className='container-main-brand'>
                <div className='container-filter-second'> 
                    Все для сноубординга
                </div>
                <div className='solid'></div>
                    <div className='container-first'>
                        <div className="container-second">
                            <div>
                        {device.brands.map(brand=>
                            <div 
                            key={brand.id}
                            className="p-3"
                            onClick={() => device.setSelectedBrand(brand)}
                            border={brand.id === device.setSelectedBrand.id ? 'red' : 'light'}
                            >
                                <div className='brand-name-brandBar'>{brand.name}</div>
                        </div>
                        )}
                        </div>
                    </div>
                    
                </div>
                <div className='all-device' active={"all" === device.selectedType} onClick={getAllDevices}>
                    <div className='all-device-first'>Показать</div>
                    <div className='all-device-second'>Все товары</div>
                </div>
                <div className='pagination-shop'>
                            <Pages/> 
                </div>
            </div>
        </div>
    );
});

export default BrandBar;