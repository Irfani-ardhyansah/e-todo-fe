import React from "react";
import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastContainerError = () => (
  <ToastContainer
    position="top-right"
    autoClose={2500}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick={false}
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="dark"
    transition={Flip}
  />
);

export default ToastContainerError;