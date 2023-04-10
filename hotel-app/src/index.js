import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import SignIn from './App';
import SignUp from './Signup';
import SignUp_E from './Signup-E';
import CHome from './client-home';
import EHome from './employee-home';
import Room_Create from './Room-Create';
import reportWebVitals from './reportWebVitals';
import Room_View from './Room-View';
import Room_Edit from './Room-Edit';
import Room_List from './room-list';
import Room from './Room';
import NavBar from './NavBar';
import Reservation_Create_E from './Reservation-Create-E';
import Reservation_Create_C from './Reservation-Create-C';
import Reservation_List from './Reservation-List';
import Reservation_Client from './Reservation-Client';
import Reservation_Edit from './Reservation-Edit';
import Reservation_Edit_Request from './Reservation-Edit-Request';
import Reservation_Billing from './Reservation-Billing';
import Reservation_Payment from './Reservation-Payment';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51MvBIeBJiqAjR4SVdwO4CmjvrNMKgWfOYWlQc7xDFFfRc8Rdk3rAtY71olkius9ZuMOfcM8eyElhJQQRuAmr0J6J00B2PqNP42');

export default function Application() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/">
          <Route index element={<SignIn />} />
          <Route path="Homepage">
            <Route path="Customer" element={<CHome />} />
            <Route path="Employee" element={<EHome />} />
          </Route>
          <Route path="Signup">
            <Route path="Customer" element={<SignUp />} />
            <Route path="Employee" element={<SignUp_E />} />
          </Route>
          <Route path="Room">
            <Route path="Create" element={<Room_Create />} />
            <Route path="View" element={<Room_View />} />
            <Route path="Edit" element={<Room_Edit />} />
            <Route path="List" element={<Room_List />} />
            <Route path="Insight" element={<Room />} />
          </Route>
          <Route path="Reservation">
            <Route path="Create">
              <Route path="Customer" element={<Reservation_Create_C />} />
              <Route path="Employee" element={<Reservation_Create_E />} />
            </Route>
            <Route path="List" element={<Reservation_List />} />
            <Route path="Client" element={<Reservation_Client />} />
            <Route path="Edit" element={<Reservation_Edit />} />
            <Route path="EditRequest" element={<Reservation_Edit_Request />} />
            <Route path="Billing" element={<Reservation_Billing />} />
            <Route path="Payment" element={<Elements stripe={stripePromise}><Reservation_Payment /></Elements>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter >
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
