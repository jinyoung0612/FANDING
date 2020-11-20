import React, {Component} from 'react';
import { connect } from 'react-redux'
import { firestoreConnect, isLoaded } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { Card, CardImg, CardTitle, CardSubtitle, CardText, CardBody, Container, 
  Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Button, Progress, Form, FormGroup, Label, Input } from 'reactstrap';
//import { Viewer } from '@toast-ui/editor/dist/toastui-editor-viewer';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Editor, Viewer} from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import { BsHeart, BsChatSquareDots, BsFillBellFill } from "react-icons/bs";
import {FaShareAlt} from "react-icons/fa";
import ModalPortal from "../../../../ModalPortal";
import MyModal from "../../../../MyModal";
import Test2 from "../../../../components/test2"
import { CopyToClipboard } from 'react-copy-to-clipboard'
import {Participate_save} from '../../../../store/actions/userActions'
import firebase from "firebase";
//import DaumPostcode from 'react-daum-postcode';
let imgStyle = {
    maxHeight: '500px',
    maxWidth: '700px'
  }
  
 //다음 우편번호 API
//  const Postcode = () => {
//   const handleComplete = (data) => {
//     let fullAddress = data.address;
//     let extraAddress = ''; 
    
//     if (data.addressType === 'R') {
//       if (data.bname !== '') {
//         extraAddress += data.bname;
//       }
//       if (data.buildingName !== '') {
//         extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
//       }
//       fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
//     }

//     console.log(fullAddress);  // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
//   }

//   return (
//     <DaumPostcode
//       onComplete={handleComplete}
//       { ...props }
//     />
//   );
// }
class FundingDetail extends Component{

  constructor(props){
    super(props);
    this.state = {
      funding: this.props.funding,
      modal: false,
      name:'',
      price:'',
      date:'',
      time:'',
      bank:'',
      accountNumber:'',
      accountName:'',
      email:'',

    };
    this.toggle = this.toggle.bind(this);
    
  }
  toggle() {
    console.log(this.props)
      this.setState({
          modal: !this.state.modal
      });
  }
  //  handleOpenModal=()=>{
  //       this.setState({isModalOpen:true})
  //   }
  //  handleCloseModal=()=>{
  //      this.setState({isModalOpen:false})
  //   }

  handleChangeEditor = e =>
    {
        const content = this.editorRef.current.getInstance().getHtml();

        this.setState({
            content: content
        });
    }
  viewerRef = React.createRef();

