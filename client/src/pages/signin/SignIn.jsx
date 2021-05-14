import { useState } from 'react';
import { Container, Form, Button, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../../state/auth/authSlice';

const SignIn = () => {
    const dispatch = useDispatch();
    const [credentials, setCredentials] = useState({});

    const submitForm = async (e) => {
        e.preventDefault();

        fetch('http://localhost:5000/api/auth/signin', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        }).then(response => {
            return response.json();
        }).then(resJson => {
            console.log(resJson);
            dispatch(setCurrentUser(resJson));
            localStorage.setItem('user', resJson.userToken);
        });
    }

    return (
        <Container>
            <h1>Welcome to the Sign Up Page!</h1>
            <Form onSubmit={submitForm}>
                <Form.Row>
                    <Form.Group as={Col} controlId="formUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control placeholder="Enter your username..." 
                            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" 
                            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
                    </Form.Group>
                </Form.Row>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    )
};

export default SignIn;