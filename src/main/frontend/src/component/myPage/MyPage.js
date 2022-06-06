import React,{useState,useEffect} from 'react';
import Logo from "../../image/Logo.png";
import "../../css/MyPage.css";
import "../../css/font.css";
import {Link} from "react-router-dom";
import MyPic from './MyPage-Mypic';
import MyPageProfile from './MyPage-profile';
import GetProfile from "../user/GetProfile";
import {useHistory} from "react-router";

export default function MyPageContent(){
    const [mode, setMode] = useState('profile');
    const history = useHistory();

    function confirmMode(Paramode) {
        setMode(Paramode);
    }

    useEffect(()=> {
        console.log('mode : ', mode);
    },[mode]);

    function conditionRender(conditionMode) {
        if (conditionMode === "profile") {
            return <MyPageProfile/>
        } else if (conditionMode === "mypic") {
            return <MyPic/>
        } else if (conditionMode === "sharepic") {
            return <h1>SharePic</h1>
        }
    }

    function Logout() {
        try {
            console.clear();
            localStorage.clear();
            alert('성공적으로 로그아웃 되었습니다!!');
            history.push("/");
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className='MyPage-Content'>
            <div className='MyPage-Left'>
                <Link to="/">
                    <div className='MyPage-Logo'>
                        <img src={Logo} alt="Logo" style={{width:"40%",height:"40%"}}/>
                    </div>
                </Link>
                <GetProfile />
                <div className='MyPage-Menu'>
                    <p onClick={()=> {
                        confirmMode("profile")
                    }}>내 프로필</p>

                    <p onClick={()=> {
                        confirmMode("mypic")
                    }}>My 픽토그램</p>

                    <p onClick={()=> {
                        confirmMode("sharepic")
                    }}>공유한 픽토그램</p>
                    <Link to="/qna" className='qna-link'>
                        <p>문의하기</p>
                    </Link>
                    <p>회원탈퇴</p>
                </div>

                <div className='MyPage-footer'>
                    <span onClick={Logout}>로그아웃</span>
                    <span>|</span>
                    <span>개인정보처리방침</span>
                    <span>|</span>
                    <span>이용약관</span>
                    <p className='Copyright'>Copyright 2022. PICTO*MAKER all rights reserved</p>
                </div>
            </div>
            {conditionRender(mode)}
        </div>
    );
}