import React from 'react';
import { useLocation } from 'react-router-dom';

const DisplayData = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get('name');
  const email = queryParams.get('email');
  const phone = queryParams.get('phone');
  const address = queryParams.get('address');

  return (
    <div className="display-data-container">
      <h2>QR Code Data</h2>
      <div className="data-field"><strong>Name:</strong> {name}</div>
      <div className="data-field"><strong>Email:</strong> {email}</div>
      <div className="data-field"><strong>Phone:</strong> {phone}</div>
      <div className="data-field"><strong>Address:</strong> {address}</div>
    </div>
  );
};

export default DisplayData;
