import React, {useState} from 'react';
import {
    TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, CardImg, CardBody,
    CardSubtitle, Form, Label, Input, FormGroup
} from 'reactstrap';
import firebase from "firebase";
import './MyModal.css';
import {firebase_funding_save} from "./store/actions/formActions";
import {connect} from "react-redux";

const MyModal = ({onClose, funding}) => {
    console.log(funding);

    const [inputs, setInputs]=useState({
        name:'',
        price:'',
        date:'',
        time:'',
        bank:'',
        accountNumber:'',
        accountName:'',
        email:firebase.auth().currentUser.email
    });

    const handleChange = e => {
        const {value, name}=e.target;
        setInputs({
            ...inputs,
            [name]:value
        })
    };

    const handleSubmit = e =>{
        // console.log(inputs);
    };
    // console.log(inputs)
    // if(funding.fundingType==="on"){
    //
    // }
    return (

        <div className="MyModal">
            <div className="content">
                <h3>[{funding.artistSelect}] {funding.fundingTitle}</h3>
                <p>펀딩 계좌 정보 넣기</p>

                <p>닉네임 넣기</p>

                <Form onSubmit={handleSubmit()}>
                    <FormGroup>
                        <Label for="PaymentInfo">입금정보입력</Label>
                        <Input type="name" name="name" id="name"
                               placeholder="입금자명"
                               onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Input type="price" name="price" id="price"
                               placeholder="입금 금액(숫자만 입력)"
                               onChange={handleChange}

                        />
                    </FormGroup>
                    <FormGroup className="ml-auto">
                        <Input
                            type="date"
                            name="date"
                            id="paymentDate"
                            placeholder="입금 날짜"
                            onChange={handleChange}

                        />
                    </FormGroup>
                    <FormGroup>
                        <Input
                            type="time"
                            name="time"
                            id="paymentTime"
                            placeholder="00:00"
                            onChange={handleChange}

                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="Refund">환불계좌정보입력</Label>
                        <Input type="bank" name="bank" id="bank"
                               placeholder="은행명"
                               onChange={handleChange}

                        />
                    </FormGroup>
                    <FormGroup>
                        <Input type="accountNumber" name="accountNumber" id="accountNumber"
                               placeholder="계좌번호"
                               onChange={handleChange}

                        />
                    </FormGroup>
                    <FormGroup>
                        <Input type="accountName" name="accountName" id="accountName"
                               placeholder="예금주명"
                               onChange={handleChange}

                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>이메일 주소</Label>
                        <Input type="email" name="email" id="email"
                               placeholder={firebase.auth().currentUser.email}
                               onChange={handleChange}
                        />
                    </FormGroup>
                </Form>
                <Button>제출</Button>
                <Button onClick={onClose}>닫기</Button>
            </div>
        </div>
    );
};

export default MyModal;


// const mapStateToProps = (state) => {
//     return{
//         authError: state.auth.authError,
//         auth: state.firebase.auth
//     }
// }
// const mapDispatchToProps = (dispatch) => {
//     return {
//         firebase_funding_save: (creds) => dispatch(firebase_funding_save(creds))
//     };
// };
//
// export default connect(
//     mapStateToProps,
//     mapDispatchToProps,
// )(MyModal);