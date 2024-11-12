import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QRForm from './Components/QRForm';
import DisplayData from './Components/Display';
import ViewData from './Components/ViewData';
import UserDetails from './Components/UserDetails';

const App = () => {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<QRForm />} />
        <Route path="/display" element={<DisplayData />} />
        <Route path="/data" element={<ViewData />} />
        <Route path="/user/:userId" element={<UserDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
