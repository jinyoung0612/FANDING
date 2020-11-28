import React, { Component } from "react";
import Deleting from "react-loading";

import firebase from "firebase/app";

import NewChatForm from "../newchatform/newchatform";
import "./chatlist.css";
import TossTotalChat from "./TossTotalChat";

const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

class Chatlist extends Component {
  state = {
    name: "",
    index: "",
    searchValue: "",
    chongdaeChatData: [],
    docid: this.props.chatDocid,
  };

  componentDidMount = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (!user) {
        this.props.history.push("/signin");
      } else {
        await this.getProfileData(user.uid);
      }
    });
  };
  selectIndex = async (docid) => {
    await this.props.chats.map((data, index) => {
      if (docid == data.docid) {
        this.setState({ index: index });
      }
    });
  };

  getProfileData = async (ID) => {
    await firestore
      .collection("users")
      .where("user_uid", "==", ID)
      .get()
      .then(async (snapshot) => {
        await snapshot.forEach(async (obj) => {
          const data = obj.data();

          await this.setState({
            profilePicture: data.URL,
            name: data.nickname,
          });
        });
      });
  };

  // backButtonClick = async () => {
  //   // this.setState({ showChatScreen: false, showNewChatForm: false });
  //   // await this.props.goToChatRoomClick;
  // };

  searchChat = async () => {
    const { searchValue } = this.state;

    await this.props.searchChat(searchValue.toLowerCase());
  };

  render() {
    return (
      <div>
        {this.props.isChatRoomView === false ? (
          <NewChatForm
            userEmail={this.props.userEmail}
            // backButtonClick={() => this.backButtonClick()}
            allUserData={this.props.allUserData}
            history={this.props.history}
            // funding={this.props.funding}
            // chongdaeUserData={this.props.chongdaeUserData}
            companyEmail={this.props.companyEmail}
            companyName={this.props.companyName}
            goToChatRoomClick={() => this.props.goToChatRoomClick()}
          />
        ) : (
          <TossTotalChat history={this.props.history}></TossTotalChat>
        )}
      </div>
    );
  }
}
export default Chatlist;
