import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { personalFetchPosting, postingActions } from '../../redux/module/postingReducer';
import { fsActions } from '../../redux/module/fsReducer';
import PersonalPostingCard from './PersonalPostingCard';

const PersonalViewer = () => {
    const dispatch = useDispatch();
    const personalPostings = useSelector(state => state.posting.postings);
    useEffect(()=> {
        dispatch(personalFetchPosting());

        return(()=> {
            dispatch(postingActions.setDefaultPostings()); // 홈으로 이동할 때 스토어 비워주기.
            dispatch(fsActions.setDefaultLastVisible());
        })
    }, [])

    return(
        <PersonalViewerWrapper>
            {personalPostings.map((item) => <PersonalPostingCard item={item}
            url={item.image_url} text={item.text} key={item.docID}/>)}
        </PersonalViewerWrapper>
    )
}

export default PersonalViewer;

const PersonalViewerWrapper = styled.div`
    width: 100%;
    display:flex;
    flex-wrap:wrap; 
    gap:20px;
`