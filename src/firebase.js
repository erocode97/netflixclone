import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {addDoc, collection, getFirestore} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
const firebaseConfig = {
  apiKey: "AIzaSyAS9Du6NLgo-0NKmYLFLr03jn-yW6jsgw0",
  authDomain: "netflix-cl-aaa0c.firebaseapp.com",
  projectId: "netflix-cl-aaa0c",
  storageBucket: "netflix-cl-aaa0c.appspot.com",
  messagingSenderId: "444534321128",
  appId: "1:444534321128:web:79e7c3c8f042364c647e5d",
  measurementId: "G-L0KD2DHPNL"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) =>{
 try{
     const res = await createUserWithEmailAndPassword(auth, email, password);
     const user = res.user;
     await addDoc(collection(db, "user"),{
        uid: user.uid,
        name,
        authProvider: "local",
        email,
     });
 } catch (error){
     console.log(error);
     toast.error(error.code.split('/')[1].split('-').join(" "));
 }
}
const login =  async (email, password)=>{
  try {
     await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
     console.log(error);
     toast.error(error.code.split('/')[1].split('-').join(" "));
  }
}

 const logout = ()=>{
    signOut(auth);
 }

 export {auth, db, login, signup, logout};