import { Navigate } from "react-router-dom";
import { getUser } from "./localstorage/localStorage";
import LoginPage from "./pages/login/LoginPage";
import SignUpPage from "./pages/signup/SignUpPage";

const user = getUser();
const routes =[
    {
        path : 'dashboard',
        element : user ? <div>user logged in</div> : <Navigate to='/login'/>,
        children : []
    },
    {
        path : '',
        element : user ? <Navigate to='/dashboard' /> : <Navigate to='/login' />
    },
    {
        path : 'login',
        element : !user ? <LoginPage />  : <Navigate to='dashboard'/> 
    },
    {
        path : 'signup',
        element : !user ? <SignUpPage />  : <Navigate to='dashboard'/> 
    }
    ,
    
    {
        path : '404',
        element : <div>Page Not found</div>
    }
    ,
    {
        path : '*',
        element : <Navigate to='/404' replace/>
    }
]
export default routes;