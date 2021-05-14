import React, { useEffect } from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';

// Import pages for use on the App.js.
import AdminDashboard from './pages/admin/AdminDashboard';
import MainHeader from './components/MainHeader';
import Homepage from './pages/homepage/Homepage';
import SignUp from './pages/signup/SignUp';
import SignIn from './pages/signin/SignIn';

import AdminRoute from './components/AdminRoute';
import { Switch, Route } from 'react-router-dom';

// Import Redux pieces we need.
import { selectCurrentUser, setCurrentUser } from './state/auth/authSlice';

function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    let token = localStorage.getItem('user');

    async function refreshUser() {
        fetch('http://localhost:5000/api/users/getUserFromToken', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ token })
        }).then(res => res.json())
        .then(jsonRes => {
          dispatch(setCurrentUser(jsonRes))
        });
    }

    if (token && !currentUser._id) refreshUser();
  })

  return (
    <main className="main-container">
      <header className="main-site-navigation">
        <MainHeader currentUser={currentUser} />
      </header>
      <Switch>
        <Route exact path="/" render={(props) => {
          return <Homepage currentUser={currentUser} {...props} />
        }} />
        <Route path="/signin" render={(props) => {
          return <SignIn {...props} />
        }} />
        <Route path="/signup" render={(props) => {
          return <SignUp {...props} />
        }} />

        {/* Set up all Protected Routes here. */}
        <AdminRoute path="/admin" component={AdminDashboard} />
      </Switch>
    </main>
  );
}

export default App;
