import React, { useState } from 'react';
import {Input} from "./Input";
import {Button} from "./Button";

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [resetRequested, setResetRequested] = useState(false);

  const handleResetPassword = () => {
    if (email === 'user@example.com') {
      setResetRequested(true);
      setMessage('Password reset email sent. Please check your email.');
    } else {
      setMessage('User not found. Please enter a valid email address.');
    }
  };

  return (
    <div className="container">
    <div className="reset-form">
      <h2>Forgot Password</h2>
      <div className="p1">
      <p>Enter the email address that you used to register. We'll send you an email with a link to reset your password.</p>
      </div>
      {!resetRequested ? (
        <form>
          <label htmlFor="email">Email:</label>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <div className="buttonstyle1">
          <Button label="Reset Password" onClick={handleResetPassword} />
          </div>
        </form>
      ) : (
        <p>{message}</p>
      )}
    </div>
    </div>
  );
}

export default ForgotPassword;
