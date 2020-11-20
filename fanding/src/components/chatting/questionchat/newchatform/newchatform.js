import React, { Component } from "react";

import firebase from "firebase/app";

import Loading from "react-loading";

import "./newchatform.css";

const firestore = firebase.firestore();

class Newchatform extends Component {
  state = {
    // email: `${this.props.chongdaeUserEmail}`,
    msg: "",
    loading: false,
    // username: `${this.props.chongdaeUserNickname}`,
    allUserData: this.props.allUserData,
    showSearchList: false,
    list: [],
    blockList: [],
  };

  componentDidMount = async () => {
    try {
      await this.getAllUsersData();
      setTimeout(() => {
        console.log("this newchatform");
      }, 500);
    } catch (e) {
      await this.getAllUsersData();
    }
  };

  getAllUsersData = async () => {
    const { allUserData } = this.props;
    if (allUserData.length === 0) {
      // this.props.history.push("/QuestionChat");
    }
  };

  goToChat = async () => {
    alert("Chat Is Already Exists");
    this.props.goToChatRoomClick();
  };

  submitNewChat = async () => {
    this.setState({ loading: true });

    // const userExists = await this.userExists();

    const { email, msg, username } = this.state;
    const { userEmail } = this.props;
    // console.log(
    //   "what email , msg, userEmail , username :",
    //   email,
    //   msg,
    //   userEmail,
    //   username
    // );
    if (
      this.props.chongdaeUserEmail &&
      msg !== userEmail &&
      this.props.chongdaeUserNickname
    ) {
      const chatExists = await this.chatExists();

      try {
        chatExists ? this.goToChat() : this.createChat(userEmail, email, msg);
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("Please Enter Valid Data");
      await this.setState({ loading: false });
    }
  };

  // blockList = async () => {
  //   const byme = await this.blockByMe();

  //   const byoponent = await this.blockByOponent();

  //   return byme || byoponent;
  // };

  // blockByMe = () => {
  //   const { email } = this.state;
  //   const { userEmail, allUserData } = this.props;
  //   let isBlocked = "";

  //   allUserData.forEach((obj) => {
  //     if (obj.email === userEmail) {
  //       isBlocked = obj.blocklist.includes(email);
  //     }
  //   });

  //   return isBlocked;
  // };

  // blockByOponent = () => {
  //   const { blockList } = this.state;
  //   const { userEmail } = this.props;

  //   let isBlocked = blockList.includes(userEmail);

  //   return isBlocked;
  // };

  createChat = async (userEmail, email, msg) => {
    const docId = await this.buildId();
    const timeStamp = Date.now();
    const time = new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      hour12: true,
      minute: "numeric",
    });
    // const isBlocked = await this.blockList();

    await firestore
      .collection("chats")
      .doc(docId)
      .set({
        docid: docId,
        time: timeStamp,
        users: [userEmail, `${this.props.chongdaeUserEmail}`],
        typing: [],
        messages: [
          {
            message: msg,
            sender: userEmail,
            time: time,
            type: "text",
          },
        ],
      });

    this.setState({ loading: false });

    await this.props.goToChatRoomClick();
  };

  buildId = async () => {
    return [this.props.chongdaeUserEmail, this.props.userEmail]
      .sort()
      .join(":");
  };

  chatExists = async () => {
    const docid = await this.buildId();

    const chat = await firestore.collection("chats").doc(docid).get();
    return chat.exists;
  };

  render() {
    return (
      <div
        className="center container-fluid p-5"
        style={{
          backgroundColor: "white",
          width: "90vw",
          borderRadius: "20px",
        }}
      >
        {this.state.loading === false ? (
          <div className="row">
            <div className="col-lg-6 col-sm-12 col-xs-12 flex2">
              <h3>문의사항을 입력해주세요</h3>
              <div className="mt-3">
                <input
                  type="text"
                  placeholder="채팅 내용을 입력하세요"
                  value={this.state.msg}
                  className="email"
                  style={{ padding: "5px" }}
                  onChange={(e) => this.setState({ msg: e.target.value })}
                  onKeyUp={(e) =>
                    e.keyCode === 13 ? this.submitNewChat() : null
                  }
                />
              </div>

              <div className="mt-3">
                <button
                  className="btn text-light ml-3"
                  style={{ backgroundColor: "#6b38d1" }}
                  onClick={() => this.submitNewChat()}
                >
                  채팅 시작
                </button>
              </div>
            </div>
          </div>
        ) : (
          <center>
            <Loading type="bars" color="black" height={100} width={100} />
            <h3>Submiting...</h3>
          </center>
        )}
      </div>
    );
  }
}
export default Newchatform;
