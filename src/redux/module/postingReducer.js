import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db, storage } from '../../shared/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection, getDocs, query, orderBy, limit, startAfter, getDoc, where, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { fsActions } from "./fsReducer";

const initialState = {
    postings: []
}

export const fetchPosting = createAsyncThunk('posting/fetchPosting', async (_, {getState, dispatch}) => {
    const postingCollection = collection(db, 'posting');
    const fsState = getState().fs.lastVisible;
    let res;
    
    if(fsState === null) {
        res = await getDocs(query(postingCollection, orderBy('timestamp', 'desc'), limit(5)));
    }
    
    else {
        res = await getDocs(query(postingCollection, orderBy('timestamp', 'desc'), startAfter(fsState), limit(5)));
    }
    
    let snapshotDocs = res.docs[res.docs.length - 1];
    dispatch(fsActions.setLastVisible(snapshotDocs));

    let new_data = [];
    res.forEach((doc) => {
        let new_obj = {...doc.data(), docID:doc.id};
        new_data.push(new_obj);
    })

    return new_data;
})

export const personalFetchPosting = createAsyncThunk('posting/fetchPosting', async (_, {getState, dispatch}) => {
    const postingCollection = collection(db, 'posting');
    let res;
    const user_email = getState().user.userInfo.user_email;
    console.log(user_email);
    res = await(getDocs(query(postingCollection, where('user_email', '==', user_email)))) // orderBy와 where 같이 못씀..
    console.log(res);
    let new_data = [];
    res.forEach((doc)=> {
        let new_obj = {...doc.data(), docID:doc.id};
        new_data.push(new_obj);
    })
    // orderBy와 where 같이 사용 불가 >> 직접 정렬
    new_data.sort((a, b)=> b.timestamp - a.timestamp)

    console.log(new_data);

    return new_data;
})

export const addPosting = createAsyncThunk('posting/addPosting', async (information, {getState, dispatch})=> {
    const {image, text} = information;
    const uploaded_file = await uploadBytes(ref(storage, `images/${image.name}`), image);

    // 이미지 다운로드 url 저장하기 위해 받아옴
    const file_url = await getDownloadURL(uploaded_file.ref);
    // 글쓴이 정보(로그인 유저) 받아옴
    const author_info = getState().user.userInfo;
    

    // 파이어스토어에 게시글 저장
    // 저장목록
    // 이미지url, text, 좋아요 수(0), 글쓴이 이메일, 글쓴이 닉네임, 타임스탬프
    // 도큐먼트 아이디는 불러올 때 넣어서 불러옴
    const new_data = {
        image_url:file_url,
        text:text,
        like:0,
        user_email: author_info.user_email,
        user_nickname: author_info.user_nickname,
        timestamp:Number(new Date())
    }

    await addDoc(collection(db, 'posting'), new_data);

    // 초기화는 컴포넌트에서 useEffect로 처리

    

    // return new_data;
})

export const deletePosting = createAsyncThunk('posting/deletePosting', async (information) => {
    const docRef = doc(db, 'posting', information.posting_id);
    await deleteDoc(docRef);
})

export const editPosting = createAsyncThunk('posting/editPosting', async (information) => {
    const { posting_id, new_data } = information;
    const docRef = doc(db, 'posting', posting_id);
    console.log(new_data);
    await updateDoc(docRef, new_data);
})

const postingSlice = createSlice({
    name:'posting',
    initialState,
    reducers: {
        setDefaultPostings:(state)=> {
            state.postings = [];
        }
    },
    extraReducers: {
        [fetchPosting.fulfilled.type]: (state, action) => {
            state.postings = [...state.postings, ...action.payload]; // concat
        },
        [personalFetchPosting.fulfilled.type]: (state, action) => {
            state.postings = [...state.postings, ...action.payload];
        }
    }
})

const postingActions = postingSlice.actions;
export { postingActions };
export default postingSlice.reducer;