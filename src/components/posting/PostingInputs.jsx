import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../../shared/firebase';
import { doc, getDoc } from 'firebase/firestore';
import styled from 'styled-components';
import { addPosting } from '../../redux/module/postingReducer';

const PostingInputs = ({ isEdit }) => {
    const [inputs, setInputs] = useState({
        image:null,
    })
    const imageRef = useRef(null);
    const textAreaRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();

    const setThumbnail = (e) => {
        let files = e.target.files;
        if(files && files[0]) {
            setInputs({
                image:files[0]
            })
            let reader = new FileReader();
            let current= imageRef.current;


            reader.onload = (e) => {
                current.setAttribute('src', e.target.result);
            }
            reader.readAsDataURL(files[0]);
        }
    }

    const btnClickHandler = async () => {
        await dispatch(addPosting({image:inputs.image, text:textAreaRef.current.value}));
        navigate('/');
    }

    useEffect(()=> {
        if(!isEdit) return;
        else {
            console.log(params.id);
            const getPostingInfo = async (docID) => {
                const docRef = doc(db, 'posting', docID);
                const docSnap = await getDoc(docRef);
                if(docSnap) return docSnap.data();
                else return;
            }

            const setInputValue = async () => {
                setInputs({...inputs, image:'set'});
                const imageCurrent = imageRef.current;
                const textAreaCurrent = textAreaRef.current;
                const doc = await getPostingInfo(params.id);
                imageCurrent.setAttribute('src', doc.image_url);
                textAreaCurrent.value = doc.text;
            }

            setInputValue().catch(console.error);
        }
    }, [])

    return(
        <InputsWrapper>
        <ImageBox isShow={inputs.image}>
            <p className='no-image'>No Image🙄</p>
            <img ref={imageRef} />
        </ImageBox>
        <InputBox>
            <input type='file' name='image' onChange={setThumbnail}/>
            <textarea name='posting_content' ref={textAreaRef}/>
        </InputBox>
        <button onClick={btnClickHandler}>확인</button>
        </InputsWrapper>
    )
}

export default PostingInputs;

const InputsWrapper = styled.div`
    width:100%;
`

const ImageBox = styled.div`
    user-select:none;
    width:100%;
    background:rgb(222, 225, 227);
    height:50vh;
    display:flex;
    justify-content:center;
    align-items:center;
    color:white;
    font-size:50px;

    .no-image {
        display:${props => props.isShow && 'none'};
    }

    img {
        width: 100%;
        height: 100%;
        object-fit:fill;
        display:${props=>props.isShow||'none'};
    }

    @media screen and (min-width:490px) {
        height:60vh;
    }
`

const InputBox = styled.form`
    display:flex;
    flex-direction:column;
    width: 100%;

`