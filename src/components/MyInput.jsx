import React from "react";

const MyInput = ({
  placeholder,
  type,
  name,
  className,
  value,
  checked,
  onChange,
}) => {
  return (
    <>
      <input
        type={type}
        name={name}
        className={className}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        checked={checked}
      />
    </>
  );
};

export default MyInput;
