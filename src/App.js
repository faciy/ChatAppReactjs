import React, {useState, useEffect} from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import Button from './components/Button';
import Channel from './components/Channel';

firebase.initializeApp({
    apiKey: "AIzaSyCORhQ6699TolCo1NRr6DtGupiQIa1i164",
    authDomain: "react-firechat-b57fb.firebaseapp.com",
    projectId: "react-firechat-b57fb",
    storageBucket: "react-firechat-b57fb.appspot.com",
    messagingSenderId: "591736325693",
    appId: "1:591736325693:web:eabbc1f1f987a69c2f0c54"
 });

 const auth = firebase.auth();
 const db = firebase.firestore();

function App() {

    const [user, setUser] = useState(() => auth.currentUser);
    const [initializing, setInitializing] = useState(true)

    useEffect(() => {
       const unsubscribe = auth.onAuthStateChanged(user => {
           if(user){
               setUser(user)
           }else {
               setUser(null)
           }
           if(initializing){
               setInitializing(false)
           }
       })
       return unsubscribe
    })


    const signOut = async () => {
        try {
            await firebase.auth().signOut();
        } catch (e) {
            console.log(e)
        }
    }

    const signInWithGoogle = async () =>{
        // recupérer l'objet googleproviderauthentification
        const provider = new firebase.auth.GoogleAuthProvider();
        // Définir la langue sur la préférence par défaut du navigateur
        auth.useDeviceLanguage();
        // Début du processus de connexion
        try {
           await auth.signInWithPopup(provider)
        } catch (e) {
            console.log(e)
        }

    }

    if(initializing) return 'Loading...';

    return (
        <div>
            {
                user ? (<>
                    <Button onClick={signOut}>SignOut</Button>
                    <Channel user={user} db={db} />
                </>): 
                (<Button onClick={signInWithGoogle} > Sign in with Google </Button>)
            }
        </div>
    )
}

export default App
