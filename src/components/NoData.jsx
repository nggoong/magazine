import React from 'react';
import styled from 'styled-components';


const NoData = () => {

    return(
        <NoDataWrapper>
            <h1>No Data😂</h1>
        </NoDataWrapper>
    )
}

export default NoData;


const NoDataWrapper = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    width:100%;
    height:80vh;
`
    
