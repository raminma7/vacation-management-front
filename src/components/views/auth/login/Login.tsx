import { useState } from "react";
import { Link } from "react-router-dom";

import axiosClient from "../../../../axios-client";

import AuthForm from "@tools/authForm/AuthForm";
import { IField } from "@tools/field/Field";
import { EInput } from "@tools/input/Input";
import { useAuthContext } from "@contexts/AuthContext";

const Login = () => {
  const {setToken} = useAuthContext()
  const [errors, setErrors] = useState<any[] | null>(null)

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axiosClient
      .post("/login", formData)
      .then((response) => {
        setToken(response.data.token)
      }).catch((err) => {
        let errors = []
        const error = err.response.data.message
        errors.push(error)
        setErrors(errors)
      });
  };

  const loginFields: IField[] = [
    {
      label: "Email",
      inputName: "email",
      inputId: "loginEmail",
      inputType: EInput.email,
      inputRequired: true,
      inputValue: formData.email,
      onInputChange: handleInputChange,
      placeholder: "Enter your email address",
    },
    {
      label: "Password",
      inputName: "password",
      inputId: "loginPassword",
      inputType: EInput.password,
      inputRequired: true,
      inputValue: formData.password,
      onInputChange: handleInputChange,
      placeholder: "Enter your password",
    },
  ];

  const footer = () => {
    return (
      <div className="auth-form_footer__row">
        <span>Don't have an account?</span>
        <Link to="/register">Register</Link>
      </div>
    );
  };

  return (
    <AuthForm
      header="Login"
      subHeader="Enter your credentials to access your account"
      fields={loginFields}
      footer={footer()}
      buttonText="Login"
      onSubmit={handleSubmit}
      errors={errors}
    />
  );
};

export default Login;
