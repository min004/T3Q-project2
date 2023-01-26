import React, {Component, useEffect, useState} from "react";
import Axios from "axios";
import Table from "react-bootstrap/Table";
import {COMMENT} from "./config";


/**
 * BoardList class
 */
class ReplyView extends Component {
    state = {
        replyList: [],
    };
// 댓글 목록 조회 //
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
////////////////////////


// 댓글 삭제 //
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
            </div>
        );
    }
}

export default ReplyView;