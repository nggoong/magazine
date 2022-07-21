import React, { useState, useEffect, useRef } from 'react';
import { fetchPosting } from '../../redux/module/postingReducer';
import { db } from '../../shared/firebase';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { getDoc, doc } from 'firebase/firestore';

const DetailCard = ({ id }) => {
    const dispatch = useDispatch();
    const [data, setData] = useState({});
    const tempData = useRef({
        user_nickname:'',
        when:'',
        layout:'',
        url:'',
        text:''
    });

    useEffect(()=> {
        const getOneDoc = async () => {
            const docRef = doc(db, 'posting', id);
            const docSnap = await getDoc(docRef);
            if(docSnap) return docSnap.data();
            else return {};
        }
        const setValue = async () => {
            const doc = await getOneDoc();
            let new_obj = {
                user_nickname:doc.user_nickname,
                when:doc.when,
                layout:doc.layout,
                url:doc.image_url,
                text:doc.text
            }
            // tempData.current.user_nickname = doc.user_nickname;
            // tempData.current.when = doc.when;
            // tempData.current.layout = doc.layout;
            // tempData.current.url = doc.image_url;
            // tempData.current.text = doc.text;
            setData(new_obj);
        }

        setValue().catch(console.error);
    }, [])

    return(
        <PostingCardWrapper>
            <PostingCardHeader>
                <p className='header-nickname'>{data?.user_nickname}</p>
                <p className='header-when'>{data?.when}</p>
            </PostingCardHeader>
            <PostingCardContent content_layout={data?.layout}>
            
            {/* <PostingButtons>❤</PostingButtons> */}
            <PostingText>
                
                <p>{data?.text}</p>
            </PostingText>
            <PostingCardImage>
                <img src={data?.url} alt="image" />
            </PostingCardImage>
            </PostingCardContent>
        </PostingCardWrapper>
    )
}

export default DetailCard;

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