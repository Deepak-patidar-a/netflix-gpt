import React, { useRef, useState,useEffect } from "react";
import { useSelector} from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const user = useSelector((store) => store.user); // ✅ KEY LINE
  console.log("user :",user)
  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef(null)

  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      // dispatch(removeUser());
      navigate("/");
    } catch (error) {
      console.error("Sign out error", error);
      navigate("/error")
    }
  };
  
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
        src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2026-01-09/consent/87b6a5c0-0104-4e96-a291-092c11350111/019ae4b5-d8fb-7693-90ba-7a61d24a8837/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="Netflix Logo"
      />

      {/* Show ONLY if user is logged in */}
      {user && (
        <div className="relative" ref={menuRef}>
          <img
            onClick={() => setShowMenu(!showMenu)}
            className="h-12 w-12 cursor-pointer rounded"
            src="https://assets.leetcode.com/users/dpk_ptdr/avatar_1750879819.png"
            alt={user.displayName}
          />

          {showMenu && (
            <div className="absolute right-0 mt-2 w-28 rounded bg-black py-2 text-sm shadow-lg">
              <button
                onClick={handleSignOut}
                className="w-full px-4 py-2 text-left text-white hover:bg-gray-700"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;

