import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import {useRoutes } from "react-router-dom";
import Routes from "./RoutesMap";
import { getUser } from "./localstorage/localStorage";

function App() {
  const user = getUser()
  const routes = Routes(user)
  // const Routes = useRoutes(routes);
  return (
    <>
      <Provider store={store}><Routes/></Provider>
    </>
  );
}

export default App;
