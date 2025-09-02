import { Outlet, Navigate } from "react-router-dom";

import Logo from "@tools/logo/Logo";

import { useAuthContext } from "@contexts/AuthContext";

import "./authTemplate.css";

const AuthTemplate = () => {
  const { token } = useAuthContext();

  if (token) {
    return <Navigate to="/panel" />;
  }

  return (
    <div className="auth-template">
      <Logo />
      <Outlet />
    </div>
  );
};

export default AuthTemplate;
