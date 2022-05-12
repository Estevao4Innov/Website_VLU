import React, {useEffect , useState} from 'react';
import './App.css';



import ChatListItem from './component/ChatCardFriends/chaListItem'

import ChatIntro from './component/ChatBoxSemMensagens/ChatIntro'
import ChatWindow from './component/ChatWindow/ChatWindow'

import NewChat from './component/NewChat/NewChat.js';

import Login from './component/Login/Login.js';



import ChatIcon from '@material-ui/icons/Chat';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import Api from './Api';



export default () => {
    const [chatList, setChatList] = useState([])
    const [activedChat, setActivedChate] = useState({})

    const [user, setUser] = useState(null)
        
            //{id: 1234, avatar: 'https://www.w3schools.com/howto/img_avatar2.png', name: 'Rodrigo'}
            
    

    const [mostrarJanela, setMostrarJanela] = useState(false);

    const abreJanelaNewChat = () => {
        setMostrarJanela(true);
    }

    const criarLoginESalvarComDadosFacebook = async (userFace) => {
        console.log(userFace, 'qqqq')
        let newUser = {
            id: userFace.uid,
            name: userFace.displayName,
            avatar: userFace.photoURL            
        };
        await Api.addUser(newUser);
        setUser(newUser);

        console.log(newUser, 'kkkkkkk')
    }

    if(user === null){
        return (<Login dadosLoginFace={criarLoginESalvarComDadosFacebook}/>);
    }
    console.log('aki teste', user)
    return (
        
        <div className="ContainerGeral">
            <div className="listaAmigo">
                <NewChat 
                    mostrarJanela={mostrarJanela}
                    setMostrar={setMostrarJanela}
                    user={user}
                />
                <header>
                    <img className="logadoAvatar" src={user.avatar} alt=""/>
                    <div className="header-buttons">
                        <div className="headerIcons">                            
                            <DonutLargeIcon style={{color: '#919191'}}/>
                            <ChatIcon onClick={abreJanelaNewChat} style={{color: '#919191'}}/>
                            <MoreVertIcon style={{color: '#919191'}}/>
                        </div>
                        
                    </div>
                </header>

                <div className="search">
                    <div className="search-Input">
                        <SearchIcon fontSize="small" style={{color: '#919191'}}/>
                        <input type="search" placeholder="Procurar ou começar uma nova conversa"/>
                        
                    </div>
                </div>

                <div className='chatList'>
                    {
                        chatList.map((item, key)=>(                        
                            <ChatListItem 
                                key={key} 
                                data={item}
                                active={activedChat.chatId === chatList[key].chatId}                                
                                onClick={()=>setActivedChate(chatList[key])}                                
                            />                        
                        ))
                    }
                </div>
            </div>

            <div className="conteudoConversa">
                {
                    activedChat.chatId !== undefined && < ChatWindow user={user}/>
                }

                {
                    activedChat.chatId === undefined && <ChatIntro/>                    
                }
            </div>
        </div>
    )
}