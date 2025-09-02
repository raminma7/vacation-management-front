import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AuthTemplate from "@views/auth/authTemplate/AuthTemplate";
import Login from "@views/auth/login/Login";
import Register from "@views/auth/register/Register";
import ForgetPassword from "@views/auth/forgetPassword/ForgetPassword";

import PanelTemplate from "@views/panel/panelTemplate/PanelTemplate";
import Request from "@views/panel/request/Request";
import MyRequests from "@views/panel/myRequests/MyRequests";
import Settings from "@views/panel/settings/Settings";
import NotFound from "@views/notFound/NotFound";

import "./variables.css";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      {/* Toast notifications container (global) */}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Routes>
        {/* authentication routes */}
        <Route path="" element={<AuthTemplate />}>
          <Route path="" element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forget-password" element={<ForgetPassword />} />
        </Route>

        {/* protected panel routes */}
        <Route path="/panel" element={<PanelTemplate />}>
          <Route path="" element={<Request />} />
          <Route path="request" element={<Request />} />
          <Route path="my-requests" element={<MyRequests />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* not found page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
