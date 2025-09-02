import { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

import PanelHeader from "@tools/panelHeader/PanelHeader";
import HeaderText from "@tools/headerText/HeaderText";
import Tabs, { TTab } from "@tools/tabs/Tabs";
import Spinner from "@tools/spinner/Spinner";

import ErrorFallback from "@views/error/Error";

import { useAuthContext } from "@contexts/AuthContext";

import axiosClient from "../../../../axios-client";

import "./panelTemplate.css";

const PanelTemplate = () => {
  const { token, user, setUser } = useAuthContext();

  if (!token) {
    return <Navigate to="/login" />;
  }

  if(!user){
    axiosClient
      .post("/get-user")
      .then((response) => {
        setUser(response.data)
      })
      .catch((err) => {
        return <ErrorFallback fallBackRoute="/panel" />;
    });
  }
  
  const [activeTab, setActiveTab] = useState("Request Vacation");
  const [loading, setLoading ] = useState(true)
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timeout)
  })
 
  const handleClick = (uri: string, tab: string) => {
    setActiveTab(tab);
    navigate(uri);
  };

  const tabs: TTab[] = [
    {
      text: "Request Vacation",
      onClick: () => handleClick("/panel/request", "Request Vacation"),
    },
    {
      text: "My Requests",
      onClick: () => handleClick("/panel/my-requests", "My Requests"),
    },
  ];

  return (
    <div className="panel-template">
      <PanelHeader />

      {loading ? (<Spinner />) : (
        <div className="container">
          <HeaderText
            title={`Welcome ${user?.first_name}`}
            subTitle="Manage your vacation requests here."
          />

          <Tabs tabs={tabs} activeTab={activeTab} />
          <div className="panel-template_outlet">
            <Outlet />
          </div>
        </div>
      )}
    </div>
  );
};

export default PanelTemplate;
