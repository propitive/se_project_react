import React from "react";
import { useEffect, useState } from "react";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext";

export function Checkbox() {
  const currentTemperatureUnit = React.useContext(
    CurrentTemperatureUnitContext
  );
  console.log(currentTemperatureUnit);

  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
    currentTemperatureUnit.handleToggleSwitchChange();
  };

  console.log(currentTemperatureUnit);

  return (
    <label className="header__switch">
      <input
        className="header__toggle"
        type="checkbox"
        checked={checked}
        onChange={handleChange}
      />
      <span className="header__slider"></span>
      <div className="header__toggle_text_section">
        <p
          className={`header__toggle_text_f ${
            checked && "header__toggle_text__active"
          }`}
        >
          C
        </p>
        <p
          className={`header__toggle_text_c ${
            !checked && "header__toggle_text__active"
          }`}
        >
          F
        </p>
      </div>
    </label>
  );
}

export default Checkbox;
