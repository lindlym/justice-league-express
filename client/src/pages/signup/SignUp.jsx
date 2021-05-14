import { useState } from 'react';
import { Container, Form, Button, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../../state/auth/authSlice';

const SignUp = () => {
    const dispatch = useDispatch();
    const [user, setUser] = useState({});

    const submitForm = async (e) => {
        e.preventDefault();

        fetch('http://localhost:5000/api/auth/signup', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
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
                        <Form.Control placeholder="Ex. superman" 
                            onChange={(e) => setUser({ ...user, username: e.target.value })} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" 
                            onChange={(e) => setUser({ ...user, password: e.target.value })} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Ex. matt@arrayschool.com" 
                            onChange={(e) => setUser({ ...user, email: e.target.value })} />
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} controlId="formFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control placeholder="Ex. Clark" 
                            onChange={(e) => setUser({ ...user, firstName: e.target.value })} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control placeholder="Ex. Kent" 
                            onChange={(e) => setUser({ ...user, lastName: e.target.value })} />
                    </Form.Group>
                </Form.Row>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    )
};

export default SignUp;