  handleSubmit=(e)=>{
    e.preventDefault();
    console.log("제출");
      // console.log(this.state);

      this.props.Participate_save(this.state);
      alert("지원서를 제출하였습니다");
      this.toggle()
  }
  render(){
    console.log(this.state.funding);

    const url=window.location.href; 
    const{funding}=this.props;
    if(isLoaded(funding) && funding)
    {
      return(
        
        <section class="gallery5 mbr-gallery cid-sgtDmxvlJH" id="gallery5-q">
        
         <Container>  
         <Button disabled className="xs ml-0" style={{backgroundColor:"#ebebeb"}}>{funding.artistSelect}</Button>  
         <div className="text-left"><h2><b>{funding.fundingTitle}</b></h2></div>
         
         <div className="mt-5">


        <Row xs="2">
          <Col xs="8"><CardImg top width="10%" src={funding.url} style={imgStyle}  alt="Card image cap" /></Col>
          <Col xs="4">
            <div>
              <div className="text-center"><b>80% 달성</b></div>
              <Progress color="info" value="80" />
              <p className="mt-5"><b>257명</b>의 FAN</p>
              <p className="mt-3"><b>15일</b> 남음</p>
              <Row xs="2">
                <Button color="info" onClick={this.toggle}>펀딩 참여하기</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                  <Form onSubmit={this.handleSubmit}>
                      <ModalHeader toggle={this.toggle} charCode="x">입금폼</ModalHeader>
                      <ModalBody>
                          <div className="companyRecruit text-center">
                              <h3>[{funding.artistSelect}]{funding.fundingTitle}</h3>
                              <p>펀딩 계좌 정보 넣기</p>
                              <p>닉네임 넣기</p>
                              <p>주소 넣기</p>
                              <p>입금 확인 했는지 확인하는 checkbox</p>

                              <FormGroup>
                                  <Label for="PaymentInfo"><b>입금정보입력</b></Label>
                                  <Input type="name" name="name" id="name"
                                        placeholder="입금자명"
                                        onChange={this.handleChange}
                                  />
                              </FormGroup>
                              <FormGroup>
                                  <Input type="price" name="price" id="price"
                                        placeholder="입금 금액(숫자만 입력)"
                                        onChange={this.handleChange}

                                  />
                                  </FormGroup>
                              <FormGroup className="ml-auto">
                                <Input
                                    type="date"
                                    name="date"
                                    id="paymentDate"
                                    placeholder="입금 날짜"
                                    onChange={this.handleChange}

                                />
                                </FormGroup>
                             <FormGroup>
                               <Input
                                   type="time"
                                   name="time"
                                   id="paymentTime"
                                   placeholder="00:00"
                                   onChange={this.handleChange}

                               />
                              </FormGroup>
                             <FormGroup>
                                 <Label for="Refund"><b>환불계좌정보입력</b></Label>
                                 <Input type="bank" name="bank" id="bank"
                                         placeholder="은행명"
                                         onChange={this.handleChange}
                                 />
                             </FormGroup>
                             <FormGroup>
                               <Input type="accountNumber" name="accountNumber" id="accountNumber"
                                       placeholder="계좌번호"
                                       onChange={this.handleChange}
                               />
                           </FormGroup>
                           <FormGroup>
                             <Input type="accountName" name="accountName" id="accountName"
                                     placeholder="예금주명"
                                     onChange={this.handleChange}
                             />
                         </FormGroup>
                         <FormGroup>
                          <Label>이메일 주소</Label>
                          <Input type="email" name="email" id="email" 
                          placeholder={firebase.auth().currentUser.email}
                                  onChange={this.handleChange}
                          />

                        </FormGroup>



                              <ModalFooter>
                                  <Button color="primary">제출하기</Button>{' '}
                                  <Button color="secondary" onClick={this.toggle}>닫기</Button>
                              </ModalFooter>
                          </div>

                      </ModalBody>
                  </Form>
                </Modal>
              </Row>
              <Row xs="3">
                <Col><Button style={{backgroundColor: '#bfbfbf', borderColor:"#bfbfbf"}} size="xs" block><BsHeart className="mr-2"/>  350</Button></Col>
                <Col><Button color="secondary" size="xs" block><BsChatSquareDots className="mr-2"/>  문의</Button></Col>
                <Col>
                <CopyToClipboard text={url}>
                <Button color="secondary" size="xs" block><FaShareAlt className="mr-2" />  공유</Button>
                </CopyToClipboard>
                </Col>
              </Row>
            </div>
          </Col>
          
      </Row>
      <Row xs="2" style={{paddingTop: "50px"}}>
        <Col xs={8}>
        <div className="text-left"><h4 className="pt-30"><b>상세 설명</b></h4></div>
        <div className="mt-20">
             <Viewer
              height="400px"
              initialValue={funding.content}
              ref={this.viewerRef}
              previewStyle="vertical"
              initialEditType="wysiwyg"
              />
        </div>
        </Col>
        <Col  xs={4}>
          <Button size="lg" block style={{backgroundColor:"#635d5d", borderColor:"#635d5d"}}>NOTICE <BsFillBellFill className="ml-2 mb-20"/>
          </Button>
          <div className="text-left" style={{marginTop: "50px"}}><h4 className="mt-30"><b>업체 정보</b></h4></div>
          <div style={{borderColor: "#635d5d", border: "1px solid #635d5d", borderRadius:"4px"}}>업체 이름</div>
        </Col>
      </Row>
      </div>
        </Container>
        </section>
      )
    }
    else
    {
      return(
        <div>
              <p>Loading funding...</p>
        </div>
      )
    }
  }
   
}
/*
const FundingDetail = (props) => {
    //const id = props.match.params.id; //route information
    //const { funding, auth } = props;
    //if(!auth.uid) return <Redirect to='/signin' />
    
    //const viewerRef = React.createRef();
    const { funding } = props;
    const rootE1 = React.createRef();
    var viewerInst = null;

    
    var Viewer = { Editor };
    var viewer = new Viewer(
      {
        el: document.querySelector('#viewer'),
        initialValue: 'hello'
      }
    )

    
    
    if (funding)
     {
       

         return(
            <Card sm="6">
            <CardImg top width="10%" src={funding.url} style={imgStyle} alt="Card image cap" />
            <CardBody>
            <CardTitle>{funding.fundingTitle}</CardTitle>
            <CardSubtitle> subtitle</CardSubtitle>
            <CardText>{funding.content}</CardText>
            </CardBody>
            {viewer}
            
            </Card>
            
         )
     }
     else{
         return (
           <div>
               <p>Loading funding...</p>
           </div>
        )
     }
        
}

*/

const mapStateToProps = (state, ownProps) => {
    console.log(state);
    const id = ownProps.match.params.id;
    const fundings = state.firestore.data.fundings;
    const funding = fundings ? fundings[id] : null
    return {
      funding: funding,
      auth: state.firebase.auth
    }
  }

const mapDispatchToProps = (dispatch) => {
    return {
        Participate_save: (inputs) => dispatch(Participate_save(inputs))
    };
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(props => [{
      
        collection: 'fundings', doc: props.match.params.id
    }])
)(FundingDetail)



//export default FundingDetail;