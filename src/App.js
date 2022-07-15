import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Login from './components/users/Login';
import Signup from './components/users/Signup';
import styled from 'styled-components';
function App() {
  return (
    <div className="App">
        <Header/>
        <Contents>
          <Routes>
            <Route path='/member/login' element={<Login/>}/>
            <Route path='/member/Signup' element={<Signup/>}/>
          </Routes>
        </Contents>
    </div>
  );
}

export default App;

const Contents = styled.div`
  width:90%;
  background:yellow;
  padding-top:55px;
  margin:0 auto;
  max-width:470px;
`
