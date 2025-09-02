import { useState } from "react";
import { Link } from "react-router-dom";

import AuthForm from "@tools/authForm/AuthForm";
import { IField } from "@tools/field/Field";
import { EInput } from "@tools/input/Input";

const ForgetPassword = () => {
  const [forgetPasswordEmail, setForgetPasswordEmail] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = e.target;
    setForgetPasswordEmail(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const forgetPasswordFields: IField[] = [
    {
      label: "Email",
      inputName: "forgetPasswordEmail",
      inputId: "forgetPasswordEmail",
      inputType: EInput.email,
      inputRequired: true,
      inputValue: forgetPasswordEmail,
      onInputChange: handleInputChange,
      placeholder: "Enter your email address",
    },
  ];

  const footer = () => {
    return (
      <div className="auth-form_footer__row">
        <Link to="/login">Back to Login!</Link>
      </div>
    );
  };

  return (
    <AuthForm
      header="Forgot Password"
      subHeader="Enter your email address and we'll send you reset instructions"
      fields={forgetPasswordFields}
      footer={footer()}
      buttonText="Login"
      onSubmit={handleSubmit}
    />
  );
};

export default ForgetPassword;
