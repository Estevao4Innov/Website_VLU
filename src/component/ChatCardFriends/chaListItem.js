import React from 'react';

import './chaListItem.css';



export default ({onClick, active, data}) => {    
    console.log(onClick, active, data)
    return (
        
        <div className={`chatListItem ${active ? 'active': ''} `} onClick={onClick}>
            
            <img className='chatListItem-Avatar' src={data.image} alt=""/>
            <div className="chatListItem-lines">
                <div className="chatListItem-line">
                    <div className="chatListItem-name">{data.title}</div>
                    <div className="chatListItem-date">19:00</div>
                </div>

                <div className="chatListItem-line">
                    <div className="chatListItem-lastMsg">
                        <p>Opa, tudo bem Opa, tudo bem Opa, tudo bem Opa, tudo bem</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

//https://www.youtube.com/watch?v=BkX4niTo9Ow 3:41:17 deixar ultima msg em uma linha soh