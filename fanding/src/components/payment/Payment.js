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
// import { loadParticipants } from "../../store/actions/userActions";
import "tui-grid/dist/tui-grid.css";
import Grid from "@toast-ui/react-grid";
import TuiGrid from "tui-grid";
import axios from "axios";
import { loadPaymentInfo } from "../../store/actions/paymentAction";

TuiGrid.setLanguage("ko");
//TuiGrid.applyTheme('striped');
const { IMP } = window;
IMP.init("imp72284149"); // 'imp00000000'
const columns = [
  { name: "fundingName", header: "제작 참여한 펀딩" },
  { name: "fundingAmount", header: "총 펀딩 금액" },
];

const Payment = (props) => {
  var array = [];

  var totalFundingAmount = "";
  var buyerEmail = "";
  var buyerName = "";
  var realPayAmount = "";
  const paymentList = props.paymentInfo;

  const handleClickPayment = () => {
    IMP.request_pay(
      {
        pg: "html5_inicis", // version 1.1.0 type inicis
        pay_method: "card",
        merchant_uid: "FANDING" + new Date().getTime(),
        name: "FANDING",
        amount: realPayAmount,
        buyer_email: buyerEmail,
        buyer_name: buyerName,
        // buyer_tel: this.state.buyer_tel,
        // buyer_addr: this.state.buyer_addr, //
        // buyer_postcode: this.state.buyer_postcode, //
        m_redirect_url: "http://localhost:3000/",
      },
      function (rsp) {
        if (rsp.success) {
          var msg = "결제가 완료되었습니다.";
          msg += "고유ID : " + rsp.imp_uid;
          msg += "상점 거래ID : " + rsp.merchant_uid;
          msg += "결제 금액 : " + rsp.paid_amount;
          msg += "카드 승인번호 : " + rsp.apply_num;
          // this.props.paymentInput(this.state);
          // imp_uid = rsp.imp_uid;
          //   payment_success = true;
          // this.setState({ payment_success: true });
        } else {
          var msg = "결제에 실패하였습니다.";
          msg += "에러내용 : " + rsp.error_msg;
          //   payment_success = false;
          // this.setState({ payment_success: false });
        }
        alert(msg);
        // this.props.paymentInput(this.state);
        // console.log(payment_success);
      }
    );
    // if (payment_success === true) {
    //   this.setState({ payment_success: true });
    //   console.log(this.state.payment_success);
    // } else {
    //   this.setState({ payment_success: false });
    //   console.log(this.state.payment_success);
    // }
    // if (payment_success) {
    //   this.handleClickPaymentInput();
    // }
  };

  if (isLoaded(paymentList)) {
    paymentList.map(
      (list) => (
        (totalFundingAmount = list.totalFundingAmount),
        (buyerName = list.buyer_name),
        (buyerEmail = list.buyer_email)
      )
    );
    realPayAmount = totalFundingAmount * 0.05;
    return (
      <div>
        {paymentList.map((list, i) =>
          list.paymentFundingList.map((list2) =>
            array.push({
              fundingName: list2.fundingName,
              fundingAmount: list2.fundingAmount,
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
        <div>총 금액 : {totalFundingAmount} 원 </div>
        <div>수수료 결제 금액 : {realPayAmount} 원</div>
        <Button onClick={handleClickPayment}>결제</Button>
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
    paymentInfo: state.firestore.ordered.payments,
    //
    paymentInfo_amount: state.payment.paymentInfo_amount,
    paymentInfo_name: state.payment.paymentInfo_name,
    paymentInfo_email: state.payment.paymentInfo_email,
    paymentInfo_list: state.payment.paymentInfo_list,
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
        where: [["buyer_email", "==", user_email]],
      },
    ];
  })
)(Payment);
