import React, {Component} from 'react';
import { connect } from 'react-redux'
import {firestoreConnect, isLoaded} from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { CardImg, CardText, Container, Row, Col, Button, Progress, Form, FormGroup, Label, Input, Table,NavLink,NavItem } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter, Badge } from 'reactstrap';

//import { Viewer } from '@toast-ui/editor/dist/toastui-editor-viewer';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Editor, Viewer} from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import { BsHeart, BsChatSquareDots } from "react-icons/bs";
import {FaShareAlt} from "react-icons/fa";
import "./company.css"
import {company_application_save} from '../../../store/actions/recruitCompanyActions'
import firebase from  "firebase"
import App from "../../../App";
//import moment from 'moment';
import { Link } from 'react-router-dom';

let imgStyle = {
    maxHeight: '400px',
    maxWidth: '400px'
  }
  
class RecruitFormDetail extends Component{

  constructor(props){
    super(props);
    this.state = {
      recruitCompany: this.props.recruitCompany,
        comments:"",
        render:"",
        price:"",
        time:"",
        minimum:"",
        others:"",
        recruit_id:this.props.match.params.id,
        company_name:"",
        modal: false
    };
      this.toggle = this.toggle.bind(this);
  }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }


  viewerRef = React.createRef();


  handleCommentChange=(e)=>{
      this.setState({
          [e.target.id]: e.target.value,
      });
      // console.log(e.target.value);
  }

    handleClick=(Comp,e)=>{
      this.setState({render:Comp});
    }

    handleChange=(e)=>{
        this.setState({
            [e.target.id]: e.target.value,
        });
        this.setState({company_name:this.props.company[0].name})

        // console.log(e.target.value);
    }

    handleSubmit=(e)=>{
      e.preventDefault();
      console.log("제출");
        // console.log(this.state);

        this.props.company_application_save(this.state);
        alert("지원서를 제출하였습니다");
        this.toggle()
    }
    renderComments(){
      switch(this.state.render) {
          case 'comments': return <Comments comments={this.state.comments}/>

      }
    }
  render(){

    const {recruitCompany}=this.props;

    if(isLoaded(recruitCompany) && recruitCompany)
    {
        // console.log(this.props.match.params.id);
        console.log(this.props.application);
        // console.log(this.props);

        return(
        <>
        <Container>
          
         <div className="text-center"><h2><b>{recruitCompany.itemTitle}</b></h2></div>
        <Row xs="2">
          <Col>
              <CardImg top width="10%" src={recruitCompany.itemImage} style={imgStyle} alt="Card image cap" />
              <CardText>예상 가격대 : 개당 {recruitCompany.itemPrice}원</CardText>
              <CardText>예상 개수 : {recruitCompany.itemRemain}</CardText>
          </Col>


            <Col>
            <div>
              
              
            </div>
          </Col>

      </Row>
        
        <div className="mt-auto">
             <Viewer
              height="400px"
              initialValue={recruitCompany.content}
              ref={this.viewerRef}
              previewStyle="vertical"
              initialEditType="wysiwyg"
              />
        </div>
            <Row></Row>
            <div>
                <div>
                    <Button color="warning" onClick={this.toggle} size="lg" block>지원하기</Button>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <Form onSubmit={this.handleSubmit}>
                            <ModalHeader toggle={this.toggle} charCode="x">지원서</ModalHeader>
                            <ModalBody>
                            <div className="companyRecruit">
                                <h3>{recruitCompany.itemTitle}</h3>


                                    <FormGroup>
                                        <Label for="PaymentInfo">단가</Label>
                                        <Input type="text" name="price" id="price"
                                               placeholder="단가 입력"
                                               onChange={this.handleChange}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="PaymentInfo">최소 주문수량</Label>
                                        <Input type="text" name="minimum" id="minimum"
                                               placeholder="최소 주문수량 입력"
                                               onChange={this.handleChange}

                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="Refund">제작 소요일</Label>
                                        <Input type="text" name="time" id="time"
                                               placeholder="제작 소요일 입력"
                                               onChange={this.handleChange}

                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="Refund">기타 사항</Label>
                                        <Input type="textarea" name="others" id="others"
                                               placeholder="기타 사항 입력"
                                               onChange={this.handleChange}

                                        />
                                    </FormGroup>
                                    <Label>모든제품은 과세대상 상품입니다. 선택하신 제품가격에 부가세 10%가 별도로 청구되오니 제품구입시 확인 부탁드립니다. </Label>
                                    {/*<Button color="primary" onSubmit={this.handleSubmit}>제출하기</Button>{' '}*/}

                                    <ModalFooter>
                                        <Button color="primary">제출하기</Button>{' '}
                                        <Button color="secondary" onClick={this.toggle}>닫기</Button>
                                    </ModalFooter>
                            </div>

                        </ModalBody>
                        </Form>
                    </Modal>
                </div>
            </div>

            {/*<div className='Reply_div'>*/}
          {/*<h4> 댓글 </h4>*/}
          {/*<div className='Reply_write'>*/}
          {/*  <textarea id="comments" rows='3' placeholder='100자 이내의 글을 입력해주세요.'*/}
          {/*    maxLength='100' name='write_reply' onChange={this.handleCommentChange}>*/}
          {/*    </textarea>*/}
          {/*    <input type='button' value='등록' id='reply_submit_button' onClick={this.handleClick.bind(this, 'comments')}/>*/}
          {/*</div>*/}
          {/*  </div>*/}

            <div>
                <h3>지원현황</h3>
                <ApplicationList applications={this.props.application}></ApplicationList>
            </div>

            <div>
                {/*{this.state.comments}*/}
                {this.renderComments()}

            </div>
        </Container>

        
            </>
      )
    }
    else
    {
        // console.log(this.state)
      return(
        <div>
              <p>Loading form...</p>
        </div>
      )
    }
  }
   
}

