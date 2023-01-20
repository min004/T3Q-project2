import {Component} from "react";
import Axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import {Link, Navigate} from "react-router-dom";
import {BOARD} from "./config";

const Board = ({
                   id,
                   title,
                   registerId,
                   registerDate,
               }) => {
    return (
        <tr>
            <td>{id}</td>
            <td width={"50%"}><Link to={`/article?aid=${id}`} state={{id: id}}>{title}</Link></td>
            <td width={"20%"}>{registerId}</td>
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
        writing: null,
    };
    onWriting = () => {
        this.setState({
            writing: true,
        })
    }

    getList = () => {
        Axios.get(BOARD.GETLIST, {})
            .then((res) => {
                const data = res.data;
                this.setState({
                    boardList: data,
                });
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
        const {boardList, writing} = this.state;

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
                    {
                        // eslint-disable-next-line
                        Object.values(boardList).map((v) => {
                                

                            return (

                                <Board key={v.id}
                                       id={v.id}
                                       title={v.subject}
                                       registerId={v.creator}
                                       registerDate={v.create_date}
                                />

                            );
                        })
                    }
                    </tbody>
                </Table>
                </div>
                <div className="board-list-bottom">
                <Button style={{marginLeft: '0vh'}} onClick={this.onWriting}>글쓰기</Button>
                </div>
                {writing === true && <Navigate to="/write" replace={true} /> }
            </div>
        );
    }
}



export default BoardList;