import React, {useState} from "react";
import axios from 'axios';
import {useCookies} from "react-cookie";
import BoardList from './BoardList';
import {NewBoardList} from './NewBoardList'
import Write from "./Write";
import Button from "react-bootstrap/esm/Button";
import {API} from "./config";


export const Main = (props) => {

    const [isWriting, setWriting] = useState(['False'])
    const [, , removeCookie] = useCookies()

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
        window.location.href = "/"
    }

    return (
        <div className="article-board">

            {isWriting === 'True' ? <div><Write>
                </Write>

                    <Button onClick={() => setWriting('False')}>취소</Button>
                    {/* <Button style={{marginLeft: '55vw'}} onClick={() => setWriting('False')}>작성완료</Button> */}

                </div>
                :
                <div>
                    <NewBoardList/>
                    {/* <button className="link-btn" onClick={onLogout}>
                        <text>로그아웃</text>
                    </button> */}
                    {/* <Button style={{marginLeft: '90vh'}} onClick={() => setWriting('True')}>글쓰기</Button> */}


                </div>
            }
        </div>
    )
}