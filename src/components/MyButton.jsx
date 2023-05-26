import React from "react";

const MyButton = ({ children, type, className, onClick }) => {
  return (
    <>
      <button type={type} className={className} onClick={onClick}>
        {children}
      </button>
    </>
  );
};

export default MyButton;
