import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/login";
import Layout from "./components/Layout";
import CreateAccount from "./components/CreateAccount";
import ForgetPassword from './components/ForgetPassword';
import DashBoard from './components/DashBoard';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/create-account", element: <CreateAccount /> },
      { path: "/forgetPassword", element: <ForgetPassword /> },

      { path: "", element: <Login /> },
      { path: "/DashBoard", element: <DashBoard /> }
      

    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;