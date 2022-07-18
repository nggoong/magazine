import React, { useState, useEffect } from 'react';
import { fetchPosting } from '../../redux/module/postingReducer';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

const PostingCard = ({ item, nickname, text, url, idx, length }) => {

    const [target, setTarget] = useState(null);
    const dispatch = useDispatch();

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

    return(
        <PostingCardWrapper ref={idx === length - 1 ? setTarget : null}>
            <PostingCardHeader><p>{nickname}</p></PostingCardHeader>
            <PostingCardImage>
                <img src={url} alt="image" />
            </PostingCardImage>
            {/* <PostingButtons>❤</PostingButtons> */}
            <PostingText>
                <p className='text-nickname'>{nickname}</p>
                <p>{text}</p>
            </PostingText>
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
const PostingCardHeader = styled.div`
    width:100%;
    height:25px;
    padding-left:10px;
    margin-bottom:10px;
    font-weight:bold;
    /* background:yellow; */
`
const PostingCardImage = styled.div`
    width:100%;
    height:60vh;
    background:lightgray;
    border-radius:10px;
    margin-bottom:10px;

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
    .text-nickname {
        font-weight:bold;
    }
    /* background:red; */

`