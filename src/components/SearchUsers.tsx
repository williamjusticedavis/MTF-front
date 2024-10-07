import React, { useState, useEffect, ChangeEvent } from 'react';

const SearchUsers: React.FC = () => {
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchResults, setSearchResults] = useState<object[]>([]);

  function InputChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchInput(event.target.value);
  }

  useEffect(() => {
    if (searchInput !== '') {
      async function fetchUserData(query: string) {
        try {
          const response = await fetch("http://localhost:3000/users/searchUsers", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "inputWords": query }),
          });

          const data = await response.json();

          if (response.ok) {
            setSearchResults(data);
          } else {
            console.error('Failed to fetch data:', data.message);
          }
        } catch (error: any) {
          console.error('Error fetching user data:', error.message);
        }
      }
      fetchUserData(searchInput);
    }
  }, [searchInput]);

  return (
    <div className="flex justify-end mb-4"> 
      <input
        type="text"
        onChange={InputChange}
        value={searchInput}
        placeholder='Search user'
        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" // עיצוב של Tailwind
      />
    </div>
  );
}

export default SearchUsers;
