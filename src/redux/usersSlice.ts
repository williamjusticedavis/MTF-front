import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    role: string;
}

interface UsersState {
    users: User[];
    loading: boolean;
    error: string | null;
}

const initialState: UsersState = {
    users: [],
    loading: false,
    error: null,
};

// Fetch users with axios
export const fetchUsers = createAsyncThunk<User[], void>(
    'users/fetchUsers',
    async () => {
        const response = await axios.get('http://localhost:3000/api/users/users');
        return response.data.data;
    }
);

export const searchUsers = createAsyncThunk<User[], { inputWords: string }>(
    'users/searchUsers',
    async (searchCriteria) => {
        const response = await axios.post('http://localhost:3000/api/users/users/searchUsers', searchCriteria);
        return response.data.data;
    }
);

export const deleteUser = createAsyncThunk<void, string>(
    'users/deleteUser',
    async (email) => {
        const response = await axios.delete(`http://localhost:3000/api/users/deleteUser/${email}`);
        return response.data.data;
    }
);

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Something went wrong';
            })

            .addCase(searchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(searchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to search users';
            })

            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = state.users.filter(user => user.email !== action.meta.arg);
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to delete user';
            });
    },
});


export default userSlice.reducer;
