import React, {useRef, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import {LoginWrapper, LoginBox} from './Login';
import { auth, db } from '../../shared/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';

const validation = (inputs) => {
    const { email, nickname, password, password_confirm } = inputs;
    if(!email || !nickname || !password || !password_confirm) {
        alert('입력 폼을 다 채워주세요!!');
        return false;
    }
    else if(!email.includes('@') || !email.includes('.')) {
        alert('이메일 형식이 아닙니다.');
        return false;
    }
    else if(password.length < 8) {
        alert('8~12자의 비밀번호를 입력해주세요');
        return false;
    }

    else if(password !== password_confirm) {
        alert('두 비밀번호가 다릅니다.');
        return false;
    }
    else return true;

}

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
        let user;
        const isValid = validation(inputs);
        if(!isValid) return;
        try {
            user = await createUserWithEmailAndPassword(auth, email, password);
        }
        catch(e) {
            alert('이미 등록된 이메일 입니다.');
        }
        
        const dbCollection = collection(db, 'users');
        const userDoc = await addDoc(dbCollection, {user_email:user.user.email, user_nickname:nickname})
        console.log(userDoc.id);
        alert('회원 가입이 완료되었습니다.')
        navigate('/');
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
            <p>email</p>
            <input type='email' ref={firstInputRef} name='email' value={inputs.email} onChange={inputChangeHandler}/>
            <p>nickname</p>
            <input type='text' name='nickname' value={inputs.nickname} onChange={inputChangeHandler} title='hello'/>
            <p>password</p>
            <input type='password' placeholder='8~12자' name='password' value={inputs.password} onChange={inputChangeHandler} maxLength='12'/>
            <p>password confirm</p>
            <input type='password' placeholder='8~12자' name='password_confirm' value={inputs.password_confirm} onChange={inputChangeHandler} maxLength='12'/>
            <button onClick={signupBtnClickHandler}>회원가입</button>
            </SignupBox>
        </SignupWrapper>
    )
}

export default Signup;

const SignupWrapper = styled(LoginWrapper)`
    
`

const SignupBox = styled(LoginBox)`
    gap:0;
    p {
        font-weight:bold;
        padding-left:10px;
        font-size:20px;
        margin-top:10px;
        margin-bottom:5px;
        
    }
    button {
        margin-top:20px;
    }
    
`