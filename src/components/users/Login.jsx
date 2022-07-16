import React, { useRef, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginFB } from '../../redux/module/userReducer';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


const Login = () => {
    const [inputs, setInputs] = useState({
        email:'',
        password:''
    })
    const firstInputRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const inputChangeHandler = (e) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]:value
        })
    }

    const loginBtnClickHandler = () => {
        const { email, password } = inputs;
        try {
            dispatch(loginFB({email:email, password:password}));
            navigate('/');
        }
        catch(e) {
            console.log(e);
        }
    }

    useEffect(()=> {
        firstInputRef.current.focus();
    }, [])

    return(
        <LoginWrapper>
            <LoginBox>
                <div className='logo-area'>
                    <img alt='logo-image' src='/Joologo.PNG'></img>
                </div>
                <input type='email' ref={firstInputRef} placeholder='email' name='email' value={inputs.email} onChange={inputChangeHandler}/>
                <input type='password' placeholder='password' name='password' value={inputs.password} onChange={inputChangeHandler}/>
                <LinkArea><Link to='/member/signup'>회원이 아니신가요?</Link></LinkArea>
                <button onClick={loginBtnClickHandler}>로그인</button>
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