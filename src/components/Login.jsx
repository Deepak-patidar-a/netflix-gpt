import React, { useState, useEffect } from "react";
import Header from "./Header";
import {createUserWithEmailAndPassword , signInWithEmailAndPassword, updateProfile} from "firebase/auth"
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser} from '../utils/userSlice'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isSignIn, setIsSignIn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!isSignIn) {
      if (!fullName.trim()) {
        newErrors.fullName = "Full name is required";
      } else if (fullName.length < 3) {
        newErrors.fullName = "Full name must be at least 3 characters";
      }
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+-[\]{}|;:'",.<>/?]).{8,}$/.test(password)) {
      newErrors.password = "Your password must be at least 8 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
  e.preventDefault()

  const isValid = validateForm()
    if (!isValid) return

    setIsLoading(true)

    try {
      if (!isSignIn) {
        // SIGN UP
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await updateProfile(userCredential.user, {
          displayName: fullName,
          photoURL: "https://assets.leetcode.com/users/dpk_ptdr/avatar_1750879819.png",
        })
          const { uid,email,displayName,photoURL} = auth.currentUser
          dispatch(addUser({uid : uid, email : email, displayName : displayName, photoURL: photoURL}))
          navigate("/browse")
          console.log("Signup success:", userCredential.user)
          
      } else {
        // SIGN IN
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        console.log("Signin success:", userCredential.user)
         navigate("/browse")
      }
    } catch (error) {
      console.error("Auth error:", error.code, error.message);
      setErrors({ auth: error.message })
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <div className="relative h-screen w-full bg-black">
      <Header />

      <img
        src="https://assets.nflxext.com/ffe/siteui/vlv3/bd9d04fe-4c30-4eee-8809-0b26a61c96a2/web/IN-en-20260112-TRIFECTA-perspective_cc7609b0-64b9-4cb7-9b0d-1c5ffac03861_small.jpg"
        alt="background"
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      />

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 flex h-full items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md rounded-md bg-black/75 p-8 text-white"
        >
          <h1 className="mb-6 text-3xl font-bold">
            {isSignIn ? "Sign In" : "Sign Up"}
          </h1>

          {!isSignIn && (
            <>
              <input
                type="text"
                placeholder="Full name"
                className="mb-4 w-full rounded bg-gray-700 px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              {errors.fullName && (
                <p className="mb-2 text-xs text-red-500">
                  {errors.fullName}
                </p>
              )}
            </>
          )}

          <input
            type="text"
            placeholder="Enter Email Id"
            className="mb-4 w-full rounded bg-gray-700 px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <p className="mb-2 text-xs text-red-500">{errors.email}</p>
          )}

          <input
            type="password"
            placeholder="Password"
            className="mb-6 w-full rounded bg-gray-700 px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <p className="mb-4 text-xs text-red-500">{errors.password}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`mb-4 w-full rounded bg-red-600 py-3 font-semibold transition
              ${isLoading ? "cursor-not-allowed opacity-60" : "hover:bg-red-700"}
            `}
          >
            {isLoading
              ? isSignIn
                ? "Signing in..."
                : "Signing up..."
              : isSignIn
              ? "Sign In"
              : "Sign Up"}
          </button>
          {errors.auth && (
            <p className="mb-4 text-xs text-red-500">{errors.auth}</p>
          )}

          {isSignIn && (
            <div className="flex items-center justify-between text-sm text-gray-400">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-gray-500" />
                Remember me
              </label>

              <span className="cursor-pointer hover:underline">
                Forgot password?
              </span>
            </div>
          )}

          <p className="mt-6 text-sm text-gray-400">
            {isSignIn ? "New to Netflix?" : "Already have an account?"}{" "}
            <span
              onClick={() => {
                setIsSignIn(!isSignIn);
                setErrors({});
              }}
              className="cursor-pointer text-white hover:underline"
            >
              {isSignIn ? "Sign up now." : "Sign in now."}
            </span>
          </p>

          <p className="mt-4 text-xs text-gray-500">
            This page is protected by Google reCAPTCHA to ensure you're not a bot.{" "}
            <span className="cursor-pointer text-blue-500 hover:underline">
              Learn more.
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
