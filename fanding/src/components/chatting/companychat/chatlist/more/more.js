import React, { Component } from "react";

import "./more.css";

export default class more extends Component {
  render() {
    return (
      <div className="more shadow">
        <div>
          <h3>채팅방 삭제</h3>
        </div>

        <div className="mt-2">
          <div
            className="option-list"
            onClick={() => this.props.moreOptions("delete")}
          >
            삭제
          </div>

          <div
            className="option-list"
            onClick={() => this.props.moreOptions("cancel")}
          >
            취소
          </div>
        </div>
      </div>
    );
  }
}
