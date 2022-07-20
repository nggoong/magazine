import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { db, storage } from '../../shared/firebase';
import { doc, getDoc } from 'firebase/firestore';
import styled from 'styled-components';
import { addPosting, editPosting } from '../../redux/module/postingReducer';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const validation = (inputs, text) => {
    if(!inputs.image || !inputs.layout || !text) {
        alert('폼을 다 채워주세요');
        return false;
    }

    return true;
}

const PostingInputs = ({ isEdit }) => {
    const [inputs, setInputs] = useState({
        image:null,
        layout:null,
    })
    const [isImageChanged, setIsImageChanged] = useState(false);
    const imageRef = useRef(null);
    const textAreaRef = useRef(null);
    const edit_new_data = useRef({
        image_url:'',
        like:0,
        timestamp:0,
        layout:'',
        user_email:'',
        user_nickname:''
    })
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();

    const setThumbnail = (e) => {
        let files = e.target.files;
        if(files && files[0]) {
            setInputs({
                ...inputs,
                image:files[0]
            })
            let reader = new FileReader();
            let current= imageRef.current;


            reader.onload = (e) => {
                current.setAttribute('src', e.target.result);
            }
            reader.readAsDataURL(files[0]);
        }
        setIsImageChanged(true);
    }

    const btnClickHandler = async () => {
        if(!isEdit) {
            const isValid = validation(inputs, textAreaRef.current.value);
            if(!isValid) {
                return;
            }
            else {
                await dispatch(addPosting({image:inputs.image, text:textAreaRef.current.value, layout:inputs.layout})).catch(console.error);
                navigate('/');
            }
        }
        else {
            const uploaded_file = await uploadBytes(ref(storage, `images/${inputs.image.name}`), inputs.image);

            // 이미지 다운로드 url 저장하기 위해 받아옴
            const file_url = await getDownloadURL(uploaded_file.ref);
            console.log(file_url)
            const data = {
                like: edit_new_data.current.like,
                timestamp: edit_new_data.current.timestamp,
                user_email: edit_new_data.current.user_email,
                user_nickname: edit_new_data.current.user_nickname,
                text: textAreaRef.current.value,
                layout:inputs.layout,
                image_url:isImageChanged? file_url:inputs.image
            }
            await dispatch(editPosting({posting_id:params.id, new_data:data})).catch(console.error);
            navigate('/mypage');
        }
        
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
                const imageCurrent = imageRef.current;
                const textAreaCurrent = textAreaRef.current;
                const doc = await getPostingInfo(params.id);
                setInputs({image:doc.image_url, layout:doc.layout});
                imageCurrent.setAttribute('src', doc.image_url);
                textAreaCurrent.value = doc.text;
                edit_new_data.current.like = doc.like;
                edit_new_data.current.timestamp = doc.timestamp;
                edit_new_data.current.user_email = doc.user_email;
                edit_new_data.current.user_nickname = doc.user_nickname;
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
        <RadioButtonArea onChange={(e)=>setInputs({...inputs, [e.target.name]:e.target.value})} isEdit={isEdit}>
        <input type="radio" id="contactChoice1"
            name="layout" value="sero"/>
        <label for="contactChoice1">세로</label>

        <input type="radio" id="contactChoice2"
            name="layout" value="garo"/>
        <label for="contactChoice2">가로</label>

        <input type="radio" id="contactChoice3"
            name="layout" value="garo_reverse"/>
        <label for="contactChoice3">가로(역순)</label>
        </RadioButtonArea>
            <button onClick={btnClickHandler}>확인</button>
        </InputsWrapper>
    )
}

export default PostingInputs;

const InputsWrapper = styled.div`
    width:100%;
    button {
        display:block;
        margin:0 auto;
    }
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

const RadioButtonArea = styled.div`
    width:100%;
    display:${props=>props.isEdit === true?'none':'block'}
    /* height:10px; */

`