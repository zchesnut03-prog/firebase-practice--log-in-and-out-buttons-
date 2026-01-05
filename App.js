import React from 'react';
import './App.css';
import { auth, db } from './firebase/init';
import { collection, addDoc, getDocs, getDoc, doc, query, where, updateDoc} from "firebase/firestore";
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
 } from "firebase/auth";

function App() {
  const [user, setUser] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  async function updatePost() {
    const hardcodedId = "mEUKTEDOa5YoRbcPa02R";
    const postRef = doc(db, "posts", hardcodedId);
    const post = await getPostById(hardcodedId);
    // console.log(post);
    // const newPost = {
    //   description: "finsih FES",
    //   uid: "1",
    //   title: "land $300k job"
    // };
    // updateDoc(postRef, newPost);
  }

  function createPost() {
    const post = {
      title: "Finish firebase section",
      description: "Do Frontend Simplified",
      uid: user.uid,
    };
    addDoc(collection(db, "posts"), post)
  }

  async function getAllPosts() {
    const { docs } = await getDocs(collection(db, "posts"));
    const posts = docs.map((elem) => ({...elem.data(), id: elem.id }));   
    // add id onto colsole from cloud
    console.log(posts);
  }

  async function getPostById(id) {
    const postRef = doc(db, "posts", id);
    const postSnap = await getDoc(postRef);
    return postSnap = postSnap.data()
    
  }

  async function getPostByUid() {
    const postCollectionRef = await query(
      collection(db, "posts"),
      where("uid", "==", user.uid)
    );
    const { docs } = await getDocs(postCollectionRef);
    console.log(docs.map(doc => doc.data()));
  }

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (user) {
        setUser(user)
      }
    })
  }, []);

  function register() {
    console.log('register');
    createUserWithEmailAndPassword(auth, 'email@email.com', 'test123')
    .then((user) => {
      console.log(user)
    })
    .catch((error) => {
      console.log(error);
    })
  }

  function login() {
    signInWithEmailAndPassword(auth, 'email@email.com', 'test123')
    .then(({ user }) => {
      console.log(user);
      setUser(user);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  function logout() {
    signOut (auth);
    setUser({});
  }

  return (
    <div className="App">
       <button onClick={register}>Register</button>
       <button onClick={login}>Log In</button>
       <button onClick={logout}>Log Out</button>
       {loading ? 'loading....' : user.email}
       <button onClick={createPost}>Create Post</button>
       <button onClick={getAllPosts}>Get all posts</button>
       <button onClick={getPostById}>Get posy by ID</button>
       <button onClick={getPostByUid}>Get posy by UID</button>
       <button onClick={updatePost}>Update Post</button>
    </div>
  );
}

export default App;
