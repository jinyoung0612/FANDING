import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signUp } from "../../store/actions/authActions";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Container,
} from "reactstrap";
import { render } from "react-dom";
import firebase from "firebase/app";
import { paymentInput } from "../../store/actions/paymentAction";

const { IMP } = window;
IMP.init("imp72284149"); // 'imp00000000'

class Payment extends Component {
  state = {
    product_name: "",
    product_amount: "",
    buyer_email: "",
    buyer_name: "",
    buyer_tel: "",
    buyer_addr: "",
    buyer_postcode: "",
  };
  handleClickPayment = () => {
    IMP.request_pay(
      {
        pg: "html5_inicis", // version 1.1.0부터 지원. kg이니시스웹표준결제
        pay_method: "card",
        merchant_uid: "FANDING" + new Date().getTime(),
        name: this.state.product_name,
        amount: this.state.product_amount,
        buyer_email: this.state.buyer_email,
        buyer_name: this.state.buyer_name,
        buyer_tel: this.state.buyer_tel,
        buyer_addr: this.state.buyer_addr,
        buyer_postcode: this.state.buyer_postcode,
        m_redirect_url: "http://localhost:3000/",
      },
      function (rsp) {
        if (rsp.success) {
          var msg = "결제가 완료되었습니다.";
          msg += "고유ID : " + rsp.imp_uid;
          msg += "상점 거래ID : " + rsp.merchant_uid;
          msg += "결제 금액 : " + rsp.paid_amount;
          msg += "카드 승인번호 : " + rsp.apply_num;
        } else {
          var msg = "결제에 실패하였습니다.";
          msg += "에러내용 : " + rsp.error_msg;
        }
        alert(msg);
      }
    );
  };
  handleClickPaymentInput = () => {
    this.props.paymentInput(this.state);
    console.log(this.state);
  };
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  render() {
    return (
      <section class="gallery5 mbr-gallery cid-sgtDmxvlJH" id="gallery5-q">
             <div class="mbr-section-head pb-10">
                        <h3 class="mbr-section-title mbr-fonts-style align-center mb-10 display-2 "><strong>수수료 결제</strong></h3>
                        
            </div>
            <Container
            style={{backgroundColor:"#fafafa", borderRadius:"10px", padding:"3em 2em", 
            marginTop:"40px"}}>
      <div>
        <Label>제품이름</Label>
        <Input
          type="text"
          name="title"
          id="product_name"
          onChange={this.handleChange}
        ></Input>
        <Label>제품가격</Label>
        <Input
          type="text"
          name="title"
          id="product_amount"
          onChange={this.handleChange}
        ></Input>
        <Label>이메일</Label>
        <Input
          type="text"
          name="title"
          id="buyer_email"
          onChange={this.handleChange}
        ></Input>
        <Label>구매자이름</Label>
        <Input
          type="text"
          name="title"
          id="buyer_name"
          onChange={this.handleChange}
        ></Input>
        <Label>핸드폰번호</Label>
        <Input
          type="text"
          name="title"
          id="buyer_tel"
          onChange={this.handleChange}
        ></Input>
        <Label>주소</Label>
        <Input
          type="text"
          name="title"
          id="buyer_addr"
          onChange={this.handleChange}
        ></Input>
        <Label>우편번호</Label>
        <Input
          type="text"
          name="title"
          id="buyer_postcode"
          onChange={this.handleChange}
        ></Input>
        <div>
          <Button onClick={this.handleClickPaymentInput}>입력확인</Button>
          <Button onClick={this.handleClickPayment}>결제</Button>
        </div>
        
      </div>
      </Container>
        </section>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    // auth: state.firebase.auth,
    // authError: state.auth.authError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    paymentInput: (Input) => dispatch(paymentInput(Input)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Payment);

// export default Payment;

// React.js
// class Payment extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       cardNumber: "",
//       expiry: "",
//       birth: "",
//       pwd2Digit: "",
//       customer_uid: "gildong_0001_1234",
//     };
//   }

//   handleInputChange = (event) => {
//     const { value, name } = event.target;
//     this.setState({
//       [name]: value,
//     });
//   };

//   handleFormSubmit = (event) => {
//     event.preventDefault();
//     console.log(this.state);
//     const { cardNumber, expiry, birth, pwd2Digit, customer_uid } = this.state;
//     axios({
//       url: "http://localhost:3001/subscription/issue-billing", //해당url이잘못되었다
//       method: "post",
//       data: {
//         cardNumber,
//         expiry,
//         birth,
//         pwd2Digit,
//         customer_uid,
//       },
//     }).then((rsp) => {
//       console.log(rsp);
//     });
//   };

//   render() {
//     const { cardNumber, expiry, birth, pwd2Digit } = this.state;
//     return (
//       <Form onSubmit={this.handleFormSubmit}>
//         <Label>
//           카드 번호
//           <Input
//             type="text"
//             name="cardNumber"
//             value={cardNumber}
//             onChange={this.handleInputChange}
//           />
//         </Label>
//         <Label>
//           카드 유효기간
//           <Input
//             type="text"
//             name="expiry"
//             value={expiry}
//             onChange={this.handleInputChange}
//           />
//         </Label>
//         <Label>
//           생년월일
//           <Input
//             type="text"
//             name="birth"
//             value={birth}
//             onChange={this.handleInputChange}
//           />
//         </Label>
//         <Label>
//           카드 비밀번호 앞 두자리
//           <Input
//             type="text"
//             name="pwd2Digit"
//             value={pwd2Digit}
//             onChange={this.handleInputChange}
//           />
//         </Label>
//         <Input type="submit" value="Submit" />
//       </Form>
//     );
//   }
// }
// export default Payment;
// IMP.request_pay(
//   {
//     pg: "html5_inicis", // version 1.1.0부터 지원. kg이니시스웹표준결제
//     pay_method: "card",
//     merchant_uid: "merchant_" + new Date().getTime(),
//     name: "주문명:결제테스트",
//     amount: 1,
//     buyer_email: "iamport@siot.do",
//     buyer_name: "구매자이름",
//     buyer_tel: "010-1234-5678",
//     buyer_addr: "서울특별시 강남구 삼성동",
//     buyer_postcode: "123-456",
//     m_redirect_url: "https://www.yourdomain.com/payments/complete",
//   },
//   function (rsp) {
//     if (rsp.success) {
//       var msg = "결제가 완료되었습니다.";
//       msg += "고유ID : " + rsp.imp_uid;
//       msg += "상점 거래ID : " + rsp.merchant_uid;
//       msg += "결제 금액 : " + rsp.paid_amount;
//       msg += "카드 승인번호 : " + rsp.apply_num;
//     } else {
//       var msg = "결제에 실패하였습니다.";
//       msg += "에러내용 : " + rsp.error_msg;
//     }
//     alert(msg);
//   }
// );
