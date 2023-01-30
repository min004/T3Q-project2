import React, { useState } from "react";
import axios from "axios";
import { useNavigate} from 'react-router-dom';
import { BOARD } from "config";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import EditorBox from "EditorBox";

export const Write = (props) => {
    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [url, setUrl] = useState('');
    const [long, setLong] = useState(content.length);
    const navigate = useNavigate();
    const [isWriting, setIsWriting] = useState(false);


    const onLoadFile = (e) => {
        const file = e.target.files[0];
        console.log(file);
        setFiles(file);
    
    }
    axios.defaults.withCredentials = true;
    const handleClick = (e) => {
        
        const formdata = new FormData();
        formdata.append('file', files);
        formdata.append("upload_preset", "uxapbg5l");
        const cloudName = 'dqf3r4cli'
        axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, formdata, { withCredentials: false })
        .then(resp => {
            console.log(resp.data.url)
            setUrl(resp.data.url)
        })
        .catch(e => console.log(e))
        console.log(formdata);
    }

    function delUrl () {
        setUrl('')
    }

    const settingData = (n) => {
            setContent(n)
            // console.log(content)
        }

    function writing(e) {
        setIsWriting(true)
        e.preventDefault();
        
        let data = {
            subject: subject,
            content: content,
            imgurl: (content.includes('img src')).toString()
        }

        if (subject !== '') {
            if (subject.length <= 40
                 & content.length <= 30000
                 ) {
                axios.post(BOARD.WRITE, data)
                .then((res) => {
                    setIsWriting(false)
                    console.log(res);
                    console.log(data.imgurl)
                    navigate('/board')
                })
                .catch((e) => {
                    setIsWriting(false)
                    console.error(e);
                    console.log(data.imgurl)
                });
            } else {
                setIsWriting(false)
                alert('제목(40자)이나 본문(30000자)의 글자수 제한을 초과하였습니다.')
            }
        } else {
            setIsWriting(false)
            alert('제목과 내용을 입력해 주세요.')
        }
    };

    return(
        <div className="article-board">        
            <Form.Control className="article-write" type="text" onChange={(e) => setSubject(e.target.value)} placeholder="제목" />
            <EditorBox className="article-write-content" setContent={settingData}/>          
            <div className="article-view-bottom">
                <button className="del-btn" onClick={() => window.location.href = "/board"}>
                취소
                </button>
                {isWriting === false && <Button variant="info" onClick={writing}>
                작성완료
                </Button>}
            </div>
        </div>
    )
}
