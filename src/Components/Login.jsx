/*
import React, { useState } from 'react';
import { Input } from './Input';
import {Button} from './Button';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorMessage1, setErrorMessage1] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setErrorMessage1('Please enter a valid email address');
      setErrorMessage(''); 
      setLoginSuccess(false); 
    } else if (email === 'your@gmail.com' && password === 'yourpassword') {
      setLoginSuccess(true);
      setErrorMessage('');
      setErrorMessage1(''); 
    } else {
      setLoginSuccess(false);
      setErrorMessage('Your login attempt was not successful. Please try again.');
      setErrorMessage1(''); 
    }
  };
  

  const validateEmail = (email) => {
    return email.endsWith('@gmail.com');
  };


  const handleRegister = () => {
    navigate('/register');
  }

  return (
    <div className="container">
      <div className="page">
      <h2>LOGIN</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-field">
            <label htmlFor="email">Email:</label>
            <Input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          {errorMessage1 && (
            <p className="error-message">{errorMessage1}</p>
          )}
          <div className="input-field">
            <label htmlFor="password">Password:</label>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="button-style">
            <a href="/password-reset">Forgot Password?</a>
            <Button label="Login" onClick={handleSubmit} />
            <Button label="Register" onClick={handleRegister} />
          </div>
          {loginSuccess && (
            <p style={{ color: 'green', textAlign: 'center' ,marginLeft: '30%', fontSize: "18px"}}>Login successfully!!</p>
          )}
          {errorMessage && (
            <p style={{ color: 'red', textAlign: 'center' ,marginLeft: '30%', fontSize: "18px"}}>{errorMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
*/


import React, { useState } from 'react';
import { Input } from './Input';
import {Button} from './Button';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRegister = () => {
    navigate('/register');
  }

  const handleLogin = (e) => {
    e.preventDefault();

    setEmailError(''); 
    setPasswordError(''); 

    if (!email) {
      setEmailError('Please enter your email');
      return;
    }

    if (!password) {
      setPasswordError('Please enter your password');
      return;
    }
    
    
    fetch(`http://localhost:3020/users`)
      .then((response) => response.json())
      .then((users) => {
        const matchingUser = users.find(user => user.email === email && user.password === password);
        if (matchingUser) {
          setIsLoggedIn(true);
          setLoginError('');
        } else {
          setIsLoggedIn(false);
          setLoginError('Invalid email or password');
        }
      })
      .catch((error) => {
        setIsLoggedIn(false);
        setLoginError('Invalid email or password');
      });
  };

  return (
    <div className="container">
      <div className="page">
        <h2>LOGIN</h2>
        {isLoggedIn ? (
          <p className="success-message">Logged in Successfully!!</p>
        ) : (
          <form className="login-form" onSubmit={handleLogin}>
            <div className="input-field">
              <label htmlFor="email">Email:</label>
              <Input type="email" value={email} onChange={handleEmailChange} />
              {emailError && <p className="error-message">{emailError}</p>}
            </div>
            <div className="input-field">
              <label htmlFor="password">Password:</label>
              <Input type="password" value={password} onChange={handlePasswordChange} />
              {passwordError && <p className="error-message">{passwordError}</p>}
            </div>
            <div className="button-style">
            <a  className="pass" href="/password-reset">Forgot Password?</a>
            <Button label="Login" onClick={handleLogin} />
            <Button label="Register" onClick={handleRegister} />
            </div>
            {loginError && <p className="error-message">{loginError}</p>}
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;
