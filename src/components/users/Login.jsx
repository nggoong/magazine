import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


const Login = () => {
    const firstInputRef = useRef(null);

    useEffect(()=> {
        firstInputRef.current.focus();
    }, [])

    return(
        <LoginWrapper>
            <LoginBox>
                <div className='logo-area'>
                    <img src='/Joologo.PNG'></img>
                </div>
                <input type='email' ref={firstInputRef} placeholder='email'/>
                <input type='password' placeholder='password'/>
                <LinkArea><Link to='/member/signup'>회원이 아니신가요?</Link></LinkArea>
                <button>로그인</button>
            </LoginBox>
        </LoginWrapper>

    )
}

export default Login;

export const LoginWrapper = styled.div`
    position:absolute;
    display:flex;
    justify-content:center;
    align-items:center;
    top:0;
    left:0;
    width:100vw;
    height:100vh;
    background:white;
    
`

export const LoginBox = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    width:80%;
    max-width:470px;
    padding:20px;
    gap:15px;
    input {
        width:100%;
        height: 30px;
        font-size:25px;
        border-radius:10px;
        padding:20px;
        box-sizing:border-box;
    }
    button {
        width:100%;
        border-radius:10px;
        height:40px;
        background:#3d5afe;
        color:white;
        font-weight: bold;
    }
    .logo-area {
        box-sizing:border-box;
        width:100%;
        height: 120px;

        img {
            width:100%;
            height:90%;
            object-fit: contain;
            cursor:pointer;
            /* height:100%; */
        }
    }
`

const LinkArea = styled.div`
    padding:10px;
`