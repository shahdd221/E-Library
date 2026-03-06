import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/login";
import Layout from "./components/Layout";
import CreateAccount from "./components/CreateAccount";
import ForgetPassword from './components/ForgetPassword';
import Books from './components/admin/Books';
import LayoutPage from './components/LayoutPage';
import LibraryHome from './components/LibraryHome';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/create-account", element: <CreateAccount /> },
      { path: "/forgetPassword", element: <ForgetPassword /> },
      { path: "", element: <Login /> },
      { path: "/", element: <LayoutPage /> , children:[
        { path: "admin/books", element: <Books /> },
        { path: "home", element: <LibraryHome/>  }
      
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