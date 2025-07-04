import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RegistrationPage = () => {
  const [registrationData, setRegistrationData] = useState({
    username: '',
    password: '',
  });

  const handleRegistrationChange = (e) => {
    const { name, value } = e.target;
    setRegistrationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://mdrl7.onrender.com/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: registrationData.username,
          password: registrationData.password,
        }),
      });

      const result = await response.json();
      console.log('Registration response:', result);

      // Optionally handle success (e.g. redirect, show success message)
    } catch (error) {
      console.error('Registration error:', error);
    }

    // Reset form
    setRegistrationData({
      username: '',
      password: '',
    });
  };

  return (
    <div>
      <h1>Registration Page</h1>
      <form onSubmit={handleRegistrationSubmit}>
        <input
          type='text'
          name='username'
          placeholder='Username'
          value={registrationData.username}
          onChange={handleRegistrationChange}
          required
        />
        <input
          type='password'
          name='password'
          placeholder='Password'
          value={registrationData.password}
          onChange={handleRegistrationChange}
          required
        />
        <button type='submit'>Register</button>
        <p>
          Already Registered?{' '}
          <Link to='/login'>Login here</Link>
        </p>
      </form>
    </div>
  );
};

export default RegistrationPage;
