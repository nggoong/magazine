import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import HeaderLogo from '../logo/HeaderLogo';
import { useDispatch } from 'react-redux';
import { userActions } from '../../redux/module/userReducer';
import { auth } from '../../shared/firebase';
import { signOut } from 'firebase/auth';
import { CgAddR } from 'react-icons/cg';
import {IoMdContact, IoMdLogOut} from 'react-icons/io'


const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutBtnClickHandler = () => {
        signOut(auth);
        dispatch(userActions.setDefaultUserInfo());
        sessionStorage.removeItem('user__login');
        alert('로그아웃 되었습니다.');
        navigate('/');
    }


    return(
        <HeaderWrapper>
            <HeaderContents>
                <HeaderLogo/>
                <HeaderActions>
                    <p><Link to='/posting'><CgAddR/></Link></p>
                    <p onClick={logoutBtnClickHandler}><IoMdLogOut/></p>
                    <p><IoMdContact/></p>
                </HeaderActions>
            </HeaderContents>
        </HeaderWrapper>
    )
}

export default Header;

const HeaderWrapper = styled.div`
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:50px;
    background:white;
    border-bottom: 2px solid rgb(240, 241, 242);
    display:flex;
    justify-content:center;
    z-index:1000;

    p {
        margin:0;
        padding:0;
        font-size:28px;
        display:flex;
        align-items:center;
        cursor:pointer;
        a {
            display:flex;
            justify-content:center;
            align-items:center;
            text-decoration:none;
            color:black;
        }
        
    }
`

const HeaderContents = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
    width:95%;
    max-width:975px;
    background:white;
    height:100%;

`

const HeaderActions = styled.div`
    display:flex;
    align-items:center;
    gap:20px;
`