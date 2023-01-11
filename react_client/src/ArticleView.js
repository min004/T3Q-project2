import React, { Component }from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";


const articleId_temp = decodeURI(window.location.href).split('http://localhost:3000/article/').reverse()[0];
const articleId = articleId_temp.split('/')[0] - 1;

const Board = ({
    id,
    title,
    content,
    registerId,
    registerDate,
}) => {
    return (
        <tbody>
        <tr align="center">
            <td width="50px">{id}</td>
            <td width="300px">{title}</td>
            <td width="50px">{registerId}</td>
            <td width="100px">{registerDate}</td>
        </tr>
        <tr>
            <td>{content}</td>
        </tr>
        </tbody>
    );
};

class ArticleView extends Component {
        state = {
            article: [],
        };
    
        getList = () => {
            axios.get("http://localhost:5000/board/list", {})
                .then((res) => {
                    const data  = res.data[articleId];
                    this.setState({
                        article: data,
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
            const { article } = this.state;
    
            return (
                <div className="article-board">
                <div>
                    <Table align="center" position="relative" width='800vmin20vw'>
                            {
                                // eslint-disable-next-line
                                Object.values(this.state.article).map((v) => {
                                    // console.log(v)
                                    return (
                                        
                                        <Board key={v.id}
                                            id={v.id}
                                            title={v.subject}
                                            registerDate={v.create_date}
                                            registerId={v.creator}
                                            content={v.content}
                                            // registerDate={v.REGISTER_DATE}
                                            // key={v.BOARD_ID}
                                        />
                                        
                                    );
                                })
                                }
                    </Table>
                    {/* <Button style={{marginLeft: '90vh'}} onClick={() => window.location.href = "/write"}>글쓰기</Button>  */}
                    {/* <Button variant="secondary">수정하기</Button>
                    <Button variant="danger">삭제하기</Button>
                    <Button variant="info">글쓰기</Button> */}
                </div>
                </div>
            );
        }
    }


export default ArticleView;