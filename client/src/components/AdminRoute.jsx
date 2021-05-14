import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../state/auth/authSlice';

const AdminRoute = ({ component: Component, ...rest }) => {
    let currentUser = useSelector(selectCurrentUser);
    
    return (
        <Route {...rest} render={
            props => {
                console.log(currentUser);
                if (currentUser.roles.includes('ADMIN')) {
                    return <Component currentUser {...rest} {...props} />
                } else {
                    return <Redirect to={'/'} />
                }
            }
        } />
    )
}

export default AdminRoute;