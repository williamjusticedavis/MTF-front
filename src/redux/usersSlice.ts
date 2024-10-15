import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../utilities/axiosInstance';

export interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    role: string;
}

export interface UsersState {
    users: User[];
    loading: boolean;
    error: string | null;
}

const initialState: UsersState = {
    users: [],
    loading: false,
    error: null,
};


export interface Site {
    name: string;
    address: string;
}

export interface SiteState {
    sites: Site[];
    loading: boolean;
    error: string | null;
}

const initialSitesState: SiteState = {
    sites: [],
    loading: false,
    error: null,
};



// Fetch users with token authentication
export const fetchUsers = createAsyncThunk<User[], void>(
    'users/fetchUsers',
    async () => {
        const response = await api.get('/users/users');
        return response.data.data;
    }
);

export const searchUsers = createAsyncThunk<User[], { inputWords: string }>(
    'users/searchUsers',
    async (searchCriteria) => {
        const response = await api.post('/users/users/searchUsers', searchCriteria);
        return response.data.data;
    }
);

export const searchSite = createAsyncThunk<Site[], { inputWords: string }>(
    'users/searchSite',
    async (searchCriteria) => {
        const response = await api.post('/users/users/searchSite', searchCriteria);
        return response.data.data;
    }
);

export const deleteUser = createAsyncThunk<void, string>(
    'users/deleteUser',
    async (email) => {
        const response = await api.delete(`/users/deleteUser/${email}`);
        return response.data.data;
    }
);

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            //fetchUsers
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

            //searchUsers
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

            //deleteUser
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

const siteSlice = createSlice({
    name: 'sites',
    initialState: initialSitesState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //searchSite
            .addCase(searchSite.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchSite.fulfilled, (state, action: PayloadAction<Site[]>) => {
                state.loading = false;
                state.sites = action.payload;
            })
            .addCase(searchSite.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to search sites';
            });
    },
});

export const userReducer = userSlice.reducer;
export const siteReducer = siteSlice.reducer;
