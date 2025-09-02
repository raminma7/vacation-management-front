import React from "react";

import Button, { EButton } from "@tools/button/Button";
import { useNavigate } from "react-router-dom";

import "./error.css";

interface IErrorFallback {
  fallBackRoute: string;
}

const ErrorFallback: React.FC<IErrorFallback> = ({ fallBackRoute }) => {
  const navigate = useNavigate();

  const handleFallBack = () => {
    navigate(fallBackRoute);
  };

  return (
    <div className="error-page" role="alert">
      <div className="error-container">
        <h2>Oops! Something Went Wrong</h2>
        <p>An unexpected error occurred. Please try again.</p>
        <Button
          type={EButton.button}
          text="Try Again"
          onClick={handleFallBack}
          className="retry-button"
        />
      </div>
    </div>
  );
};

export default ErrorFallback;
