import React, {useState, useEffect} from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import GlobalStyle from './components/GlobalStyle';
import Home from './components/Home';
import Header from './components/header/Header';
import Login from './components/users/Login';
import Signup from './components/users/Signup';
import PostingInputs from './components/posting/PostingInputs';
import PersonalViewer from './components/mypage/PersonalViewer';
import styled from 'styled-components';
import PrivateRoute from './components/users/PrivateRoute';
import Loading from './components/Loading';
import DetailView from './components/detail/DetailView';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './shared/firebase';
import {userActions} from './redux/module/userReducer';
function App() {
  const access = useSelector(state => state.user.userInfo);
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();

  const loginCheck = async (user) => {
    if(user) {
      setIsLogin(true);
    }
    else {
      setIsLogin(false)
    }
  }
  useEffect(()=> {
    onAuthStateChanged(auth, loginCheck);
  }, [])

  useEffect(()=> {
    if(!isLogin) {
      dispatch(userActions.setDefaultUserInfo());
    }
  }, [isLogin])
  return (
    <div className="App">
      <GlobalStyle />
      <Loading/>
        <Header/>
        <Contents>
          <Routes>
            <Route path='/' element={access?<Home/>:<Login/>}/>
            <Route path='/member/Signup' element={<Signup/>}/>
            <Route path='/posting' element={<PrivateRoute component={<PostingInputs isEdit={false}/>} authenticated={access}/>}/>
            <Route path='/mypage' element={<PrivateRoute component={<PersonalViewer/>} authenticated={access}/>}/>
            <Route path='/posting/edit/:id' element={<PrivateRoute component={<PostingInputs isEdit={true}/>} authenticated={access}/>}/>
            <Route path='/detail/:id' element={<DetailView/>}/>
          </Routes>
        </Contents>
        
    </div>
  );
}

export default App;

const Contents = styled.div`
  width:90%;
  /* background:yellow; */
  padding-top:55px;
  margin:0 auto;
  max-width:1000px;
`
