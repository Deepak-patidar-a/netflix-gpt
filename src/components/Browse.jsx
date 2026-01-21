import React from 'react'
import Header from './Header'
import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import MainContainer from './MainContainer'
import SecondaryContainer from './SecondaryContainer'
import GPTSearch from './GPTSearch'
import { useSelector } from 'react-redux'


const Browse = () => {
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch)
  useNowPlayingMovies()


  return (
    <div className="min-h-screen
      bg-gradient-to-b
      from-[#1a1a1a]
      via-[#141414]
      to-[#0d0d0d]">
      <Header/>
      {showGptSearch ? 
      (
      <GPTSearch/>
    ) :
      (
      <>
      <MainContainer/>
      <SecondaryContainer />
      </>
    )}
    </div>
  )
}

export default Browse