const Homepage = ({ currentUser }) => {
    console.log(currentUser);
    return (
        <h1>{currentUser ? `Welcome, ${currentUser.firstName}` : `Welcome to the Homepage, stranger!`}</h1>
    )
};

export default Homepage;