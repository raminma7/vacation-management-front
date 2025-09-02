import axiosClient from "../../../axios-client"

import Button, { EButton } from "@tools/button/Button";
import Logo from "@tools/logo/Logo";

import { useAuthContext } from "@contexts/AuthContext";

import "./panelHeader.css";

const PanelHeader = () => {
  const { setLogout } = useAuthContext();

  const handleLogout = () => {
    axiosClient
      .post("/logout")
      .then((response) => {
        setLogout()
      }).catch((err) => {
        console.log(err);
    });
  };

  return (
    <div className="panel-header">
      <div className="container">
        <Logo />
        <div className="panel-header_logout">
          <Button
            className="panel-header_logout__button"
            icon="logout"
            iconColor="#111"
            type={EButton.button}
            text="Logout"
            onClick={handleLogout}
          />
        </div>
      </div>
    </div>
  );
};

export default PanelHeader;
