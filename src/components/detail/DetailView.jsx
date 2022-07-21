import React, {useEffect, useState, useRef} from 'react';
import styled from 'styled-components';
import DetailCard from './DetailCard';
import { db } from '../../shared/firebase';
import { getDoc, doc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';

const DetailView = () => {
    const params = useParams();

    const tempRef = useRef({
        layout:'',
        text:'',
        user_nickname:'',
        url:'',
        when:''
    })

    
    useEffect(()=> {
        const getOneDoc = async () => {
            const docRef = doc(db, 'posting', params.id);
            const docSnap = await getDoc(docRef);
            if(docSnap) return docSnap.data();
            else return {};
        }
        const tempData = getOneDoc().catch(console.error);
        tempRef.current.layout = tempData.layout;
        tempRef.current.text = tempData.text;
        tempRef.current.user_nickname = tempData.user_nickname;
        tempRef.current.url = tempData.image_url;
        tempRef.current.when = tempData.when;
    }, []);
    return(
        <DetailViewWrapper>
            <DetailCard id={params.id}/>
        </DetailViewWrapper>
    )
}

export default DetailView;

const DetailViewWrapper = styled.div`
    width:100%;
    background:yellow;
`