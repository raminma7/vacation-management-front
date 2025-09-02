import { useState } from "react";
import { Link } from "react-router-dom";

import axiosClient from "../../../../axios-client";

import AuthForm from "@tools/authForm/AuthForm";
import { IField } from "@tools/field/Field";
import { EInput } from "@tools/input/Input";
import { useAuthContext } from "@contexts/AuthContext";

const Register = () => {
  const {setToken} = useAuthContext()
  const [errors, setErrors] = useState<any[] | null>(null)

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
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
      .post("/register", formData)
      .then((response) => {
        setToken(response.data.token)
      })
      .catch((err) => {
        let errors = []
        const error = err.response.data.message
        errors.push(error)
        setErrors(errors)
      });
  };

  const registerFields: IField[] = [
    {
      label: "First Name",
      inputName: "first_name",
      inputId: "registerFirstName",
      inputType: EInput.text,
      inputRequired: true,
      inputValue: formData.first_name,
      onInputChange: handleInputChange,
      placeholder: "Enter your first name",
    },
    {
      label: "Last Name",
      inputName: "last_name",
      inputId: "registerLastName",
      inputType: EInput.text,
      inputRequired: true,
      inputValue: formData.last_name,
      onInputChange: handleInputChange,
      placeholder: "Enter your last name",
    },
    {
      label: "Email",
      inputName: "email",
      inputId: "registerEmail",
      inputType: EInput.email,
      inputRequired: true,
      inputValue: formData.email,
      onInputChange: handleInputChange,
      placeholder: "Enter your email",
    },
    {
      label: "Password",
      inputName: "password",
      inputId: "registerPassword",
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
        <span>Already have an account?</span>
        <Link to="/login">Login</Link>
      </div>
    );
  };

  return (
    <AuthForm
      header="Register"
      subHeader="Create a new account to get started"
      fields={registerFields}
      footer={footer()}
      buttonText="Register"
      onSubmit={handleSubmit}
      errors={errors}
    />
  );
};

export default Register;
