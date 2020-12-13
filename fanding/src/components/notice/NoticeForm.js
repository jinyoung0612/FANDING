import React, {Component, useEffect} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import dateFormat from 'dateformat';
import axios from 'axios';
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
import { loadParticipants } from '../../store/actions/userActions';

//material-ui
import {Dialog,DialogContent,
    Toolbar, AppBar, Typography, IconButton, Divider, withStyles, DialogActions} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';



const styles = theme => ({
    appBar: {
        position: 'relative',
    },
    tooltitle: {
        marginLeft: theme.spacing(1),
        flex: 2,
    },
    button: {
        marginTop: theme.spacing(2),
    },
    date: {
        float: "right",
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    }
})

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

    componentDidMount(){
        this.props.dispatch(loadParticipants(this.props.FundingID));
    }

    handleChangeValue = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        });
        console.log("in NoticeForm this.state: ", this.state);
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

        if(this.props.selectedNotice.ntcno!==''){
            data.ntcno = this.props.selectedNotice.ntcno;
            data.ntcdate = this.props.selectedNotice.ntcdate;
        }

        this.props.dispatch(firebase_notice_save(data));
    
        const array = [];
        const participants = this.props.user_data;
        participants.map((participant) => 
            array.push({
                email: participant.email
            })
        )
      
        if(array !== null){
            axios.post('/api/sendEmail',{
                user_data : array,
                funding_title: this.props.fundingTitle,
            })
            .then(res => {
                alert('저장되었습니다.');
                this.props.handleDialogClose();
                this.props.dispatch(show_snackbar({ message: 'Saved your input.', snackbarOpen: true }) );        
            })
        }
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
        const {selectedNotice, DialogOpen, auth, classes} = this.props;

        return(
            <div> 
                {selectedNotice.uid===auth.uid || !selectedNotice.uid
                ?
                <div>
                <Dialog fullScreen open={DialogOpen} onClose={this.handleClose} aria-labelledby="form-dialog-title" fullWidth>
                <AppBar className={classes.appBar} color="white">
                    <Toolbar>
                        <Typography variant="h6" className={classes.tooltitle}>공지사항 작성 및 수정</Typography>
                        <IconButton edge="start" color="inherit" onClick={this.handleDialogClose}><CloseIcon/></IconButton>
                    </Toolbar>
                </AppBar>
                <br/>
                <DialogContent>
                    <Form className="mt-5">
                        <FormGroup>
                            <Label for="ntcTitle"><strong>제목</strong></Label>
                            <h6>공지사항 수정 시, 원 제목 옆에 '(수정)'을 붙여주세요!</h6>
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
                    
                    <DialogActions>
                    <h6>공지사항 저장 및 수정 시 참여자들에게 메일이 전송됩니다. 신중한 작성 부탁드립니다.</h6>
                    <Button onClick={this.handleDialogClose} 
                            color="warning" size="sm"  className={classes.button}>취소</Button>
                    {selectedNotice.ntcno &&
                                <Button className={classes.button} onClick={this.handleNoticeDelete} color="warning" size="sm" > 삭제 </Button>
                    }
                    {selectedNotice.ntcno 
                    ?
                        <Button className={classes.button} color="warning" size="sm" onClick={this.handleNoticeSave}>수정</Button>
                    :
                    <Button className={classes.button} color="warning" size="sm"
                    onClick={this.handleNoticeSave} >저장</Button>
                    }
                    </DialogActions>
                </DialogContent>
                </Dialog>
                </div>
                :
                <div>
                <Dialog open={DialogOpen} onClose={this.handleClose} aria-labelledby="form-dialog-title" fullWidth>
                <AppBar className={classes.appBar} color="white">
                    <Toolbar>
                        <Typography variant="h6" className={classes.tooltitle}>공지사항</Typography>
                        <IconButton  edge="start" color="inherit" onClick={this.handleDialogClose}><CloseIcon/></IconButton>
                    </Toolbar>
                </AppBar>
                <br/>
                <DialogContent>
                    <Form className="mt-5">
                        <FormGroup>
                            <Typography variant="h5" label="noticeTitle">{selectedNotice.ntctitle}</Typography>
                            <Typography variant="title" label="writedate" className={classes.date}>
                                {dateFormat(selectedNotice.ntcdate, "yyyy.mm.dd mm:ss")} / {selectedNotice.ntcwriter}
                            </Typography>
                            <br/>
                            <Divider/>
                            <Viewer
                            previewStyle="vertical"
                            height="400px"
                            initialEditType="wysiwyg"
                            initialValue={selectedNotice.ntccontents}
                            ref={this.viewerRef}
                            />

                            <DialogActions>
                            <Button onClick={this.handleDialogClose} 
                            color="warning" size="sm" style={{marginTop:"50px"}}>나가기</Button>
                            </DialogActions>
                        </FormGroup>
                    </Form>
                </DialogContent>    
                </Dialog>
                </div>
                }
            </div>


        );
    }     
}

NoticeForm.propTypes = {
    classes: PropTypes.object.isRequired,
}

let mapStateToProps = (state) => {
    
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError,
        selectedNotice: state.notice.selectedNotice,
        user_data: state.auth.participants,
    };
}

export default connect(mapStateToProps)(withStyles(styles)(NoticeForm));