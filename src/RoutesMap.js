import { Navigate, useRoutes } from "react-router-dom";
import { getUser } from "./localstorage/localStorage";
import LoginPage from "./pages/login/LoginPage";
import SignUpPage from "./pages/signup/SignUpPage";
import DashboardLayout from "./pages/dashboard/DashBoardLayout";
import DashBoard from "./pages/dashboard/DashBoard";
import FileManager from "./pages/filemanager/FileManager";

const Routes = () => {
  const user = getUser()
  const routes = useRoutes([
    {
      path: "/dashboard",
      element: user ? <DashboardLayout /> : <Navigate to="/login" />,
      children: [{ element : <DashBoard/>, index : true },
    {path : 'file-manager' , element :<FileManager/>}
    
    ],
    },
    {
      path: "",
      element: user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />,
    },
    {
      path: "login",
      element: !user ? <LoginPage /> : <Navigate to="/dashboard" />,
    },
    {
      path: "signup",
      element: !user ? <SignUpPage /> : <Navigate to="/dashboard" />,
    },
    {
      path: "404",
      element: <div>Page Not found</div>,
    },
    // {
    //     path : '*',
    //     element : <Navigate to='/404' replace/>
    // }
  ]);

  return routes;
};
export default Routes;
