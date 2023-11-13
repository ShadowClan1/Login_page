import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "./App.css";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./redux/store";
import { useRoutes } from "react-router-dom";
import Routes from "./RoutesMap";
import { getUser } from "./localstorage/localStorage";
import Alert from "./components/Alert";
import { useEffect } from "react";
import { showAlert } from "./redux/alerts/alertSlice";
import { SmallDialogBox } from "./components/SmallDialogBox";
import { setUserRedux } from "./redux/userSlice/userSlice";

function App() {
  const alertDetails = useSelector((state) => state.alert);
  const dispatch = useDispatch()
  const user = getUser()
  useEffect(()=>{
    console.log(user, "this is the user from app")
    if(user) {

      dispatch(setUserRedux(JSON.parse(user)))
    }
  },[user])
  return (
    <>
      <Routes />
      <Alert
        visible={alertDetails.visible}
        message={alertDetails.message}
        type={alertDetails.type}
      />
      <SmallDialogBox/>
    </>
  );
}

export default App;
