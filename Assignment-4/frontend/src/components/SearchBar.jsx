import React, { useState } from 'react';
import { GoSearch } from "react-icons/go";
import axios from 'axios';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState(null);
  const [info, setInfo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://localhost:8000", { searchQuery });
      const infoRes = await axios.get("https://localhost:8000/info")
      setData(res?.data);
      setInfo(infoRes?.data)
    } catch (err) {
      console.error(err);
      setData(null);
      setInfo(null)
    } finally {
      setSearchQuery("");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <GoSearch className="logo" />
        <input type="text" value={searchQuery} placeholder="Enter a term like 'operatingStatus'" onChange={e => setSearchQuery(e.target.value)}></input>
        <button type="submit">Search</button>
      </form>
      {data && <div className="results">
        <p>You are currently in {JSON.stringify(info.city_name, null, 2)}, {JSON.stringify(info.region_name, null, 2)}.</p>
        <p>Your zip code is {JSON.stringify(info.zip_code, null, 2)}.</p>
        <p>{JSON.stringify(data, null, 2)}</p>
      </div>}
      {!data && <div className="results"><p>No data found. Please try a different search term.</p></div>}
    </div>
  );
}

export default SearchBar;