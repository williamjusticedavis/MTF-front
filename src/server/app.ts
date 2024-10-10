import axios from 'axios';

// Adding new user
export const createUser = async (userData: {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  phoneNumber: string;
}) => {
  try {
    const response = await axios.post('http://localhost:3000/api/users/createUser', userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Fetching all users (function renamed to avoid duplication)
export const fetchAllUsers = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/users/users');
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

// Login
export const checkEmail = async (userData: { email: string }) => {
  try {
   
    const response = await axios.post('http://localhost:3000/api/users/check-email', userData);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error checking email:', error);
    throw error;
  }
};

// Updating user
export const updateUser = async (id: string, updatedData: {
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: string;
  phoneNumber?: string;
}) => {
  try {
    const response = await axios.patch(`http://localhost:3000/api/users/updateUser/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// Deleting user
export const deleteUsers = async (email: string) => {
  try {
    const response = await axios.delete(`http://localhost:3000/api/users/deleteUser/${email}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

// Searching users (function renamed to avoid duplication)
export const searchUsers = async (searchCriteria: any) => {
  try {
    console.log()
    const response = await axios.post('http://localhost:3000/api/users/users/searchUsers', searchCriteria);
    return response.data;
  } catch (error) {
    console.error('Error searching users:', error);
    throw error;
  }
};


// Function to verify OTP
export const verifyOtp = async (otpData: { email: string, otpCode: string }) => {
  try {
    const response = await axios.post('http://localhost:3000/api/otp/verify', otpData);
    return response.data;
  } catch (error) {
    console.error('Error verifying OTP:', error);
    throw error;
  }
};

export const sendOtp = async (userData: { email: string }) => {
  try {
    const response = await axios.post('http://localhost:3000/api/otp/sendotpbyemail', userData);
    return response.data;
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw error;
  }
};