import React from "react";

const Checkbox = ({ label, isSelected, onCheckboxChange, name }) => (
  <div className="form-check">
    <label>
      <input
        type="checkbox"
        name={name}
        checked={isSelected}
        onChange={onCheckboxChange}
        className="form-check-input"
      />
      {label}
    </label>
  </div>
);

export default Checkbox;