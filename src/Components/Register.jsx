
import React, { useState } from 'react';
import { Input } from './Input';
import { Button } from './Button';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [allFieldsEmptyError, setAllFieldsEmptyError] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

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
 
  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  }; 
  const handleTermsChange = () => {
    setAgreedToTerms(!agreedToTerms);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name === '' || email === '' || password === '' || selectedGender ==='') {
      setAllFieldsEmptyError(true);
      return;
    }
      fetch(`https://login-server-6afs.onrender.com/users?email=${email}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0) {
            setEmailError('User with this email already exists');
          } else {
            const user = { name, email, password };
            fetch('https://login-server-6afs.onrender.com/users', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(user),
            })
              .then((response) => response.json())
              .then(() => {
                toast.success('Registered successful!', {
                  position: "top-center",
                  autoClose: 5000,
                  theme: "colored",
                });
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

  return (
    <div className="form-container">
      <div className="page">
        <h4>Sign Up</h4>
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="input-field">
              <Input type="text" value={name} placeholder="Full Name" onChange={(e) => setName(e.target.value)} />
              {allFieldsEmptyError && !name && <p className="error-message">This field is required</p>}
            </div>
            <div className="input-field">
              <Input type="text" value={email} placeholder="E-mail" onChange={handleEmailChange} />
              {allFieldsEmptyError && !email && <p className="error-message">This field is required</p>}
              {emailError && <p className="error-message">{emailError}</p>}
            </div>
            <div className="input-field">
              <Input type="password" value={password} placeholder="Password" onChange={handlePasswordChange} />
              {allFieldsEmptyError && !password && <p className="error-message">This field is required</p>}
            </div>
            <div className='drop-down'>
           <select id="gender" value={selectedGender} onChange={handleGenderChange}>
            <option value="">Gender</option>
           <option value="male">Male</option>
           <option value="female">Female</option>
           <option value="other">Other</option>
           </select>
           {allFieldsEmptyError && !selectedGender && <p className="error-message">This field is required</p>}
         </div>
         <div className="input-field">
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={handleTermsChange}
            />
            <label htmlFor="termsCheckbox">&nbsp;I agree to Terms and Conditions</label>
          </div>
          
          {allFieldsEmptyError && !agreedToTerms && (
            <p className="error-message2">You must agree to Terms and Conditions</p>
          )}
            <div className="button2">
              <Button label="REGISTER" onClick={handleSubmit} />
            </div>
            <div className="sign1">
             <p>Already have an account?&nbsp;<a href="/"><span>Sign In</span></a></p>
          </div>
          <ToastContainer />
          </form>
      </div>
    </div>
  );
}

export default Register;
