import React from 'react'
import Header from './Header'
import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import MainContainer from './MainContainer'
import SecondaryContainer from './SecondaryContainer'
import { useSelector } from 'react-redux'
import Toast from './Toast'
import { lazy, Suspense } from "react";

const GPTSearch = lazy(() => import("./GPTSearch"));
const MyList = lazy(() => import("./MyList"));


const Browse = () => {
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const showMyList = useSelector((store) => store.gpt.showMyList);
  //not as object destructuring to avoid re-rendering issues
  useNowPlayingMovies()


  return (
    <div className="min-h-screen
      bg-gradient-to-b
      from-[#1a1a1a]
      via-[#141414]
      to-[#0d0d0d]">
      <Header/>
      {showGptSearch ? (
      <Suspense
        fallback={
          <div className="pt-32 text-center text-white">
            Loading GPT Search...
          </div>
        }
      >
        <GPTSearch />
      </Suspense>
    ) : showMyList ? (
      <>
        <Toast/>
        <Suspense
        fallback={
          <div className="pt-32 text-center text-white">
            Loading My List...
          </div>
        }
        >
        <MyList />
        </Suspense>
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