import { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import Axios from "axios";
import { BOARD } from "./config";
import {Navigate} from "react-router-dom"

/**
 * Write class
 */
class Write extends Component {
   
    state = {
        // isModifyMode: false,
        subject: "",
        content: "",
        // cancel: null,
        done: null,
    };
//     let today = new Date();
// document.write(today)
    onCancel = () => {
        // this.setState({
        //     cancel: true
        // })
        window.location.href = "/board"
    }

    write = () => {
        
        if (this.state.content !== '' &
        this.state.subject !== '') {
            if (this.state.subject.length < 30 & this.state.content.length < 3000) {
        Axios.post(BOARD.WRITE, 
           {subject: this.state.subject,
            content: this.state.content
           }
        )
            .then((res) => {
                console.log(res);
                console.log(this.state)
                this.setState({done: true})
            })
            .catch((e) => {
                console.error(e);
            });}
            else {
                alert('제목(30자)이나 본문(3000자)의 글자수 제한을 초과하였습니다.')
            }
        } else {
            alert('제목과 내용을 입력해 주세요.')
        }
    };
    
    update = () => {
        if (this.state.content !== '' &
        this.state.subject !== '') {
        let data = {
            subject: this.state.subject,
            content: this.state.content,
        }
        Axios.put(BOARD.UPDATE, 
            JSON.stringify(data)
        )
            .then((res) => {
                console.log(res);
            })
            .catch((e) => {
                console.error(e);
            });
        } else {
            alert('제목과 내용을 입력해 주세요.')
        }    
    };
    
    handleChange = (e) => {
        this.setState({
            
            [e.target.id]: e.target.value,
            
        });
    };


    render() {
        const {done} = this.state;
        return (
            <div className="article-board">
                <div>
                    <Form.Group className="mb-3" controlId="subject">
                        <Form.Label></Form.Label>
                        <Form.Control style={{width:'72vw'}}type="text" onChange={this.handleChange} placeholder="제목" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="content">
                        <Form.Control style={{width:'72vw', height:'30vw', borderRadius:'20px', padding:'1rem'}}as="textarea" onChange={this.handleChange} placeholder="내용" />
                    </Form.Group>
                    <div className="article-view-bottom">
                    <button className="del-btn" onClick={() => window.location.href = "/board"}>
                        취소
                    </button>
                    
                    <Button variant="info" onClick={this.state.isModifyMode ? this.write : this.write}>
                    작성완료
                    </Button>
                    {done === true && <Navigate to="/board" replace={true} />}
                    </div>
                    
                    
                </div>
            </div>
        );
    }
}

export default Write;