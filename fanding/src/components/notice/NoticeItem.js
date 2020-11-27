import React from 'react';
import { connect } from 'react-redux';

import { notice_read, firebase_notice_remove } from '../../store/actions/noticeAction';

const NoticeItem = ({row, index, notice_read, firebase_notice_remove}) => (
    <tr>
        <td>{index}</td>
        <td><a onClick={() => { notice_read(row.ntcno) } }>{row.ntctitle}</a></td>
        <td>{row.ntcwriter}</td>
        <td>{row.ntcdate}</td>
        <td><a onClick={() => { firebase_notice_remove(row.ntcno) }}>X</a></td>
    </tr>
);

const mapDispatchToProps = dispatch => ({
  notice_read: ntcno => dispatch(notice_read(ntcno)),
  firebase_notice_remove: ntcno => dispatch(firebase_notice_remove(ntcno))
})

export default connect(null, mapDispatchToProps)(NoticeItem)