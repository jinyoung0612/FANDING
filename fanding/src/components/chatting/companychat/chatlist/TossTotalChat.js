import React, { Component } from "react";
import PropTypes from "prop-types";

class TossTotalChat extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.history.push("/TotalChat");
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {}

  shouldComponentUpdate(nextProps, nextState) {}

  componentWillUpdate(nextProps, nextState) {}

  componentDidUpdate(prevProps, prevState) {}

  componentWillUnmount() {}

  render() {
    return <div></div>;
  }
}

TossTotalChat.propTypes = {};

export default TossTotalChat;
