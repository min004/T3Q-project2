import React, {useState, useEffect} from "react";
import axios from "axios";
import { BOARD } from "config";
import { Paging } from "Paging";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import {Link, useNavigate} from 'react-router-dom';

export const NewBoardList = (props) => {
    const [items, setItems] = useState([]) //리스트에 나타낼 아이템
    const [count, setCount] = useState(0); //아이템 총 개수
    const [currentpage, setCurrentpage] = useState(1); //현재페이지
    const [postPerPage] = useState(10); //페이지당 아이템 개수
    const navigate = useNavigate()
    const [indexOfLastPost, setIndexOfLastPost] = useState(0);
    const [indexOfFirstPost, setIndexOfFirstPost] = useState(0);
    const [currentPosts, setCurrentPosts] = useState(0);
    const [writing, setWriting] = useState(null)

    //items호출
    
    

    useEffect(() => {
        async function getData() {
        await axios.get(BOARD.GETLIST, {})
        .then((res) => {
            setItems(res.data)
        })
        .catch((e) => {
            console.error(e);
        });
        }
        getData();
    }, [
        
        // currentpage, indexOfFirstPost, indexOfLastPost, items, postPerPage
        // 위의 값들이 조금이라도 바뀔 때마다 무한히 반복적으로 게시글 전체 목록을 불러와 서버에 부담 
    ]);

    useEffect(() => {
        setCount(items.length);
        setIndexOfLastPost(currentpage * postPerPage);
        setIndexOfFirstPost(indexOfLastPost - postPerPage);
        setCurrentPosts(items.slice(indexOfFirstPost, indexOfLastPost));
    },[currentpage,indexOfFirstPost, indexOfLastPost, items, postPerPage])

    const setPage = (e) => {
    setCurrentpage(e);
    console.log(currentpage)
    };

    return (
        <div className="board-BG">
        <div className="board-title"><b>Q&A</b></div>
        <div>
        <Table className="board-list">
            <thead>
            <tr>
                <th colSpan={4}>
                <div style={{
            backgroundColor: '#46536B',
            height: '2px',
            justifyContent: 'center',
                }}>
                </div>
                </th>
            </tr>
            <tr>
                <th>번호</th>
                <th>제목</th>
                <th>작성자</th>
                <th>작성일</th>
            </tr>
            <tr>
                <th colSpan={4}>
                <div style={{
            backgroundColor: '#46536B',
            height: '1px',
            justifyContent: 'center',
                }}>
                </div>
                </th>
            </tr>
            </thead>
            <tbody>
            {currentPosts && items.length > 0 ? (
                currentPosts.map((item) => (
                        <tr>
                            <td>{item.id}</td>
                            <td width={"50%"}><Link to={`/article?aid=${item.id}`} state={{id: item.id}}>
                                {item.subject.slice(0,25)} [{item.answer_set.length}]</Link></td>
                            <td width={"20%"}>{item.creator}</td>
                            <td>{item.create_date}</td>
                        </tr>
                ))
            ):
            <tr><td colSpan={4}>게시물이 없습니다 ㅠㅠ</td></tr>
            }
            </tbody>
        </Table>
        </div>
        <div className="board-list-bottom">
        <button style={{marginLeft: '0vh'}} onClick={() => window.location.href = '/write'}>글쓰기</button>
        
        </div>
        <Paging page={currentpage} count={count} setPage={setPage} />
    </div>
    )
}