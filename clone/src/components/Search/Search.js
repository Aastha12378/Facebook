// In your Navbar component
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { request } from '../../util/Request';

const Navbar = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await request(`/users/search?query=${query}`);
      const users = await response.json();
      setSearchResults(users);
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="Search Profile..." value={query} onChange={(e) => setQuery(e.target.value)} />
        <button type="submit">Search</button>
      </form>
      {searchResults.map((user) => (
        <Link key={user._id} to={`/profile/${user._id}`}>
          {user.username}
        </Link>
      ))}
    </div>
  );
};

export default Navbar;
