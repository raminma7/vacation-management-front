import React, { useState } from "react";
import classNames from "classnames";

import Icon from "@tools/icon/Icon";

import "./input.css";

export enum EInput {
  text = "text",
  password = "password",
  email = "email",
  date = "date",
  textarea = "textarea",
  select = "select",
  radio = "radio",
  time = "time",
}

interface IInput {
  name: string;
  id: string;
  type: EInput;
  required: boolean;
  value: any;
  options?: { label: string; value: string }[];
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  placeholder?: string;
  min?: string;
}

const Input: React.FC<IInput> = ({
  name,
  id,
  type,
  required,
  value,
  options,
  onChange,
  placeholder,
  min,
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div
      className={classNames({
        input: type !== EInput.radio,
        "radio-input": type === EInput.radio,
      })}
    >
      {type === EInput.textarea ? (
        <textarea
          name={name}
          id={id}
          required={required}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      ) : type === EInput.select ? (
        <select name={name} id={id} required={required} value={value}>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : type === EInput.radio ? (
        <div className="input_radio">
          {options?.map((option) => (
            <label key={option.value} className="input_radio__option">
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={onChange}
                required={required}
              />
              {option.label}
            </label>
          ))}
        </div>
      ) : (
        <>
          <input
            name={name}
            id={id}
            type={
              type === EInput.password && passwordVisible ? EInput.text : type
            }
            required={required}
            value={value}
            onChange={onChange}
            autoComplete="off"
            placeholder={placeholder}
            min={min}
          />
          {type === EInput.password && (
            <Icon
              className="input_icon"
              name={passwordVisible ? "eyeOff" : "eye"}
              size={15}
              onClick={() => setPasswordVisible(!passwordVisible)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Input;
