import React from 'react';
import styled from 'styled-components';
import HeaderLogo from '../logo/HeaderLogo';
import { CgAddR } from 'react-icons/cg';
import {IoMdContact, IoMdLogOut} from 'react-icons/io'

const Header = () => {


    return(
        <HeaderWrapper>
            <HeaderContents>
                <HeaderLogo/>
                <HeaderActions>
                    <p><CgAddR/></p>
                    <p><IoMdLogOut/></p>
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

    p {
        margin:0;
        padding:0;
        font-size:28px;
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