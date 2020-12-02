import React, {Component, useEffect, useRef, useState} from 'react';
import { Link } from "react-router-dom";
import {
  TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, CardImg, CardBody,
  CardSubtitle,
  Container, CustomInput, Input, Label, FormGroup, Form, ModalFooter, Modal
} from 'reactstrap';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {BsPlus} from 'react-icons/bs'
import classnames from 'classnames';
import TabPane3 from './TabPane3';
import MyFunding from "./MyFunding";
import MyRecruit from "./MyRecruit";
import {connect, useSelector} from 'react-redux';
import MyParticipation from "./MyParticipation";
import SideBar from "./SideBar"
import {storage} from "../../config/fbConfig";
import firebase from "firebase";
import {useFirestoreConnect} from "react-redux-firebase";
import Select from "react-select";
import makeAnimated from "react-select/animated/dist/react-select.esm";
import DaumPostCode from "react-daum-postcode";


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const SmallAvatar = withStyles((theme) => ({
  root: {
    width: 50,
    height: 50,
    border: `2px solid ${theme.palette.background.paper}`,
    backgroundColor: '#44b700',
    marginLeft: "120px",
    marginTop: "20px"
  },
}))(Avatar);

const style = {
  control: (base) => ({
    ...base,
    border: 1,
    // This line disable the blue border
    boxShadow: "none",
  }),
};

