import React from "react";
import { signInWithGoogleService, signOutService } from "../services/firebase";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import GoogleButton from "react-google-button";

function HomePage() {
  const handleOnLogin = () => signInWithGoogleService();

  return (
    <div className="flex justify-center items-center h-screen">
      <GoogleButton onClick={handleOnLogin} />
    </div>
  );
}

export default HomePage;
