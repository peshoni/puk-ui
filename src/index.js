import React from 'react';
import ReactDOM from 'react-dom';
import { ToastProvider } from 'react-toast-notifications';
import App from './App';
import './index.css';

ReactDOM.render(
   
  <ToastProvider>
    {/* <React.StrictMode> */} 
    <App  /> 
    {/* </React.StrictMode> */}
  </ToastProvider>
   
  ,
  document.getElementById('root')
);
 