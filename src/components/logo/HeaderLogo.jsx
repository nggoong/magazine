import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderLogo = () => {

    return(
        <LogoDiv>
            <Link to='/'><img src='/JoologoHeader.PNG'></img></Link>
        </LogoDiv>
    )
}


export default HeaderLogo;

const LogoDiv = styled.div`
    width:40%;
    height:100%;
    display:flex;
    align-items:center;
    

    img {
        width:80%;
        height:50%;
        object-fit:contain;

        @media screen and (min-width: 490px) {
            width:30%;
        }
    }

`