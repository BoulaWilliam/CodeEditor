import CodeEditor from './components/CodeEditor/CodeEditor';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import SavedCodes from './components/SavedCodes/SavedCodes';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import './App.css';
import UserProvider from './Contexts/UserContext/User.context';
import CreateFile from './components/CreateFile/CreateFile';

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <ProtectedRoute><Layout /></ProtectedRoute>,
      children: [
        { index: true, element: <CodeEditor /> },
        { path: "code", element: <CodeEditor /> },
        { path: "CreateFile", element: <CreateFile /> },
      ]
    },

    {
      path: "/",
      element:<Layout />,
      children: [
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
      ],
    },

  ])

  return (
    <>
      <UserProvider>
        <RouterProvider router={router}></RouterProvider>
      </UserProvider>
    </>
  );
}

export default App;