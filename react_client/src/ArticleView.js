import React, {Component, useEffect, useState} from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Update from "./Update";
// import Write from "./Write";
import {Reply} from "./Reply";
import {API, BOARD} from "./config";
import {useNavigate} from 'react-router-dom'; 


export const ArticleView = (props) => {
    let articleId_temp = new URLSearchParams(window.location.search);
    const articleId = articleId_temp.get("aid");
    const navigate = useNavigate();
    const [state, setState] = useState({article: [],});
    const [id, setId] = useState([''])
    const [title, setTitle] = useState([''])
    const [registerId, setRegisterId] = useState([''])
    const [registerDate, setRegisteDate] = useState([''])
    const [content, setContent] = useState([''])
    const [isModifiable, setModifiable] = useState(['false'])
    const [isModifyMode, setModifyMode] = useState('False')
    const [name, setName] = useState(null)
    

    useEffect(() => {
        let data = {
            aid: articleId,
        }

        axios.post(BOARD.ARTICLES, JSON.stringify(data), {
            headers: {
                "Content-Type": "application/json",
                // "Connection": "keep-alive"
            },
        })
            .then((res) => {
                const data = res.data;
                setId(data['id'])
                setTitle(data['subject'])
                setRegisterId(data['creator'])
                setContent(data['content'])
                setRegisteDate(data['create_date'])
                setModifiable(data['modifiable'])
            })
            .catch((e) => {
                // console.log(e)
                console.error(e);
            });

    }, []);

    function modeChange() {
        setModifyMode('True')
    }

    function delete_article(e) {
        e.preventDefault();
        let data = {
            aid: articleId,
        }

        const address = BOARD.DELETE+`/board/contents/${articleId}`

        axios.delete(address,
            data
        )
            .then((res) => {
                window.location.href = "/board"
            })
            .catch((e) => {
                // console.log(data)
                console.error(e);
            });


    }

    const settingName1 = (n) => {
        if (name === null){
            console.log(n)
            props.settingName(n)
        }
        }
    /**
     */
    return (
        <div className="article-board">
            {isModifyMode === 'False' ?
                // <div>False</div>
                <div>
                    <Table align="center" position="relative" width='100%'>
                        <tbody>
                        <tr align="left" border-bottom='1px' padding='10px'>
                            {/* <td width="50px">{id}</td> */}
                            {/* <td width="50px">제목</td> */}
                            <td colSpan={2} width="500px"><h2><b>{title}</b></h2></td>

                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <div style={{height: '1px', backgroundColor: '#46536B', width: '100%'}}></div>
                            </td>
                        </tr>
                        <tr align="left" border-bottom='1px' padding='10px'>
                            <td className="article-info" width="50px">작성자</td>
                            <td width="500px">{registerId}</td>
                            {/* <td width="100px">{registeDate}</td> */}
                        </tr>
                        <tr align="left" border-bottom='1px' padding='10px'>
                            <td className="article-info" width="50px">작성일</td>
                            <td width="500px">{registerDate}</td>
                            {/* <td width="100px">{registeDate}</td> */}
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <div style={{height: '1px', backgroundColor: '#46536B', width: '100%'}}></div>
                            </td>
                        </tr>
                        <tr align="left" border-bottom='1px' padding='10px'>
                            <td className="article-info" width="50px">내용</td>
                            <td className="article-content">{content}</td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <div style={{height: '2px', backgroundColor: '#46536B', width: '100%'}}></div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2} align="center">
                                <Reply aid={articleId} settingName={settingName1}/>
                            </td>
                        </tr>
                        </tbody>
                    </Table>
                    <div className="article-view-bottom">
                    {isModifiable === 'true' ?
                    <div className="article-view-bottom-l">
                    <Button style={{marginLeft: '0vh'}} onClick={modeChange}>수정하기</Button>
                    <Button className="del-btn" style={{marginLeft: '1%'}} onClick={delete_article}>삭제</Button>
                    </div>
                     : 
                     <div>
                    </div>}
                    <div className="article-view-bottom-r">
                    <Button style={{
                        marginLeft: '80%',
                        width: '30px',
                        backgroundColor: '#46536B80'
                        }} onClick={() => navigate("/board")}>≡</Button>
                    </div>
                    </div>
                </div>
                :
                <Update aid={articleId} title={title} content={content}/>
            }
        </div>
    );

}
