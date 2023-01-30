import React, {useState, useEffect} from "react";
import axios from "axios";
import { BOARD } from "config";
import { Paging } from "Paging";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import {Link, useNavigate} from 'react-router-dom';
import Select from "react-dropdown-select";

export const NewBoardList = (props) => {
    const [items, setItems] = useState([]) //리스트에 나타낼 아이템
    const [count, setCount] = useState(0); //아이템 총 개수
    const [currentpage, setCurrentpage] = useState(1); //현재페이지
    const [postPerPage] = useState(15); //페이지당 아이템 개수
    const navigate = useNavigate()
    const [indexOfLastPost, setIndexOfLastPost] = useState(0);
    const [indexOfFirstPost, setIndexOfFirstPost] = useState(0);
    const [currentPosts, setCurrentPosts] = useState(0);
    const [writing, setWriting] = useState(null)
    const [nowLoading, setNowLoading] = useState(false)
    const [error, setError] = useState(false)
    const [searchVal, setSearchVal] = useState('')
    const [SearchIdx, setSearchIdx] = useState('')

    //items호출
    
    const options = [
        { 
          value: 1,
          label: "제목"
        },
        {
          value:  2,
          label: "내용"
        },
        {
            value:  3,
            label: "제목+내용"
          },
          {
            value:  4,
            label: "작성자"
          }
      ];

    useEffect(() => {
        setNowLoading(true)
        async function getData() {
        await axios.get(BOARD.GETLIST, {})
        .then((res) => {
            setItems(res.data)
            setNowLoading(false)
        })
        .catch((e) => {
            setNowLoading(false)
            setError(true)
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
    // console.log(currentpage)
    };

    return (
        <>
        {error === false ? <>
        {nowLoading === false ? 
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
                                {item.subject.slice(0,25)} 
                                {item.img_url === 'true' && <text className="board-list-text">  <img style={{height:'17px', marginBottom:'-3px'}} src="photo.png"/></text>}
                                {item.answer_set.length > 0 && <text className="board-list-text"><b>  [{item.answer_set.length}]</b></text>}
                                
                                </Link></td>
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
        <div className="board-list-bottom" style={{justifyContent: 'flex-start', alignContent:'center'}}>
            <Select style={{width:'120px',
             height:'30px',
             borderRadius:'999px',
             justifyItems:'center'}} options={options} onChange={(values) => setSearchVal(values)} />
        <input value={SearchIdx} onChange={(e) => setSearchIdx(e.target.value)} placeholder="검색할 내용 입력"></input>
        </div>
        <Paging page={currentpage} count={count} setPage={setPage} />
    </div>
        : <>
        <div className="loading-and-error"><img className="now-loading" src="hourglass.png" /><p/><h2>Now Loading...</h2></div>
        </> }
        </> : <div className="loading-and-error"><h2>Error!!</h2></div>}
        </>
    )
}