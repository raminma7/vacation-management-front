import React from "react";
import { useNavigate } from "react-router-dom";

import Button, { EButton } from "@tools/button/Button";
import "./notFound.css";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate("/");
  };

  return (
    <div className="not-found-page">
      <div className="not-found-container">
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Page Not Found</h2>
        <p className="not-found-message">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>

        <Button
          type={EButton.button}
          text="Go Back Home"
          onClick={handleBackHome}
          className="not-found-button"
        />
      </div>
    </div>
  );
};

export default NotFound;
