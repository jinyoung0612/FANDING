import React, {useState} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import firebase from "firebase";
//import './MyModal.css';
import {Participate_save} from "../../src/store/actions/userActions";
import {connect, useDispatch} from "react-redux";

const Modal1 = ({funding, fid}) => {
    const dispatch = useDispatch();

    const [inputs, setInputs]=useState({
        name:'',
        price:'',
        date:'',
        time:'',
        bank:'',
        accountNumber:'',
        accountName:'',
        email:firebase.auth().currentUser.email,
        fid:fid
    });

    const handleChange = e => {
        const {value, name}=e.target;
        setInputs({
            ...inputs,
            [name]:value
        })
        console.log(inputs)
    };

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(inputs);
        dispatch(Participate_save(inputs));
        alert("펀딩에 참여하였습니다.")
        //onClose();
    };

    return(
        <React.Fragment>
          <ModalHeader toggle={this.toggle}>{this.props.title}</ModalHeader>
          {this.props.children}
          <ModalBody>
            <p>펀딩 계좌 정보 넣기</p>
            <p>닉네임 넣기</p>

                <Form>
                <FormGroup>
                    <Label for="PaymentInfo">입금정보입력</Label>
                    <Input type="name" name="name" id="name"
                            placeholder="입금자명"
                            
                    />
                </FormGroup>
                <FormGroup>
                    <Input type="price" name="price" id="price"
                            placeholder="입금 금액(숫자만 입력)"
                            

                    />
                </FormGroup>
                <FormGroup className="ml-auto">
                    <Input
                        type="date"
                        name="date"
                        id="paymentDate"
                        placeholder="입금 날짜"
                        

                    />
                </FormGroup>
                <FormGroup>
                    <Input
                        type="time"
                        name="time"
                        id="paymentTime"
                        placeholder="00:00"
                        

                    />
                </FormGroup>
                <FormGroup>
                    <Label for="Refund">환불계좌정보입력</Label>
                    <Input type="bank" name="bank" id="bank"
                            placeholder="은행명"
                            

                    />
                </FormGroup>
                <FormGroup>
                    <Input type="accountNumber" name="accountNumber" id="accountNumber"
                            placeholder="계좌번호"
                            

                    />
                </FormGroup>
                <FormGroup>
                    <Input type="accountName" name="accountName" id="accountName"
                            placeholder="예금주명"
                            

                    />
                </FormGroup>
                <FormGroup>
                    <Label>이메일 주소</Label>
                    <Input type="email" name="email" id="email"
                            
                    />
                </FormGroup>
                <Button >제출</Button>
                </Form>
            </ModalBody>
        </React.Fragment>
    )
}
// class Modal1 extends React.Component {
//     constructor(props)
//     {
//         super(props);
//         this.state = {

//         }
        
//     }
    
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
//         //onClose();
//     };
//   render() {
//     return (
        
//     )
//   }
// }

class Test2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      modalType: 1
    };

    this.toggle = this.toggle.bind(this);
    this.changeModalType = this.changeModalType.bind(this);
  }

  changeModalType(type) {
    this.setState({modalType: type});
  }
  
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }
  
  renderDisplayModal() {
  return(
  <React.Fragment>
          <ModalBody>
              This is display modal
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.changeModalType(2)}>Open Update Modal</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
          </React.Fragment>
  );
  }
  
  renderUpdateModal() {
    return(
  <React.Fragment>
          <ModalBody>
              This is update modal
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.changeModalType(1)}>Open Display Modal</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
          </React.Fragment>
    );
  }

  render() {
    return (
      <div>
        <Button color="danger" onClick={this.toggle}>Open</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <Modal1 click={this.toggle} title={this.state.modalType === 1 ? 'Display title' : 'Update Modal'}>
            {this.state.modalType === 1
              ? this.renderDisplayModal()
              : this.renderUpdateModal()
            }
          </Modal1>
        </Modal>
      </div>
    );
  } 
}
const mapStateToProps = (state) => {
    return{
        authError: state.auth.authError,
        auth: state.firebase.auth,
    }
}
export default connect(
    mapStateToProps,
    // mapDispatchToProps
)(Test2);
