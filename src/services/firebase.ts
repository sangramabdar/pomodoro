import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

import { auth, db } from "../firebase";
import { query, collection, where, getDocs, addDoc } from "firebase/firestore";

async function signInWithGoogleService() {
  try {
    const res = await signInWithPopup(auth, new GoogleAuthProvider());
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
  }
}

async function signOutService() {
  try {
    signOut(auth);
  } catch (error) {
    console.log(error);
  }
}

export { signInWithGoogleService, signOutService };
