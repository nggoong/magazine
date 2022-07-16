import React, {useRef, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import {LoginWrapper, LoginBox} from './Login';
import { auth, db } from '../../shared/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';

const Signup = () => {
    const [inputs, setInputs] = useState({
        email:'',
        nickname:'',
        password:'',
        password_confirm:''
    })
    const firstInputRef = useRef(null);
    const navigate = useNavigate();

    const inputChangeHandler = (e) => {
        const {name, value} = e.target;
        setInputs({...inputs, [name]:value});
    }

    const signupBtnClickHandler = async () => {
        const {email, nickname, password, ...rest} = inputs;
        const user = await createUserWithEmailAndPassword(auth, email, password);
        console.log(user);
        const dbCollection = collection(db, 'users');
        const userDoc = await addDoc(dbCollection, {user_email:user.user.email, user_nickname:nickname})
        console.log(userDoc.id);
        alert('회원 가입이 완료되었습니다.')
        navigate('/member/login');
    }

    useEffect(()=> {
        firstInputRef.current.focus();
    }, [])
    return(
        <SignupWrapper>
            <SignupBox>
            <div className='logo-area'>
                <img alt='logo-image' src='/Joologo.PNG' onClick={()=>navigate('/')}></img>
            </div>
            <input type='email' placeholder='email' ref={firstInputRef} name='email' value={inputs.email} onChange={inputChangeHandler}/>
            <input type='text' placeholder='nickname' name='nickname' value={inputs.nickname} onChange={inputChangeHandler}/>
            <input type='password' placeholder='password' name='password' value={inputs.password} onChange={inputChangeHandler}/>
            <input type='password' placeholder='password confirm' name='password_confirm' value={inputs.password_confirm} onChange={inputChangeHandler}/>
            <button onClick={signupBtnClickHandler}>회원가입</button>
            </SignupBox>
        </SignupWrapper>
    )
}

export default Signup;

const SignupWrapper = styled(LoginWrapper)`
    
`

const SignupBox = styled(LoginBox)`
`