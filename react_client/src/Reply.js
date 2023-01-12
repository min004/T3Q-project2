import React, { useState } from "react";


export const Reply = (props) => {
    const [comment, setComment] = useState('')
    

    return (
        <div>
        <Reply/>
        <input style={{width:'85%'}} value={comment} onChange={(e) => setComment(e.target.value)} type="Reply" placeholder="댓글을 달아주세요" id="Reply" name="Reply"/>
        <button style={{marginLeft:'1%'}} className="link-btn" onClick={() => window.location.href = "/register"}>댓글달기</button>
        </div>
    )
}