// import React, {useCallback, useState} from 'react';
// import {
//     TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, CardImg, CardBody,
//     CardSubtitle, Form, Label, Input, FormGroup, Modal, ModalHeader, ModalBody, ModalFooter
// } from 'reactstrap';
// import firebase from "firebase";
// //import './MyModal.css';
// import {Participate_save} from "./store/actions/userActions";
// import {connect, useDispatch} from "react-redux";

// const MyModal = ({onClose, funding, fid}) => {
//     console.log(fid);

//     const dispatch = useDispatch();

//     const [inputs, setInputs]=useState({
//         name:'',
//         price:'',
//         date:'',
//         time:'',
//         bank:'',
//         accountNumber:'',
//         accountName:'',
//         email:firebase.auth().currentUser.email,
//         fid:fid
//     });
    
//     // const [modal, setModal] = useState(false);
//     // const toggle = () => setModal(!modal);

//     const handleChange = e => {
//         const {value, name}=e.target;
//         setInputs({
//             ...inputs,
//             [name]:value
//         })
//         console.log(inputs)
//     };

//     const handleSubmit = (e) =>{
//         e.preventDefault();
//         console.log(inputs);
//         dispatch(Participate_save(inputs));
//         alert("펀딩에 참여하였습니다.")
//         onClose();
//     };

//     // const handleSubmit = useCallback(()=>{
//     //     dispatch(Participate_save(inputs));
//     // },[inputs,dispatch])


//     // console.log(inputs)
//     // if(funding.fundingType==="on"){
//     //
//     // }
//     return ();

//         // <div>
//         //     <Modal isOpen={modal} toggle={toggle} className="MyModal">
//         //     {/* <div className="content"> */}
//         //     <ModalHeader toggle={toggle}> <h3>[{funding.artistSelect}] {funding.fundingTitle}</h3></ModalHeader>
//         //     <ModalBody>
//         //     <p>펀딩 계좌 정보 넣기</p>
//         //     <p>닉네임 넣기</p>

//         //         <Form onSubmit={handleSubmit}>
//         //         <FormGroup>
//         //             <Label for="PaymentInfo">입금정보입력</Label>
//         //             <Input type="name" name="name" id="name"
//         //                     placeholder="입금자명"
//         //                     onChange={handleChange}
//         //             />
//         //         </FormGroup>
//         //         <FormGroup>
//         //             <Input type="price" name="price" id="price"
//         //                     placeholder="입금 금액(숫자만 입력)"
//         //                     onChange={handleChange}

//         //             />
//         //         </FormGroup>
//         //         <FormGroup className="ml-auto">
//         //             <Input
//         //                 type="date"
//         //                 name="date"
//         //                 id="paymentDate"
//         //                 placeholder="입금 날짜"
//         //                 onChange={handleChange}

//         //             />
//         //         </FormGroup>
//         //         <FormGroup>
//         //             <Input
//         //                 type="time"
//         //                 name="time"
//         //                 id="paymentTime"
//         //                 placeholder="00:00"
//         //                 onChange={handleChange}

//         //             />
//         //         </FormGroup>
//         //         <FormGroup>
//         //             <Label for="Refund">환불계좌정보입력</Label>
//         //             <Input type="bank" name="bank" id="bank"
//         //                     placeholder="은행명"
//         //                     onChange={handleChange}

//         //             />
//         //         </FormGroup>
//         //         <FormGroup>
//         //             <Input type="accountNumber" name="accountNumber" id="accountNumber"
//         //                     placeholder="계좌번호"
//         //                     onChange={handleChange}

//         //             />
//         //         </FormGroup>
//         //         <FormGroup>
//         //             <Input type="accountName" name="accountName" id="accountName"
//         //                     placeholder="예금주명"
//         //                     onChange={handleChange}

//         //             />
//         //         </FormGroup>
//         //         <FormGroup>
//         //             <Label>이메일 주소</Label>
//         //             <Input type="email" name="email" id="email"
//         //                     placeholder={firebase.auth().currentUser.email}
//         //                     onChange={handleChange}
//         //             />
//         //         </FormGroup>
//         //         <Button >제출</Button>
//         //         </Form>

//         //     </ModalBody>
           
//         //     <ModalFooter>
//         //         <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
//         //         <Button color="secondary" onClick={toggle}>닫기</Button>
//         //     </ModalFooter>
//         //         {/* {<Button onClick={onClose}>닫기</Button>}  */}
    
//         //         </Modal>

//         // </div>
    
// };

// // export default MyModal;


// const mapStateToProps = (state) => {
//     return{
//         authError: state.auth.authError,
//         auth: state.firebase.auth,
//     }
// }
// // const mapDispatchToProps = (dispatch) => {
// //     return {
// //         Participate_save: (inputs) => dispatch(Participate_save(inputs))
// //     };
// // };

// export default connect(
//     mapStateToProps,
//     // mapDispatchToProps
// )(MyModal);