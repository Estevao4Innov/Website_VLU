import React from 'react'
import Api from '../../Api'

import './Login.css';

export default ({dadosLoginFace}) => {
    const loginComFacebook = async () => {
        let result = await Api.fbPopup();
            
        if(result){            
            dadosLoginFace(result.user)

        }else{
            alert('Erro!');
        }
    }

    return (
        <div className='login'>
            <button onClick={loginComFacebook}>Logar com Facebook</button>
        </div>
    )
}

