import React, {useState} from "react";
import axios from 'axios';
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";
import {API} from "./config";
// import App from "./App";

export const Login = (props) => {
    const [ID, setID] = useState('');
    const [pass, setPass] = useState('');
    // const [popup, setPopup] = useState({open: false, title: "", message: "", callback: false});
    // const navigate = useNavigate()
    const [cookies, setCookie] = useCookies(['session_key'])
    const navigate = useNavigate()
    const [isLogin, setIsLogin] = useState(false)
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    function onlogin(e) {
        e.preventDefault();

        let data = {
            id: ID,
            pw: pass,
        }
        // axios.post(API.GETNAME,
        //     JSON.stringify(data), {
        //         headers: {
        //             "Content-Type": "application/json"
        //         }
        //     })
        //     .then((res) => {
        //         alert(res)
        //     });

        const address = API.LOGIN;
        

        axios.post(address,
            JSON.stringify(data), {
                headers: {
                    "Content-Type": "application/json",
                    "Connection": "keep-alive"
                },
            })
            .then((res) => {
                console.log(res)
                if (res.status === 200) {
                    axios.post(API.GETNAME,
                        JSON.stringify(data), {
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }).then((res) => {
                            props.settingName(res.data)
                        });
                    alert("로그인 성공")
                    // props.settingLogin(true)
                    // window.location.href = "/board"
                    navigate("/board")
                }
            }).catch(function (e) {
            console.log(e)
            if (e.request.status === 401) {
                alert("입력하신 정보가 잘못되었습니다.")
            } else if (e.request.status === 400) {
                alert("아이디 혹은 암호가 빈칸입니다.")
            }
        });
    }

    return (
        <div>
            {/* <Popup open = {popup.open} setPopup = {setPopup} message = {popup.message} title = {popup.title} callback = {popup.callback}/> */}
            <div className="auth-form-container">

                {/* <img src={logo} style={{height:100}}/> */}
                <h2>Login</h2>
                <form className="login-form" onSubmit={handleSubmit}>

                    {/* <label htmlFor="email">email</label> */}
                    <input value={ID} onChange={(e) => setID(e.target.value)} type="ID" placeholder="ID" id="ID"
                           name="ID"/>
                    {/* <label htmlFor="password">password</label> */}
                    <input value={pass} onChange={(e) => setPass(e.target.value)} type="password"
                           placeholder="********"
                           id="password" name="password"/>
                    {/* <div> */}
                    {/* <button type="submit" onClick={() => props.onFormSwitch('login')}>Log In</button>  */}
                    <button type="submit" onClick={onlogin}>Log In</button>
                    {/* <button className="link-btn" onClick={() => props.onFormSwitch('register')}> */}
                    <button className="link-btn" onClick={() => window.location.href = "/register"}>
                        Register
                    </button>
                    {/* <div> */}
                </form>
            </div>
        </div>
    )
}