import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/login";
import Layout from "./components/Layout";
import CreateAccount from "./components/CreateAccount";
import ForgetPassword from './components/ForgetPassword';
import BooksM from './components/admin/BooksM';
import LayoutPage from './components/LayoutPage';
import LibraryHome from './components/LibraryHome';



const role = localStorage.getItem("role");
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/create-account", element: <CreateAccount /> },
      { path: "/forgetPassword", element: <ForgetPassword /> },
      { path: "", element: <Login /> },
      { path: "/", element: <LayoutPage /> , children:[
        { path: "/admin/BooksM", element: <BooksM />},
        { path: "/home", element: <LibraryHome/>}
      
      ] }

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