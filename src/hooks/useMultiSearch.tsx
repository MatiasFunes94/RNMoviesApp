import React, { useEffect, useState } from 'react'
import axios from 'axios';

export const useMultiSearch = (userInput = '') => {

  const [isLoadingSearch, setIsLoadingSearch] = useState(true)
  const [multiSearch, setMultiSearch] = useState([])

  const getMultiSearch = async () => {
    if (userInput) {
      const multiSearchPromise = await axios.get(`https://api.themoviedb.org/3/search/multi?api_key=0d99d3efe9d677cf3d562abcfa677825&language=en-US&query=${userInput}`)
      setMultiSearch(multiSearchPromise.data.results)
      setIsLoadingSearch(false);
    }
  }

  useEffect(() => {
    getMultiSearch();
  }, [userInput])

  return {
    multiSearch,
    isLoadingSearch,
  }
}
