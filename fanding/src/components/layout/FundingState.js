import React, { useEffect, useState } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Input,
  Button,
  Form,
} from "reactstrap";
import { connect, useDispatch, useSelector } from "react-redux";
import { compose } from "redux";
import { Link } from "react-router-dom";
import {
  firestoreConnect,
  useFirestoreConnect,
  isLoaded,
} from "react-redux-firebase";
import firebase from "firebase/app";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { loadParticipants } from "../../store/actions/userActions";
import "tui-grid/dist/tui-grid.css";
import Grid from "@toast-ui/react-grid";
import TuiGrid from "tui-grid";
import axios from "axios";
import { check_deposit } from "../../store/actions/userActions";
import logo from "../../assets/images/reload.png";
import "./FundingState.css";

TuiGrid.setLanguage("ko");
//TuiGrid.applyTheme('striped');

const columns = [
  { name: "email", header: "참여자 이메일" },
  { name: "name", header: "참여자 이름" },
  { name: "account", header: "참여자 계좌" },
  { name: "deposit_time", header: "입금 시간" },
  { name: "deposit_price", header: "입금 금액" },
  { name: "check_deposit", header: "입금 확인" },
];

const FundingState = (props) => {
  var array = [];

  const doc_id = props.match.params.id;
  const dispatch = useDispatch();
  const [fundingStateAmount, setfundingStateAmount] = useState("");
  useEffect(() => {
    dispatch(loadParticipants(doc_id));
  }, [dispatch]);

  const participants = props.participants;
  const transactionLists = props.transactionLists;
  console.log("transactionLists: ", transactionLists);
  console.log("transactionLists: ", participants);

  const handleClick = () => {
    window.location.reload();
  };
  const handleClicksumPrice = async () => {
    let totalamount = 0;
    let checkClosed = false;
    let checkSave = false;
    let companyEmail = "";
    let isCompanySaved = false;
    let funding_name = "";
    let tempAmount = 0;
    let companyName = "";
    await firebase
      .firestore()
      .collection("fundings")
      .doc(doc_id)
      .get()
      .then(function (doc) {
        if (doc.data().isClosed) {
          checkClosed = true;
        } else {
          alert("펀딩 마감 이전에는 총 펀딩 금액이 저장되지 않습니다.");
        }
        if (!doc.data().fundingAmountSave) {
          checkSave = true;
        } else {
          alert("이미 펀딩 총 금액이 저장되었습니다.");
        }
        companyName = doc.data().selectedCom.label;
        companyEmail = doc.data().selectedCom.value;
        funding_name = doc.data().fundingTitle;
      });
    await participants.forEach(function (element) {
      if (element.isChecked === "확인") {
        var data = element.price;
        data *= 1;
        totalamount += data;
      }
      var tempTotal = totalamount;
      tempTotal += "";
      setfundingStateAmount(tempTotal);
    });
    if (checkClosed && checkSave) {
      await firebase.firestore().collection("fundings").doc(doc_id).update({
        fundingAmount: totalamount,
        fundingAmountSave: true,
      });
      alert("펀딩 총금액이 저장되었습니다");
      let saveAmount = 0;
      await firebase
        .firestore()
        .collection("payments")
        .doc(companyEmail)
        .get()
        .then(function (doc) {
          if (doc.data().totalFundingAmount !== 0) {
            isCompanySaved = true;
            saveAmount = doc.data().totalFundingAmount;
          }
        });

      if (isCompanySaved === true) {
        //after saved
        tempAmount = totalamount;
        totalamount += saveAmount;
        // console.log(totalamount);
        await firebase
          .firestore()
          .collection("payments")
          .doc(companyEmail)
          .update({
            totalFundingAmount: totalamount,
            paymentFundingList: firebase.firestore.FieldValue.arrayUnion({
              fundingName: funding_name,
              fundingAmount: tempAmount,
            }),
            isPaymentOpen: false,
            adminPaymentList: firebase.firestore.FieldValue.arrayUnion({
              companyName: companyName,
              fundingName: funding_name,
              fundingAmount: tempAmount,
              feesPayment: tempAmount * 0.05,
              isPayment: "결제 미완료",
            }),
            isSaved: true,
          });
      } else {
        //before saved
        await firebase
          .firestore()
          .collection("payments")
          .doc(companyEmail)
          .update({
            totalFundingAmount: totalamount,
            paymentFundingList: firebase.firestore.FieldValue.arrayUnion({
              fundingName: funding_name,
              fundingAmount: totalamount,
            }),
            isPaymentOpen: false,
            adminPaymentList: firebase.firestore.FieldValue.arrayUnion({
              companyName: companyName,
              fundingName: funding_name,
              fundingAmount: totalamount,
              feesPayment: totalamount * 0.05,
              isPayment: "결제 미완료",
            }),
            isSaved: true,
          });
      }
    }
  };

  if (isLoaded(transactionLists) && isLoaded(participants)) {
    if (transactionLists[0] !== null && participants.length !== 0) {
      check(transactionLists, participants);
      // console.log(participants)

      return (
        <div>
          {participants.map((participant, i) =>
            array.push({
              email: participant.email,
              name: participant.name,
              account: participant.bank,
              deposit_date: participant.date,
              deposit_time: participant.time,
              deposit_price: participant.price,
              check_deposit: participant.isChecked,
            })
          )}
          <Grid
            data={array}
            columns={columns}
            rowHeight={25}
            bodyHeight={100}
            heightResizable={true}
            rowHeaders={["rowNum"]}
          />
          <div className="total-amount">
            {fundingStateAmount === "" ? null : (
              <div align="right">
                <strong>펀딩 총 금액 : {fundingStateAmount} 원</strong>
              </div>
            )}
          </div>
          <Button onClick={handleClick}>새로고침</Button>
          <Button onClick={handleClicksumPrice}> 펀딩금액합산</Button>
        </div>
      );
    } else {
      return (
        <div>
          <div className="no-participation" align="center">
            <strong>펀딩에 참여한 참여자가 없습니다.</strong>
          </div>
        </div>
      );
    }
  } else {
    return null;
  }
  // if (!isLoaded(transactionLists)) {
  //   console.log("transactionLists 로드 안됨");
  //   return <div>페이지 오류</div>;
  // }
  // if(isLoaded(participants)&&isLoaded(transactionLists)){
  //   if (transactionLists[0] !== null) {
  //     if (participants.length !== 0 && participants) {
  //
  //       check(transactionLists, participants);
  //       console.log(participants)
  //
  //       return (
  //         <div>
  //           {
  //             participants.map((participant, i) =>
  //             array.push({
  //               email: participant.email,
  //               name: participant.name,
  //               account: participant.bank,
  //               deposit_date: participant.date,
  //               deposit_time: participant.time,
  //               deposit_price: participant.price,
  //               check_deposit: participant.isChecked,
  //             })
  //           )}
  //           <Grid
  //             data={array}
  //             columns={columns}
  //             rowHeight={25}
  //             bodyHeight={100}
  //             heightResizable={true}
  //             rowHeaders={["rowNum"]}
  //           />
  //           <div>
  //             {fundingStateAmount === "" ? null : (
  //               <div align="right">
  //                 <strong>펀딩 총 금액 : {fundingStateAmount} 원</strong>
  //               </div>
  //             )}
  //           </div>
  //           <Button onClick={handleClick}>새로고침</Button>
  //           <Button onClick={handleClicksumPrice}> 펀딩금액합산</Button>
  //         </div>
  //       );
  //     } else {
  //       return <div>참여자가 없습니다.</div>;
  //     }
  //   }
  // }
};

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth,
    participants: state.auth.participants,
    transactionLists: state.firestore.ordered.transactionLists,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    const user_email = props.auth.email == null ? "none" : props.auth.email;
    console.log("user email: ", user_email);

    return [
      {
        collection: "transactionLists",
        where: [["chongdae_email", "==", user_email]],
      },
    ];
  })
)(FundingState);

async function check(transactionLists, participants) {
  console.log("check", participants);
  if (transactionLists !== null && participants) {
    const access_token = transactionLists[0].access_token;
    const fintech_use_num = transactionLists[0].fintech_use_num;

    console.log(access_token, fintech_use_num);
    axios
      .post("/api/account/transaction/check", {
        access_token: access_token,
        fintech_use_num: fintech_use_num,
        participants: participants,
      })
      .then((res) => {
        if (res.data) {
          console.log("res.data", res.data);
          const pState = res.data;
          for (var i = 0; i < participants.length; i++) {
            const uid = participants[i].uid;
            console.log("participants[" + i + "].uid: ", participants[i].uid);
            if (pState[uid] === "true") {
              check_deposit(participants[i]);
            }
          }
        } else {
          console.log("실패실패실패실패");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
