import React from 'react'
import Header from './Header'
import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import MainContainer from './MainContainer'
import SecondaryContainer from './SecondaryContainer'
import GPTSearch from './GPTSearch'
import MyList from './MyList'
import { useSelector } from 'react-redux'
import Toast from './Toast'


const Browse = () => {
  const { showGptSearch, showMyList } = useSelector(
  (store) => store.gpt
  );
  useNowPlayingMovies()


  return (
    <div className="min-h-screen
      bg-gradient-to-b
      from-[#1a1a1a]
      via-[#141414]
      to-[#0d0d0d]">
      <Header/>
      {showGptSearch ? (
      <GPTSearch />
    ) : showMyList ? (
      <>
        <Toast/>
        <MyList />
      </>
    ) : (
      <>
        <Toast/>
        <MainContainer />
        <SecondaryContainer />
      </>
    )}
    </div>
  )
}

export default Browse