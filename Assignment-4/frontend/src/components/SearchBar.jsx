import React, { useState } from 'react'
import { GoSearch } from "react-icons/go";
import axios from 'axios'

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [data, setData] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://localhost:8000", { searchQuery })
      setData(res?.data)
    } catch (err) {
      console.error(err)
      setData(null)
    } finally {
      setSearchQuery("")
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <GoSearch className="logo" />
        <input type="text" value={searchQuery} placeholder="Enter a term like 'operatingStatus'" onChange={e => setSearchQuery(e.target.value)}></input>
        <button type="submit">Search</button>
      </form>
      {data && <p>{JSON.stringify(data)}</p>}
      {!data && <p>No data found. Please try a different search term.</p>}
    </>
  )
}

export default SearchBar