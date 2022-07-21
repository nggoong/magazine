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
import PrivateRoute from './components/users/PrivateRoute';
import Loading from './components/Loading';
function App() {
  const access = useSelector(state => state.user.userInfo);
  
  return (
    <div className="App">
      <GlobalStyle />
      <Loading/>
        <Header/>
        <Contents>
          <Routes>
            <Route path='/' element={access?<Home/>:<Login/>}/>
            <Route path='/member/Signup' element={<PrivateRoute component={<Signup/>} authenticated={access}/>}/>
            <Route path='/posting' element={<PrivateRoute component={<PostingInputs isEdit={false}/>} authenticated={access}/>}/>
            <Route path='/mypage' element={<PrivateRoute component={<PersonalViewer/>} authenticated={access}/>}/>
            <Route path='/posting/edit/:id' element={<PrivateRoute component={<PostingInputs isEdit={true}/>} authenticated={access}/>}/>
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
