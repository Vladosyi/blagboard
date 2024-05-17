import React, { useState, useEffect } from "react";
import CreateBrand from "../components/modals/CreateBrand";
import CreateDevice from "../components/modals/CreateDevice";
import CreateType from "../components/modals/CreateType";
import "../styles/Admin.css";
import DeleteBrandOrType from "../components/modals/DeleteBrandOrType";
import { getAllDevicesInAdminPage } from "../http/deviceAPI";
import { NavLink } from "react-router-dom";
import { DEVICE_EDIT_ROUTE } from "../utils/consts";
import {
  Button,
  Col,
  Container,
  Dropdown,
  Form,
  Image,
  InputGroup,
  ListGroup,
  Pagination,
  Row,
} from "react-bootstrap";
const Admin = () => {
  const [brandVisible, setBrandVisible] = useState(false);
  const [typeVisible, setTypeVisible] = useState(false);
  const [deviceVisible, setDeviceVisible] = useState(false);
  const [deleteBrandOrType, setDeleteBrandOrType] = useState(false);
  const [searchDevice, setSearchDevice] = useState("");
  const [searchedDevice, setSearchedDevice] = useState([]);
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(1);

  const [successMsg, setSuccessMsg] = useState("");
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const limit = 5;
  const pageCount = Math.ceil(Number(count) / limit);
  const pages = [];
  for (let number = 1; number < pageCount + 1; number++) {
    pages.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => setCurrentPage(number)}
      >
        {number}
      </Pagination.Item>
    );
  }
  useEffect(() => {
    getAllDevicesInAdminPage(searchDevice, currentPage, filter).then(
      ({ count, rows }) => {
        setSearchedDevice(rows);
        setCount(count);
      }
    );
  }, [currentPage]);

  useEffect(() => {
    getAllDevicesInAdminPage(searchDevice, 1, filter).then(
      ({ count, rows }) => {
        setSearchedDevice(rows);
        setCount(count);
        setCurrentPage(1);
      }
    );
  }, [filter, successMsg]);

  const fetchDevice = () => {
    getAllDevicesInAdminPage(searchDevice, currentPage, filter).then(
      ({ count, rows }) => {
        setSearchedDevice(rows);
        setCount(count);
      }
    );
  };

  const showSuccessMsgFunc = (msg) => {
    setSuccessMsg(msg);
    setShowSuccessMsg(true);
    setTimeout(() => setShowSuccessMsg(false), 5000);
  };

  return (
    <div className="admin-panel">
      <div className="admin-panel__container">
        <div className="admin-panel__wrapper">
          <div className="admin-panel__tools tools">
            <button
              className="tools__add-type"
              onClick={() => setTypeVisible(true)}
            >
              Добавить тип
            </button>
            <button
              className="tools__add-brand"
              onClick={() => setBrandVisible(true)}
            >
              Добавить бренд
            </button>
            <button
              className="tools__add-item"
              onClick={() => setDeviceVisible(true)}
            >
              Добавить товар
            </button>
            <button
              className="tools__delete"
              onClick={() => setDeleteBrandOrType(true)}
            >
              Удалить бренд или тип
            </button>
            <CreateBrand
              show={brandVisible}
              onHide={() => setBrandVisible(false)}
            />
            <CreateDevice
              show={deviceVisible}
              onHide={() => setDeviceVisible(false)}
            />
            <CreateType
              show={typeVisible}
              onHide={() => setTypeVisible(false)}
            />
            <DeleteBrandOrType
              show={deleteBrandOrType}
              onHide={() => setDeleteBrandOrType(false)}
            />
          </div>
          <div>
            <ListGroup>
              {searchedDevice &&
                searchedDevice.map(({ id, img, brand, type, price, name }) => {
                  return (
                    <div className="admin-row-11" key={id}>
                      <div>
                        <div className="id-route-edit">
                          <div className="id-route-edit-first">
                            <a
                              className="id-route-edit-a"
                              href={DEVICE_EDIT_ROUTE + `/${id}`}
                            >
                              Edit
                            </a>
                          </div>
                        </div>
                        <div className="id-route-image">
                          <img
                            className="admin-roll-img"
                            width={200}
                            src={process.env.REACT_APP_API_URL + img}
                          />
                        </div>
                        <div className="id-route-info">
                          <Row>
                            <Col xs={12}>
                              <div
                                className="id-route-admin"
                                href={DEVICE_EDIT_ROUTE + `/${id}`}
                              >
                                id: {id}
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col xs={12}>Name: {name}</Col>
                          </Row>
                          <Row>
                            <Col xs={12}>Price: {price}</Col>
                          </Row>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </ListGroup>
            <Pagination
              size="sm"
              className="mt-4 mb-4"
              style={{ margin: "0 auto" }}
            >
              {searchedDevice && searchedDevice.length > 0 ? pages : false}
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
