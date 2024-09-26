import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSuccessfulRegister = () => {
    axios.post('http://localhost:8081/signup', {username: username,email: email,password: password})
      .then(res => {
        if (res.data === 'RegSuc') {
          navigate('/Login');
          alert('Sikeres regisztráció!');
        } else if (res.data === 'RegFail') {
          alert('Ez a felhasználó vagy e-mail cím már létezik!');
          setUsername('');
          setPassword('');
          setEmail('');
        } else {
          alert('Sikertelen regisztráció!');
        }
      })
      .catch(err => console.log(err))
  };

  const isUsernameValid = (username) => {
    //Betűk,számok
    return /^[a-zA-Z0-9]/.test(username) && /^[a-zA-Z0-9]+$/.test(username);
  };

  const isEmailValid = (email) => {
    //Általános email
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isUsernameValid(username) && isEmailValid(email) && password) {
      handleSuccessfulRegister();
    } else {
      //Nincs minden mező kitöltve
      alert('Kérlek, tölts ki minden mezőt helyesen!');
      setUsername('');
      setPassword('');
      setEmail('');
    }
  };

  return (
    <>
    <div style={{ display: 'flex', justifyContent: 'center' }}>
    <form onSubmit={handleSubmit} style={{ width: '300px', textAlign: 'center' }}>
    <h2>Regisztráció</h2>
      <label>
        Felhasználónév:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            backgroundColor: 'lightgrey',
            border: '2px solid red',
            marginBottom: '10px',
            padding: '5px',
            borderRadius: '5px',
            marginTop: '10px',
          }}
        />
      </label>
      <br />
      <label>
        Jelszó:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            backgroundColor: 'lightgrey',
            border: '2px solid red',
            marginBottom: '10px',
            padding: '5px',
            borderRadius: '5px',
            marginTop: '10px',
          }}
        />
      </label>
      <br />
      <label>
        E-Mail:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            backgroundColor: 'lightgrey',
            border: '2px solid red',
            marginBottom: '10px',
            padding: '5px',
            borderRadius: '5px',
            marginTop: '10px',
          }}
        />
      </label>
      <br />
      <button type="submit" style={{ color: 'white',backgroundColor: '#cc3333',height: '50px',width: '200px',fontSize: '20px',border: '3px solid white',borderRadius: '10px',marginLeft: '20px',marginTop: '10px' }}>Regisztráció</button>
    </form>
    </div>
  </>
    );
};
