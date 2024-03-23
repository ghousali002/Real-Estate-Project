import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from "./components/AuthContext";
import { BuyerProvider } from "./components/BuyerContext";

ReactDOM.render(
  <React.StrictMode>
    <BuyerProvider>
     <AuthProvider>
    <App />
   </AuthProvider>
   </BuyerProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
