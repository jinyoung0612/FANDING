import React, { Component } from 'react';
import { connect } from 'react-redux';

import NoticeItem from './NoticeItem';

import {firebase_notice_list} from '../../store/actions/noticeAction';

class NoticeList extends Component {
    componentDidMount() {
        this.props.dispatch(firebase_notice_list());
    }
    render() {
        const { notices } = this.props;

        return (
                <table border="1">
                    <tbody>
                    <tr align="center">
                        <td width="50">No.</td>
                        <td width="300">Title</td>
                        <td width="100">Name</td>
                        <td width="100">Date </td>
                    </tr>
                    {
                        notices.map((row, inx) => 
                            (<NoticeItem key={inx} inx={inx+1} row={row} />)
                        )
                    }
                    </tbody>
                </table>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        notices: state.notices,
        selectedNotice: state.selectedNotice
    };
}

export default connect(mapStateToProps)(NoticeList);