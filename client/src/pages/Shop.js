import React, {useContext, useEffect} from 'react';
import Col from "react-bootstrap/Col"
import TypeBar from "../components/TypeBar"
import Form from "react-bootstrap/Form"
import BrandBar from "../components/BrandBar"
import "../styles/Shop.css"
import "../styles/TypeBar.css";
import DeviceList from "../components/DeviceList";
import Capa from "../img/Capa.jpg";
import { Context } from "../index";
import {observer} from "mobx-react-lite";
import Pages from "../components/Pages";
import {fetchBrands, fetchDevices, fetchTypes} from "../http/deviceAPI";
import { Row } from 'react-bootstrap';

const Shop = observer(() => {
    
    const {device} = useContext(Context)

    
    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
        fetchDevices(null, null, 1, 2).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
    }, [])

    useEffect(() => {
        fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, 6).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
    }, [device.page, device.selectedType, device.selectedBrand,])


    return(
        <div className="wrapper">
            <div className="wrapper-shop-second">
                <div>
                </div>
                    <Form className="form1">
                        <Col md={9} className="">
                        <TypeBar/>
                        </Col>
                    </Form>
                </div>
                <div className='container-wrapper-shop'>
            <Form className="forma-shop">
                <Col md={3} className="container-brand-device">
                       <BrandBar/>
                       <DeviceList/>
                </Col>
            </Form>
            </div>
        
        </div>
        
    );
});

export default Shop;

