import React, { useRef, useState } from "react";
import "./App.css";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

firebase.initializeApp({
  //your Firebase App Config i hided mine ok
});

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <header>
        Chat App
        <SignOut></SignOut>
      </header>
      <section>{user ? <ChatRoom></ChatRoom> : <SignIn></SignIn>}</section>
    </div>
  );
}
const ChatMessage = (props) => {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";
  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL} alt="userImage"></img>
      <p>{text}</p>
    </div>
  );
};
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

const ChatRoom = () => {
  const dummyBody = useRef();
  const MessagesRef = firestore.collection("messages");
  const query = MessagesRef.orderBy("createdAt").limit(20);
  const [messages] = useCollectionData(query, { idField: "id" });
  const [FormValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    const { uid, photoURL } = auth.currentUser;
    await MessagesRef.add({
      text: FormValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      photoURL,
      uid,
    });

    setFormValue("");
    dummyBody.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <main>
        {messages &&
          messages.map((msg) => {
            return <ChatMessage key={msg.id} message={msg}></ChatMessage>;
          })}
        <div ref={dummyBody}></div>
      </main>
      <form onSubmit={sendMessage}>
        <input
          value={FormValue}
          onChange={(e) => setFormValue(e.target.value)}
        ></input>
        <button type="submit">S</button>
      </form>
    </>
  );
};
export default App;
