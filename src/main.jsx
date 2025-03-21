import React from "react";
import ReactDOM from "react-dom/client";


import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme.js";
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