class Comments extends Component{
    constructor() {
        super();
        this.state={
            comments:""
        }
    }

    render() {
        return <div>{this.props.comments}</div>
    }
}

class ApplicationList extends Component{
    constructor() {
        super();
        this.state={
            modal:false,
            apply_id:""
        };
        this.toggle=this.toggle.bind(this)
    }
    handleClick=()=>{
        console.log("click");
        window.location.href="/"
    };

    toggle(apply) {
        this.setState({
            modal: !this.state.modal
        });
        this.setState({
            apply_id:apply
        })
    }

    render() {
        console.log(this.props);
        const{applications}=this.props;
        console.log(applications);
        if(isLoaded(applications) && applications){
            return (
                <div>
                    <Table hover responsive>
                        <thead>
                        <tr>
                            <th></th>
                            <th>업체명</th>
                            <th></th>
                            <th></th>
                            <th>지원서</th>
                            <th></th>
                            <th></th>
                        </tr>
                        </thead>

                    {applications.map((apply,i)=>{
                        return(
                                    <tbody>
                                    <tr>

                                        <th scope="row">{i+1}</th>
                                        <td>{apply.company_name}</td>
                                        <td></td>
                                        <td></td>
                                        <td>지원서 제목</td>
                                        <td>
                                            <Button onClick={()=>this.toggle(apply)} >지원서 보기</Button>

                                        </td>
                                        <td>
                                            {/*{console.log("아이디",apply.id)}*/}
                                            <Button>문의하기</Button>
                                        </td>
                                    </tr>
                                    </tbody>



                        )
                    })}
                    </Table>

                    <div>
                        <Modal isOpen={this.state.modal} toggle={this.toggle} className="class">
                            {console.log(this.state)}

                                <ModalHeader toggle={this.toggle} charCode="x">지원서</ModalHeader>
                                <ModalBody>
                                    <div className="companyRecruit">
                                        <h5>[업체명] {this.state.apply_id.company_name}</h5>
                                        <h5>[단가] {this.state.apply_id.price}</h5>
                                        <h5>[최소주문수량] {this.state.apply_id.minimum}</h5>
                                        <h5>[제작소요시간] {this.state.apply_id.time}</h5>
                                        <h5>[기타사항] {this.state.apply_id.others}</h5>


                                        <Label>모든제품은 과세대상 상품입니다. 선택하신 제품가격에 부가세 10%가 별도로 청구되오니 제품구입시 확인 부탁드립니다. </Label>
                                        {/*<Button color="primary" onSubmit={this.handleSubmit}>제출하기</Button>{' '}*/}

                                        <ModalFooter>
                                            <Button color="primary">업체 선정하기</Button>{' '}
                                            <Button color="secondary" onClick={this.toggle} >닫기</Button>
                                        </ModalFooter>
                                    </div>

                                </ModalBody>

                        </Modal>
                    </div>
                </div>
            )
        }
        else{
            return(
                <div></div>
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
    const recruitCompanies = state.firestore.data.recruitCompanies;
    const recruitCompany = recruitCompanies ? recruitCompanies[id] : null
    return {
      recruitCompany: recruitCompany,
      auth: state.firebase.auth,
        application:state.firestore.ordered.applications,
        company:state.firestore.ordered.companies
    }
  }

const mapDispatchToProps = (dispatch) => {
    return {
        company_application_save: (newApply) => dispatch(company_application_save(newApply)) //creds -> funding
    };
};


export default compose(
    connect(mapStateToProps,mapDispatchToProps),

    firestoreConnect(props=> {
            const user_email = props.auth.email == null ? "none": props.auth.email;
            console.log('user email:', user_email);

            return[
                {
                    collection: 'companies',
                    where: [['email', '==', user_email]],
                },
                {
                    collection: 'recruitCompanies', doc: props.match.params.id
                },
                {
                    collection: 'applications',
                    where:["recruit_id","==", props.match.params.id]
                }
            ]
        }
    )
)(RecruitFormDetail)



//export default FundingDetail;