import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect, isLoaded } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import {
  CardImg,
  CardText,
  Container,
  Row,
  Col,
  Button,
  Progress,
  Form,
  FormGroup,
  Label,
  Input,
  Table,
  NavLink,
  NavItem,
} from "reactstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter, Badge } from "reactstrap";

//import { Viewer } from '@toast-ui/editor/dist/toastui-editor-viewer';
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { Editor, Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

import "./company.css";
import recruitCompanyActions, {
  company_application_save,
} from "../../../store/actions/recruitCompanyActions";
import { check_user_type } from "../../../store/actions/userActions";
import { company_select } from "../../../store/actions/recruitCompanyActions";

import firebase from "firebase";
import App from "../../../App";
//import moment from 'moment';
import { Link } from "react-router-dom";
import CompanyChat from "../../chatting/companychat/CompanyChat";

let imgStyle = {
  maxHeight: "400px",
  maxWidth: "400px",
};

class RecruitFormDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recruitCompany: this.props.recruitCompany,
      comments: "",
      render: "",
      price: "",
      time: "",
      minimum: "",
      others: "",
      recruit_id: this.props.match.params.id,
      company_name: "",
      modal: false,
      isChatView: false,
      index: "",
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    console.log(this.props);
    this.setState({
      modal: !this.state.modal,
    });
  }
  handleClickChatView = (i) => {
    this.setState({
      isChatView: true,
      index: i,
    });
  };
  // componentWillReceiveProps() {
  //   console.log("ComponentDidMount");
  //   console.log(this.props.auth.email)
  //   this.props.dispatch(check_user_type(this.props.auth.email))
  // }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // console.log(prevProps);
    // console.log(this.props)
    if (prevProps.recruitCompany !== this.props.recruitCompany) {
      console.log("ComponentDidUpdate");
      this.props.dispatch(check_user_type(this.props.auth.email));
    }
  }

  componentWillUnmount() {
    console.log("unmount");
  }

  viewerRef = React.createRef();

  handleCommentChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
    // console.log(e.target.value);
  };

  handleClick = (Comp, e) => {
    this.setState({ render: Comp });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
    this.setState({ company_name: this.props.company[0].name });

    // console.log(e.target.value);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("제출");
    // console.log(this.state);

    this.props.company_application_save(this.state);
    alert("지원서를 제출하였습니다");
    this.toggle();
  };
  renderComments() {
    switch (this.state.render) {
      case "comments":
        return <Comments comments={this.state.comments} />;
    }
  }
  render() {
    console.log("RecruitFormDetail");

    const { recruitCompany } = this.props;
    if (isLoaded(recruitCompany) && recruitCompany) {
      // console.log(this.props.match.params.id);
      // console.log(this.props.application);
      // console.log(this.props.user_type[0]);
      const { user_type } = this.props;
      console.log(user_type[0]);
      if (isLoaded(user_type) && user_type[0] === "company") {
        console.log("업체업체업체");
        if (this.state.isChatView === true) {
          return (
            <CompanyChat
              company={this.props.application[this.state.index]}
              history={this.props.history}
            ></CompanyChat>
          );
        }
        return (
          <>
            <section
              className="gallery5 mbr-gallery cid-sgtDmxvlJH"
              id="gallery5-q"
            >
              <Container>
                <div className="text-center">
                  <h2>
                    <b>{recruitCompany.itemTitle}</b>
                  </h2>
                </div>
                <Row>
                  <Col>
                    <div className="text-center">
                      <CardImg
                        className="mx-auto"
                        top
                        width="10%"
                        src={recruitCompany.itemImage}
                        style={imgStyle}
                        alt="Card image cap"
                      />
                    </div>
                    <div className="text-center">
                      <CardText>
                        예상 가격대 : 개당 {recruitCompany.itemPrice}원
                      </CardText>
                      <CardText>
                        예상 개수 : {recruitCompany.itemRemain}
                      </CardText>
                    </div>
                  </Col>
                </Row>

                <div className="mt-auto text-center">
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
                    <Button
                      color="warning"
                      onClick={this.toggle}
                      size="lg"
                      block
                    >
                      지원하기
                    </Button>

                    <Modal
                      style={{ height: "700px" }}
                      isOpen={this.state.modal}
                      toggle={this.toggle}
                      className={this.props.className}
                    >
                      <Form onSubmit={this.handleSubmit}>
                        <ModalHeader toggle={this.toggle} charCode="x">
                          지원서
                        </ModalHeader>
                        <ModalBody>
                          <div className="companyRecruit">
                            <h3>{recruitCompany.itemTitle}</h3>

                            <FormGroup>
                              <Label for="PaymentInfo">단가</Label>
                              <Input
                                type="text"
                                name="price"
                                id="price"
                                placeholder="단가 입력"
                                onChange={this.handleChange}
                              />
                            </FormGroup>
                            <FormGroup>
                              <Label for="PaymentInfo">최소 주문수량</Label>
                              <Input
                                type="text"
                                name="minimum"
                                id="minimum"
                                placeholder="최소 주문수량 입력"
                                onChange={this.handleChange}
                              />
                            </FormGroup>
                            <FormGroup>
                              <Label for="Refund">제작 소요일</Label>
                              <Input
                                type="text"
                                name="time"
                                id="time"
                                placeholder="제작 소요일 입력"
                                onChange={this.handleChange}
                              />
                            </FormGroup>
                            <FormGroup>
                              <Label for="Refund">기타 사항</Label>
                              <Input
                                type="textarea"
                                name="others"
                                id="others"
                                placeholder="기타 사항 입력"
                                onChange={this.handleChange}
                              />
                            </FormGroup>
                            <Label>
                              모든제품은 과세대상 상품입니다. 선택하신
                              제품가격에 부가세 10%가 별도로 청구되오니
                              제품구입시 확인 부탁드립니다.{" "}
                            </Label>
                            {/*<Button color="primary" onSubmit={this.handleSubmit}>제출하기</Button>{' '}*/}

                            <ModalFooter>
                              <Button color="primary">제출하기</Button>{" "}
                              <Button color="secondary" onClick={this.toggle}>
                                닫기
                              </Button>
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
                  {/*<ApplicationList applications={this.props.application}></ApplicationList>*/}

                  <ApplicationList
                    applications={this.props.application}
                    chongdae={recruitCompany.user_email}
                    dispatchFunc={this.props.company_select}
                    isSelectd={recruitCompany.isSelected}
                    handleClickChatView={this.handleClickChatView}
                  ></ApplicationList>
                </div>

                <div>
                  {/*{this.state.comments}*/}
                  {this.renderComments()}
                </div>
              </Container>
            </section>
          </>
        );
      } else if (isLoaded(user_type) && user_type[0] === "users") {
        if (this.state.isChatView === true) {
          return (
            <CompanyChat
              company={this.props.application[this.state.index]}
              history={this.props.history}
            ></CompanyChat>
          );
        }
        return (
          <>
            <section
              className="gallery5 mbr-gallery cid-sgtDmxvlJH"
              id="gallery5-q"
            >
              <Container>
                <div className="text-center">
                  <h2>
                    <b>{recruitCompany.itemTitle}</b>
                  </h2>
                </div>
                <Row>
                  <Col>
                    <div className="text-center">
                      <CardImg
                        className="mx-auto"
                        top
                        width="10%"
                        src={recruitCompany.itemImage}
                        style={imgStyle}
                        alt="Card image cap"
                      />
                    </div>
                    <div className="text-center">
                      <CardText>
                        <strong>예상 가격대</strong> : 개당{" "}
                        {recruitCompany.itemPrice}원
                      </CardText>
                      <CardText>
                        <strong>예상 개수</strong> : {recruitCompany.itemRemain}
                      </CardText>
                    </div>
                  </Col>
                </Row>

                <div className="mt-auto text-center">
                  <p style={{ paddingTop: "20px" }}>
                    <strong>상세 설명</strong>
                  </p>
                  <Viewer
                    height="400px"
                    initialValue={recruitCompany.content}
                    ref={this.viewerRef}
                    previewStyle="vertical"
                    initialEditType="wysiwyg"
                  />
                </div>
                <Row></Row>

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
                  <h3 style={{ paddingTop: "50px" }}>지원현황</h3>
                  <ApplicationList
                    applications={this.props.application}
                    chongdae={recruitCompany.user_email}
                    dispatchFunc={this.props.company_select}
                    isSelectd={recruitCompany.isSelected}
                    handleClickChatView={this.handleClickChatView}
                  ></ApplicationList>
                </div>

                <div>
                  {/*{this.state.comments}*/}
                  {this.renderComments()}
                </div>
              </Container>
            </section>
          </>
        );
      } else {
        console.log("Loading....");
        return <div>Loading...</div>;
      }

    } else {
      // console.log(this.state)
      return (
        <div>
          <p>Loading form...</p>
        </div>
      );
    }
  }
}

