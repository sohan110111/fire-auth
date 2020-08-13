import React, { useState } from 'react';
import './App.css';


// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import firebaseConfig from './firebase.config';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


function App() {

  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photo: ''
  })
  const provider = new firebase.auth.GoogleAuthProvider();
  const handleSignIn = () => {
    firebase.auth().signInWithPopup(provider)
    .then(res => {
      const {displayName, photoURL, email} = res.user;
      const signedInUser = {
        isSignedIn: true,
        name : displayName,
        email : email,
        photo : photoURL
      }
      setUser(signedInUser);
      console.log(displayName, email, photoURL);
    })
    .catch(err => {
      console.log(err);
      console.log(err.message);
    })
  }

  return (
    <div className="App">
      <button onClick = {handleSignIn}>Sign in</button>
      {
        user.isSignedIn && <p> Welcome, {user.name}</p>
      }
    </div>
  );
}

export default App;
