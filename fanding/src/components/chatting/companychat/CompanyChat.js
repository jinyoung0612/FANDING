import React, { Component } from "react";
import firebase from "firebase/app";

import ChatList from "./chatlist/chatlist";

const auth = firebase.auth();
const firestore = firebase.firestore();

export default class CompanyChat extends Component {
  state = {
    email: null,
    chats: [],
    allUserData: [],
    isChatRoomView: false,
    companyEmail: null,
    companyName: null,
    user: [],
    blockList: [],
    chatDocid: null,
  };
  buildId = async () => {
    return [this.state.companyEmail, this.state.email].sort().join(":");
  };
  goToChatRoomClick = async () => {
    this.setState({ isChatRoomView: true });
  };
  chatExists = async () => {
    const docid = await this.buildId();
    await this.setState({ chatDocid: docid });
    console.log(this.state.chatDocid);
    const chat = await firestore.collection("chats").doc(docid).get();
    if (chat.exists) {
      await this.setState({ isChatRoomView: true });
    }
    // console.log("changed chatroomview :", this.state.isChatRoomView);
    return chat.exists;
  };
  componentDidMount = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (!user) {
        this.props.history.push("/signin");
      } else {
        try {
          await this.setState({ user: user, email: user.email });
          // await this.getAllUsersData();
          this.getCompanyData();
          await this.getInfo(user);
          await this.onlineStatusUpdate(user.email);
          await this.chatExists();
        } catch (e) {
          await this.props.history.push("/signin");
        }
      }
    });
  };
  onlineStatusUpdate = async (email) => {
    const id = await firestore
      .collection("users")
      .where("user_email", "==", email)
      .get()
      .then((snapshot) => {
        return snapshot.docs.map((ob) => ob.id)[0];
      });

    const time = setTimeout(async () => {
      try {
        if (id != "undefined") {
          await firestore.collection("users").doc(id).update({
            isonline: true,
            isverify: true,
          });
        } else {
          await this.onlineStatusUpdate();
        }
      } catch (e) {
        console.log(e);
        this.props.history.push("/signin");
      }

      clearTimeout(time);
    }, 2000);
  };

  // getBlockList = async () => {
  //   const { allUserData, email } = this.state;

  //   const list = allUserData.forEach(async (obj) => {
  //     if (obj.email === email) {
  //       // console.log(obj.blocklist);
  //       await this.setState({ blockList: obj.blocklist });
  //     }
  //   });
  // };

  getCompanyData = () => {
    firestore
      .collection("companies")
      .where("email", "==", this.props.company.company_email)
      .onSnapshot((snapshot) => {
        var email = snapshot.docs.map((docs) => docs.data().email);
        this.setState({ companyEmail: email });
        var name = snapshot.docs.map((docs) => docs.data().name);
        this.setState({ companyName: name });
      });
  };
  getInfo = async (user, emails) => {
    await firestore
      .collection("chats")
      .where("users", "array-contains", user.email)
      .onSnapshot(async (res) => {
        const chats = res.docs.map((docs) => docs.data());

        chats.sort((a, b) => {
          if (a.time < b.time) {
            return 1;
          } else if (a.time > b.time) {
            return -1;
          } else {
            return 0;
          }
        });

        var chatList = [];

        if (emails) {
          chatList = await chats.filter((chats) => {
            var getEmail =
              chats.users[0] !== user.email ? chats.users[0] : chats.users[1];

            if (emails.includes(getEmail)) {
              return chats;
            }
          });
        }

        if (!emails) {
          await this.setState({
            email: user.email,
            chats: chats,
          });
        } else {
          await this.setState({
            email: user.email,
            chats: chatList,
          });
        }
      });
  };

  searchChat = async (search) => {
    const { email, user } = this.state;

    const emails = await this.fetchSearchEmail(search, email);

    await this.getInfo(user, emails);
  };

  fetchSearchEmail = async (search, email) => {
    const emails = [];
    const { allUserData } = this.state;
    await allUserData.map((list) => {
      if (list.nickname.indexOf(search) !== -1 && list.email !== email) {
        emails.push(list.email);
      }
    });

    return emails;
  };

  render() {
    return (
      <div style={{ backgroundColor: "#F8F9FA", height: "100vh" }}>
        <div className="container-fluid  p-3">
          <ChatList
            history={this.props.history}
            chats={this.state.chats}
            userEmail={this.state.email}
            allUserData={this.state.allUserData}
            // searchChat={(search) => this.searchChat(search)}
            // chongdaeUserData={this.state.chongdaeUserData}
            companyEmail={this.state.companyEmail}
            companyName={this.state.companyName}
            isChatRoomView={this.state.isChatRoomView}
            goToChatRoomClick={() => this.goToChatRoomClick()}
            chatDocid={this.state.chatDocid}
          />
          {/* <div>
            <button onClick={this.props.handleClickBack}>뒤로가기</button>
          </div> */}
        </div>
      </div>
    );
  }
}
