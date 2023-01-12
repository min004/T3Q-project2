import { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import Axios from "axios";

/**
 * Write class
 */
class Write extends Component {
   
    state = {
        isModifyMode: false,
        subject: "",
        content: "",
    };
    
    write = () => {
        
        Axios.post("http://localhost:5000/board/create", 
           {subject: this.state.subject,
            content: this.state.content
           }
        )
            .then((res) => {
                console.log(res);
                console.log(this.state)
                // console.log(this.state.content)
                window.location.href = "/board"
            })
            .catch((e) => {
                // console.log(data)
                console.error(e);
            });
            
    };
    
    update = () => {
        let data = {
            subject: this.state.subject,
            content: this.state.content,
        }
        Axios.put("http://localhost:5000/board/update", 
            JSON.stringify(data)
        )
            .then((res) => {
                console.log(res);
            })
            .catch((e) => {
                console.error(e);
            });
            
    };
    
    // eslint-disable-next-line
    handleChange = (e) => {
        this.setState({
            
            [e.target.id]: e.target.value,
            
        });
    };


    render() {
        return (
            <div className="article-board">
                <div>
                    <Form.Group className="mb-3" controlId="subject">
                        <Form.Label></Form.Label>
                        <Form.Control style={{width:'72vw'}}type="text" onChange={this.handleChange} placeholder="제목" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="content">
                        {/* <Form.Label></Form.Label> */}
                        <Form.Control style={{width:'72vw', height:'20vw', borderRadius:'20px', padding:'1rem'}}as="textarea" onChange={this.handleChange} placeholder="내용" />
                    </Form.Group>
                    {/* <Button onClick={() => props.setWriting('False')}>취소</Button> */}

                    <Button variant="info" onClick={this.state.isModifyMode ? this.write : this.write}>
                    작성완료
                    </Button>
                    <button className="link-btn" onClick={() => window.location.href = "/board"}>
                        취소
                    </button>
                </div>
            </div>
        );
    }
}

export default Write;