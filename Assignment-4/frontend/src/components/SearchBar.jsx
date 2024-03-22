import React from 'react'
import { GoSearch } from "react-icons/go";

const SearchBar = () => {
  return (
    <form>
      <GoSearch class="logo" />
      <input type="text" placeholder="Enter a term like 'operatingStatus'"></input>
      <button type="submit">Search</button>
    </form>
  )
}

export default SearchBar