import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  // Submit function
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://mdrl7.onrender.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: loginData.username,
          password: loginData.password,
        }),
      });

      const result = await response.json();
      console.log('Login response:', result);

      // Optionally handle successful login (e.g. redirect, store token, etc.)
    } catch (error) {
      console.error('Login error:', error);
    }

    // Reset form
    setLoginData({
      username: '',
      password: '',
    });
  };

  // Handle input changes
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleLoginSubmit}>
        <input
          type='text'
          name='username'
          placeholder='Username'
          value={loginData.username}
          onChange={handleLoginChange}
          required
        />
        <input
          type='password'
          name='password'
          placeholder='Password'
          value={loginData.password}
          onChange={handleLoginChange}
          required
        />
        <button type='submit'>Login</button>
        <p>
          Not Registered Yet?{' '}
          <Link to='/registration'>Register Here</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
