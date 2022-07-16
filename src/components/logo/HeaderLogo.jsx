import React from 'react';
import styled from 'styled-components';

const HeaderLogo = () => {

    return(
        <LogoDiv>
            <img src='/JoologoHeader.PNG'></img>
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