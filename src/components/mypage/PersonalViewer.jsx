import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { personalFetchPosting, postingActions } from '../../redux/module/postingReducer';
import PersonalPostingCard from './PersonalPostingCard';

const PersonalViewer = () => {
    const dispatch = useDispatch();
    const personalPostings = useSelector(state => state.posting.postings);

    useEffect(()=> {
        dispatch(postingActions.setDefaultPostings());
        dispatch(personalFetchPosting());

        return(()=> {
            dispatch(postingActions.setDefaultPostings());
        })
    }, [])
    // 왜 되는거지?
    // HOME 컴포넌트에서 여기로 이동할 때 홈 컴포넌트 언마운트 될 때 스토어 초기화 하는데,,

    return(
        <PersonalViewerWrapper>
            {personalPostings.map((item, index) => <PersonalPostingCard item={item}
            url={item.image_url} text={item.text}/>)}
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