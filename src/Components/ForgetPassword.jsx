
import React, { useState } from 'react';
import { Input } from "./Input";
import { Button } from "./Button";
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function ResetPassword() {
  const [email, setEmail] = useState('');
  const [emailNotFound, setEmailNotFound] = useState(false);
  const [emailEmptyError, setEmailEmptyError] = useState(false);

  const handleResetPassword = (e) => {
    e.preventDefault(); 

    if (!email) {
      setEmailEmptyError(true);
      setEmailNotFound(false);
      return;
    } else {
      setEmailEmptyError(false);
    }

    fetch('https://login-server-6afs.onrender.com/users')
      .then((response) => response.json())
      .then((data) => {
        const emails = data.map((user) => user.email);

        if (emails.includes(email)) {
          toast.success(`Password reset link sent to your email`, {
            position: "top-center",
            autoClose: 5000,
            theme: "colored",
          });
          setEmailNotFound(false);
        } else {
          setEmailNotFound(true);
        }
      })
      .catch((error) => {
        console.error('Error fetching registered emails:', error);
        setEmailNotFound(true);
      });
  };

  return (
    <div className="pass-container">
      <div className="reset-form">
        <h4>Reset Your Password</h4>
        <div className="p1">
          <p>Enter your email address, and we'll send you a password reset link.</p>
        </div>
        <form onSubmit={handleResetPassword}> {/* Add onSubmit to the form */}
          <Input type="email" value={email} placeholder="E-mail Address" onChange={(e) => setEmail(e.target.value)} />
          {emailEmptyError && <p className="error-message3">Email field is required.</p>}
          {emailNotFound && <p className="error-message3">Email not found. Please enter a registered email.</p>}
          <div className="button3">
            <Button type="button" label="Reset Password" onClick={handleResetPassword} /> {/* Set type to "button" */}
          </div>
          <div className="sign-reset">
           <p>Back to Login?&nbsp;<a href="/"><span>Login</span></a></p>
         </div>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
