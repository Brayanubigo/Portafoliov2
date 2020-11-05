import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'antd/dist/antd.css';
import {BrowserRouter } from 'react-router-dom';

// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'mdbreact/dist/css/mdb.css';
ReactDOM.render(
    
    <React.StrictMode>
       <BrowserRouter>
       <App/>
 </BrowserRouter>  

    </React.StrictMode>,
    document.getElementById('root')

);