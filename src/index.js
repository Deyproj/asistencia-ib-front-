import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/App';


import 'bootstrap/dist/css/bootstrap.min.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
const script = document.createElement('script');
script.src = "https://cdn.jsdelivr.net/npm/react-apexcharts";
script.async = true;
document.body.appendChild(script);
root.render(
    <App />
  /* </React.StrictMode> */
);

