import React, { useState } from 'react';
import './LoginSignup.css';
import axios from 'axios';
import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';

const LoginSignup = () => {
  const [action, setAction] = useState('Sign Up');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitClicked, setSubmitClicked] = useState(false);

  const handleSubmit = async () => {
    setSubmitClicked(true);
    if (action === 'Sign Up') {
      try {
        await axios.post('http://localhost:8000/signup', { name, email, password });
        alert('User signed up successfully');
      } 
      catch (error) {
        alert('Email already registered');
      }
    } 
    else {
      try {
        await axios.post('http://localhost:8000/login', { email, password });
        alert('Login successful');
      } 
      catch (error) {
        alert('Invalid credentials');
      }
    }
    setSubmitClicked(false);
  };
  
  return (
    <div className="container">

      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>

      
      <div className="inputs">
        {action === 'Login' ? null : (
          <div className="input">
            <img src={user_icon} alt="" />
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
        )}

        <div className="input">
          <img src={email_icon} alt="" />
          <input type="email" placeholder="Email Id" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="input">
          <img src={password_icon} alt="" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      {action === 'Sign Up' ? null : (
        <div className="forgot-password">
          Lost Password? <span>Click Here!</span>
        </div>
      )}

      <div className="button-container">
        <div className={action === 'Login' ? 'submit gray' : 'submit'} onClick={() => setAction('Sign Up')}>
          Sign Up
        </div>
        
        <div className={action === 'Sign Up' ? 'submit gray' : 'submit'} onClick={() => setAction('Login')}>
          Login
        </div>
      </div>

      <div className="submit-container">
        <button className='final-submit' onClick={handleSubmit} disabled={submitClicked}>Submit</button>
      </div>

    </div>
  );
};

export default LoginSignup;
