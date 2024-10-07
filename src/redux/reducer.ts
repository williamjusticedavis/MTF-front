import { createSlice, PayloadAction, configureStore } from '@reduxjs/toolkit';


interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}


interface UsersState {
  users: User[];
}

const initialState: UsersState = {
  users: [],
};


const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
   
    removeUser: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
   
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
  },
});

export const { addUser, removeUser, updateUser } = usersSlice.actions;


export default usersSlice.reducer;


export const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
