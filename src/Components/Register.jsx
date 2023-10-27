
import React, { useState } from 'react';
import { Input } from './Input';
import { Button } from './Button';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [allFieldsEmptyError, setAllFieldsEmptyError] = useState(false);

  const validateEmail = (email) => {
    return email.endsWith('@gmail.com');
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    if (!validateEmail(newEmail)) {
      setEmailError('Email must end with @gmail.com');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
  };

  

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name === '' || email === '' || password === '' || confirmPassword === '') {
      setAllFieldsEmptyError(true);
      return;
    }
    const registerUser = () => {
      fetch(`http://localhost:3020/users?email=${email}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0) {
            setEmailError('User with this email already exists');
          } else {
            const user = { name, email, password };
            fetch('http://localhost:3020/users', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(user),
            })
              .then((response) => response.json())
              .then(() => {
                setIsRegistered(true);
              })
              .catch((error) => {
                console.error('Registration failed:', error);
              });
          }
        })
        .catch((error) => {
          console.error('Error checking email existence:', error);
        });
    };
    

    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    } else {
      setPasswordError('');
      registerUser(); 
    }
  };

  return (
    <div className="container">
      <div className="page">
        <h2>REGISTER</h2>
        {isRegistered ? (
          <p className="success-message">Registered Successfully!!</p>
        ) : (
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="input-field">
              <label htmlFor="name">Full Name:</label>
              <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
              {allFieldsEmptyError && !name && <p className="error-message">This field is required</p>}
            </div>
            <div className="input-field">
              <label htmlFor="email">Email:</label>
              <Input type="text" value={email} onChange={handleEmailChange} />
              {allFieldsEmptyError && !email && <p className="error-message">This field is required</p>}
              {emailError && <p className="error-message">{emailError}</p>}
            </div>
            <div className="input-field">
              <label htmlFor="password">Password:</label>
              <Input type="password" value={password} onChange={handlePasswordChange} />
              {allFieldsEmptyError && !password && <p className="error-message">This field is required</p>}
            </div>
            <div className="input-field">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              {allFieldsEmptyError && !confirmPassword && <p className="error-message">This field is required</p>}
            </div>
            {passwordError && <p className="error-message">{passwordError}</p>}
            <div className="button-style">
              <Button label="Register" onClick={handleSubmit} />
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Register;
