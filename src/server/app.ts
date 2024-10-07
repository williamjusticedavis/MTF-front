import axios from 'axios';

export const createUser = async (userData: {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  phoneNumber: string;
}) => {
  try {
    const response = await axios.post('http://localhost:3000/api/createUser', userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};