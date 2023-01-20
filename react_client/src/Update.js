import {Component, useEffect, useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import Axios from "axios";
import { BOARD } from "./config";


class Update extends Component {

    state = {
        aid: this.props.aid,
        subject: this.props.title,
        content: this.props.content,
    }
    update = () => {
        if (this.state.content !== '' &
        this.state.subject !== '') {
            if (this.state.subject.length < 30 & this.state.content.length < 3000) {
        Axios.put(BOARD.UPDATE,
            this.state
        ).then(() => {
            window.location.reload()
        }).catch((e) => {
            console.error(e);
        });}
        else {
            alert('제목(30자)이나 본문(3000자)의 글자수 제한을 초과하였습니다.')
        }
    } else {
        alert('제목과 내용을 입력해 주세요.')
    }
        
    };

    // eslint-disable-next-line
    handleChange = (e) => {
        this.setState({

            [e.target.id]: e.target.value,

        });
    };


    render() {
        return (
            <div>
                <Form.Group className="mb-3" controlId="subject">
                    <Form.Control style={{width: '72vw'}} type="text" onChange={this.handleChange}
                                  defaultValue={this.props.title}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="content">
                    <Form.Control style={{width: '72vw', height: '30vw', borderRadius: '20px', padding: '1rem'}}
                                  as="textarea" onChange={this.handleChange} defaultValue={this.props.content}/>
                </Form.Group>
                <div className="article-view-bottom">
                <button className="del-btn" onClick={() => window.location.reload()}>
                    취소
                </button>
                <Button variant="info" onClick={this.update}>
                    수정완료
                </Button>
                </div>
            </div>
        );
    }
}

export default Update;
