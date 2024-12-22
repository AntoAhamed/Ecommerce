import React from "react";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const CustomAlert = ({ severity = "info", title, message, onClose }) => {
  return (
    <div className="flex justify-center items-center my-4">
      <Alert
        severity={severity}
        onClose={onClose}
        className="w-full max-w-lg"
        variant="filled"
      >
        {title && <AlertTitle>{title}</AlertTitle>}
        {message}
      </Alert>
    </div>
  );
};

export default CustomAlert;
