import React, { useState } from "react";
import axios from "axios";
import { useNavigate} from 'react-router-dom';
import { BOARD } from "config";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import EditorBox from "EditorBox";




export const Update = (props) => {
    const [aid, setAid] = useState(props.aid);
    const [subject, setSubject] = useState(props.title);
    const [content, setContent] = useState(props.content);
    const [files, setFiles] = useState('');
    const [url, setUrl] = useState(props.imgurl)
    const [long, setLong] = useState(content.length)
    const navigate = useNavigate()
    const [isWriting, setIsWriting] = useState(false);


    const onLoadFile = (e) => {
        const file = e.target.files[0];
        console.log(file);
        setFiles(file);
    }

    const handleClick = (e) => {
        
        const formdata = new FormData();
        formdata.append('file', files);
        formdata.append("upload_preset", "uxapbg5l");
        const cloudName = 'dqf3r4cli'
        axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formdata, { withCredentials: false })
        .then(resp => {
            console.log(resp.data.url)
            setUrl(resp.data.url)
        })
        .catch(e => console.log(e))
    }

    function delUrl () {
        setUrl('')
    }

    const settingData = (n) => {
        setContent(n)
        // console.log(content)
    }

    function editing(e) {
        setIsWriting(true)
        e.preventDefault();

        let data = {
            aid:aid,
            subject: subject,
            content: content,
            imgurl: (content.includes('img src')).toString()
        }
    
    if (content !== '' & 
        subject !== '') {
            if (subject.length <= 40 & content.length <= 30000) {
                axios.put(BOARD.UPDATE, data)
                .then((res) => {
                    setIsWriting(false)
                    console.log(res);
                    navigate('/board')
                })
                .catch((e) => {
                    setIsWriting(false)
                    console.error(e);
                });
            } else {
                setIsWriting(false)
                alert('??????(40???)?????? ??????(30000???)??? ????????? ????????? ?????????????????????.')
            }
        } else {
            setIsWriting(false)
            alert('????????? ????????? ????????? ?????????.')
        }
    };

    return(
        <>
                
                    {/* <Form.Group  controlId="subject"> */}
                        {/* <Form.Label></Form.Label> */}
                        <Form.Control className="article-write" type="text" onChange={(e) => setSubject(e.target.value)} defaultValue={props.title} />
                        <EditorBox className="article-write-content" setContent={settingData} initVal={props.content}/>
                    {/* </Form.Group> */}
                    {/* <Form.Group  controlId="content"> */}
                        {/* <Form.Control className="article-write-content" as="textarea" onChange={(e) => {setContent(e.target.value); setLong(e.target.value.length)}} defaultValue={props.content} /> */}
                    {/* </Form.Group> */}
                    {/* <div><text className="reply-length">  {long}/10000</text></div>
                    <text className="register-passvar" style={{
                        color:"#46536B80",
                        marginTop:'10px'}}>??????????????? ?????? ???????????? ????????? ?????? ?????????!!</text>
                    <div className="article-view-bottom" style={{justifyContent:'center'}}>
                    <form className="article-write" style={{display:'flex'}}>
                        <input className="article-write"  type='file' id='image' accept="img/*" onChange={onLoadFile} placeholder="??????????????? ?????? ???????????? ????????? ?????? ?????????!!"/>
                        
                    </form>
                    </div>
                    
                    {url ? <div style={{alignContent:'center'}}><button className="del-btn" style={{width:'286px', marginTop:'0px'}} onClick={delUrl}>
                        ????????? ??????
                    </button>
                    <div className="img_box"><img className="img" src={url} /></div></div>: 
                    <div style={{alignContent:'center'}}>
                        <button style={{width:'286px',
                                        marginTop:'0px',
                                        backgroundColor:'#f7c18e'}} onClick={handleClick}>????????? ?????????</button>
                    </div>}
                     */}
                    <div className="article-view-bottom">
                    <button className="del-btn" onClick={() => window.location.href = "/board"}>
                        ??????
                    </button>
                    
                    {isWriting === false &&<Button variant="info" onClick={editing}>
                    ????????????
                    </Button>}
                    </div>
            </>
    )
}