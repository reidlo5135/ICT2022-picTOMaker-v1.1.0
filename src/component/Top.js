import React, { Component } from 'react';
import Logo from "../image/Logo.png";
import "../css/Top.css"
import { Link } from "react-router-dom";


class Top extends Component{
    render(){
    return (
      <div className='top'>
        
        <div className='topMenu'>
        <Link to='/'>
          <img src={Logo} alt="PictoMaker-Logo" style={{width:"100px",height:"50px"}}/>
        </Link>
          <div className='GnbMenu'>
            <div>소개</div>
          <Link to ='/Select'>
            <div>시작하기</div>
          </Link>
            <div>도움말</div>
            <div>커뮤니티</div>
          </div>
        </div>
      </div>
      
    );
    }
  }

export default Top;