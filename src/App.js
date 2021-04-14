import React, { useState } from 'react';
import './App.css';

import { Container, Form, Button } from 'react-bootstrap';

function App() {
  const [batman, setBatman] = useState({ username: 'batman' });
  const [loginInfo, setLoginInfo] = useState({});
  const [token, setToken] = useState('No token exists yet...');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send a POST request to the localhost:3001/login route.
    // Accept the response, which should either be bad or a JWT token.
    fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginInfo)
    })
    .then(res => res.json())
    .then(jsonRes => {
      setToken(jsonRes.accessToken);

      localStorage.setItem('token', jsonRes.accessToken);
    })
    .catch(err => console.log('Failed to login here...'));
  }

  const getBatman = (e) => {
    e.preventDefault();

    fetch('http://localhost:3001/user/data', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
    .then(res => res.json())
    .then(jsonRes => {
      setBatman({...batman, password: jsonRes.batman.password})
    });
  }

  return (
    <div className="App">
      <Container className="login-form-container">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control onChange={(e) => setLoginInfo({ ...loginInfo, username: e.target.value})} type="text" placeholder="Enter your username..." />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onChange={(e) => setLoginInfo({ ...loginInfo, password: e.target.value})} type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
      <Container className="jwt-display-container">
        <h4>Current JWT</h4>
        <hr />
        <p>{token}</p>
      </Container>
      <Container>
        <Button onClick={getBatman}>Get Batman's Password</Button>
        <p>{batman.username}</p>
        <p>{batman.password}</p>
      </Container>
    </div>
  );
}

export default App;
