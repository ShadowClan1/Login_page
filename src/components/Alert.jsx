import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useDispatch } from "react-redux";
import { closeAlert } from "../redux/alerts/alertSlice";
import Slide from "@mui/material/Slide";

const AlertMui = React.forwardRef(function AlertMui(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Alert = ({ type, message, visible }) => {
  const dispatch = useDispatch();

  const handleClose = () => dispatch(closeAlert());
  return (
    <Snackbar
      open={visible}
      autoHideDuration={6000}
      onClose={handleClose}
      TransitionComponent={Slide}
    >
      <AlertMui onClose={handleClose} severity={type} sx={{ width: "100%" }}>
        {message}
      </AlertMui>
    </Snackbar>
  );
};

export default Alert;
