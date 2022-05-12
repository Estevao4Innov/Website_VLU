import React, { useState, useEffect } from 'react';
import './NewChat.css';

import Api from '../../Api'

import ArrowBackIcon from '@material-ui/icons/ArrowBack';


export default ({mostrarJanela, setMostrar, user}) => {
    const [listContats, setListContacts] = useState([]);

    const fechaNewChatJanela = () => {
        setMostrar(false);
    }   

    const getList = async () => {
        if(user !== null) {
            let results = await Api.getListAll(user.id);            
            setListContacts(results);               
        }
    }

    useEffect(()=>{ 
        
        getList();       

    }, [user]);

    const addNewChat = async (user2) => {
        await Api.addNewChat(user, user2);

        fechaNewChatJanela();
    }

    return (
        <div className='newChat' style={{left: mostrarJanela ? 0 : -415}}>

            <div className='newChat-head'>
                <div onClick={fechaNewChatJanela} className='newChat-backButtom'>
                    <ArrowBackIcon style={{color: '#fff'}}/>
                </div>

                <div className='newChat-headTitle'>Nova Conversa</div>
            </div>

            <div className='newChat-list'>
                {
                    listContats.map((item, key) => (
                        <div onClick={()=>addNewChat(item)} className='newChat-item' key={key}>
                                <img className='newChat-itemAvatar' src={item.avatar} alt=""/>
                                <div className='newChat-itemName'>{item.name}</div>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}