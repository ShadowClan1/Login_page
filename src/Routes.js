import { Navigate, useRoutes } from "react-router-dom";
// layouts

import SimpleLayout from "./layouts/simple/SimpleLayout";

import LoginPage from "./pages/LoginPage";
import Page404 from "./pages/Page404";
import DashboardAppPage from "./pages/DashboardAppPage";
import News from "./pages/News";
import CreateNews from "./pages/News/CreateNews";
import NewsBulletin from "./pages/News/NewsBulletin";
import { useLocalStorage } from "./utils/hooks/useLocalstorage";
import EditNews from "./pages/News/EditNews";
import CreateBulletin from "./pages/News/CreateBulletin";
import EditBulletin from "./pages/News/EditBulletin";
import ForgetPassword from "./pages/ForgetPassword";
import CreateUser from "./pages/Users/CreateUser";
import { ArchievedNews } from "./pages/News/ArchivedNews";
import DashboardLayout from "./layouts/dashboard/DashboardLayout";
import ProfileAdmin from "./pages/Profile";
import EditProfile from "./pages/adminProfile";
import ChangePassword from "./pages/ChangePassword";
import Podcast from "./pages/News/Podcast";
import CreateContacts from "./pages/Contacts/CreateContacts";
import ContactPage from "./pages/Contacts/Contacts";
import EditContact from "./pages/Contacts/EditContact";
import Subscribers from "./pages/Subscribers";
import SetPassword from "./pages/resetPassword";
import "./default.css";

// ----------------------------------------------------------------------

export default function Router() {
  const user = useLocalStorage();
  const routes = useRoutes([
    {
      path: "/dashboard",
      element: user ? <DashboardLayout /> : <Navigate to="/login" />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: "app", element: <DashboardAppPage /> },
        { path: "user/create-user", element: <CreateUser /> },
        { path: "profile", element: <ProfileAdmin /> },
        { path: "editProfile/:id", element: <EditProfile /> },
        { path: "changePassword/:id", element: <ChangePassword /> },
        { path: "subscribers", element: <Subscribers /> },
        { path: "contacts", element: <ContactPage /> },
        { path: "contacts/create-contacts", element: <CreateContacts /> },
        { path: "contacts/:id", element: <EditContact /> },
        { path: "news", element: <News /> },
        { path: "news/create-news", element: <CreateNews /> },
        { path: "news/:id", element: <EditNews /> },
        { path: "news-podcast", element: <Podcast /> },
        { path: "news-podcast/create-podcast", element: <CreateNews /> },
        { path: "news-podcast/:id", element: <EditNews /> },
        { path: "archieved-news", element: <ArchievedNews /> },
        { path: "archieved-news/:id", element: <EditNews /> },
        { path: "news-bulletin", element: <NewsBulletin /> },
        { path: "news-bulletin/:id", element: <EditBulletin /> },
        { path: "news-bulletin/create-bulletin", element: <CreateBulletin /> },
      ],
    },
    {
      path: "login",
      element: !user ? <LoginPage /> : <Navigate to="/dashboard/app" />,
    },
    {
      path: "forget-password",
      element: !user ? <ForgetPassword /> : <Navigate to="/dashboard/app" />,
    },
    {
      path: "set-password/:otp",
      element: !user ? <SetPassword /> : <Navigate to="/dashboard/app" />,
    },

    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
