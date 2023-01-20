import React, {useEffect, useState} from "react";
import axios from "axios";
import ReplyView from "./ReplyView";
import {API, COMMENT} from "./config";
import {useNavigate} from 'react-router-dom';

export const Reply = (props) => {

    const [comment, setComment] = useState('')
    const [aid] = useState(props.aid)
    const [name, setName] = useState('')
    const [count, setCount] = useState('')
    const [long, setLong] = useState(comment.length)
    useEffect(() => {
        axios.get(COMMENT.COUNT+`/${aid}`)
        .then((res) => {
            const data = res.data;
            setCount(data)
            // console.log(count)
        }).catch((e) => {
            console.error(e);
        });
    },[count])


    function write() {

        let data = {
            reply: comment,
        }

        if (data.reply !== ''){
            if (long <= 150) {
        axios.post(COMMENT.CREATE + "/" + `${aid}`,
            data, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((res) => {
                
                axios.get(COMMENT.REFRESH, {
                    headers: {
                        "Content-Type": "application/json",
                    },  
                }).then((res) => {
                    
                    console.log(res.data)
                    props.settingName(res.data)
                    window.location.reload()
                })
            }) } else {
                alert('댓글은 150자 이내로 작성해 주세요.')
            }
        } else {
            alert('댓글 내용을 입력해 주세요.')
        }
    }

    const onKeyPress = (e) => {

        if(e.key == 'Enter') {
       
          write();
       
        }
       
    }


    return (
        <div>
            {count === 0 ? <div className="reply-count">댓글이 없습니다ㅠㅠ</div>
            : <div className="reply-count"><b>{count}개의 댓글이 있습니다.</b></div>}
            <ReplyView aid={aid}/>
            <input style={{width: '80%'}} value={comment} onChange={(e) => 
            {setComment(e.target.value); setLong(e.target.value.length);}} type="Reply"
                   placeholder="댓글을 달아주세요" onKeyDown={(e)=> onKeyPress(e)} id="Reply" name="Reply"/>
                <text className="reply-length">  {long}/150</text>
            <button style={{marginLeft: '1vw'}} className="link-btn"
                    onClick={() => write()}>댓글달기
            </button>
        </div>
    )
}