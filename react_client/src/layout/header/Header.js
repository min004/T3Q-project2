import React, {useState} from "react";
import axios from 'axios';
import {useCookies} from "react-cookie";
import { API } from "../../config";
import {Link} from 'react-router-dom';




const Header = (props) => {
  // const [name, setName] = useState(props.name)
  // console.log(name)
  const [, , removeCookie] = useCookies()
  const [isLogin, setIsLogin] = useState(props.isLogin)
  function onLogout(e) {
    e.preventDefault();

    // let data = {
    //     id: ID,
    //     pw: pass,d\
    // }

    axios.get(API.LOGOUT).then((res) => {
        // setCookie('session_key', {
        //     "session_key": res.data.session_key,
        //     "user_id": ID
        // }
        // )
    })
    removeCookie('session')
    setIsLogin(false)
    console.log(isLogin)
    // window.location.href = "/"
}

    return (
      <header className="TopBar">
        <div >
        <img className="Logo" src="t3q.png" onClick={() => window.location.href = "/board"}/>
        </div>
        {
        // isLogin === true && 
        props.name !== null ?
        <div className="Info">
          {props.name}<b>님 환영합니다!</b>
          <button className="logout-btn" onClick={onLogout}>
                        <text>로그아웃</text>
                    </button>
        </div>:
        <div className="Info">로그인이 필요합니다.</div>}
      </header>
    )
  }
  
  export default Header