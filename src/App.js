import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Routes,Route} from 'react-router-dom';
import MainPage from './Page/MainPage';
import SelectPage from './Page/SelectPage';
import LoginPage from './Page/LoginPage';



class App extends Component{
  
  render(){
  return (
    /*<div className='App'>
      <BrowserRouter>
        <Routes >
        <Route path = '/' element={<MainPage />}/>
        <Route path = '/Select' element={<SelectPage />}/>
        <Route path = '/Human' element={<HumanPage />}/>
        <Route path = '/Things' element={<ThingsPage />}/>    
        </Routes>
      </BrowserRouter>
    </div>*/
    <div className='App'>
      <BrowserRouter>
        <Routes >
        <Route path = '/' element={<MainPage />}/>
        <Route path = '/Select' element={<SelectPage />}/>
        <Route path = '/Login' element={<LoginPage />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
  }
}

export default App;