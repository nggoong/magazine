import React, { useState, useEffect } from 'react';
import { fetchPosting } from '../../redux/module/postingReducer';
import { useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';

const PostingCard = ({ item, nickname, text, url, idx, length, layout, when, docID }) => {
    const [target, setTarget] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onIntersect = ([entry], observer) => {
        if(entry.isIntersecting) {
            dispatch(fetchPosting())
            observer.unobserve(entry.target);
        }
    }

    useEffect(()=> {
        let observer;
        if(target) {
            observer = new IntersectionObserver(onIntersect, {threshold:0.7});
            observer.observe(target);
        }

        return(()=> {
            observer && observer.disconnect();
        })
    }, [target])

    const goToDetail = () => {
        navigate(`/detail/${docID}`);
    }

    return(
        <PostingCardWrapper ref={idx === length - 1 ? setTarget : null} onClick={goToDetail}>
            <PostingCardHeader>
                <p className='header-nickname'>{nickname}</p>
                <p className='header-when'>{when}</p>
            </PostingCardHeader>
            <PostingCardContent content_layout={layout}>
            
            {/* <PostingButtons>❤</PostingButtons> */}
            <PostingText>
                
                <p>{text}</p>
            </PostingText>
            <PostingCardImage>
                <img src={url} alt="image" />
            </PostingCardImage>
            </PostingCardContent>
        </PostingCardWrapper>
    )
}

export default PostingCard;

const PostingCardWrapper = styled.div`
    position:relative;
    width:100%;
    padding:20px;
    border:3px solid rgb(240, 241, 242);
    border-radius:10px;
    box-sizing:border-box;
    margin-bottom:20px;
    user-select:none;
    background:white;
`
const PostingCardContent = styled.div`
${props=> {
    if(props.content_layout === 'garo') {
        return css`
            display:flex;
        `
    }
    else if(props.content_layout === 'garo_reverse') {
        return css`
            display:flex;
            flex-direction:row-reverse;
        `
    }
    else if(props.content_layout === 'sero') {
        return css`
            display:block;
        `
    }
}}

@media screen and (max-width:490px) {
    display:block;
}
`
const PostingCardHeader = styled.div`
    display:flex;
    width:100%;
    height:25px;
    padding-left:10px;
    margin-bottom:10px;
    font-weight:bold;
    .header-nickname {
        flex:1
    }
    .header-when {
        padding-right:10px;
    }
    /* background:yellow; */
`
const PostingCardImage = styled.div`
    width:100%;
    height:60vh;
    background:lightgray;
    border-radius:10px;
    margin-bottom:10px;
    flex-shrink:1;

    @media screen and (min-width:450px) {
        height:70vh;
    }
    
    img {
        width:100%;
        height:100%;
        object-fit: fill;
        border-radius:10px;
    }
`

const PostingButtons = styled.div`
    width:100%;
    margin-bottom:10px;
    background:yellow;
`

const PostingText = styled.div`
    display:flex;
    padding-left:10px;
    gap:5px;
    width:100%;
    flex-shrink:3;
    

`