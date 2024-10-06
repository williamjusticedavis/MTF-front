import axios from "axios";


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