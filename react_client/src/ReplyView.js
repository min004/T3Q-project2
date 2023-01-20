import React, {Component, useEffect, useState} from "react";
import Axios from "axios";
import Table from "react-bootstrap/Table";
// import Button from "react-bootstrap/Button";
// import Update from "./Update";
// import Write from "./Write";
// import {Reply} from "./Reply";
import {COMMENT} from "./config";


/**
 * BoardList class
 */
class ReplyView extends Component {
    state = {
        replyList: [],
    };

    getList = (props) => {
        Axios.get(COMMENT.REPLYLIST + "/" + `${this.props.aid}`)
            .then((res) => {
                const data = res.data;
                this.setState({
                    replyList: data,
                });
            })
            .catch((e) => {
                console.error(e);
            });
    };
    delCom = (prop) => {
        Axios.post(COMMENT.DELETE + "/" + `${this.props.aid}`, {id: prop}
        ).then((res) => {
            window.location.reload()
        })
            .catch((e) => {
                console.error(e);
            });
    }
    Board = (
        rid,
        reply,
        uploader,
        date,
        modifiable
    ) => {
        return (
            <Table style={{width:"100%"}} >
            <tr className="reply-list-tr" key={rid}>
                <td className="replyview-name">{uploader}<div className="replyview-border-v"/></td>
                <td className="reply"><text className="replyview">{reply}</text></td>
                <td className="replyview-date" align="right">{date}</td>
                {modifiable === 'true' ?
                <td>
                <div align="center">
                <button id={rid} style={{marginLeft: '2%', background: "#ed959b", width:'20px',height:'20px', borderRadius:'99px'}} className="link-btn"
                        onClick={() => this.delCom(rid)}>x
                </button>
                </div>
                </td>
                : <div></div>
                }
            </tr>
            <tr>
            <td colSpan={4}>
                <div className="replyview-border"/>
            </td>
            </tr>
            </Table>
        )
            ;
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

        return (
            <div>
                {/* <div style={{
                    backgroundColor: '#46536B',
                    paddingTop: '7px',
                    // width: '100vh',
                    color: 'white',
                    height: '30px',
                    justifyContent: 'center',
                    borderRadius: '999px'
                }}>Comment
                </div> */}
                <Table class='replyview' align="center" position="relative" width='100%'>
                    <tbody>
                        <tr>
                            <td colSpan={3}>
                                <div className="replyview-border"/>
                            </td>
                        </tr>
                    {
                        // eslint-disable-next-line
                        Object.values(this.state.replyList).map((v) => {
                            return (

                                this.Board(
                                    v.id,
                                    v.content,
                                    v.creator,
                                    v.create_date,
                                    v.modifiable
                                )


                            );
                        })
                    }
                    </tbody>
                </Table>
                {/* <Button style={{marginLeft: '90vh'}} onClick={() => window.location.href = "/write"}>글쓰기</Button>  */}
                {/* <Button variant="secondary">수정하기</Button>
                <Button variant="danger">삭제하기</Button>
                <Button variant="info">글쓰기</Button> */}
            </div>
        );
    }
}

export default ReplyView;