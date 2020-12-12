import React, { useEffect, useState } from "react";
import { Button, Label } from "reactstrap";
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
import "tui-grid/dist/tui-grid.css";
import Grid from "@toast-ui/react-grid";
import TuiGrid from "tui-grid";
import axios from "axios";
import "./AdminPaymentList.css";

TuiGrid.setLanguage("ko");
//TuiGrid.applyTheme('striped');
const columns = [
  { name: "companyName", header: "업체명" },
  { name: "fundingName", header: "제작 참여한 펀딩" },
  { name: "feesAmount", header: "결제 수수료 금액" },
  { name: "payment", header: "결제 여부" },
];

const AdminPaymentList = (props) => {
  var array = [];
  var totalFundingAmount = "0";
  var feesPayAmount = "0";
  const paymentList = props.payments;
  //   var isAmountView = true;

  //   const handleChangePayment = () => {
  //     var deleteArray = [];
  //     array.map((data) =>
  //       tempArray.push({
  //         fundingName: data.fundingName,
  //         fundingAmount: data.fundingAmount,
  //         feesPayment: data.fundingAmount * 0.05,
  //         isPayment: true,
  //       })
  //     );
  //     if (!isAmountView) {
  //       firebase.firestore().collection("payments").doc(props.auth.email).update({
  //         isPaymentOpen: true,
  //         paymentFundingList: deleteArray,
  //         adminPaymentList: tempArray,
  //       });
  //     }
  //   };
  if (isLoaded(paymentList)) {
    // paymentList.map(
    //   (list) => (
    //     (totalFundingAmount = list.totalFundingAmount),
    //     (buyerName = list.buyer_name),
    //     (buyerEmail = list.buyer_email),
    //     (isAmountView = list.isPaymentOpen)
    //   )
    // );
    feesPayAmount = totalFundingAmount * 0.05;
    return (
      <div>
        {paymentList.map((list, i) =>
          list.adminPaymentList.map((list2) =>
            array.push({
              companyName: list2.companyName,
              fundingName: list2.fundingName,
              feesAmount: list2.feesPayment,
              payment: list2.isPayment,
            })
          )
        )}
        <Grid
          data={array}
          columns={columns}
          rowHeight={25}
          bodyHeight={100}
          heightResizable={true}
          rowHeaders={["rowNum"]}
        />
        {/* <div className="payment-amount">
            <div align="right">
              <strong>총 금액 : {totalFundingAmount} 원 </strong>
            </div>
            <div align="right">
              <strong>수수료 결제 금액 : {feesPayAmount} 원</strong>
            </div>
          </div> */}
      </div>
    );
  } else {
    return <div>페이지 오류</div>;
  }
};

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth,
    user_data: state.auth.user_data,
    payments: state.firestore.ordered.payments,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    const user_email = props.auth.email == null ? "none" : props.auth.email;
    console.log("user email: ", user_email);

    return [
      {
        collection: "payments",
        where: [["isSaved", "==", true]],
      },
    ];
  })
)(AdminPaymentList);
