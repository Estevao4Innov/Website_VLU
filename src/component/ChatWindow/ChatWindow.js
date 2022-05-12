import React , { useState, useEffect, useRef } from 'react';
import EmojiPicker from 'emoji-picker-react';

import MessageComponent from '../messageComponent/MessageComponent'

import './ChatWindow.css';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@material-ui/icons/Send';
import MicIcon from '@material-ui/icons/Mic';
import { useRadioGroup } from '@material-ui/core';


export default ({user}) => {    
    //console.log('lllll', user.id)
    const body = useRef();
    
    console.log(body, 'body')
    
    let reconhecimento = null;
    let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if(SpeechRecognition !== undefined){
        reconhecimento = new SpeechRecognition ();
    }

    const [emojiOpen, setEmojiOpen] = useState(false);
    const [text, setText] = useState('');
    const [listening, setListening] = useState(false);

    const [listMsg, setListMsg] = useState(
        [
            {author:123, body: 'bla bla bla'},
            {author:123, body: 'bla bla '},
            {author:1234, body: 'bla bla bla bla'},
            {author:123, body: 'bla bla bla'},
            {author:123, body: 'bla bla '},
            {author:1234, body: 'bla bla bla bla'},
            {author:123, body: 'bla bla bla'},
            {author:123, body: 'bla bla '},
            {author:1234, body: 'bla bla bla bla'},
            {author:123, body: 'bla bla bla'},
            {author:123, body: 'bla bla '},
            {author:1234, body: 'bla bla bla bla'},
            {author:123, body: 'bla bla bla'},
            {author:123, body: 'bla bla '},
            {author:1234, body: 'bla bla bla bla'},
            {author:123, body: 'bla bla bla'},
            {author:123, body: 'bla bla '},
            {author:1234, body: 'bla bla bla bla'},
            {author:123, body: 'bla bla bla'},
            {author:123, body: 'bla bla '},
            {author:1234, body: 'bla bla bla bla'},
            {author:123, body: 'bla bla bla'},
            {author:123, body: 'bla bla '},
            {author:1234, body: 'bla bla bla bla'},
        ]
        );

    useEffect(() => {
        
        console.log('body 2', body.current.scrollHeight)
        if(body.current.scrollHeight > body.current.offsetHeight){
            body.current.scrollTop = body.current.scrollHeight - body.current.offsetHeight;
        }
    }, [listMsg]);

    
    const handleEmojiClick = (event, emojiObject) => {
        console.log(emojiObject);
        setText( text + emojiObject.emoji )
    }

    const abreJanelaEmojis = () => {
        setEmojiOpen(true);
    }

    const fechaJanelaEmoji = () => {
        setEmojiOpen(false)
    }

    const handleMicClick = () => {
        if(reconhecimento !== null){

            reconhecimento.onstart = () => {
                setListening(true);
            }
            reconhecimento.onend = () => {
                setListening(false);
            }
            reconhecimento.onresult = (event) => {
                setText(event.results[0][0].transcript);
            }

            reconhecimento.start();

            console.log('aaaa')
        }
    }

    return (
        <div  className='chatWindowContainer'>
            <div className='chatWindow-Header'>
                <div className='chatWindow-headerInfo'>
                    <img className='chatWindow-avatar' src="https://www.w3schools.com/howto/img_avatar2.png"/>
                    <div className='chatWindow-name'>Antonio Rodrigo</div>
                </div>

                <div className='chatWindow-headerButtons'>
                    <div className="chatWindow-btn">
                        <SearchIcon style={{color: '#919191'}}/>                        
                    </div>

                    <div className="chatWindow-btn">
                    <div className="chatWindow-btn">
                        <SearchIcon  style={{color: '#919191'}}/>                        
                    </div>                        
                        <MoreVertIcon style={{color: '#919191'}}/>
                    </div>
                </div>

            </div>

            <div ref={body} className='chatWindow-Body'>
            
                {                    
                    listMsg.map((item, key)=>(
                        <MessageComponent key={key} data={item} user={user} />
                    ))
                }
            </div>

            <div className='chatWindow-emojiArea' style={{height: emojiOpen ? '200px' : '0px'}}>
                    <EmojiPicker
                        onEmojiClick={handleEmojiClick}
                        disableSearchBar
                        disableSkinTonePicker
                    />    
            </div> 

            <div className='chatWindow-footer'>

                <div className='chatWindow-pre-Input'>  
                    <div className="btn-x" style={{width: emojiOpen ? 40 : 0}}>
                        <CloseIcon className='emotionAnexo' style={{color: '#919191'}} onClick={fechaJanelaEmoji} />
                    </div>

                    <div className='btn-emoji'>
                        <InsertEmoticonIcon className='emotionAnexo' style={{color: emojiOpen ? '#009688' : '#919191'}} onClick={abreJanelaEmojis}/>
                    </div> 

                    <div className='btn-anexo'>                  
                        <AttachFileIcon className='emotionAnexo' style={{color: '#919191'}}/>
                    </div>
                </div> 

                <div className='chatWindow-InputContainer'>
                    <input 
                        className='chatWindow-Input' 
                        type="text"
                        placeholder='Digite uma mensagem'
                        value={text}
                        onChange={event=>setText(event.target.value)}
                    />
                </div>                              

                <div className='chatWindow-pos-Input'>  

                    {
                        text !== '' &&
                        <div  className='chatWindow-btn'>                  
                            <SendIcon style={{color: '#919191'}}/>                 
                        </div>
                    }
                    
                    {
                        text === '' &&
                        <div onClick={handleMicClick} className='chatWindow-btn'>                 
                            <MicIcon style={{color: listening ? '#126ece' : '#919191'}}/>                 
                        </div>
                    }
                    
                </div> 
            </div>
        </div>
    )
}