import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { db, auth } from '../../shared/firebase';
import { getDocs, where, query, collection } from 'firebase/firestore';

const initialState = {
    userInfo:null
}

export const loginFB = createAsyncThunk('user/loginFB', async (information) => {
    let result;
    const { email, password } = information;
    const user = await signInWithEmailAndPassword(auth, email, password);
    console.log(user);

    const queryData = query(collection(db, 'users'), where('user_email', '==', user.user.email));
    const userDocs = await getDocs(queryData);

    userDocs.forEach((elem) => {
        result = elem.data();
        // localstorage에 result 넣기
        sessionStorage.setItem('user__login', JSON.stringify(result));
        console.log(elem.data());
    })

    return result;
})


const userSlice = createSlice({
    name:'user',
    initialState,
    reducers: {
        setUserInfo: (state, action) => {
            state.userInfo = action.payload;
        },
        setDefaultUserInfo: (state) => {
            state.userInfo = null;
        }
    },
    extraReducers: {
        [loginFB.fulfilled.type]: (state, action) => {
            console.log('loginFB fulfilled')
            state.userInfo = action.payload;
        }
    }
})

const userActions = userSlice.actions;
export { userActions };

export default userSlice.reducer;