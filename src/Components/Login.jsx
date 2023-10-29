
import React, { useState } from 'react';
import { Input } from './Input';
import {Button} from './Button';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };



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
    
    
    fetch(`https://login-server-6afs.onrender.com/users`)
      .then((response) => response.json())
      .then((users) => {
        const matchingUser = users.find(user => user.email === email && user.password === password);
        if (matchingUser) {
          toast.success('Login successful!', {
            position: "top-center",
            autoClose: 5000,
            theme: "colored",
          });
        } else {
          setLoginError('Invalid email or password');
        }
      })
      .catch((error) => {
        setLoginError('Invalid email or password');
      });
  };
return (
  <div className="form-container">
      <h4>Login</h4>
      <form >
      <div className="login-form" onSubmit={handleLogin}>
      <Input type="email" value={email} placeholder="E-mail Address" onChange={handleEmailChange} />
      {emailError && <p className="error-message">{emailError}</p>}
      <Input type="password" value={password} placeholder="Password" onChange={handlePasswordChange} />
      {passwordError && <p className="error-message">{passwordError}</p>}
      <div className="form-style">
      <div className="button1">
      <Button label="LOGIN" onClick={handleLogin} />
      </div>
      {loginError && <p className="error-message1">{loginError}</p>}
      <div className="pass">
      <p className="paragraph1">Forgot your password?&nbsp;<a href="/reset-password">Reset it</a></p></div>
      </div>
      </div>
      <div className="sign">
        <p>New to Login? &nbsp;<a href="/register">Sign up!</a></p>
      </div>
      <ToastContainer />
      </form>
  </div>
)
}

export default Login;
