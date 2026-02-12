import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO } from "../utils/constants";
import { toggleGptSearchView, toggleMyList } from "../utils/gptSlice";

const Header = () => {
  const user = useSelector((store) => store.user)
  const { showGptSearch, showMyList } = useSelector((store) => store.gpt)
  const myListCount = useSelector((store) => store.myList.movies.length)

  const [showMenu, setShowMenu] = useState(false)
  const [showMobileNav, setShowMobileNav] = useState(false)
  const menuRef = useRef(null)
  const mobileNavRef = useRef(null)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleGPTSearchClick = () => {
    dispatch(toggleGptSearchView())
    setShowMobileNav(false)
  }

  const handleMyListClick = () => {
    dispatch(toggleMyList())
    setShowMobileNav(false)
  }

  const handleSignOut = async () => {
    try {
      await signOut(auth)
      navigate("/");
    } catch (error) {
      navigate("/error")
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user
        dispatch(addUser({ uid, email, displayName, photoURL }))
        navigate("/browse")
      } else {
        dispatch(removeUser())
        navigate("/")
      }
    })
    return () => unsubscribe()
  }, [])

  // Close avatar dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false)
      }
      if (mobileNavRef.current && !mobileNavRef.current.contains(e.target)) {
        setShowMobileNav(false)
      }
    };
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="absolute top-0 left-0 z-20 w-full bg-gradient-to-b from-black px-4 sm:px-6 md:px-8 py-3 sm:py-4">
      <div className="flex items-center justify-between">

        <img
          className="w-24 sm:w-32 md:w-44"
          src={LOGO}
          alt="Netflix Logo"
        />

        {user && (
          <>
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={handleGPTSearchClick}
                className="rounded bg-red-700 px-4 py-2 text-sm text-white hover:bg-red-600 active:bg-red-800 transition"
              >
                {showGptSearch ? "Home Page" : "GPT Search"}
              </button>

              <button
                onClick={() => dispatch(toggleMyList())}
                className="rounded bg-red-700 px-4 py-2 text-sm text-white hover:bg-red-600 active:bg-red-800 transition"
              >
                {showMyList
                  ? "Home Page"
                  : myListCount > 0
                  ? `My List (${myListCount})`
                  : "My List"}
              </button>

              <div className="relative" ref={menuRef}>
                <div
                  className="flex items-center gap-1 cursor-pointer"
                  onClick={() => setShowMenu((prev) => !prev)}
                >
                  <img
                    className="h-10 w-10 rounded object-cover"
                    src={user.photoURL}
                    alt={user.displayName}
                  />
                  <span
                    className={`text-white text-xs transition-transform duration-200 ${
                      showMenu ? "rotate-180" : "rotate-0"
                    }`}
                  >
                    ▼
                  </span>
                </div>

                {showMenu && (
                  <div className="absolute right-0 mt-2 w-28 py-2 shadow-lg">
                    <button
                      onClick={handleSignOut}
                      className="w-full px-4 py-2 text-center rounded text-white bg-red-700 hover:bg-red-600 transition"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex md:hidden items-center gap-2">

              {myListCount > 0 && !showMyList && (
                <button
                  onClick={() => dispatch(toggleMyList())}
                  className="relative rounded bg-red-700 px-3 py-1.5 text-xs text-white hover:bg-red-600 transition"
                >
                  My List
                  <span className="absolute -top-1.5 -right-1.5 bg-white text-black text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {myListCount}
                  </span>
                </button>
              )}

              <img
                className="h-8 w-8 rounded object-cover cursor-pointer"
                src={user.photoURL}
                alt={user.displayName}
              />

              <button
                onClick={() => setShowMobileNav((prev) => !prev)}
                className="text-white p-1 focus:outline-none"
                aria-label="Toggle menu"
              >

                <div className="flex flex-col justify-center items-center gap-1 w-6 h-6">
                  <span
                    className={`block h-0.5 w-5 bg-white rounded transition-all duration-300 ${
                      showMobileNav ? "rotate-45 translate-y-1.5" : ""
                    }`}
                  />
                  <span
                    className={`block h-0.5 w-5 bg-white rounded transition-all duration-300 ${
                      showMobileNav ? "opacity-0" : ""
                    }`}
                  />
                  <span
                    className={`block h-0.5 w-5 bg-white rounded transition-all duration-300 ${
                      showMobileNav ? "-rotate-45 -translate-y-1.5" : ""
                    }`}
                  />
                </div>
              </button>
            </div>
          </>
        )}
      </div>

      {/* ── MOBILE DROPDOWN MENU ── */}
      {user && showMobileNav && (
        <div
          ref={mobileNavRef}
          className="md:hidden mt-2 flex flex-col gap-2 rounded-md bg-black/90 px-4 py-4 shadow-lg"
        >
          <button
            onClick={handleGPTSearchClick}
            className="w-full rounded bg-red-700 px-4 py-2.5 text-sm text-white hover:bg-red-600 active:bg-red-800 transition text-left"
          >
            {showGptSearch ? "🏠 Home Page" : "🤖 GPT Search"}
          </button>

          <button
            onClick={handleMyListClick}
            className="w-full rounded bg-red-700 px-4 py-2.5 text-sm text-white hover:bg-red-600 active:bg-red-800 transition text-left"
          >
            {showMyList
              ? "🏠 Home Page"
              : myListCount > 0
              ? `📋 My List (${myListCount})`
              : "📋 My List"}
          </button>

          <hr className="border-gray-700" />

          <button
            onClick={handleSignOut}
            className="w-full rounded bg-gray-800 px-4 py-2.5 text-sm text-white hover:bg-gray-700 transition text-left"
          >
            🚪 Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;