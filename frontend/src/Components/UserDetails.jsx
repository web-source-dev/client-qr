import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UserDetails = () => {
  const { userId } = useParams(); // Get the userId from the URL
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://client-qr.vercel.app/api/users/${userId}`);
        console.log(response.data);
        setUser(response.data); // Set the user data
        setErrorMessage(''); // Clear error message if the user is found
      } catch (error) {
        if (error.response && error.response.status === 403) {
          // Handle blocked user case
          setErrorMessage('User is blocked');
        } else {
          // Handle other errors (e.g., user not found)
          setErrorMessage('Error fetching user data');
        }
        setUser(null); // Clear user data in case of error
      }
    };

    fetchUser();
  }, [userId]);

  // Function to download the vCard
  const downloadVCard = () => {
    if (user) {
      const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:${user.name}
TEL:${user.phone || ''}
EMAIL:${user.email || ''}
ORG:${user.organization || ''}
END:VCARD`;

      const blob = new Blob([vCardData], { type: 'text/vcard' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${user.name.replace(' ', '_')}_contact.vcf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (errorMessage) {
    return <p className="error-message">{errorMessage}</p>; // Display the error message if any
  }

  if (!user) {
    return <p className="loading-message">Loading...</p>; // Show loading state while user data is being fetched
  }

  return (
    <div className="user-details-containered">
      <div className="center-user-detail">
        <div className="header-flex">
          <h1 className="user-details-headingd">Member</h1>
        </div>

        <div className="user-details-cardsd">
          <div className="left-pane-card">
            <div className='image-name-flex'>
              {user.profileImage && (
                <img
                  src={`https://client-qr.vercel.app/uploads/${user.profileImage}`} // Fix the path here
                  alt={`${user.name}'s profile`}
                  className="profile-image"
                  width='50px'
                />
              )}
              {user.name && <p className='user-name-big-bold'>{user.name}</p>}
            </div>

            {user.email && (
              <div className="user-detail-itemd">
                <strong>Personal Email:</strong> {user.email}
              </div>
            )}
            {user.work_email && (
              <div className="user-detail-itemd">
                <strong>Work Email:</strong> {user.work_email}
              </div>
            )}
            {user.phone && (
              <div className="user-detail-itemd">
                <strong>Phone:</strong> {user.phone}
              </div>
            )}
            {user.address && (
              <div className="user-detail-itemd-add">
                <strong>Address:</strong> {user.address}
              </div>
            )}

            {user.organization && (
              <div className="user-detail-itemd-add">
                <strong>Organization:</strong> {user.organization}
              </div>
            )}
          </div>

          <div className="right-pane-card">
            <strong>Location</strong>
            {user.address && (
              <a target='_blank' href={`https://www.google.com/maps/search/?api=1&query=${user.address}`}>
                <i className="ri-map-pin-fill"></i>
              </a>
            )}
            <strong>Social Links</strong>
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
              <p>No <br /> social <br /> links <br /> available.</p> // Display message if no social media URLs are found
            )}
          </div>
        </div>

        {/* Add a button to download vCard */}
        <button className='save-contact-btn' onClick={downloadVCard}>Save Contact</button>
      </div>
    </div>
  );
};

export default UserDetails;
