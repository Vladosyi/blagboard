import React, {useContext} from "react";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import "../styles/TypeBar.css";
import "../styles/Shop.css"
import { ListGroup } from "react-bootstrap";

const TypeBar = observer(() => {
    const {device} = useContext(Context)

    return(
        <div className="table-container">
            <div className="table-container-second">
                <table className="table-main-left">
                    {device.types.map(type => 
                        <ListGroup.Item
                            className="table-inside"
                            style={{cursor:'pointer'}}
                            active={type.id === device.selectedType}
                            onClick={() => device.setSelectedType(type)}
                            key={type.id}>
                            {type.name}
                        </ListGroup.Item>
                        )}
                </table>
                </div>
        </div>
    );
});

export default TypeBar;