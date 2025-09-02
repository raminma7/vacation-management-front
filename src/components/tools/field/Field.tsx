import React from "react";

import Input, { EInput } from "@tools/input/Input";

import "./field.css";

export interface IField {
  label?: string;
  inputName: string;
  inputId: string;
  inputType: EInput;
  inputRequired: boolean;
  inputValue: any;
  options?: { label: string; value: string }[];
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  min?: string;
}

const Field: React.FC<IField> = ({
  label,
  inputName,
  inputId,
  inputType,
  inputRequired,
  inputValue,
  options,
  onInputChange,
  placeholder,
  min,
}) => {
  return (
    <div className="field">
      {label && <label htmlFor={inputId}>{label}</label>}
      <Input
        name={inputName}
        id={inputId}
        type={inputType}
        required={inputRequired}
        value={inputValue}
        options={options}
        onChange={onInputChange}
        placeholder={placeholder}
        min={min}
      />
    </div>
  );
};

export default Field;
