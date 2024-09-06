import React, { useState } from 'react';

const RequestAccessPage = () => {
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const validateForm = () => {
    if (!role) {
      return 'Please select a role.';
    }
    if (!email) {
      return 'Please enter an email address.';
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return 'Please enter a valid email address.';
    }
    return '';
  };

  const handleSendRequest = async () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');
    try {
      const response = await fetch('https://localhost:7137/WeatherForecast/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          role,
          email
        })
      });

      if (response.status === 200) {
        window.alert('Request sent successfully! Your Admin will check and approve the request.');
        // Optionally clear form fields
        setRole('');
        setEmail('');
      } else {
        window.alert('Request failed. Please try again.');
      }
    } catch (error) {
      console.error('Error sending request:', error);
      window.alert('Error sending request. Please try again.');
    }
  };

  const containerStyle = {
    padding: '20px',
    maxWidth: '500px',
    margin: 'auto',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9'
  };

  const titleStyle = {
    textAlign: 'center',
    fontSize: '24px',
    color: '#333',
    marginBottom: '20px'
  };

  const formGroupStyle = {
    marginBottom: '15px'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold'
  };

  const selectStyle = {
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc'
  };

  const inputStyle = {
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc'
  };

  const buttonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    textAlign: 'center'
  };

  const errorStyle = {
    color: 'red',
    marginBottom: '15px'
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Request Access</h1>
      {error && <div style={errorStyle}>{error}</div>}
      <div style={formGroupStyle}>
        <label htmlFor="role" style={labelStyle}>Role:</label>
        <select
          id="role"
          value={role}
          onChange={handleRoleChange}
          style={selectStyle}
        >
          <option value="" disabled>Select a role</option>
          <option value="Engagement Owner">Engagement Owner (Full control)</option>
          <option value="Auditor">Auditor (Access to assigned engagements)</option>
        </select>
      </div>
      <div style={formGroupStyle}>
        <label htmlFor="email" style={labelStyle}>Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter email address"
          style={inputStyle}
        />
      </div>
      <button onClick={handleSendRequest} style={buttonStyle}>
        Send Request
      </button>
    </div>
  );
};

export default RequestAccessPage;
