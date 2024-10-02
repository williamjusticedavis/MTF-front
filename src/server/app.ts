import axios from 'axios';

export const createUser = async (userData: {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  phoneNumber: string;
}) => {
  try {
    const response = await axios.post('/createuser', userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export async function fetchUsers() {
    try {
        const response = await fetch('http://localhost:3000/users/'); // כתובת ה-API שלך
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const users = await response.json();
        return users;
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
}



export const checkEmail = async (userData: { email: string }) => {
    try {
        const response = await axios.post('/login', userData);
        return response.data; // מחזירה את הנתונים מהתגובה
    } catch (error) {
        // טיפול בשגיאות
        console.error('Error checking email:', error);
        throw error; // זורקת את השגיאה כדי שהקוד שיקרא לפונקציה ידע לטפל בה
    }
};