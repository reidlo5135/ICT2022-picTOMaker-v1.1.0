import React, {Component, useEffect, useState} from 'react';
import './App.css';
import {BrowserRouter, Route, Link, useHistory, Switch} from 'react-router-dom';
import MainPage from './Page/MainPage';
import SelectPage from './Page/SelectPage';
import LoginPage from './Page/LoginPage';
import SignUpPage from './Page/SignUpPage';
import MyPage from './component/MyPage-Content';
import axios from "axios";

class App extends Component{

    constructor(props) {
        super(props);
        this.state = {
            message: ""
        }
    }

    componentDidMount() {
        const history = useHistory();
        const url = 'http://localhost:8080/oauth2/login';
        let data = {
            email,
            nickname,
            profile_image_url
        }
        axios.get(url, JSON.stringify(data), {
            headers: {
                "Content-Type": `application/json`,
            },
        })
            .then((res) => {
                console.log(res);
                history.replace("/");
            });
    }

    render(){
        return (
            <div className='App'>
                <BrowserRouter>
                    <Switch>
                        <Route path = '/' element={<MainPage />}/>
                        <Route path = '/Login' element={<LoginPage />}/>
                        <Route path = '/Select' element={<SelectPage />}/>
                        <Route path = '/SignUp' element={<SignUpPage />}/>
                        <Route path = '/MyPage' element={<MyPage />}/>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;