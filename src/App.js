import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import GlobalStyle from './components/GlobalStyle';
import Home from './components/Home';
import Header from './components/header/Header';
import Login from './components/users/Login';
import Signup from './components/users/Signup';
import PostingInputs from './components/posting/PostingInputs';
import styled from 'styled-components';
function App() {
  const user = useSelector(state => state.user.userInfo);
  const navigate = useNavigate();
  
  return (
    <div className="App">
      <GlobalStyle />
        <Header/>
        <Contents>
          <Routes>
            <Route path='/' element={user?<Home/>:<Login/>}/>
            <Route path='/member/Signup' element={<Signup/>}/>
            <Route path='/posting' element={<PostingInputs/>}/>
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
  max-width:470px;
`
