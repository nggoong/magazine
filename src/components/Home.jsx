import React, { useEffect } from 'react';
import styled from 'styled-components';
import PostingCard from './posting/PostingCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosting, postingActions } from '../redux/module/postingReducer';
import { fsActions } from '../redux/module/fsReducer';
const Home = () => {
    const postingList = useSelector(state=> state.posting.postings);
    const dispatch = useDispatch();
    useEffect(()=> {
        dispatch(fetchPosting());
        return(()=> {
            dispatch(postingActions.setDefaultPostings());
            dispatch(fsActions.setDefaultLastVisible());
        })
    }, [])
    return(
        <PostingViewerWrapper>
            {postingList.map((item, index) => <PostingCard key={item.docID}
            nickname={item.user_nickname} text={item.text} url={item.image_url} idx={index} length={postingList.length} layout={item.layout} when={item.when} docID={item.docID}/>)}
        </PostingViewerWrapper>
    )
}

export default Home;

const PostingViewerWrapper = styled.div`
    width:100%;
`