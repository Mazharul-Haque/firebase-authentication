import logo from './logo.svg';
import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';

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
        const { displayName, photoURL, email } = res.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(signedInUser);
        console.log(displayName, photoURL, email);
      })
      .catch(err => {
        console.log(err);
        console.log(err.message);
      })
  }

  const handleSignOut = () => {
    firebase.auth().signOut()
      .then(res => {
        const signedOutUser = {
          isSignedIn: false,
          name: '',
          email: '',
          photo: ''
        }
        setUser(signedOutUser);

      })
      .catch(err => {

      })

  }
  //handlechange
  const handleBlur = (event) => {
    console.log(event.target.name,event.target.value);
    //console.log();
  }
  //handlesubmit

  const handleSubmit = () => {

  }

  return (
    <div className="App">
      {
        user.isSignedIn ? <button onClick={handleSignOut} >Sign Out</button> :
          <button onClick={handleSignIn} >Sign in</button>
      }
      {
        user.isSignedIn &&
        <div>
          <p>Welcome, {user.name}</p>
          <p>Your email : {user.email}</p>
        Photo : <img src={user.photo} alt="" ></img>
        </div>
      }

      <h2>Our own authentication System</h2>
      <form onSubmit={handleSubmit} >

        email : <input type="text" name="email" onBlur={handleBlur} placeholder="Enter your mail" required /> <br />
      Password :<input type="password" name="password" onBlur={handleBlur} placeholder="Enter your Pass" required  id="" /> <br />
        <input type="submit" value="submit" />

      </form>



    </div>
  );
}

export default App;
