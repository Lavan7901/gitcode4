
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
            <div className="pass"><a href="/password-reset">Forgot Password?</a></div>
            <div className='fail'>
            <Button label="Login" onClick={handleLogin} />
            <Button label="Register" onClick={handleRegister} />
            </div>
            </div>
            {loginError && <p className="error-message">{loginError}</p>}
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;
