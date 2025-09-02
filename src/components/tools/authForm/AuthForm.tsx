import React from "react";

import Field, { IField } from "@tools/field/Field";
import Button, { EButton } from "@tools/button/Button";
import HeaderText from "@tools/headerText/HeaderText";

import "./authForm.css";

interface IAuthForm {
  fields: IField[];
  header?: string;
  subHeader?: string;
  footer?: React.ReactElement;
  buttonText: string;
  buttonIcon?: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  errors?:any[] | null
}

const AuthForm: React.FC<IAuthForm> = ({
  fields,
  header,
  subHeader,
  footer,
  buttonText,
  buttonIcon,
  onSubmit,
  errors
}) => {
  return (
    <div className="auth-form">
      {header && <HeaderText title={header} subTitle={subHeader ?? ""} />}
      <form onSubmit={onSubmit}>
        {errors && (
          <div className="auth-form_errors">
            {errors.map((error, index) => (
              <div key={`error-${index}`} className="auth-form_errors__error">{error}</div>
            ))}
          </div>
        )}
        {fields.map((field: IField, index: number) => (
          <Field
            key={`field-${index}`}
            label={field.label}
            inputName={field.inputName}
            inputId={field.inputId}
            inputType={field.inputType}
            inputRequired={field.inputRequired}
            inputValue={field.inputValue}
            onInputChange={field.onInputChange}
            options={field.options}
            placeholder={field.placeholder}
            min={field.min}
          />
        ))}

        <Button icon={buttonIcon} text={buttonText} type={EButton.submit} />
      </form>
      {footer && <div className="auth-form_footer">{footer}</div>}
    </div>
  );
};

export default AuthForm;
