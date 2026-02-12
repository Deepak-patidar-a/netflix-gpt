import React from 'react'
import Header from './Header'
import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import MainContainer from './MainContainer'
import SecondaryContainer from './SecondaryContainer'
import { useSelector } from 'react-redux'
import Toast from './Toast'
import { lazy, Suspense } from "react";

const GPTSearch = lazy(() => import("./GPTSearch"))
const MyList = lazy(() => import("./MyList"))


const Browse = () => {
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch)
  const showMyList = useSelector((store) => store.gpt.showMyList)
  useNowPlayingMovies()

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] via-[#141414] to-[#0d0d0d]">
      <Header />

      {showGptSearch ? (
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-screen">
              <p className="text-white text-sm sm:text-base animate-pulse">
                Loading GPT Search...
              </p>
            </div>
          }
        >
          <GPTSearch />
        </Suspense>

      ) : showMyList ? (
        <>
          <Toast />
          <Suspense
            fallback={
              <div className="flex items-center justify-center min-h-screen">
                <p className="text-white text-sm sm:text-base animate-pulse">
                  Loading My List...
                </p>
              </div>
            }
          >
            <MyList />
          </Suspense>
        </>

      ) : (
        <>
          <Toast />
          <MainContainer />
          <SecondaryContainer />
        </>
      )}
    </div>
  )
}

export default Browse