import React, {useEffect, useState} from 'react';
import firebase from 'firebase/app';
import Message from './Message';

function Channel({user=null, db=null}) {

    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')
    console.log('messages', messages)

    const {uid, displayName, photoURL} = user;

    
    useEffect(() => {
        if(db){
            const unsubscribe = db
            .collection('messages')
            .orderBy('createdAt')
            .limit(100)
            .onSnapshot(querySnapshot => {
                const data = querySnapshot.docs.map(doc => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                setMessages(data)
            })
            return unsubscribe
        }

    }, [db])

    const handleChange = (e) => {
        setNewMessage(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(db){
            db.collection('messages').add({
                text:newMessage,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                uid,
                displayName,
                photoURL,
            })
            setNewMessage('')
        }

    }

    return (
        <>
        <ul>
            {

                messages.map(message => (<li key={message.id}>
                    <Message {...message}/>
                </li>))
            }
            ok
        </ul>
        <form onSubmit={handleSubmit}>
            <input 
            type='text'
            value={newMessage}
            onChange={handleChange}
            placeholder='envoyer un message'
            />
            <button type='submit' disabled={!newMessage}>
                send
            </button>
        </form>
        </>
    )
}

export default Channel;
