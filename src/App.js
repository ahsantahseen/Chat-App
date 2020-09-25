import React from "react";
import "./App.css";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { useColllectionData } from "react-firebase-hooks/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyAmMTxHPSXGoYwwaVgsoCeQbrW-iM55Rv4",
  authDomain: "chat-app-9f624.firebaseapp.com",
  databaseURL: "https://chat-app-9f624.firebaseio.com",
  projectId: "chat-app-9f624",
  storageBucket: "chat-app-9f624.appspot.com",
  messagingSenderId: "959059630558",
  appId: "1:959059630558:web:3b728b1cef6e5b9cd3654f",
  measurementId: "G-2EYTS4P0MV",
});

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <header></header>
      <section>{user ? <ChatRoom></ChatRoom> : <SignIn></SignIn>}</section>
    </div>
  );
}
const ChatRoom = () => {};
const SignIn = () => {
  const GoogleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };
  return (
    <div>
      <button onClick={GoogleSignIn}>Sign In with google</button>
    </div>
  );
};
const SignOut = () => {
  return (
    auth.currentUser && <button onClick={() => auth.signOut()}>SignOut</button>
  );
};
export default App;
