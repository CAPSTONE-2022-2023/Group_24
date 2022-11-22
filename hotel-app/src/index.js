import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import SignIn from './App';
import SignUp from './Signup';
import SignUp_E from './Signup-E';
import CHome from './client-home';
import EHome from './employee-home';
import reportWebVitals from './reportWebVitals';

export default function Application() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<SignIn />} />
          <Route path="Signup">
            <Route path="Customer" element={<SignUp />} />
            <Route path="Employee" element={<SignUp_E />} />
          </Route>
          <Route path="Home">
            <Route path="Customer" element={<CHome />} />
            <Route path="Employee" element={<EHome />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Application />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
