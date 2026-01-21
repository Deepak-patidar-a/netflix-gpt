import React, { useRef, useState,useEffect } from "react";
import { useSelector} from "react-redux";
import { signOut, onAuthStateChanged} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { addUser, removeUser } from '../utils/userSlice'
import { LOGO } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";

const Header = () => {
  const user = useSelector((store) => store.user); // ✅ KEY LINE
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  // console.log("user :",user)
  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef(null)

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleGPTSearchClick = () => {
    //toggle GPT Search feature
    dispatch(toggleGptSearchView())
  }

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      // dispatch(removeUser());
      navigate("/");
    } catch (error) {
      // console.error("Sign out error", error);
      navigate("/error")
    }
  };

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }))
        navigate("/browse")
      } else {
        dispatch(removeUser())
        navigate("/")
      }
     })

      return () => unsubscribe(); // ✅ important
  },[])
  
  useEffect(() => {
  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setShowMenu(false);
    }
  }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [])

  return (
    <div className="absolute top-0 left-0 z-20 flex w-full items-center justify-between bg-gradient-to-b from-black px-8 py-4">
      {/* Netflix Logo */}
      <img
        className="w-44"
        src={LOGO}
        alt="Netflix Logo"
      />

      {/* Show ONLY if user is logged in */}
      {user && (
        <div className="relative flex items-center gap-4">
          <button className="mr-4 rounded bg-red-700 px-4 py-2 text-white hover:bg-red-600 transition"
          onClick={handleGPTSearchClick}>
            {showGptSearch ? "Home Page" : "GPT Search"}
          </button>
         <div className="relative" ref={menuRef}>
          <img
            onClick={() => setShowMenu(!showMenu)}
            className="h-12 w-12 cursor-pointer rounded"
            src={user.photoURL}
            alt={user.displayName}
          />

          {showMenu && (
            <div className="absolute right-0 mt-2 w-28 rounded bg-red-700 py-2 text-sm shadow-lg">
              <button
                onClick={handleSignOut}
                className="w-full px-4 py-2 text-left text-white hover:bg-red-600 transition"
              >
                Sign out
              </button>
            </div>
          )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;

