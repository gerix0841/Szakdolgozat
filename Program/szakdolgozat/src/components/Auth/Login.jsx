import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../ContextAPI';

export function Login() {
  const navigate = useNavigate();
  const { setLoggedIn, setUserName } = useData();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSuccessfulLogin = () => {
    axios.post('http://localhost:8081/login', {username: username,password: password})
      .then(res => {
        if(res.data === "Success"){
          setUserName(username);
          setLoggedIn(true);
          navigate('/');
          alert('Sikeres bejelentkezés!');
        }else{
          alert("Sikertelen bejelentkezés!")
          setUsername('');
          setPassword('');
        }
      })
      .catch(err => console.log(err))
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSuccessfulLogin();
  };

  return (
    <>
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <form onSubmit={handleSubmit} style={{ width: '300px', textAlign: 'center' }}>
        <h2>Bejelentkezés</h2>
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
        <button type="submit" style={{ color: 'white',backgroundColor: '#cc3333',height: '50px',width: '200px',fontSize: '20px',border: '3px solid white',borderRadius: '10px',marginLeft: '20px',marginTop: '10px' }}>Bejelentkezés</button>
      </form>
    </div>
    </>
  );
}
