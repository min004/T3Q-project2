import React, { Component, useEffect, useState }from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Update from "./Update";
import Write from "./Write";


export const ArticleView = (props) => {
const articleId_temp = decodeURI(window.location.href).split('http://localhost:3000/article?aid=').reverse()[0];
const articleId = articleId_temp.split('/')[0];

const [state, setState] = useState({article: [],});
const [id, setId] = useState([''])
const [title, setTitle] = useState([''])
const [registerId, setRegisterId] = useState([''])
const [registerDate, setRegisteDate] = useState([''])
const [content, setContent] = useState([''])
const [isModifyMode, setModifyMode] = useState('False')

useEffect(() => {
        let data = {
            aid: articleId,
        }
        console.log("hi")
        console.log(articleId)

        axios.post("http://localhost:5000/board/article",JSON.stringify(data), {
            headers: {
                "Content-Type": "application/json",
                "Connection": "keep-alive"
            },
        })
            .then((res) => {
                // const idx = res.data.find(function(item, i){
                //     if(item.id === articleId){
                //       idx = i;
                //       return i;
                //     }
                //   });
                const data  = res.data;
                // setState({
                //     article: data,
                // });
                // console.log(data)
                setId(data['id'])
                setTitle(data['subject'])
                setRegisterId(data['creator'])
                setContent(data['content'])
                setRegisteDate(data['create_date'])
            })
            .catch((e) => {
                console.log(data)
                console.error(e);
            });
    
  },[]);
  function modeChange() {
    setModifyMode('True')
  }

  function delete_article(e) {
    e.preventDefault();
    let data = {
        aid: articleId,
    }
        
    axios.post("http://localhost:5000/board/delete", 
    data
    )
        .then((res) => {
            console.log(res);
            console.log(data)
            window.location.href = "/board"
        })
        .catch((e) => {
            // console.log(data)
            console.error(e);
        });
        

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
                            <tr align="left" border-bottom='1px' padding= '10px'>
                                {/* <td width="50px">{id}</td> */}
                                <td width="50px">제목</td>
                                <td width="500px"><b>{title}</b></td>
                                
                            </tr>
                            
                            <tr align="left" border-bottom='1px' padding= '10px'>
                                <td width="50px">작성자</td>
                                <td width="500px">{registerId}</td>
                                {/* <td width="100px">{registeDate}</td> */}
                            </tr>
                            <tr align="left" border-bottom='1px' padding= '10px'>
                                <td width="50px">작성일</td>
                                <td width="500px">{registerDate}</td>
                                {/* <td width="100px">{registeDate}</td> */}
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                <div style={{height:'1px', backgroundColor:'#46536B', width:'100%'}}></div>
                                </td>
                            </tr>
                            <tr align="left" border-bottom='1px' padding= '10px'>
                                <td width="50px">내용</td>
                                <td>{content}</td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                <div style={{height:'1px', backgroundColor:'#46536B', width:'100%'}}></div>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                    <Button 
                    style={{marginLeft: '0vh'}} onClick={modeChange}>수정하기</Button>
                    <Button 
                    style={{marginLeft: '0vh'}} onClick={delete_article}>삭제</Button>
                    <Button style={{marginLeft: '80%'}} onClick={() => window.location.href = "/board"}>목록으로</Button> 
                    {/* <Button variant="secondary">수정하기</Button>
                    <Button variant="danger">삭제하기</Button>
                    <Button variant="info">글쓰기</Button> */}
                </div>
                :
                <Update title={title}/>
                }
                </div>
            );
        
}
