import React, {Component, useEffect, useState} from 'react';
import { Card, CardImg, CardTitle, CardSubtitle, CardText, CardBody, Container,
    Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Button, Progress, Form, FormGroup, Label, Input, Tooltip} from 'reactstrap';
import {connect, useSelector, useDispatch} from "react-redux";
import ProgressBar from 'react-bootstrap/ProgressBar'
import { Link } from 'react-router-dom';
import {isLoaded, useFirestoreConnect} from "react-redux-firebase";
import firebase from "firebase/app"
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer} from '@toast-ui/react-editor';
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { BsHeart, BsChatSquareDots, BsFillBellFill , BsFillHeartFill} from "react-icons/bs";
import {FaShareAlt} from "react-icons/fa";
import {Participate_save, add_cart, remove_cart} from "../../store/actions/userActions";
import DaumPostCode from 'react-daum-postcode';
import QuestionChat from "../chatting/questionchat/QuestionChat";
import {close_funding} from "../../store/actions/formActions";


let imgStyle = {
    maxHeight: '500px',
    maxWidth: '700px'
}
const tooltipText = '클립보드에 링크가 복사됩니다';

const FundingDetails = (props)=>{

    const viewerRef = React.createRef();

    const doc_id=props.match.params.id;
    const user_email= props.auth.email == null ? "none" : props.auth.email
    // console.log(user_email)
       useFirestoreConnect([
           {
        collection: 'fundings',
        doc: doc_id
            },
           {
               collection: 'users',
               doc:user_email
           },
            ]
       );

    const funding=useSelector(({firestore:{data}})=>data.fundings && data.fundings[doc_id]);
    const user=useSelector(({firestore:{data}})=>data.users && data.users[user_email]);

    var like=false;
    if(user&&user.like&&user.like.indexOf(doc_id)>-1){
        like=true;
     }

        const [inputs, setInputs]=useState({

        name:'',
        price:'',
        date:'',
        time:'',
        bank:'',
        accountNumber:'',
        accountName:'',
        email:"",
        fid:doc_id,
        detailAddress:'',

        // nickname:firebase.auth().currentUser.nickname,
    });


    const auth_list=[{label:"streamingImage",value:"스트리밍 인증"},
        {label:"fanclubImage",value:"팬클럽 인증"},
        {label:"concertImage",value:"공연 관람 인증"},
        {label:"albumImage",value:"앨범 인증"}]

    // const [isModalOpen,setModal]=useState(false);
    const dispatch = useDispatch();
    const [tooltipOpen, setTooltipOpen] = useState(false);

    const [modal, setModal] = useState(false);
    const [nestedModal, setNestedModal] = useState(false);


    const [isChatView, setChat]=useState(false);
    const [progress, setProgress]=useState(0);
    // const [address, setAdd] = useState(false);
    const [fullAddress, setFullAdd] = useState(false);
    const [zoneCode, setZoneCode] = useState(false);

    const [likes, setLike]=useState(false);

    const toggleNested = () => {
        setNestedModal(!nestedModal);
    }
    

    const [currentDate,setDate]=useState(new Date());

    const toggle = () => {setModal(!modal);handleEmail()}

    const toggleTooltip = () => setTooltipOpen(!tooltipOpen);
    const handleChange = e => {
        const {value, name}=e.target;
        setInputs({
            ...inputs,
            [name]:value
        })
        console.log(inputs)
    };

     // postcode
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
        // this.setState ({
        //     fullAddress: AllAddress,
        //     zoneCode : zoneCodes
        // })
      }

    function handleSubmit(e,funding){

        e.preventDefault();
        console.log(inputs);

        console.log(funding.progress);
        dispatch(Participate_save(inputs,inputs.fid,funding.progress, fullAddress,zoneCode));

        // console.log(funding.progress)


        alert("펀딩에 참여하였습니다.");
        setModal(!modal);
        setProgress(progress+funding.progress)
    };



    
    const handleClickChatView=()=>{
        console.log("chatview");
        setChat(true);
    }

    const handleEmail=e=>{
        setInputs({
            ...inputs,
            email:firebase.auth().currentUser.email
        })

        console.log("handleEmail:",inputs.email)
    }

   const HandleClose=()=>{
            dispatch(close_funding(inputs.fid))
    }

    function handleLike(e,funding){

        // console.log("좋아요",doc_id,funding.like);
        dispatch(add_cart(doc_id,funding.like));
        setLike(!likes)
    }

    function handleDislike(e,funding){
        // console.log("취소",doc_id,funding.like);
        dispatch(remove_cart(doc_id,funding.like));
        setLike(!likes)

    }

    function loginAlert(){
        alert("로그인 후 이용가능한 서비스 입니다.");
    }
    const url=window.location.href;



    //로그인 되어 있을 때
    if(funding && firebase.auth().currentUser){
        // var percent=0;
        let percent=0;
        if(funding.progress!==0){
            percent=Math.round(funding.progress/funding.itemRemain*100);

        }
        const difference= new Date(funding.fundingEndDate)-currentDate.getTime();
        const period=Math.ceil(difference/(1000*60*60*24));

        // if(period<0){
        //     HandleClose(period)
        // }


            if(funding.fundingType==="reward"){
                if(isChatView===true){
                    return(
                        <QuestionChat funding={funding} history={props.history}></QuestionChat>
                    )
                }
                return(
                    <section className="gallery5 mbr-gallery cid-sgtDmxvlJH" id="gallery5-q">
                        <Container>
                            <Button disabled className="xs ml-0" style={{backgroundColor:"#ebebeb"}}>{funding.artistSelect}</Button>
                            <div className="text-left"><h2><b>{funding.fundingTitle}</b></h2></div>
                            <div>
                                <Row xs="12" sm="12" md="2">
                                    <Col xs="12" sm="12" md="8"><CardImg top width="10%" src={funding.thumbnailImage} style={imgStyle}  alt="Card image cap" /></Col>
                                    <Col xs="12" sm="12" md="4">
                                        <div>
                                            <div className="text-center mt-30" style={{fontSize:"1.5em", paddingTop:'30px'}} ><b>{percent}% 달성</b></div>
                                            <ProgressBar variant={"info"} min="0" max="100" now={percent}/>
                                            {/*<Progress color="info" value="80" />*/}
                                            <p style={{paddingLeft:"16px"}} style={{fontSize:"1.5em"}} className="mt-3"><b>{funding.progress}명</b>의 FAN</p>
                                            <p style={{paddingLeft:"16px"}} style={{fontSize:"1.5em"}} className="mt-3"><b>{period}일</b> 남음</p>

                                            {
                                                funding.isClosed===true ? (
                                                    <div>
                                                    <Col xs="12"><Button color="secondary" size="sm" className="btn-responsive" disabled block>펀딩이 마감되었습니다.</Button></Col>
                                                        {firebase.auth().currentUser.uid===funding.user_uid ?
                                                            <Link to ={'../funding_state/'+doc_id} funding={funding}>
                                                                <Col><Button>참여 현황 보기</Button></Col>
                                                            </Link> : null
                                                        }
                                                    </div>
                                                    )
                                                    :
                                                    firebase.auth().currentUser.uid===funding.user_uid ?
                                                        ( <Row xs="2">
                                                            {/*<Col><Button>수정하기</Button></Col>*/}
                                                            <Link to ={'../funding_state/'+doc_id} funding={funding}>
                                                                <Col><Button>참여 현황 보기</Button></Col>
                                                            </Link>
                                                            <Col><Button onClick={HandleClose}>펀딩 마감하기</Button></Col>

                                                        </Row>)
                                                        :
                                                        (<Row xs="2">
                                                            <Col xs="12">
                                                            <Button className="btn-responsive" block color="info" onClick={toggle}>펀딩 참여하기</Button>
                                                        </Col></Row>)

                                            }

                                            {/*<Row xs="2">*/}
                                                {/*<Button color="info" onClick={toggle}>펀딩 참여하기</Button>*/}
                                                {/*<Col><Button>수정하기</Button></Col>*/}
                                                {/*<Link to ={'../funding_state/'+doc_id} funding={funding}>*/}
                                                {/*    <Col><Button>참여 현황 보기</Button></Col>*/}
                                                {/*</Link>*/}
                                            {/*</Row>*/}
                                            <Modal style={{height:'1120px'}} isOpen={modal} toggle={toggle}>
                                                <Form onSubmit={(e)=>handleSubmit(e,funding)}>
                                                    <ModalHeader toggle={toggle} charCode="x">입금폼</ModalHeader>
                                                    <ModalBody>
                                                        <div className="companyRecruit text-center">
                                                            <h3>[{funding.artistSelect}]{funding.fundingTitle}</h3>
                                                            <FormGroup>
                                                                <Label for="PaymentInfo"><b>입금정보입력</b></Label>
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
                                                            <Button color="primary" onClick={toggleNested}>우편번호 찾기</Button>
                                                            <Modal isOpen={nestedModal} toggle={toggleNested}>
                                                                <Form>
                                                                    {
                                                                        nestedModal ?
                                                                            <DaumPostCode
                                                                                onComplete={handleAddress}
                                                                                autoClose='true'
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
                                                                    <Label>이메일 주소</Label>
                                                                    <Input type="email" name="email" id="email"
                                                                           placeholder={firebase.auth().currentUser.email}
                                                                           onChange={handleChange}
                                                                    />
                                                                </FormGroup>
                                                            <ModalFooter>
                                                                <Button color="primary">제출하기</Button>{' '}
                                                                <Button color="secondary" onClick={toggle}>닫기</Button>
                                                            </ModalFooter>
                                                        </div>

                                                    </ModalBody>
                                                </Form>
                                            </Modal>
                                            <Row xs="12">
                                                <Col>
                                                    {
                                                        like === true ?
                                                            <Button className="btn-responsive" style={{backgroundColor: '#bfbfbf', borderColor:"#bfbfbf"}} size="xs" onClick={(e)=>handleDislike(e,funding)} block><BsFillHeartFill className="mr-2"/>{funding.like}</Button>
                                                            :
                                                            <Button className="btn-responsive" style={{backgroundColor: '#bfbfbf', borderColor:"#bfbfbf"}} size="xs" onClick={(e)=>handleLike(e,funding)} block><BsHeart className="mr-2"/>{funding.like}</Button>
                                                    }
                                                </Col>

                                                {firebase.auth().currentUser.uid===funding.user_uid ?
                                                    (
                                                        <Link to={"../../totalchat"}>
                                                            <Col><Button className="btn-responsive" color="secondary" size="xs" block><BsChatSquareDots className="mr-2"/>  문의</Button></Col>
                                                        </Link>
                                                    )
                                                :
                                                    (
                                                        <Col><Button className="btn-responsive" onClick={handleClickChatView} color="secondary" size="xs" block><BsChatSquareDots className="mr-2"/>  문의</Button></Col>
                                                    )
                                                }
                                                <Col>
                                                    <CopyToClipboard text={url} toggle={toggleTooltip} id="Tooltip">
                                                        <Button className="btn-responsive" color="secondary" size="xs" block ><FaShareAlt className="mr-2" />  
                                                        공유</Button>
                                                        
                                                    </CopyToClipboard>
                                                </Col><Tooltip
                                                        placement = "bottom" isOpen={tooltipOpen} target="Tooltip" toggle={toggleTooltip}>
                                                            클립보드에 복사되었습니다.
                                                        </Tooltip>
                                            </Row>
                                            <Row xs="2">
                                                <Col xs="12">
                                                <Link className="inactive" activeClassName="active" to={'../notice/list/' + doc_id}>
                                                <Button size="sm" className="button-responsive" block color="success" style={{backgroundColor:"#635d5d", borderColor:"#635d5d"}}>NOTICE <BsFillBellFill className="ml-2 mb-20"/>
                                                </Button>
                                                </Link>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                </Row>
                                <Row xs="3" style={{paddingTop: "50px"}}>
                                
                                    
                                    <Col xs={12} sm={12} md={8}>

                                        <CardText>
                                            <CardText><b style={{fontSize:"1.5em"}}>펀딩 기간(입금 기간)</b></CardText>
                                            <CardText style={{marginBottom:'20px'}}>{funding.fundingStartDate} {funding.fundingStartTime} ~ {funding.fundingEndDate} {funding.fundingEndTime}</CardText>
                                            <CardText><b style={{fontSize:"1.5em"}}>펀딩달성기준</b></CardText>
                                            <CardText style={{marginBottom:'20px'}}>{funding.itemRemain}명</CardText>
                                            <CardText><b style={{fontSize:"1.5em"}}>품목</b></CardText>
                                            <CardText style={{marginBottom:'20px'}}>{funding.itemTitle}</CardText>
                                            <CardText><b style={{fontSize:"1.5em"}}>가격</b></CardText>
                                            <CardText style={{marginBottom:'20px'}}>{funding.itemPrice}원</CardText>
                                            <CardText><b style={{fontSize:"1.5em"}}>입금 계좌</b></CardText>
                                            {
                                                funding.isClosed===true ?
                                                    (<CardText>마감된 펀딩의 입금 계좌는 볼 수 없습니다.</CardText>)
                                                    : <CardText style={{marginBottom:'20px'}}>{funding.bankName} {funding.accountNum} {funding.accountName}</CardText>
                                            }
                                            <CardText><b style={{fontSize:"1.5em"}}>배송방법</b></CardText>
                                            <CardText style={{marginBottom:'20px'}}>{funding.shippingMethod}</CardText>
                                            <CardText><b style={{fontSize:"1.5em"}}>배송비</b></CardText>
                                            <CardText style={{marginBottom:'20px'}}>{funding.shippingFee}</CardText>
                                            <CardText><b style={{fontSize:"1.5em"}}>배송 안내</b></CardText>
                                            <CardText style={{marginBottom:'20px'}}>{funding.shippingDetail}</CardText>
                                        </CardText>

                                        <div className="text-left"><h4 className="pt-30"><b>상세 설명</b></h4></div>
                                        <div className="mt-20">
                                            <Viewer
                                                height="400px"
                                                initialValue={funding.content}
                                                ref={viewerRef}
                                                previewStyle="vertical"
                                                initialEditType="wysiwyg"
                                            />
                                        </div>
                                        <div>
                                            <div className="text-left"><h4 className="pt-30"><b>총대 팬 인증 정보</b></h4></div>
                                            {


                                                funding.fan_auth ? (
                                                    funding.fan_auth.map((fan)=>{
                                                        console.log(funding.fan_auth);

                                                        return(
                                                                auth_list.map((obj)=>{
                                                                    return(
                                                                        <div>
                                                                            {
                                                                                obj.label===fan.id ?
                                                                                    (
                                                                                        <div>
                                                                                            <CardText>{obj.value}</CardText>
                                                                                            <CardImg src={fan.url} style={{ maxHeight: 400,
                                                                                                maxWidth: 200}}></CardImg>
                                                                                        </div>

                                                                                    )
                                                                                    : null

                                                                            }

                                                                        </div>

                                                                    )
                                                                })

                                                        )

                                                    })
                                                ):null
                                            }

                                        </div>
                                    </Col>
                                    <Col  xs={12} sm={12} md={4}>
                                    
                                        <div className="text-left" style={{marginTop: "0px"}}><h4 className="mt-30"><b>업체 정보</b></h4></div>
                                        {funding.selectedCom ?
                                            <div style={{borderColor: "#635d5d", border: "1px solid #635d5d", borderRadius:"4px"}}>업체 이름 {funding.selectedCom.label}</div>
                                            :                                             <div style={{borderColor: "#635d5d", border: "1px solid #635d5d", borderRadius:"4px"}}>업체 이름</div>

                                        }
                                    </Col>
                                </Row>
                            </div>
                        </Container>
                    </section>

                )
            }
            // 모금형일때
            else{
                if(isChatView===true){
                    return(
                        <QuestionChat funding={funding} history={props.history}></QuestionChat>
                    )
                }
                return(
                    <section className="gallery5 mbr-gallery cid-sgtDmxvlJH" id="gallery5-q">
                        <Container>
                            <Button disabled className="xs ml-0" style={{backgroundColor:"#ebebeb"}}>{funding.artistSelect}</Button>
                            <div className="text-left"><h2><b>{funding.fundingTitle}</b></h2></div>
                            <div>
                                <Row xs="12" sm="12" md="2">
                                    <Col xs="12" sm="12" md="8"><CardImg top width="10%" src={funding.thumbnailImage} style={imgStyle}  alt="Card image cap" /></Col>
                                    <Col xs="12" sm="12" md="4">
                                        <div>
                                            <div className="text-center mt-30" style={{fontSize:"1.5em", paddingTop:'30px'}} ><b>{percent}% 달성</b></div>
                                            <ProgressBar variant={"info"} min="0" max="100" now={percent}/>

                                            <p style={{paddingLeft:"16px"}} style={{fontSize:"1.5em"}} className="mt-3"><b>{funding.progress}명</b>의 FAN</p>
                                            <p style={{paddingLeft:"16px"}} style={{fontSize:"1.5em"}} className="mt-3"><b>{period}일</b> 남음</p>

                                            {
                                                funding.isClosed===true ? (
                                                        <div>
                                                            <Col xs="12"><Button color="secondary" size="sm" className="btn-responsive" disabled block>펀딩이 마감되었습니다.</Button></Col>
                                                            {firebase.auth().currentUser.uid===funding.user_uid ?
                                                                <Link to ={'../funding_state/'+doc_id} funding={funding}>
                                                                    <Col><Button>참여 현황 보기</Button></Col>
                                                                </Link> : null
                                                            }
                                                        </div>
                                                    )
                                                    :
                                                    firebase.auth().currentUser.uid===funding.user_uid ?
                                                        ( <Row xs="2">
                                                            {/*<Col><Button>수정하기</Button></Col>*/}
                                                            <Link to ={'../funding_state/'+doc_id} funding={funding}>
                                                                <Col><Button>참여 현황 보기</Button></Col>
                                                            </Link>
                                                            <Col><Button onClick={HandleClose}>펀딩 마감하기</Button></Col>

                                                        </Row>)
                                                        :
                                                        (<Row xs="2">
                                                            <Col xs="12">
                                                                <Button className="btn-responsive" block color="info" onClick={toggle}>펀딩 참여하기</Button>
                                                            </Col></Row>)

                                            }

                                            <Modal style={{height:'1120px'}} isOpen={modal} toggle={toggle}>
                                                <Form onSubmit={(e)=>handleSubmit(e,funding)}>
                                                    <ModalHeader toggle={toggle} charCode="x">입금폼</ModalHeader>
                                                    <ModalBody>
                                                        <div className="companyRecruit text-center">
                                                            <h3>[{funding.artistSelect}]{funding.fundingTitle}</h3>
                                                            <FormGroup>
                                                                <Label for="PaymentInfo"><b>입금정보입력</b></Label>
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
                                                            {/*<div className="address">{this.fullAddress}</div>*/}
                                                            {/*    <div className="addressBox">*/}
                                                            {/*        <input type="text" value={this.address} name="address" onChange={handleChange}/>*/}
                                                            {/*    </div>*/}
                                                            <FormGroup>
                                                                <Label>이메일 주소</Label>
                                                                <Input type="email" name="email" id="email"
                                                                       placeholder={firebase.auth().currentUser.email}
                                                                       onChange={handleChange}
                                                                />
                                                            </FormGroup>
                                                            <ModalFooter>
                                                                <Button color="primary">제출하기</Button>{' '}
                                                                <Button color="secondary" onClick={toggle}>닫기</Button>
                                                            </ModalFooter>
                                                        </div>

                                                    </ModalBody>
                                                </Form>
                                            </Modal>
                                            <Row xs="12">
                                                <Col>
                                                    {
                                                        like === true ?
                                                            <Button className="btn-responsive" style={{backgroundColor: '#bfbfbf', borderColor:"#bfbfbf"}} size="xs" onClick={(e)=>handleDislike(e,funding)} block><BsFillHeartFill className="mr-2"/>{funding.like}</Button>
                                                            :
                                                            <Button className="btn-responsive" style={{backgroundColor: '#bfbfbf', borderColor:"#bfbfbf"}} size="xs" onClick={(e)=>handleLike(e,funding)} block><BsHeart className="mr-2"/>{funding.like}</Button>
                                                    }
                                                    {/*<Button className="btn-responsive" style={{backgroundColor: '#bfbfbf', borderColor:"#bfbfbf"}} size="xs" onClick={(e)=>handleLike(e,funding)} block><BsHeart className="mr-2"/>{funding.like}</Button>*/}
                                                </Col>

                                                {firebase.auth().currentUser.uid===funding.user_uid ?
                                                    (
                                                        <Link to={"../../totalchat"}>
                                                            <Col><Button className="btn-responsive" color="secondary" size="xs" block><BsChatSquareDots className="mr-2"/>  문의</Button></Col>
                                                        </Link>

                                                        // <Col><Button color="secondary" size="xs" block><BsChatSquareDots className="mr-2"/>  문의</Button></Col>
                                                    )
                                                    :
                                                    (
                                                        <Col><Button className="btn-responsive" onClick={handleClickChatView} color="secondary" size="xs" block><BsChatSquareDots className="mr-2"/>  문의</Button></Col>
                                                    )
                                                }
                                                {/*<Col><Button color="secondary" size="xs" block><BsChatSquareDots className="mr-2"/>  문의</Button></Col>*/}
                                                <Col>
                                                    <CopyToClipboard text={url} id="Tooltip" toggle={toggleTooltip}>
                                                        <Button className="btn-responsive" color="secondary" size="xs" block>
                                                            <FaShareAlt className="mr-2" />  
                                                        공유</Button>
                                                       
                                                    </CopyToClipboard>

                                                </Col> <Tooltip
                                                        placement = "bottom" isOpen={tooltipOpen} target="Tooltip" toggle={toggleTooltip}>
                                                           클립보드에 복사되었습니다.
                                                        </Tooltip>
                                            </Row>
                                            <Row xs="2">
                                                <Col xs="12">
                                                    <Link className="inactive" activeClassName="active" to={'../notice/list/' + doc_id}>
                                                        <Button size="sm" className="button-responsive" block color="success" style={{backgroundColor:"#635d5d", borderColor:"#635d5d"}}>NOTICE <BsFillBellFill className="ml-2 mb-20"/>
                                                        </Button>
                                                    </Link>
                                                </Col>
                                            </Row>

                                        </div>
                                    </Col>
                                </Row>
                                <Row xs="3" style={{paddingTop: "50px"}}>


                                    <Col xs={12} sm={12} md={8}>

                                        <CardText>
                                            <CardText><b style={{fontSize:"1.5em"}}>펀딩 기간(입금 기간)</b></CardText>
                                            <CardText style={{marginBottom:'20px'}}>{funding.fundingStartDate} {funding.fundingStartTime} ~ {funding.fundingEndDate} {funding.fundingEndTime}</CardText>
                                            <CardText><b style={{fontSize:"1.5em"}}>펀딩달성금액</b></CardText>
                                            <CardText style={{marginBottom:'20px'}}>{funding.itemRemain}</CardText>
                                            <CardText><b style={{fontSize:"1.5em"}}>입금 계좌</b></CardText>
                                            {
                                                funding.isClosed===true ?
                                                    (<CardText>마감된 펀딩의 입금 계좌는 볼 수 없습니다.</CardText>)
                                                    : <CardText style={{marginBottom:'20px'}}>{funding.bankName} {funding.accountNum} {funding.accountName}</CardText>
                                            }

                                            {
                                                funding.gift===true ?
                                                    (
                                                        <div>
                                                        <CardText><b style={{fontSize:"1.5em"}}>특전 배송 안내</b></CardText>
                                                        <CardText style={{marginBottom:'20px'}}>{funding.shippingDetail}</CardText>
                                                        </div>
                                                    )
                                                :
                                                    null

                                            }


                                        </CardText>

                                        <div className="text-left"><h4 className="pt-30"><b>상세 설명</b></h4></div>
                                        <div className="mt-20">
                                            <Viewer
                                                height="400px"
                                                initialValue={funding.content}
                                                ref={viewerRef}
                                                previewStyle="vertical"
                                                initialEditType="wysiwyg"
                                            />
                                        </div>
                                        <div>
                                            <div className="text-left"><h4 className="pt-30"><b>총대 팬 인증 정보</b></h4></div>
                                            {


                                                funding.fan_auth ? (
                                                    funding.fan_auth.map((fan)=>{
                                                        console.log(funding.fan_auth);

                                                        return(
                                                            auth_list.map((obj)=>{
                                                                return(
                                                                    <div>
                                                                        {
                                                                            obj.label===fan.id ?
                                                                                (
                                                                                    <div>
                                                                                        <CardText>{obj.value}</CardText>
                                                                                        <CardImg src={fan.url} style={{ maxHeight: 400,
                                                                                            maxWidth: 200}}></CardImg>
                                                                                    </div>

                                                                                )
                                                                                : null

                                                                        }

                                                                    </div>

                                                                )
                                                            })

                                                        )

                                                    })
                                                ):null
                                            }

                                        </div>
                                    </Col>
                                    <Col  xs={12} sm={12} md={4}>

                                        <div className="text-left" style={{marginTop: "0px"}}><h4 className="mt-30"><b>업체 정보</b></h4></div>
                                        {funding.selectedCom ?
                                            <div style={{borderColor: "#635d5d", border: "1px solid #635d5d", borderRadius:"4px"}}>업체 이름 {funding.selectedCom.label}</div>
                                            :                                             <div style={{borderColor: "#635d5d", border: "1px solid #635d5d", borderRadius:"4px"}}>업체 이름</div>

                                        }
                                    </Col>
                                </Row>
                            </div>
                        </Container>
                    </section>

                )

            }

    }
    else{

        //로그인 안되어 있을 때
        if(props.auth.isLoaded&&funding){

            const percent=Math.round(funding.progress/funding.itemRemain*100);
            const difference= new Date(funding.fundingEndDate)-currentDate.getTime();

            const period=Math.ceil(difference/(1000*60*60*24));


                // console.log("로그인 안된 상세페이지");

                return(

                    <section className="gallery5 mbr-gallery cid-sgtDmxvlJH" id="gallery5-q">
                        <Container>
                            <Button disabled className="xs ml-0" style={{backgroundColor:"#ebebeb"}}>{funding.artistSelect}</Button>
                            <div className="text-left"><h2><b>{funding.fundingTitle}</b></h2></div>
                            <div>
                                <Row xs="12" sm="12" md="2">
                                    <Col xs="12" sm="12" md="8"><CardImg top width="10%" src={funding.thumbnailImage} style={imgStyle}  alt="Card image cap" /></Col>
                                    <Col xs="12" sm="12" md="4">
                                        <div>
                                            <div className="text-center mt-30" style={{fontSize:"1.5em", paddingTop:'30px'}} ><b>{percent}% 달성</b></div>
                                            <ProgressBar variant={"info"} min="0" max="100" now={percent}/>
                                            {/*<Progress color="info" value="80" />*/}
                                            <p style={{paddingLeft:"16px"}} style={{fontSize:"1.5em"}} className="mt-3"><b>{funding.progress}명</b>의 FAN</p>
                                            <p style={{paddingLeft:"16px"}} style={{fontSize:"1.5em"}} className="mt-3"><b>{period}일</b> 남음</p>

                                            {
                                                funding.isClosed===true ? (
                                                        <div>
                                                            <Col xs="12"><Button color="secondary" size="sm" className="btn-responsive" disabled block>펀딩이 마감되었습니다.</Button></Col>
                                                        </div>
                                                    )
                                                    :
                                                    (
                                                        <Row xs="2">
                                                            <Col xs="12">
                                                                <Button className="btn-responsive" block color="info" onClick={loginAlert}>펀딩 참여하기</Button>
                                                            </Col>
                                                        </Row>
                                                    )

                                            }

                                            <Row xs="12">
                                                <Col>
                                                    <Button className="btn-responsive" style={{backgroundColor: '#bfbfbf', borderColor:"#bfbfbf"}} size="xs" onClick={loginAlert} block><BsHeart className="mr-2"/>{funding.like}</Button>
                                                </Col>

                                                <Col>
                                                    <Button color="secondary" size="xs" block onClick={loginAlert}><BsChatSquareDots className="mr-2"/>  문의</Button>
                                                </Col>

                                                <Col>
                                                    <CopyToClipboard text={url} toggle={toggleTooltip} id="Tooltip">
                                                        <Button className="btn-responsive" color="secondary" size="xs" block ><FaShareAlt className="mr-2" />
                                                          공유
                                                        </Button>
                                                       
                                                    </CopyToClipboard> 
                                                </Col><Tooltip
                                                        placement = "bottom" isOpen={tooltipOpen} target="Tooltip" toggle={toggleTooltip}>
                                                            클립보드에 복사되었습니다.
                                                        </Tooltip>
                                            </Row>
                                            <Row xs="2">
                                                <Col xs="12">
                                                    <Link className="inactive" activeClassName="active" to={'../notice/list/' + doc_id}>
                                                        <Button size="sm" className="button-responsive" block color="success" style={{backgroundColor:"#635d5d", borderColor:"#635d5d"}}>NOTICE <BsFillBellFill className="ml-2 mb-20"/>
                                                        </Button>
                                                    </Link>
                                                </Col>
                                            </Row>
                                            {/* <Row style={{paddingTop: "50px", paddingLeft:"30px"}}>

                                            </Row> */}

                                        </div>
                                    </Col>
                                </Row>
                                <Row xs="3" style={{paddingTop: "50px"}}>
                                    <Col xs={12} sm={12} md={8}>

                                        <CardText>
                                            <CardText><b style={{fontSize:"1.5em"}}>펀딩 기간(입금 기간)</b></CardText>
                                            <CardText style={{marginBottom:'20px'}}>{funding.fundingStartDate} {funding.fundingStartTime} ~ {funding.fundingEndDate} {funding.fundingEndTime}</CardText>

                                            {
                                                funding.fundingType==="reward" ?
                                                    <div>
                                                        <CardText><b style={{fontSize:"1.5em"}}>펀딩달성기준</b></CardText>
                                                        <CardText style={{marginBottom:'20px'}}>{funding.itemRemain}명</CardText>
                                                        <CardText><b style={{fontSize:"1.5em"}}>품목</b></CardText>
                                                        <CardText style={{marginBottom:'20px'}}>{funding.itemTitle}</CardText>
                                                        <CardText><b style={{fontSize:"1.5em"}}>가격</b></CardText>
                                                        <CardText style={{marginBottom:'20px'}}>{funding.itemPrice}원</CardText>
                                                    </div>
                                                    :
                                                    <div>
                                                        <CardText><b style={{fontSize:"1.5em"}}>펀딩달성금액</b></CardText>
                                                        <CardText style={{marginBottom:'20px'}}>{funding.itemRemain}</CardText>
                                                    </div>

                                            }

                                            <CardText><b style={{fontSize:"1.5em"}}>입금 계좌</b></CardText>
                                            {
                                                funding.isClosed===true ?
                                                    (<CardText>마감된 펀딩의 입금 계좌는 볼 수 없습니다.</CardText>)
                                                    : <CardText style={{marginBottom:'20px'}}>{funding.bankName} {funding.accountNum} {funding.accountName}</CardText>
                                            }
                                            {/*<CardText>{funding.bankName} {funding.accountNum} {funding.accountName}</CardText>*/}

                                            {
                                                funding.fundingType==="reward" ?
                                                    <div>
                                                        <CardText><b style={{fontSize:"1.5em"}}>배송방법</b></CardText>
                                                        <CardText style={{marginBottom:'20px'}}>{funding.shippingMethod}</CardText>
                                                        <CardText><b style={{fontSize:"1.5em"}}>배송비</b></CardText>
                                                        <CardText style={{marginBottom:'20px'}}>{funding.shippingFee}</CardText>
                                                        <CardText><b style={{fontSize:"1.5em"}}>배송 안내</b></CardText>
                                                        <CardText style={{marginBottom:'20px'}}>{funding.shippingDetail}</CardText>
                                                    </div>
                                                    :
                                                    funding.gift===true ?
                                                        (
                                                            <div>
                                                                <CardText><b style={{fontSize:"1.5em"}}>특전 배송 안내</b></CardText>
                                                                <CardText style={{marginBottom:'20px'}}>{funding.shippingDetail}</CardText>
                                                            </div>
                                                        )
                                                        :
                                                        null
                                            }

                                        </CardText>

                                        <div className="text-left"><h4 className="pt-30"><b>상세 설명</b></h4></div>
                                        <div className="mt-20">
                                            <Viewer
                                                height="400px"
                                                initialValue={funding.content}
                                                ref={viewerRef}
                                                previewStyle="vertical"
                                                initialEditType="wysiwyg"
                                            />
                                        </div>
                                        <div>
                                            <div className="text-left"><h4 className="pt-30"><b>총대 팬 인증 정보</b></h4></div>
                                            {

                                                funding.fan_auth ? (
                                                    funding.fan_auth.map((fan)=>{
                                                        console.log(funding.fan_auth);

                                                        return(
                                                            auth_list.map((obj)=>{
                                                                return(
                                                                    <div>
                                                                        {
                                                                            obj.label===fan.id ?
                                                                                (
                                                                                    <div>
                                                                                        <CardText>{obj.value}</CardText>
                                                                                        <CardImg src={fan.url} style={{ maxHeight: 400,
                                                                                            maxWidth: 200}}></CardImg>
                                                                                    </div>

                                                                                )
                                                                                : null

                                                                        }

                                                                    </div>

                                                                )
                                                            })

                                                        )

                                                    })
                                                ):null
                                            }

                                        </div>
                                    </Col>
                                    <Col  xs={12} sm={12} md={4}>

                                        <div className="text-left" style={{marginTop: "0px"}}><h4 className="mt-30"><b>업체 정보</b></h4></div>
                                        {funding.selectedCom ?
                                            <div style={{borderColor: "#635d5d", border: "1px solid #635d5d", borderRadius:"4px"}}>업체 이름 {funding.selectedCom.label}</div>
                                            :                                             <div style={{borderColor: "#635d5d", border: "1px solid #635d5d", borderRadius:"4px"}}>업체 이름</div>

                                        }
                                    </Col>
                                </Row>
                            </div>
                        </Container>
                    </section>

                )

        }
        else{
            return(
                <div>Loading....</div>
            )
        }


    }

};



// export default FundingDetails;

const mapStateToProps = (state) => {
    return{
        authError: state.auth.authError,
        auth: state.firebase.auth,
        funding:state.funding
    }
};

export default connect(
    mapStateToProps
)(FundingDetails);
