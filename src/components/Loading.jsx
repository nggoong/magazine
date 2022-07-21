import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';


const Loading = () => {
    const isLoading = useSelector(state=> state.posting.isLoading);

    return(
        <LoadingWrapper isDisplay={isLoading}>
            <h1>Loading...🔥🔥</h1>
        </LoadingWrapper>
    )
}

export default Loading;

const LoadingWrapper = styled.div`
    position:absolute;
    display:${props => props.isDisplay === true ? 'flex':'none'};
    justify-content:center;
    align-items:center;
    z-index:9000;
    top:0;
    left:0;
    background:rgba(220, 222, 220, 0.7);
    width:100vw;
    height:100vh;
`