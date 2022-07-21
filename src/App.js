import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import GlobalStyle from './components/GlobalStyle';
import Home from './components/Home';
import Header from './components/header/Header';
import Login from './components/users/Login';
import Signup from './components/users/Signup';
import PostingInputs from './components/posting/PostingInputs';
import PersonalViewer from './components/mypage/PersonalViewer';
import styled from 'styled-components';
import IsLogin from './IsLogin';
import Loading from './components/Loading';
function App() {
  const user = useSelector(state => state.user.userInfo);
  
  return (
    <div className="App">
      <GlobalStyle />
      <Loading/>
        <Header/>
        <Contents>
          <Routes>
            <Route path='/' element={user?<Home/>:<Login/>}/>
            <Route path='/member/Signup' element={<Signup/>}/>
            <Route path='/posting' element={<PostingInputs isEdit={false}/>}/>
            <Route path='/mypage' element={<PersonalViewer/>}/>
            <Route path='/posting/edit/:id' element={<PostingInputs isEdit={true}/>}/>
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
