import React from "react";

const FormRow = ({ label,className, children }) => {
  return (
    <div className={`form-control w-full ${className}`}>
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      {/* <input
        type="text"
        placeholder="Type here"
        className="input input-bordered w-full"
      /> Những gì được input bên thẻ formrow sẽ nhảy vào ô chilren này*/}
      {children}
    </div>
  );
};

export default FormRow;
