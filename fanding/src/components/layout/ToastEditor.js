import React, {Component} from 'react';
import { Editor } from '@toast-ui/react-editor';
import 'tui-color-picker/dist/tui-color-picker.css';
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import colorSyntaxPlugin from '@toast-ui/editor-plugin-color-syntax';
import hljs from "highlight.js";
import codeSyntaxHighlightPlugin from '@toast-ui/editor-plugin-code-syntax-highlight';
//chart plugin
import 'tui-chart/dist/tui-chart.css';
import chart from '@toast-ui/editor-plugin-chart';

class ToastEditor extends Component {
  editorRef = React.createRef();
    constructor(){
        super();
        this.state = {
            content : ''
        };

        this.saveArticle = this.saveArticle.bind(this);
    };

    saveArticle = e => {
      e.preventDefault();
        const content = this.editorRef.current.getInstance().getHtml();
        console.log("I am editor" + content)

        this.setState({
            content
        });

        this.props.onSubmit(this.state.content);
    };

    
    render(){
        return (
          <>
          <Editor
            previewStyle="vertical"
            height="400px"
            initialEditType="markdown"
            initialValue="hello"
            ref={this.editorRef}
            plugins= {[codeSyntaxHighlightPlugin.bind(hljs), colorSyntaxPlugin, chart]}
          />
          <button onClick={this.handleClick}>make bold</button>
       

            <div id="toastEditor">
                <h1>Toast UI Editor Example</h1>
                <div id="editSection"></div>
                <button onClick={this.saveArticle} className="btn_save">Save</button>
                <div>
                    <h2>result</h2>
                    <textarea className="tf_result" value={this.state.content} readOnly="readOnly"></textarea>
                </div>
            </div> 
            </>
        );
    };

};

export default ToastEditor;