import React, {useRef, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import {LoginWrapper, LoginBox} from './Login';

const Signup = () => {
    const firstInputRef = useRef(null);
    const navigate = useNavigate();

    useEffect(()=> {
        firstInputRef.current.focus();
    }, [])
    return(
        <SignupWrapper>
            <SignupBox>
            <div className='logo-area'>
                <img src='/Joologo.PNG' onClick={()=>navigate('/')}></img>
            </div>
            <input type='email' placeholder='email' ref={firstInputRef}/>
            <input type='text' placeholder='nickname'/>
            <input type='password' placeholder='password'/>
            <input type='password' placeholder='password confirm'/>
            <button>회원가입</button>
            </SignupBox>
        </SignupWrapper>
    )
}

export default Signup;

const SignupWrapper = styled(LoginWrapper)`
    
`

const SignupBox = styled(LoginBox)`
`