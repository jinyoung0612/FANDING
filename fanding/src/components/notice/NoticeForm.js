import React, {Component} from 'react';
import { connect } from 'react-redux';
import { firebase_notice_save } from '../../store/actions/noticeAction';

class NoticeForm extends Component{
    state = {};
    initialSelectedNotice = {
        ntcno: '',
        ntctitle: '',
        ntcwriter: '',//이후에 사용자 닉네임 가져와서 쓰기
        ntcdate: ''
        //ntcwriterEmail: 
        //ntcwriterUid:
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSave = () => {
        this.props.dispatch(firebase_notice_save(this.state));
        this.setState(this.initialSelectedNotice);
    }

    componentWillReceiveProps(nextProps){
        this.setState(nextProps.selectedNotice);
    }

    render(){
        return(
            <div>
                <input placeholder="제목" name="ntctitle" value={this.state.ntctitle} onChange={this.handleChange}/>
                <input placeholder="작성자 닉네임" name="ntcwriter" value={this.state.ntcwriter} onChange={this.handleChange}/>
                <button onClick={this.handleSave}>Save</button>
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        selectedNotice: state.selectedNotice
    };
}

export default connect(mapStateToProps)(NoticeForm);