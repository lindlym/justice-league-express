import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        currentUser: null
    },
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setCurrentUser: (state, action) => {
            // Set the current user to the one returned by the server.
            console.log(action.payload);
            state.currentUser = action.payload;
        },
        removeCurrentUser: (state) => {
            // If they want to log out, make sure their state is wiped, and their access
            // token is removed from their local storage as well.
            state.currentUser = {};
            localStorage.removeItem('user');
        }
    }
});

export const { setCurrentUser, removeCurrentUser } = authSlice.actions;
export const selectCurrentUser = (state) => state.auth.currentUser;
export default authSlice.reducer;
