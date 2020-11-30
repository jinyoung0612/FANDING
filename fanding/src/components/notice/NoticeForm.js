import React, {Component} from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { firebase_notice_save, firebase_notice_delete, show_snackbar } from '../../store/actions/noticeAction';

class NoticeForm extends Component{
    
    handleNoticeSave = () => {
        let data = {
            uid: this.props.auth.uid,
            email: this.props.auth.email,
            ntctitle: this.ntctitle.value,
            ntccontents: this.ntccontents.value,
            funding_id: this.props.FundingID
        }

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
    

    render(){
        const {selectedNotice, DialogOpen, auth, FundingID} = this.props;
        
        return(
            <div>
                <Dialog open={DialogOpen} onClose={this.handleClose} aria-labelledby="form-dialog-title" fullWidth>
                    <DialogTitle id="form-dialog-title">Post</DialogTitle>
                    {selectedNotice.uid===auth.uid || !selectedNotice.uid
                    ? 
                    <div>            
                        <DialogContent>
                            <TextField inputRef={(node) => this.ntctitle = node} defaultValue={selectedNotice.ntctitle} margin="dense" label="title" fullWidth autoFocus />
                            <TextField inputRef={(node) => this.ntccontents = node} defaultValue={selectedNotice.ntccontents} margin="dense" label="Contents" fullWidth multiline rowsMax="4"/>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleDialogClose} color="primary">Cancel</Button>
                            <Button onClick={this.handleNoticeSave} color="primary">Save</Button>
                            {selectedNotice.ntcno &&
                                <Button onClick={this.handleNoticeDelete} color="primary">Delete</Button>
                            }
                        </DialogActions>
                    </div>
                    :
                    <div>            
                        <DialogContent>
                            <DialogContentText>{selectedNotice.ntctitle}</DialogContentText>
                            <DialogContentText>{selectedNotice.ntccontents}</DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleDialogClose} color="primary">Close</Button>
                        </DialogActions>
                    </div>
                    }
            </Dialog>
            </div>
        )
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