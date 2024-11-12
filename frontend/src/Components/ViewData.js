import React, { useEffect, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ViewData = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // Fetch users when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users');
        console.log(response.data);
        setUsers(response.data); // Load users with their initial `isAllowed` status
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  // Handle checkbox change to show/hide QR code and update database
  const handleCheckboxChange = async (userId, isChecked) => {
    try {
      await axios.put(`http://localhost:5000/api/users/${userId}`, { isAllowed: isChecked });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, isAllowed: isChecked } : user
        )
      );
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="view-data-container">
      <button onClick={() => navigate('/')}>Add User</button>
      <h1>All Users</h1>
      <div className="user-list">
        {Array.isArray(users) && users.length > 0 ? (
          users.map((user) => (
            <div key={user._id} className="user-card">
              {/* Status Text */}
              <div className={`status-text ${user.isAllowed ? 'active' : 'inactive'}`}>
                {user.isAllowed ? 'Active' : 'Inactive'}
              </div>

              <div className="flex-jfha">
                <div className="image-name-flex">
                  {/* Show profile image only if available */}
                  {user.profileImage && (
                    <img
                      src={`http://localhost:5000/uploads/${user.profileImage}`} // Fix the path here
                      alt={`${user.name}'s profile`}
                      className="profile-image"
                      width="50px"
                    />
                  )}
                  {/* Show name only if available */}
                  {user.name && <h3>{user.name}</h3>}
                </div>

                {/* Show email only if available */}
                {user.email && <p>Email: {user.email}</p>}
                {/* Show phone only if available */}
                {user.phone && <p>Phone: {user.phone}</p>}
                {/* Show address only if available */}
                {user.address && <p>Address: {user.address}</p>}

                {/* Checkbox to toggle QR code visibility */}
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={user.isAllowed} // Checkbox reflects initial state from backend
                    onChange={(e) => handleCheckboxChange(user._id, e.target.checked)}
                  />
                  <span>Show QR Code</span>
                </label>

                <div className="flex-name-links">
                  <p>Social Links</p>
                  <div className="links-of-each-user">
                    <div className="map-flex">
                      {/* Show map link only if address is available */}
                      {user.address && (
                        <a target='_blank' href={`https://www.google.com/maps/search/?api=1&query=${user.address}`}>
                          <i className="ri-map-pin-fill"></i>
                        </a>
                      )}
                    </div>
                    <div className="links-flex">
                    {(user.youtube_url || user.facebook_url || user.linkden_url || user.twitter_url) ? (
    <>
      {user.youtube_url && (
        <a target='_blank' href={user.youtube_url}><i className="ri-youtube-fill"></i></a>
      )}
      {user.facebook_url && (
        <a target='_blank' href={user.facebook_url}><i className="ri-facebook-fill"></i></a>
      )}
      {user.linkden_url && (
        <a target='_blank' href={user.linkden_url}><i className="ri-linkedin-fill"></i></a>
      )}
      {user.twitter_url && (
        <a target='_blank' href={user.twitter_url}><i className="ri-twitter-fill"></i></a>
      )}
    </>
  ) : (
    <p>No social links available.</p> // Display message if no social media URLs are found
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Show QR Code only if isAllowed is true */}
              {user.isAllowed && (
                <div className="qr-code-all">
                  <QRCodeCanvas
                    // Encodes URL with the userId to navigate to the user details page
                    value={`http://localhost:3000/user/${user._id}`} // Use the user._id to link to their details page
                    size={70}
                  />
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No users available.</p>
        )}
      </div>
    </div>
  );
};

export default ViewData;
