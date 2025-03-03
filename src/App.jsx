import CodeEditor from './components/CodeEditor/CodeEditor';
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Layout from './components/Layout/Layout';
import Login from './components/Login/Login';
import Register from './components/Register/Register';

function App() {

  const router = createBrowserRouter([
    {path:'/',element:<Layout/>,children:[
      {index:true,element:<Register/>},
      {path:"register",element:<Register/>},
      {path:"code",element:<CodeEditor/>},
      {path:"login",element:<Login/>},
    ]}
  ])

  return (
    <>
    <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
