import logo from './logo.svg';
import './App.css';
import Login from './login';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from './Layout';
import CreateAccount from './CreateAccount'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {path: "/create-account", element: <CreateAccount />},
      { path: "", element: <Login /> },
      
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