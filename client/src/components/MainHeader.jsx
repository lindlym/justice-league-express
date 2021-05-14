import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MainHeader = ({ currentUser }) => {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">React Auth</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Link to="/"><Button variant="outline-success">Home</Button></Link>
                    <Link to="/blogs"><Button variant="outline-success">Blogs</Button></Link>
                    {(currentUser && currentUser.roles.includes('ADMIN') && 
                        <Link to="/admin"><Button variant="outline-success">Admin</Button></Link>)}
                </Nav>
                {!currentUser ?
                    <>
                        <Link to="/signin"><Button variant="outline-success">Sign In</Button></Link>
                        <Link to="/signup"><Button variant="outline-primary">Sign Up</Button></Link>
                    </> : 
                    <>
                        <Button variant="outline-info">Welcome, {currentUser.firstName}.</Button>
                        <Button onClick={() => localStorage.removeItem('user')} variant="outline-danger">Logout</Button>
                    </>
                }
            </Navbar.Collapse>
        </Navbar>
    )
};

export default MainHeader;