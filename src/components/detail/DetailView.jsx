import React from 'react';
import styled from 'styled-components';
import DetailCard from './DetailCard';
import { useParams } from 'react-router-dom';

const DetailView = () => {
    const params = useParams();

    
    return(
        <DetailViewWrapper>
            <DetailCard id={params.id}/>
        </DetailViewWrapper>
    )
}

export default DetailView;

const DetailViewWrapper = styled.div`
    width:100%;
`