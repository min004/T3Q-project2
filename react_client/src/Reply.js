import React, { useState } from "react";
import axios from "axios";
import ReplyView from "./ReplyView";


export const Reply = (props) => {

    const [comment, setComment] = useState('')
    const [aid] = useState(props.aid)
    
    function onlogin(e) {
        e.preventDefault();

        let data = {
            aid: props.aid,
            
            reply: comment,
        }

        axios.post('http://localhost:5000/comment',
            JSON.stringify(data), {
                headers: {
                    "Content-Type": "application/json",
                    "Connection": "keep-alive"
                },
            })
            .then((res) => {
                const data  = res.data;
        })
    }

    return (
        <div>
        <ReplyView aid={aid}/>
        <input style={{width:'85%'}} value={comment} onChange={(e) => setComment(e.target.value)} type="Reply" placeholder="댓글을 달아주세요" id="Reply" name="Reply"/>
        <button style={{marginLeft:'1%'}} className="link-btn" onClick={() => window.location.href = "/register"}>댓글달기</button>
        </div>
    )
}