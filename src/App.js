import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import {useRoutes } from "react-router-dom";
import routes from "./RoutesMap";

function App() {
  const Routes = useRoutes(routes);
  return (
    <>
      <Provider store={store}>{Routes}</Provider>
    </>
  );
}

export default App;
