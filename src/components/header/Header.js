import React from 'react';
import styled from 'styled-components';

const Header = () => {


    return(
        <HeaderWrapper>
            <p>Header</p>
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
    background:green;

    p {
        margin:0;
        color:white;
    }
`