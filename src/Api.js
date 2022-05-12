import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import firebaseConfig from './firebaseConfig'

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

export default {
    fbPopup: async () => {
        const provider = new firebase.auth.FacebookAuthProvider();
        let result = await firebaseApp.auth().signInWithPopup(provider)
        return result;
    },

    addUser: async (user) => {
        await db.collection('users').doc(user.id).set({
            name: user.name,
            avatar: user.avatar
        }, {merge:true});
    },

    getListAll: async (userId) => {
        let list = [];

        let results = await db.collection('users').get();
        
        results.forEach(result => {
            let data = result.data();
            if(result.id !== userId){
                list.push({
                    id: result.id,
                    name: data.name,
                    avatar: data.avatar
                })
            }            
        });

        return list;
        
    },

    addNewChat: async (user, user2) => {
        let newChat = await db.collection('chats').add({
            messages: [],
            users: [user.id, user2.id]
        })//ateh aki adiciona um novo chat na colecao chats no firestore
    
        //adcionando referenci do chat no user1
        db.collection('users').doc(user.id).update({
            chats:firebase.firestore.FieldValue.arrayUnion({
                chatId:   newChat.id,
                title:    user2.name,
                image:    user2.avatar,
                chatWith: user2.id
            })
        });

        //adcionando referenci do chat no user2
        db.collection('users').doc(user2.id).update({
            chats:firebase.firestore.FieldValue.arrayUnion({
                chatId:   newChat.id,
                title:    user.name,
                image:    user.avatar,
                chatWith: user.id
            })
        });
    
    }

    
};