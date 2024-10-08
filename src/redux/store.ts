import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './usersSlice';

// create store by configureStore
const store:any = configureStore({
    reducer: {
        users: usersReducer,
    },
});

// this is the type for redux
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;