class Comments extends Component {
  constructor() {
    super();
    this.state = {
      comments: "",
    };
  }

  render() {
    return <div>{this.props.comments}</div>;
  }
}

class ApplicationList extends Component {
  constructor() {
    super();
    this.state = {
      modal: false,
      apply_id: "",
      select_email: "",
      recruit_id: "",
      select_name: "",
    };
    this.toggle = this.toggle.bind(this);
    this.selectCompany = this.selectCompany.bind(this);
  }
  handleClick = () => {
    console.log("click");
    window.location.href = "/";
  };

  toggle(apply) {
    this.setState(
      {
        apply_id: apply,
        modal: !this.state.modal,
      }
      // },
      //     ()=>{
      //     //this.receive_apply(apply)}
      //     console.log(this.state.modal)
      //         if(this.state.modal===true){
      //             this.receive_apply(apply)
      //         }
      //     }
    );
  }

  noAuth() {
    alert("권한이 없습니다.");
  }
  selectCompany(email, recruit_id, name) {
    console.log(email, recruit_id);
    console.log(this.props);
    if (this.props.isSelectd === true) {
      console.log("선정완료");
      alert("이미 업체를 선정하였습니다.");
    } else {
      alert("업체럴 선정하였습니다.");
      this.setState(
        {
          select_name: name,
          select_email: email,
          recruit_id: recruit_id,
          chongdae: this.props.chongdae,
        },
        () => this.props.dispatchFunc(this.state)
      );

      // this.setState({
      //     select_email:email,
      //     recruit_id:recruit_id,
      //     chongdae:this.props.chongdae
      // })
    }
  }
  render() {
    // console.log(this.props);
    const { applications } = this.props;
    // console.log(applications);
    if (isLoaded(applications) && applications) {
      return (
        <div>
          <Table hover responsive>
            <thead>
              <tr style={{ textAlign: "center" }}>
                <th scope="row">No.</th>
                <th scope="row">업체명</th>
                <th scope="row">지원서보기</th>
                <th scope="row">문의하기</th>
                {this.props.chongdae === firebase.auth().currentUser.email ? (
                  <th>업체선정</th>
                ) : null}
              </tr>
            </thead>

            {applications.map((apply, i) => {
              if (
                this.props.chongdae === firebase.auth().currentUser.email ||
                apply.company_email === firebase.auth().currentUser.email
              ) {
                return (
                  <tbody key={i}>
                    <tr style={{ textAlign: "center" }}>
                      <td scope="row">{i + 1}</td>
                      <td
                        style={{
                          textAlign: "center",
                          width: "30%",
                          margin: "auto",
                        }}
                      >
                        {apply.company_name}
                      </td>
                      {/*<td>지원서 제목</td>*/}
                      <td style={{ textAlign: "center" }}>
                        <Button onClick={() => this.toggle(apply)}>
                          지원서 보기
                        </Button>
                      </td>
                      <td>
                        {/*{console.log("아이디",apply.id)}*/}
                        {firebase.auth().currentUser.email ===
                        this.props.chongdae ? (
                          <Button
                            onClick={() => this.props.handleClickChatView(i)}
                          >
                            문의하기
                          </Button>
                        ) : (
                          <Button href={"/TotalChat"}>
                            내 채팅방으로 이동
                          </Button>
                        )}
                        {/*<Button>문의하기</Button>*/}
                      </td>
                      {firebase.auth().currentUser.email ===
                      this.props.chongdae ? (
                        <td>
                          <Button
                            color="primary"
                            onClick={() =>
                              this.selectCompany(
                                apply.company_email,
                                apply.recruit_id,
                                apply.company_name
                              )
                            }
                          >
                            업체 선정하기
                          </Button>
                        </td>
                      ) : null}
                    </tr>
                  </tbody>
                );
              } else {
                return (
                  <tbody key={i}>
                    <tr style={{ textAlign: "center" }}>
                      <td scope="row">{i + 1}</td>
                      <td>{apply.company_name}</td>
                      <td>
                        {/*<Button onClick={this.noAuth}>지원서 보기</Button>*/}
                        열람 권한이 없습니다.
                      </td>
                      <td>
                        {/*{console.log("아이디",apply.id)}*/}
                        <Button onClick={this.noAuth}>X</Button>
                      </td>
                    </tr>
                  </tbody>
                );
              }
            })}
          </Table>

          <div>
            <Modal
              isOpen={this.state.modal}
              toggle={this.toggle}
              className="class"
            >
              {console.log(this.state)}

              <ModalHeader toggle={this.toggle} charCode="x">
                지원서
              </ModalHeader>
              <ModalBody>
                <div className="companyRecruit">
                  <h5>[업체명] {this.state.apply_id.company_name}</h5>
                  <h5>[단가] {this.state.apply_id.price}</h5>
                  <h5>[최소주문수량] {this.state.apply_id.minimum}</h5>
                  <h5>[제작소요시간] {this.state.apply_id.time}</h5>
                  <h5>[기타사항] {this.state.apply_id.others}</h5>

                  <Label>
                    모든제품은 과세대상 상품입니다. 선택하신 제품가격에 부가세
                    10%가 별도로 청구되오니 제품구입시 확인 부탁드립니다.{" "}
                  </Label>
                  {/*<Button color="primary" onSubmit={this.handleSubmit}>제출하기</Button>{' '}*/}

                  <ModalFooter>
                    {/*{firebase.auth().currentUser.email==this.props.chongdae ?*/}
                    {/*    <Button color="primary" onClick={()=>this.selectCompany(this.state.apply_id)}>업체 선정하기</Button>*/}
                    {/*    : <Button color="primary" onClick={this.toggle}>확인</Button>*/}
                    {/*}*/}
                    {/*<Button color="primary" onClick={this.selectCompany}>업체 선정하기</Button>{' '}*/}
                    <Button color="secondary" onClick={this.toggle}>
                      닫기
                    </Button>
                  </ModalFooter>
                </div>
              </ModalBody>
            </Modal>
          </div>
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(state);
  const id = ownProps.match.params.id;
  const recruitCompanies = state.firestore.data.recruitCompanies;
  const recruitCompany = recruitCompanies ? recruitCompanies[id] : null;
  return {
    recruitCompany: recruitCompany,
    auth: state.firebase.auth,
    application: state.firestore.ordered.applications,
    company: state.firestore.ordered.companies,
    user_type: state.auth.user_type,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    company_application_save: (newApply) =>
      dispatch(company_application_save(newApply)), //creds -> funding
    company_select: (Com) => dispatch(company_select(Com)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),

  firestoreConnect((props) => {
    const user_email = props.auth.email == null ? "none" : props.auth.email;
    console.log("user email:", user_email);

    return [
      {
        collection: "companies",
        where: [["email", "==", user_email]],
      },
      {
        collection: "recruitCompanies",
        doc: props.match.params.id,
      },
      {
        collection: "applications",
        where: ["recruit_id", "==", props.match.params.id],
      },
    ];
  })
)(RecruitFormDetail);

//export default FundingDetail;
