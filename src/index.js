import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import App from './App';
import Toko from './pages/toko';
import DetailToko from './pages/detailtoko';
import reportWebVitals from './reportWebVitals';
import Api from './pages/api';
import Products from './Products';
import Login from './login';
import RoueteGuard from './RouteGuard';
import Home from './pages/home';

const router = createBrowserRouter([
  
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/home",
    element:<App /> 
  },
  {
    path: "/toko",
    element:<Toko /> ,
  },
  {
    path: "/detailtoko",
    element:<DetailToko /> ,
  },
  {
    path: "/api",
    element:<Api /> ,
  },
  {
    path: "/Products",
    element:<Products />
  },
  {
    path: "/login",
    element:<Login/>
  },
  {
    path: "/RouteGuard",
    element:<RoueteGuard/>
  },
  {
    path: "/home",
    element:<Home />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
reportWebVitals();

