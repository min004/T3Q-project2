import React, {useEffect, useState} from "react";
import './App.css';
import {Login} from "./Login";
import {Register} from "./Register";
// import {useCookies} from "react-cookie";
import {BrowserRouter, Route, Router, Routes, useNavigate} from "react-router-dom";
import axios from "axios";
import Write from "./Write";
import {ArticleView} from "./ArticleView";
import {Main} from "./Main";
import Layout from "./layout/Layout";
import {COMMENT} from "./config";


function App(props,{setUserNameIndex}) {
    const [currentForm, setCurrentForm] = useState('login');
    const [currentStatus, setCurrentStatus] = useState('logged out')
    const [currentLoc, setCurrentLoc] = useState('')
    const [name, setName] = useState(null)
    const [isLogin, setIsLogin] = useState(false)
    const toggleForm = (formName) => {
        window.location.href = formName;
        console.log(currentForm)
    }

    const loginStatus = (stat) => {
        setCurrentStatus(stat);
        console.log(stat)
    }
    
    

    const settingLogin = (n) => {
        // if (name === false){
            setIsLogin(n)
            console.log(n)
        // }
        }
    
    useEffect(() => {
        axios.get(COMMENT.REFRESH, {
            headers: {
                "Content-Type": "application/json",
            },  
        }).then((res) => {
            // console.log(res.data)
            setName(res.data)
        })
        
    }, [name]);
    const settingName = (n) => {
    if (name === null){
        setName(n)
    }
    }
    // console.log(name);
    // const [api] = useState(JSON.stringify('http://localhost:5000/api/phishing'))
    axios.defaults.withCredentials = true;
    return (
        
        <div className='App'>
        <BrowserRouter>
        <Layout name={name} isLogin={isLogin}>
            <Routes>
                <Route path="/" element={<Login settingName={settingName}/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/board" element={<Main/>}/>
                <Route path="/write" element={<Write/>}/>
                <Route path="/article" element={<ArticleView settingName={settingName}/>} />
            </Routes>
            </Layout>
        </BrowserRouter>
        </div>
    
    );
}

export default App;
