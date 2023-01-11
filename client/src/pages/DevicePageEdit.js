import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Container, Dropdown, Form, Image, Modal, Row} from "react-bootstrap";
import {useParams, useNavigate} from 'react-router-dom';
import {fetchDeleteDevice, fetchOneDevice, updateDevices} from "../http/deviceAPI";
import {Context} from "../index";
import {ADMIN_ROUTE} from "../utils/consts";

const DevicePageEdit = () => {
    const {device} = useContext(Context);
    const navigate = useNavigate();
    const {id} = useParams();
    const [deviceCurr, setDeviceCurr] = useState({});
    const [showMsg, setShowMsg] = useState(false);
    const [msg, setMsg] = useState("");

    const [selectBrand, setSelectBrand] = useState({});
    const [selectType, setSelectType] = useState({});
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [img, setImg] = useState("");
    const [imgFile, setImgFile] = useState(null);
    const [info, setInfo] = useState([]);

    const [isDisabledPutBtn, setDisabledPutBtn] = useState(true);

    const deleteDevice = () => {
        fetchDeleteDevice(id).then(() => {
            navigate(ADMIN_ROUTE);
        })
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const imgHandler = e => {
        e.preventDefault();

        const reader = new FileReader();
        reader.onload = () => {
            setImg(reader.result);
        };
        reader.readAsDataURL(e.target.files[0]);
        setImgFile(e.target.files[0]);
    }

    //info
    const addInfo = () => {
        setInfo([...info, {title: '', description: '', id: Date.now()}]);
    };

    const deleteInfo = (number) => {
        setInfo(info.filter(item => item.number !== number));
    };

    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.id === number ? {...i, [key]: value} : i));
    };

    const putDevice = () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', `${price}`);
        formData.append('img', imgFile);
        formData.append('brandId', selectBrand.id);
        formData.append('typeId', selectType.id);
        formData.append('info', JSON.stringify(info));
        updateDevices(id, formData).then(data => {
            setShowMsg(true);
            setMsg(data);
            setTimeout(() => setShowMsg(true), 5000)
        });
    }

    const checkInfo = () => {
        let isInfoEmpty = true;
        info.forEach(item => {
            for(let key in item) {
                if(key === "title" || key === "description") {
                    if(!item[key]) {
                        isInfoEmpty = false;
                    }
                }
            }
        });
        return isInfoEmpty;
    }

    useEffect(() => {
        let checkInfoVal = false;
        if(deviceCurr.info && deviceCurr.info.length !== info.length) {
            checkInfoVal = checkInfo();
        }

        if(deviceCurr && deviceCurr.brand && deviceCurr.type) {
            if(deviceCurr.brand.name !== selectBrand.name ||
                deviceCurr.type.name !== selectType.name ||
                deviceCurr.name !== name ||
                deviceCurr.price !== price ||
                checkInfoVal ||
                img
            ) {
                setDisabledPutBtn(false);
            } else {
                setDisabledPutBtn(true);
            }
        }
    }, [name, selectBrand, selectType, price, img, info]);

    useEffect(() => {
        fetchOneDevice(id).then(data => {
            setDeviceCurr(data);
            setSelectBrand(data.brand);
            setSelectType(data.type);
            setName(data.name);
            setPrice(data.price);
            setInfo(data.info)
        });
    }, [id]);

    return (
        <div >
        <Container className='DevicePageEdit-container'>
        {showMsg && <Row>
                {msg}
            </Row>}

            <div>
                <Col xs={12}>
                    {/*Characteristics*/}
                    <Row className="d-flex flex-column m-3">
                        <h4>Изменение товара</h4>
                        <Button
                            variant="outline-dark"
                            onClick={() => addInfo()}
                        >
                            Добавить новое свойство
                        </Button>
                        {info.map((item, index) =>
                            <Row key={index} className="mt-3">
                                <Col md={4}>
                                    <Form.Control
                                        placeholder="Input title for the device..."
                                        value={item.title}
                                        onChange={e => changeInfo('title', e.target.value, item.id)}
                                    />
                                    {!info[index].title &&  <b style={{color: "red"}}>Пожалуйста, введите имя</b>}
                                </Col>
                                <Col md={4}>
                                    <Form.Control
                                        placeholder="Input description for the device..."
                                        value={item.description}
                                        onChange={e => changeInfo('description', e.target.value, item.id)}
                                    />
                                    {!info[index].description &&  <b style={{color: "red"}}>Пожалуйста, введите описание</b>}
                                </Col>
                                <div className='DevicePageEdit-container-delete'>
                                    <Col md={4}>
                                        
                                        <Col>
                                        <Button
                                            variant="outline-danger"
                                            onClick={() => deleteInfo(item.number)}
                                        >
                                            Удалить 
                                        </Button>
                                        </Col>
                                    </Col>
                                </div>
                            </Row>
                        )}
                    </Row>
                    <Row className="mt-5">
                        <Col xs={12}>
                            {isDisabledPutBtn ? <Button disabled>Обновить товар</Button> : <Button onClick={putDevice}>Обновить товар</Button>}
                            <Button className="ml-5" variant="danger" onClick={handleShow}>Удалить товар</Button>
                        </Col>
                    </Row>
                </Col>
            </div>
            <Modal show={show} onHide={handleClose}       size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Удалить этот товар {deviceCurr.name}?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={deleteDevice}>
                        Удалить
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
        </div>
    );
};

export default DevicePageEdit;

