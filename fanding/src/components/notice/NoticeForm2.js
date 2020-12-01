import React, {Component} from 'react';
import { connect } from 'react-redux';

import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
//toast-ui
import { Editor, Viewer } from '@toast-ui/react-editor';
import 'tui-color-picker/dist/tui-color-picker.css';
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import colorSyntaxPlugin from '@toast-ui/editor-plugin-color-syntax';
import hljs from "highlight.js";
import codeSyntaxHighlightPlugin from '@toast-ui/editor-plugin-code-syntax-highlight';
//chart plugin
import 'tui-chart/dist/tui-chart.css';
import chart from '@toast-ui/editor-plugin-chart';

import { firebase_notice_save, firebase_notice_delete, show_snackbar } from '../../store/actions/noticeAction';
//material-ui
import {Dialog,DialogTitle,DialogContent,makeStyles,
    Toolbar, AppBar, Typography, IconButton, Divider} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';


class NoticeForm extends Component{

    constructor(props){
        super(props);
        this.state = {
            uid: this.props.auth.uid,
            email: this.props.auth.email,
            type: this.props.qualification,
            funding_id: this.props.FundingID,
            ntctitle: '',
            ntccontents: '',
        };
        this.handleNoticeSave.bind(this);
    }

    handleChangeValue = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        });
        console.log("in NoticeForm2 this.state: ", this.state);
    }

    handleChangeEditor = (e) => {
        console.log("this.editorRef: ", this.editorRef);
        const content = this.editorRef.current.getInstance().getHtml();
        console.log("Notice editor:" + content);

        this.setState({
            ntccontents: content
        });
    }

    handleNoticeSave = () => {
        let data = this.state;

        if(this.props.selectedNotice.ntcno){
            data.ntcno = this.props.selectedNotice.ntcno;
            data.ntcdate = this.props.selectedNotice.ntcdate;
        }

        this.props.dispatch(firebase_notice_save(data));
        this.props.handleDialogClose();
        this.props.dispatch(show_snackbar({ message: 'Saved your input.', snackbarOpen: true }) );        
    }

    handleNoticeDelete = () => {
        firebase_notice_delete(this.props.selectedNotice.ntcno);
        this.props.handleDialogClose();
        this.props.dispatch(show_snackbar({ message: 'Delete selected post.', snackbarOpen: true }) );
    }      
    
    handleDialogClose = () => {
        this.props.handleDialogClose();
    };  

    editorRef = React.createRef();
    viewerRef = React.createRef();

    render(){
        const {selectedNotice, DialogOpen, auth, FundingID, qualification} = this.props;
        
        return(
            <div>
                <Dialog fullScreen open={DialogOpen} onClose={this.handleClose} aria-labelledby="form-dialog-title" fullWidth>
                
                {selectedNotice.uid===auth.uid || !selectedNotice.uid
                ?
                <div>
                <AppBar  >
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={this.handleDialogClose}><CloseIcon/></IconButton>
                        <Typography variant="h6" >공지사항 작성 및 수정</Typography>
                    </Toolbar>
                </AppBar>
                <br/>
                <DialogContent>
                    <Form className="mt-5">
                        <FormGroup>
                            <Label for="ntcTitle"><strong>제목</strong></Label>
                            <Input type="text" name="ntctitle" 
                            id = "ntctitle"
                            defaultValue={selectedNotice.ntctitle}
                            onChange={this.handleChangeValue}></Input>
                        </FormGroup>
                            <br/>
                        <FormGroup>
                            <Label for="detailText"><strong>세부 내용</strong></Label>
                            <Editor
                            previewStyle="vertical"
                            height="400px"
                            initialEditType="wysiwyg"
                            initialValue={selectedNotice.ntccontents}
                            ref={this.editorRef}
                            plugins= {[codeSyntaxHighlightPlugin.bind(hljs),colorSyntaxPlugin, chart]}
                            onChange = {this.handleChangeEditor}
                            />

                            
                        </FormGroup>

                    </Form>
                    
                    <Button onClick={this.handleNoticeSave} color="warning" size="sm"  style={{marginTop:"50px"}}>저장하기</Button>
                            {selectedNotice.ntcno &&
                                <Button onClick={this.handleNoticeDelete} color="warning" size="sm" style={{marginTop:"50px"}}> 삭제 </Button>
                            }
                    <Button onClick={this.handleDialogClose} 
                            color="warning" size="sm"  style={{marginTop:"50px"}}>나가기</Button>
                </DialogContent>
                </div>
                :
                <div>
                <AppBar color="secondary">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={this.handleDialogClose}><CloseIcon/></IconButton>
                        <Typography variant="h6" >공지사항</Typography>
                    </Toolbar>
                </AppBar>
                <br/>
                <DialogContent>
                    <Form className="mt-5">
                        <FormGroup>
                            <Typography variant="h5">{selectedNotice.ntctitle}</Typography>
                            <br/>
                            <Divider/>
                            <Viewer
                            previewStyle="vertical"
                            height="400px"
                            initialEditType="wysiwyg"
                            initialValue={selectedNotice.ntccontents}
                            ref={this.viewerRef}
                            />

                            <Button onClick={this.handleDialogClose} 
                            color="warning" size="sm" block style={{marginTop:"50px"}}>나가기</Button>
                            
                        </FormGroup>
                    </Form>
                </DialogContent>    
                </div>
                }

                </Dialog>
            </div>


        );
    }     
}

let mapStateToProps = (state) => {
    
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError,
        selectedNotice: state.notice.selectedNotice
    };
}

export default connect(mapStateToProps)(NoticeForm);