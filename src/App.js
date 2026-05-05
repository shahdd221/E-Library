import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/login";
import Layout from "./components/Layout";
import CreateAccount from "./components/CreateAccount";
import ForgetPassword from './components/ForgetPassword';
import BooksM from './components/admin/BooksM';
import LayoutPage from './components/LayoutPage';
import LibraryHome from './components/LibraryHome';
import MyBorrowedBooks from "./components/MyBorrowedBooks";
import BorrowingLog from "./components/admin/BorrowingLog";
import Profile from "./components/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Login /> },
      { path: "create-account", element: <CreateAccount /> },
      { path: "forgetPassword", element: <ForgetPassword /> },

      {
        element: <LayoutPage />,
        children: [
          { path: "home", element: <LibraryHome /> },
          { path: "my-borrowed-books", element: <MyBorrowedBooks /> },

         
          { path: "profile", element: <Profile /> },

          { path: "admin/BooksM", element: <BooksM /> },
          { path: "admin/BorrowingLog", element: <BorrowingLog /> },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;