const MyAccount = (props) => {

  const uid = firebase.auth().currentUser ? props.auth.uid : null;
  console.log(uid);

  useFirestoreConnect([{
    collection: 'users',
    where:[
      ["user_uid","==",uid]
    ]
  }]);

  const user= useSelector((state)=>state.firestore.ordered.users);
  // const user=useSelector(({firestore:{data}})=>data && data.users);


console.log(props);

  const [activeTab, setActiveTab] = useState("1");
  const classes = useStyles();
  const [profile,setProfile]=useState(null);
  const [url,setUrl]=useState("");
  const [file,setFile]=useState("");
  const [previewURL, setPreview]=useState(null);
  const [modify,setModify]=useState(false);
  const [artistSelect,setArtist]=useState("");
  const [fullAddress, setFullAdd] = useState(false);
  const [zoneCode, setZoneCode] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);

    const [inputs, setInputs]=useState({
        nickname:'',
      detailAddress:'',

    });


  const options = [
    { value: "BTS", label: "BTS" },
    { value: "BLACKPINK", label: "BLACKPINK" },
    { value: "APINK", label: "APINK" },
    { value: "TXT", label: "TXT" },
    { value: "DAY6", label: "DAY6" },
    { value: "TWICE", label: "TWICE" },
    { value: "Stray Kids", label: "Stray Kids" },
    { value: "B1A4", label: "B1A4" },
    { value: "NU'EST", label: "NU'EST" },
    { value: "IDLE", label: "IDLE" },
    { value: "기타", label: "기타" },
  ];

  const animatedComponents = makeAnimated();

  const handleChangeSelect = (e) => {
    // console.log(e);
    setArtist(e);
  };

  const toggleNested = () => {
    setNestedModal(!nestedModal);
  }
  const handleChange = (e)=>{
    const {value, name}=e.target;
    setInputs({
      ...inputs,
      [name]:value
    })
    console.log(inputs)
  }



  let myfunding=null;

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);

  };
  //리스트 만들기

  const hiddenFileInput=React.useRef();

  const handleImageChange=(e)=>{
    e.preventDefault();
    console.log(e.target.files[0]);
    let reader = new FileReader();
    let file= e.target.files[0];
    reader.onloadend=()=>{
      setFile(file);
      setPreview(reader.result)
    };
    reader.readAsDataURL(file);
  };
  const handleClick=(e)=>{
    // alert("클릭");
    hiddenFileInput.current.click();
  };

  const handleModify = () => setModify(!modify);

  const handleAddress = (data) => {
    let AllAddress = data.address;
    let extraAddress = '';
    let zoneCodes = data.zonecode;

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
      }
      AllAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
    }
    setFullAdd(AllAddress);
    setZoneCode(zoneCodes);
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    if(file!==""){
      const uploadTask = storage.ref(`profile/${firebase.auth().currentUser.email}`).put(file);
      uploadTask.on(
          "state_changed",
          snapshot => {
            // const progress = Math.round(
            //     (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            // );
            // this.setState({progress: progress});
          },
          error => {
            console.log(error);
          },
          () => {
            storage
                .ref("profile")
                .child(firebase.auth().currentUser.email)
                .getDownloadURL()
                .then(url => {
                  setUrl(url);
                  console.log(url);
                  setProfile(file.name);
                  console.log(profile);

                })
          }
      )
    }
  };
  const handleCancel=()=>{

    window.location.reload();

  };

  if(props.auth.isLoaded && user!==undefined){
    console.log(inputs)
    return (
      <>
      
      <section class="gallery5 mbr-gallery cid-sgtDmxvlJH" id="gallery5-q">
      <Container>
        <Row>
          <Col>
            <SideBar/>
          </Col>
          {/*<SideBar />*/}
          <Col>
            <div className={classes.root}>
              <Row>
                <Badge overlap="circle" anchorOrigin={{vertical:'bottom', horizontal: 'right'}}
                       badgeContent={
                         <div>
                           <SmallAvatar children={<BsPlus/>} onClick={handleClick.bind()} style={{cursor:'pointer'}}/>
                           <input type="file" id="profile" ref={hiddenFileInput} onChange={handleImageChange} style={{visibility:"hidden"}}/>
                         </div>
                       }>

                  {
                    file!=="" ?
                      <Avatar style={{  width: "150px", height: "150px", marginLeft:"250px"}} alt="Remy Sharp" src={previewURL}/>
                      :
                        <Avatar style={{  width: "150px", height: "150px", marginLeft:"250px"}} alt="Remy Sharp"/>
                  }

                </Badge>
              </Row>
            </div>
            <Row>
              <Col style={{width:"732px", paddingTop:"30px"}}>
                <CardText><b>이메일: {user[0].user_email}</b></CardText>
                <CardText><b>닉네임</b></CardText>
                {
                  modify===true ?
                      (
                          <div>
                            <Input placeholder={user[0].nickname}></Input>
                            <Button onClick={handleModify}>취소</Button>
                            <Button onClick={handleModify}>완료</Button>
                          </div>
                      )

                      :
                      <CardText>
                        {user[0].nickname}
                        <Button
                            className="ml-3"
                            color="warning"
                            size="sm"
                            onClick={handleModify}

                        >
                          수정
                        </Button>
                      </CardText>

                }

                <CardText><b>선호 아티스트</b></CardText>
                {/*{user[0].artistSelect.map(artist=>{*/}
                {/*  return(*/}
                {/*      <CardText>{artist.label}</CardText>*/}
                {/*  )*/}
                {/*    }*/}
                {/*)}*/}

                <Select
                    styles={style}
                    id="artistSelect"
                    components={animatedComponents}
                    options={options}
                    menuPortalTarget={document.body}
                    style={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                    isMulti
                    defaultValue={user[0].artistSelect.map(artist=>artist)}
                    onChange={handleChangeSelect}
                />


                <CardText><b>배송지 정보</b></CardText>
                <Button color="primary" onClick={toggleNested}>우편번호 찾기</Button>
                <Modal isOpen={nestedModal} toggle={toggleNested}>
                  <Form>
                    {
                      nestedModal ?
                          <DaumPostCode
                              onComplete={handleAddress}
                              autoClose='true'
                              // width={width}
                              // height={height}
                              // style={modalStyle}
                              nestedModal={nestedModal}
                          />
                          : null
                    }
                  </Form>
                  <ModalFooter>
                    <Button color="secondary" onClick={toggleNested}>닫기</Button>
                  </ModalFooter>
                </Modal>

                <FormGroup>
                  {
                    zoneCode === false ? <Input type="zoneCode" name="zoneCode" id="zoneCode"
                                                placeholder="우편번호"
                                                onChange={handleChange}
                        /> :
                        <Input type="zoneCode" name="zoneCode" id="zoneCode"
                               value={zoneCode}
                               onChange={handleChange}
                        />
                  }
                </FormGroup>

                <FormGroup>
                  {
                    fullAddress === false ? <Input type="fullAddress" name="fullAddress" id="fullAddress"
                                                   placeholder="주소"
                                                   onChange={handleChange}
                        /> :
                        <Input type="fullAddress" name="fullAddress" id="fullAddress"
                               value={fullAddress}
                               onChange={handleChange}
                        />
                  }
                </FormGroup>
                <FormGroup>
                  <Input type="detailAddress" name="detailAddress" id="detailAddress"
                         placeholder="상세 주소를 입력하세요"
                         onChange={handleChange}
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="Refund"><b>환불계좌정보입력</b></Label>
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

              </Col>
            </Row>
            <Row style={{position:"absolute", left:"25%"}}>
              <Button onClick={handleSubmit}>변경사항 저장</Button>
              <Button onClick={handleCancel}>취소</Button>

            </Row>
          </Col>

          <div>
          <h4 style={{paddingTop: '28px', paddingLeft:'25px'}}>내 정보에서는 프로필 관리, 펀딩 관리, 총대 인증을 하고 위시 리스트를 볼 수 있습니다. </h4>
          </div>
        </Row>
          
          {/* <Nav tabs>
            <NavItem>
              <NavLink
                  className={classnames({ active: activeTab === '1' })}
                  onClick={() => { toggle('1'); }}
              >
                내 정보 관리
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                  className={classnames({ active: activeTab === '2' })}
                  onClick={() => { toggle('2'); }}
              >
                총대 인증
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                  className={classnames({ active: activeTab === '3' })}
                  onClick={() => { toggle('3'); }}
              >
                내가 만든 펀딩 관리
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                  className={classnames({ active: activeTab === '4' })}
                  onClick={() => { toggle('4'); }}
              >
                참여한 펀딩
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                  className={classnames({ active: activeTab === '5' })}
                  onClick={() => { toggle('5'); }}
              >
                내가 만든 업체 모집글 관리
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                  className={classnames({ active: activeTab === '6' })}
                  onClick={() => { toggle('6'); }}
              >
                마이 위시리스트
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <Row>
                <Col sm="12">
                  <h4>Tab 1 Contents</h4>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <Row>
                <Col sm="6">
                  <Card body>
                    <CardTitle>본인 인증</CardTitle>
                    <CardText>펀딩을 생성하려면 본인 인증이 필요합니다.</CardText>
                    <Button color="warning">본인 인증</Button>
                  </Card>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="3">
              <MyFunding></MyFunding>
            </TabPane>
            <TabPane tabId="4">
              <MyParticipation/>
            </TabPane>
            <TabPane tabId="5">
              <MyRecruit></MyRecruit>
            </TabPane>
          </TabContent> */}
        </Container>
        </section>
        </>

    );

  }else{
    return(
      <div>Loading...</div>
    )
  }
}


const mapStateToProps = (state) => {
  return{
    authError: state.auth.authError,
    auth: state.firebase.auth,
    user_data: state.user_data
  }
};

export default connect(
    mapStateToProps
)(MyAccount);
