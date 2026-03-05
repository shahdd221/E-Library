import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/login";
import Layout from "./components/Layout";
import CreateAccount from "./components/CreateAccount";
import ForgetPassword from './components/ForgetPassword';
import LibraryHome from "./components/LibraryHome"; // ✅ add

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/create-account", element: <CreateAccount /> },
      { path: "/forgetPassword", element: <ForgetPassword /> },

      // ✅ بدل ما كانت Login
      { path: "", element: <LibraryHome /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;