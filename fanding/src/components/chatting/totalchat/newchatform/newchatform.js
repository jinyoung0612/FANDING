import React, { Component } from "react";

import firebase from "firebase/app";

import Loading from "react-loading";

import "./newchatform.css";

const f = firebase;
const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

export default class newchatform extends Component {
  state = {
    email: "",
    msg: "",
    loading: false,
    username: "",
    allUserData: this.props.allUserData,
    showSearchList: false,
    list: [],
    blockList: [],
  };

  componentDidMount = async () => {
    try {
      await this.getAllUsersData();
      // console.log("1234");
    } catch (e) {
      await this.getAllUsersData();
    }
  };

  getAllUsersData = async () => {
    const { allUserData } = this.props;
    if (allUserData.length === 0) {
      this.props.history.push("/chat");
    }
  };

  goToChat = async () => {
    alert("Chat Is Already Exists");
    this.props.backButtonClick();
  };

  submitNewChat = async () => {
    this.setState({ loading: true });

    const userExists = await this.userExists();

    const { email, msg, username } = this.state;
    const { userEmail } = this.props;
    console.log(
      "what email , msg, userEmail , username :",
      email,
      msg,
      userEmail,
      username
    );
    if (email && msg !== userEmail && username) {
      if (userExists) {
        const chatExists = await this.chatExists();

        try {
          chatExists ? this.goToChat() : this.createChat(userEmail, email, msg);
        } catch (e) {
          console.log(e);
        }
      } else {
        alert("User Is Not Exists Please Check It");
        await this.setState({ loading: false });
      }
    } else {
      alert("Please Enter Valid Data");
      await this.setState({ loading: false });
    }
  };

  blockList = async () => {
    const byme = await this.blockByMe();

    const byoponent = await this.blockByOponent();

    return byme || byoponent;
  };

  blockByMe = () => {
    const { email } = this.state;
    const { userEmail, allUserData } = this.props;
    let isBlocked = "";

    allUserData.forEach((obj) => {
      if (obj.email === userEmail) {
        isBlocked = obj.blocklist.includes(email);
      }
    });

    return isBlocked;
  };

  blockByOponent = () => {
    const { blockList } = this.state;
    const { userEmail } = this.props;

    let isBlocked = blockList.includes(userEmail);

    return isBlocked;
  };

  createChat = async (userEmail, email, msg) => {
    const docId = await this.buildId();
    const timeStamp = Date.now();
    const time = new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      hour12: true,
      minute: "numeric",
    });

    const isBlocked = await this.blockList();

    if (!isBlocked) {
      await firestore
        .collection("chats")
        .doc(docId)
        .set({
          docid: docId,
          time: timeStamp,
          users: [userEmail, email],
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

      await this.props.backButtonClick();
    } else {
      alert("Sorry This Chat Is Blocked");

      await this.setState({ loading: false });
    }
  };

  buildId = async () => {
    return [this.state.email, this.props.userEmail].sort().join(":"); //email은 상대email, userEmail은 로그인한email
  };

  chatExists = async () => {
    const docid = await this.buildId();

    const chat = await firestore.collection("chats").doc(docid).get();
    console.log("what chat?", chat); //chat.exists는 true값 나온다
    return chat.exists;
  };

  userExists = async () => {
    const userSnapshot = await firestore.collection("users").get();

    try {
      const exists = userSnapshot.docs
        .map((docs) => docs.data().user_email)
        .includes(this.state.email); //여기에 해당 이메일이 있는지없는지를 체크하는것이다
      //   console.log(this.state.email);
      //   console.log(
      //     "this is userExists , userSnapshot",
      //     userSnapshot.docs.map((docs) => docs.data().user_email)
      //   );
      return exists;
    } catch (e) {
      console.log(e);
      alert("Sorry Something Want Wrong");
      this.setState({ loading: false });
    }

    return false;
  };

  showList = async () => {
    let { allUserData, username } = this.state;
    let { userEmail } = this.props;

    const dataList = [];
    //검색해서 들어온 username으로 allUserData에서 찾아가지고 넣어주는것같다
    if (username.length > 0) {
      //name이없다고해서 에러나지않는다
      console.log("this is username length", username.length);
      allUserData.map((data) => {
        // console.log(data.nickname);
        // console.log("this username", username);//내가 검색한 유저닉네임이 들어있다
        console.log(
          "this data.nickname.indexOf",
          data.nickname.indexOf(username)
        );
        console.log("this data.email?", data.user_email); //언디파인이다
        if (
          data.nickname.indexOf(username) !== -1 && //indexOf에러나는이유 nickname이 비어있어서그렇다?아닌듯
          data.user_email !== userEmail
        ) {
          dataList.push(data);
          //   console.log("this dataList", dataList); datalist에는 전부들어간다
        }
      });

      await this.setState({ list: dataList }); //여기서 list값 넣는다
      //   console.log("this list", this.state.list); 여기도들어갔다
    } else {
      await this.setState({ list: [] });
    }

    if (this.state.list.length === 0) {
      await this.setState({ showSearchList: false, email: "" });
    } else {
      await this.setState({ showSearchList: true });
    }
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
              <h3>Lets Create New Chat</h3>

              <div>
                <input
                  type="text"
                  placeholder="Enter Your Friend Username"
                  value={this.state.username}
                  className="email mt-3"
                  style={{ padding: "5px" }}
                  onChange={async (e) => {
                    await this.setState({
                      username: e.target.value.toLowerCase(),
                    });
                    await this.showList();
                  }}
                />
              </div>

              <div className="mt-3">
                <input
                  type="text"
                  placeholder="Enter Message"
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
                  className="btn btn-secondary"
                  onClick={() => this.props.backButtonClick()}
                >
                  Back
                </button>

                <button
                  className="btn text-light ml-3"
                  style={{ backgroundColor: "#6b38d1" }}
                  onClick={() => this.submitNewChat()}
                >
                  Create
                </button>
              </div>
            </div>

            <div className="col-lg-6 col-sm-12 col-xs-12 flex2 mt-2">
              {this.state.showSearchList ? (
                <div className="new-chat-list">
                  {this.state.list.map((data, index) => (
                    <div
                      className=" text-light p-2 mt-2 pointer"
                      style={{
                        backgroundColor: "#6b34c9",
                        borderRadius: "20px",
                      }}
                      key={index}
                      onClick={async () => {
                        await this.setState({
                          email: data.user_email,
                          username: data.nickname,
                          blockList: data.blocklist,
                        });

                        await this.showList();
                      }}
                    >
                      <div className="chat-list">
                        <img
                          className="chat-list-img mr-3"
                          src={data.URL}
                          style={{ border: "1px solid white" }}
                        />

                        <div>
                          <h4 style={{ textAlign: "left" }}>{data.nickname}</h4>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div>No Result</div>
              )}
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
