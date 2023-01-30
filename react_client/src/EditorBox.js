import React, { useState, useRef } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import axios from 'axios';



function EditorBox(props) {
  const [url, setUrl] = useState('')
  const editorRef = useRef();

  const onUploadImage = async (blob, callback) => {

    const formdata = new FormData();
    console.log(formdata)
    formdata.append('file', blob);
    formdata.append("upload_preset", "uxapbg5l");
    const cloudName = 'dqf3r4cli'
    await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, formdata, { withCredentials: false })
        .then(resp => {
            console.log(resp.data.url)
            setUrl(resp.data.url)
            // console.log(url)
            callback(resp.data.url, 'image');
            return false;
        })
        .catch(e => console.log(e));

    
    
  };
  
  const onChange = () => {
    const data = editorRef.current.getInstance().getMarkdown();
    props.setContent(data);
    // console.log(data);
  };

  return (
    <div className="edit_wrap">
      {props.initVal === undefined ? 
      <Editor
      initialValue= ' '
      previewStyle="vertical"
      height="400px"
      initialEditType="wysiwyg"
      useCommandShortcut={false}
      language="ko-KR"
      ref={editorRef}
      onChange={onChange}
      plugins={[colorSyntax]}
      hooks={{
        addImageBlobHook: onUploadImage
      }}
    /> :
    <Editor
      initialValue={props.initVal}
      previewStyle="vertical"
      height="400px"
      initialEditType="wysiwyg"
      useCommandShortcut={false}
      language="ko-KR"
      ref={editorRef}
      onChange={onChange}
      plugins={[colorSyntax]}
      hooks={{
        addImageBlobHook: onUploadImage
      }}
    />
  
  }
      

    </div>
  );
  }
  
  export default EditorBox;