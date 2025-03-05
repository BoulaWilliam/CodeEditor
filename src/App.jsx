import CodeEditor from './components/CodeEditor/CodeEditor';
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Layout from './components/Layout/Layout';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import UserProvider from './Contexts/UserContext/User.context';

function App() {

  const router = createBrowserRouter([
    {path:'/',
      element:
      <Layout/>,children:[
      {path:"code",element:<CodeEditor/>},
    ]},

    {path:"/",element:<Layout/>,children:[
      {path:"login",element:<Login/>},
      {index:true,element:<Register/>},
      {path:"register",element:<Register/>}
    ]}
  
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