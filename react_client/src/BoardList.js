import { Component } from "react";
import Axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const Board = ({
    id,
    title,
    registerId,
    registerDate,
}) => {
    return (
        <tr>
            <td>{id}</td>
            <td width="60%"><Link to={`/article?aid=${id}`}>{title}</Link></td>
            <td>{registerId}</td>
            <td>{registerDate}</td>
        </tr>
    );
};

/**
 * BoardList class
 */
class BoardList extends Component {
    state = {
        boardList: [],
    };

    getList = () => {
        Axios.get("http://localhost:5000/board/list", {})
            .then((res) => {
                const data  = res.data;
                this.setState({
                    boardList: data,
                });
                console.log(data)
            })
            .catch((e) => {
                console.error(e);
            });
    };

    /**
     */
    componentDidMount() {
        this.getList();
    }

    /**
     * @return {Component} Component
     */
    render() {
        // eslint-disable-next-line
        const { boardList } = this.state;

        return (
            <div>
                <div style={{
                    backgroundColor:'#46536B',
                    paddingTop: '7px',
                    // width: '100vh',
                    color: 'white',
                    height: '30px',
                    justifyContent:'center',
                    borderRadius: '999px'
                    }}>Contents</div>
                <Table align="center" position="relative" width='100%'>
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>제목</th>
                            <th>작성자</th>
                            <th>작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            // eslint-disable-next-line
                            Object.values(this.state.boardList).map((v) => {
                                // console.log(v)
                                return (
                                    
                                    <Board key={v.id}
                                        id={v.id}
                                        title={v.subject}
                                        registerDate={v.create_date}
                                        registerId={v.creator}
                                        // registerDate={v.REGISTER_DATE}
                                        // key={v.BOARD_ID}
                                    />
                                    
                                );
                            })
                            }
                    </tbody>
                </Table>
                <Button style={{marginLeft: '90vh'}} onClick={() => window.location.href = "/write"}>글쓰기</Button> 
                {/* <Button variant="secondary">수정하기</Button>
                <Button variant="danger">삭제하기</Button>
                <Button variant="info">글쓰기</Button> */}
            </div>
        );
    }
}

export default BoardList;