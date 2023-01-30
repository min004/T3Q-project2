import React from 'react';
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';

function ContentsViewer({ props }) {
  return <Viewer initialValue={props.contents || ''} />;
}

export default ContentsViewer;