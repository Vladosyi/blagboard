import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import "../styles/TypeBar.css";


// TODO: сементика -  ul

const TypeBar = observer(() => {
  const { device } = useContext(Context);

  return (
    <section className="type-Bar">
      <div className="type-Bar__container">
        <div className="type-Bar__wrapper">
          {device.types.map(type => (
            <li
              className="type-Bar__li"
              // active={type.id === device.selectedType.id}
              onClick={() => device.setSelectedType(type)}
              key={type.id}
            >
              {type.name}
            </li>
          ))}
        </div>
      </div>
    </section>
  );
});

export default TypeBar;
