import React, { Component } from "react";
import Deleting from "react-loading";
import { Container } from "reactstrap";
import firebase from "firebase/app";
import { BsBellFill } from "react-icons/bs";

import Room from "../totalchat/chatroom/chatroom";
import NewChatForm from "../totalchat/newchatform/newchatform";
import More from "./more/more";
import userLogo from "./img/userImg3.png";
import myuserLogo from "./img/myuserImg.png";
import "./chatlist.css";

const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

export default class chatlist extends Component {
  state = {
    profilePicture: "",
    showChatScreen: false,
    name: "",
    index: "",
    showNewChatForm: false,
    searchValue: "",
    longPress: false,
    showMoreOptions: false,
    docid: "",
    delMsgIndex: "",
    deleting: false,
  };

  componentDidMount = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (!user) {
        this.props.history.push("/signin");
      } else {
        await this.getProfileData(user.uid);
        console.log("totalchat chatlist");
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

  selectChat = async (chat, index) => {
    const { longPress } = this.state;
    // const { chat } = this.state;
    if (!longPress) {
      await this.setState({ index: index, showChatScreen: true });
    }
    // console.log("chatsdocid", chat.docid);
    if (auth.currentUser.email == chat.receiver) {
      firestore.collection("chats").doc(chat.docid).update({
        readmsg: true,
      });
    }
  };
  // onlineStatusUpdate = async (email) => {
  //   const id = await firestore
  //     .collection("users")
  //     .where("user_email", "==", email)
  //     .get()
  //     .then((snapshot) => {
  //       return snapshot.docs.map((ob) => ob.id)[0];
  //     });

  //   await firestore.collection("users").doc(id).update({
  //     isonline: false,
  //   });
  // };

  // backButtonClick = async () => {
  //   this.setState({ showChatScreen: false, showNewChatForm: false });

  //   await this.props.searchChat("");
  // };

  searchChat = async () => {
    const { searchValue } = this.state;

    await this.props.searchChat(searchValue.toLowerCase());
  };

  touchStart = async (chat, index) => {
    this.buttonPressTimer = setTimeout(async () => {
      await this.setState({
        longPress: true,
        showMoreOptions: true,
        docid: chat.docid,
        delMsgIndex: index,
      });
    }, 1000);
  };

  touchEnd = async () => {
    clearTimeout(this.buttonPressTimer);
    var timer = setTimeout(async () => {
      await this.setState({ longPress: false });
    }, 400);
  };

  moreOptions = async (type) => {
    const { docid, delMsgIndex } = this.state;
    const tempData = this.props.chats[delMsgIndex].messages;

    switch (type) {
      case "delete":
        const confirm = window.confirm("Are You Sure To Delete?");

        if (confirm) {
          await this.setState({ deleting: true, showMoreOptions: false });
          await tempData.map(async (obj) => {
            if (obj.type === "img") {
              await storage.ref(`chats/${docid}/${obj.imgnm}`).delete();
            }
          });

          await firestore.collection("chats").doc(docid).delete();
        }

        await this.setState({ docid: "", deleting: false });
        break;

      case "cancel":
        await this.setState({ showMoreOptions: false });
        break;
    }
  };

  render() {
    return (
      <section class="gallery5 mbr-gallery cid-sgtDmxvlJH" id="gallery5-q">
        <Container>
          <div>
            <div>
              {this.state.showNewChatForm === false ? (
                <div>
                  {this.state.showChatScreen === false ? (
                    <div>
                      {this.props.chats.length > 0 ? (
                        <div className="overflow">
                          {this.props.chats.map((chat, index) => (
                            <div
                              className=" text-light p-2 mt-2 pointer"
                              style={{
                                // backgroundColor: "#6119DA",
                                backgroundColor: "#6b34c9",
                                borderRadius: "20px",
                              }}
                              onClick={() => this.selectChat(chat, index)}
                              onTouchStart={() => this.touchStart(chat, index)}
                              onTouchEnd={() => this.touchEnd()}
                              onMouseDown={() => this.touchStart(chat, index)}
                              onMouseUp={() => this.touchEnd()}
                              onMouseLeave={() => this.touchEnd()}
                              key={index}
                            >
                              <div className="chat-list">
                                <img
                                  className="chat-list-img mr-3"
                                  // src={this.props.allUserData
                                  //   .map((list) => {
                                  //     if (
                                  //       list.email ===
                                  //       (chat.users[0] !== this.props.userEmail
                                  //         ? chat.users[0]
                                  //         : chat.users[1])
                                  //     ) {
                                  //       return list.URL;
                                  //     } else {
                                  //       return "";
                                  //     }
                                  //   })
                                  //   .join("")
                                  //   .trim("")}
                                  src={userLogo}
                                  style={{ border: "1px solid white" }}
                                />

                                <div>
                                  <h4 style={{ textAlign: "left" }}>
                                    {this.props.allUserData.map((list) => {
                                      if (
                                        list.user_email ===
                                          (chat.users[0] !==
                                          this.props.userEmail
                                            ? chat.users[0]
                                            : chat.users[1]) ||
                                        list.email ===
                                          (chat.users[0] !==
                                          this.props.userEmail
                                            ? chat.users[0]
                                            : chat.users[1])
                                      ) {
                                        return list.nickname || list.name;
                                      }
                                    })}
                                  </h4>
                                  <h6>
                                    {chat.messages[chat.messages.length - 1]
                                      .type === "text" ? (
                                      <span className="mr-1">
                                        {chat.messages.length > 0
                                          ? chat.messages[
                                              chat.messages.length - 1
                                            ].message.substring(0, 10)
                                          : ""}
                                      </span>
                                    ) : (
                                      <span className="mr-1">사진</span>
                                    )}
                                    <span>
                                      <h6 style={{ display: "inline-block" }}>
                                        {chat.messages.length > 0
                                          ? chat.messages[
                                              chat.messages.length - 1
                                            ].time
                                          : ""}
                                      </h6>
                                    </span>
                                    <span>
                                      {chat.receiver ===
                                      auth.currentUser.email ? (
                                        chat.readmsg === false ? (
                                          <BsBellFill
                                            size={28}
                                            style={{ fill: "red" }}
                                            className="mr-3"
                                          />
                                        ) : null
                                      ) : null}
                                    </span>
                                  </h6>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center">
                          <h3>진행중인 채팅이 없습니다</h3>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Room
                      chatData={this.props.chats[this.state.index]}
                      allUserData={this.props.allUserData}
                      userEmail={this.props.userEmail}
                      backButtonClick={() => this.backButtonClick()}
                      profilePicture={this.state.profilePicture || myuserLogo}
                    />
                  )}
                </div>
              ) : (
                <NewChatForm
                  userEmail={this.props.userEmail}
                  backButtonClick={() => this.backButtonClick()}
                  allUserData={this.props.allUserData}
                  history={this.props.history}
                />
              )}
            </div>

            {this.state.showMoreOptions ? (
              <More moreOptions={(type) => this.moreOptions(type)} />
            ) : null}

            {this.state.deleting ? (
              <div
                className="center p-3 shadow"
                style={{ borderRadius: "20px", backgroundColor: "white" }}
              >
                <center>
                  <Deleting
                    type="bars"
                    color="black"
                    height={100}
                    width={100}
                  />
                </center>
                <h4>Deleting...</h4>
                <h6>Please Dont Close The App</h6>
              </div>
            ) : null}
          </div>
        </Container>
      </section>
    );
  }
}
