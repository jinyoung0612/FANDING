import React, {Component, useState} from 'react';
import { Card, CardImg, CardTitle, CardSubtitle, CardText, CardBody, Container,
    Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Button, Progress, Form, FormGroup, Label, Input } from 'reactstrap';
import {connect, useSelector, useDispatch} from "react-redux";
import ProgressBar from 'react-bootstrap/ProgressBar'
import { Link } from 'react-router-dom';
import {isLoaded, useFirestoreConnect} from "react-redux-firebase";
import firebase from "firebase/app"
import ReactHtmlParser from 'react-html-parser';
import ModalPortal from "../../ModalPortal";
//import MyModal from "../../MyModal";
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer} from '@toast-ui/react-editor';
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { BsHeart, BsChatSquareDots, BsFillBellFill } from "react-icons/bs";
import {FaShareAlt} from "react-icons/fa";
import {Participate_save} from "../../store/actions/userActions";
import RewardFundingDetail from "./funding/reward/RewardFundingDetail";
import DaumPostCode from 'react-daum-postcode';
import QuestionChat from "../chatting/questionchat/QuestionChat";

let imgStyle = {
    maxHeight: '500px',
    maxWidth: '700px'
}

const FundingDetails = (props)=>{

    const viewerRef = React.createRef();

    const doc_id=props.match.params.id;
    // console.log(doc_id)
       useFirestoreConnect([{
        collection: 'fundings',
        doc: doc_id
            }]);

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


    // const [isModalOpen,setModal]=useState(false);
    const dispatch = useDispatch();


    const [modal, setModal] = useState(false);
    const [nestedModal, setNestedModal] = useState(false);
    
    const [isChatView, setChat]=useState(false);
    const [progress, setProgress]=useState(0);
    // const [address, setAdd] = useState(false);
    const [fullAddress, setFullAdd] = useState(false);
    const [zoneCode, setZoneCode] = useState(false);


   
    const toggleNested = () => {
        setNestedModal(!nestedModal);
    }

    const [currentDate,setDate]=useState(new Date());

    const toggle = () => {setModal(!modal);handleEmail()}


    const handleChange = e => {
        const {value, name}=e.target;
        setInputs({
            ...inputs,
            [name]:value
        })
        console.log(inputs)
    };
    // const handleAddChange = e => {
    //     const {value, name} = e.target;
    //     setAdd({
    //         ...address,
    //         [name]:value
    //     })
    // }
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

        console.log(funding.progress)
        dispatch(Participate_save(inputs,inputs.fid,funding.progress, fullAddress,zoneCode));

        // console.log(funding.progress)

        // dispatch(Participate_save(inputs,inputs.fid,funding.progress));

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

    const funding=useSelector(({firestore:{data}})=>data.fundings && data.fundings[doc_id]);
    const url=window.location.href;



    //console.log(funding);
    // console.log(props.auth.uid);
    // if(firebase.auth().currentUser){
    //     console.log(firebase.auth().currentUser.uid)
    //
    // }
    // if(funding.createTime){
    //     var date= new Date(funding.createTime.seconds*1000);
    //     console.log(date)
    //     console.log(funding.thumbnailImage)
    //
    // }
    // const data= find(funding);


    //총대일 때
    if(funding && firebase.auth().currentUser){
        // var percent=0;
        let percent=0;
        if(funding.progress!==0){
            percent=Math.round(funding.progress/funding.itemRemain*100);

        }
        const difference= new Date(funding.fundingEndDate)-currentDate.getTime();
        const period=Math.ceil(difference/(1000*60*60*24))


        if(firebase.auth().currentUser.uid===funding.user_uid){

            if(funding.fundingType==="reward"){
                return(

                    <section className="gallery5 mbr-gallery cid-sgtDmxvlJH" id="gallery5-q">
                        <Container>
                            <Button disabled className="xs ml-0" style={{backgroundColor:"#ebebeb"}}>{funding.artistSelect}</Button>
                            <div className="text-left"><h2><b>{funding.fundingTitle}</b></h2></div>
                            <div className="mt-5">
                                <Row xs="2">
                                    <Col xs="8"><CardImg top width="10%" src={funding.thumbnailImage} style={imgStyle}  alt="Card image cap" /></Col>
                                    <Col xs="4">
                                        <div>
                                            <div className="text-center" style={{fontSize:"1.5em"}} ><b>{percent}% 달성</b></div>
                                            <ProgressBar variant={"info"} min="0" max="100" now={percent}/>
                                            {/*<Progress color="info" value="80" />*/}
                                            <p style={{paddingLeft:"16px"}} style={{fontSize:"1.5em"}} className="mt-5"><b>{funding.progress}명</b>의 FAN</p>
                                            <p style={{paddingLeft:"16px"}} style={{fontSize:"1.5em"}} className="mt-3"><b>{period}일</b> 남음</p>
                                            <Row xs="2">
                                                {/*<Button color="info" onClick={toggle}>펀딩 참여하기</Button>*/}
                                                {/*<Col><Button>수정하기</Button></Col>*/}
                                                <Link to ={'../funding_state/'+doc_id} funding={funding}>
                                                    <Col><Button>참여 현황 보기</Button></Col>
                                                </Link>
                                            </Row>
                                            <Row xs="3">
                                                <Col xs="4"><Button  style={{backgroundColor: '#bfbfbf', borderColor:"#bfbfbf"}} block><BsHeart className="mr-2"/>  350</Button></Col>
                                                <Col><Button color="secondary" size="xs" block><BsChatSquareDots className="mr-2"/>  문의</Button></Col>
                                                <Col>
                                                    <CopyToClipboard text={url}>
                                                        <Button color="secondary" size="xs" block><FaShareAlt className="mr-2" />  공유</Button>
                                                    </CopyToClipboard>
                                                </Col>
                                            </Row>
                                            <Row style={{paddingTop: "50px", paddingLeft:"30px"}}>
                                                <CardText>
                                                    <CardText><b style={{fontSize:"1.5em"}}>펀딩 기간(입금 기간)</b></CardText>
                                                    <CardText>{funding.fundingStartDate} {funding.fundingStartTime} ~ {funding.fundingEndDate} {funding.fundingEndTime}</CardText>
                                                    <CardText><b style={{fontSize:"1.5em"}}>펀딩달성기준</b></CardText>
                                                    <CardText>{funding.itemRemain}명</CardText>
                                                </CardText>
                                            </Row>
                                        </div>
                                    </Col>
                                </Row>
                                <Row xs="3" style={{paddingTop: "50px"}}>
                                    <Col xs={8}>

                                        <CardText>
                                            <CardText><b style={{fontSize:"1.5em"}}>품목</b></CardText>
                                            <CardText>{funding.itemTitle}</CardText>
                                            <CardText><b style={{fontSize:"1.5em"}}>가격</b></CardText>
                                            <CardText>{funding.itemPrice}원</CardText>
                                            <CardText><b style={{fontSize:"1.5em"}}>입금 계좌</b></CardText>
                                            <CardText>{funding.bankName} {funding.accountNum} {funding.accountName}</CardText>
                                            <CardText><b style={{fontSize:"1.5em"}}>배송방법</b></CardText>
                                            <CardText>{funding.shippingMethod}</CardText>
                                            <CardText><b style={{fontSize:"1.5em"}}>배송비</b></CardText>
                                            <CardText>{funding.shippingFee}</CardText>
                                            <CardText><b style={{fontSize:"1.5em"}}>배송 안내</b></CardText>
                                            <CardText>{funding.shippingDetail}</CardText>
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
                                    </Col>
                                    <Col  xs={4}>
                                        <Button size="lg" block style={{backgroundColor:"#635d5d", borderColor:"#635d5d"}}>NOTICE <BsFillBellFill className="ml-2 mb-20"/>
                                        </Button>
                                        <div className="text-left" style={{marginTop: "50px"}}><h4 className="mt-30"><b>업체 정보</b></h4></div>
                                        {funding.selectedCom ?
                                            <div style={{borderColor: "#635d5d", border: "1px solid #635d5d", borderRadius:"4px"}}>업체 이름 {funding.selectedCom.label}</div>
                                            :                                             <div style={{borderColor: "#635d5d", border: "1px solid #635d5d", borderRadius:"4px"}}>업체 이름</div>

                                        }
                                        {/*<div style={{borderColor: "#635d5d", border: "1px solid #635d5d", borderRadius:"4px"}}>업체 이름 {funding.selectedCom.label}</div>*/}
                                    </Col>
                                </Row>
                            </div>
                        </Container>
                    </section>

                )
            }
            // 모금형일때
            else{
                return(

                    <section className="gallery5 mbr-gallery cid-sgtDmxvlJH" id="gallery5-q">
                        <Container>
                            <Button disabled className="xs ml-0" style={{backgroundColor:"#ebebeb"}}>{funding.artistSelect}</Button>
                            <div className="text-left"><h2><b>{funding.fundingTitle}</b></h2></div>
                            <div className="mt-5">
                                <Row xs="2">
                                    <Col xs="8"><CardImg top width="10%" src={funding.thumbnailImage} style={imgStyle}  alt="Card image cap" /></Col>
                                    <Col xs="4">
                                        <div>
                                            <div className="text-center"><b>{percent}% 달성</b></div>
                                            <ProgressBar variant={"info"} min="0" max="100" now={percent}/>
                                            {/*<Progress color="info" value="80" />*/}
                                            <p className="mt-5"><b>{funding.progress}명</b>의 FAN</p>
                                            <p className="mt-3"><b>{period}일</b> 남음</p>
                                            <Row xs="2">
                                                {/*<Button color="info" onClick={toggle}>펀딩 참여하기</Button>*/}
                                                {/*<Col><Button>수정하기</Button></Col>*/}
                                                <Link to ={'../funding_state/'+doc_id} funding={funding}>
                                                    <Col><Button>참여 현황 보기</Button></Col>
                                                </Link>
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
                                            <Row style={{paddingTop: "50px", paddingLeft:"30px"}}>
                                                {/*<CardText>*/}
                                                {/*    /!*<h5 className="mt-30"><b>펀딩 기간(입금 기간)</b> {funding.fundingStartDate} {funding.fundingStartTime} ~ {funding.fundingEndDate} {funding.fundingEndTime}</h5>*!/*/}
                                                {/*    <CardText>{funding.fundingStartDate} {funding.fundingStartTime} ~ {funding.fundingEndDate} {funding.fundingEndTime}</CardText>*/}
                                                {/*</CardText>*/}
                                                {/*<CardText><h5 className="mt-30"><b>품목 : </b></h5></CardText>*/}
                                                {/*<CardText>{funding.itemTitle}</CardText>*/}
                                                {/*<CardText><h5 className="mt-30"><b>가격 : </b></h5>{funding.itemPrice}</CardText>*/}
                                                {/*<CardText><h5 className="mt-30"><b>펀딩달성기준 : </b></h5>{funding.itemRemain}</CardText>*/}
                                                {/*<CardText><h5 className="mt-30"><b>배송방법 : </b></h5>{funding.shippingMethod}</CardText>*/}
                                                {/*<CardText><h5 className="mt-30"><b>배송비 : </b></h5>{funding.shippingFee}</CardText>*/}
                                                {/*<CardText><h5 className="mt-30"><b>배송 안내 : </b></h5>{funding.shippingDetail}</CardText>*/}
                                                <div></div>
                                            </Row>
                                        </div>
                                    </Col>
                                </Row>
                                <Row xs="2" style={{paddingTop: "50px"}}>
                                    <Col xs={8}>
                                        <CardSubtitle><b>펀딩 기간(입금 기간) : </b> {funding.fundingStartDate} {funding.fundingStartTime} ~ {funding.fundingEndDate} {funding.fundingEndTime}</CardSubtitle>
                                        {/*<CardText><b>품목 : </b>{funding.itemTitle}</CardText>*/}
                                        {/*<CardText><b>가격 : </b>{funding.itemPrice}</CardText>*/}
                                        {/*<CardText><b>펀딩달성기준 : </b>{funding.itemRemain}</CardText>*/}
                                        {/*<CardText><b>배송방법 : </b>{funding.shippingMethod}</CardText>*/}
                                        {/*<CardText><b>배송비 : </b>{funding.shippingFee}</CardText>*/}
                                        {/*<CardText><b>배송 안내 : </b>{funding.shippingDetail}</CardText>*/}

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
                                    </Col>
                                    <Col  xs={4}>
                                        <Button size="lg" block style={{backgroundColor:"#635d5d", borderColor:"#635d5d"}}>NOTICE <BsFillBellFill className="ml-2 mb-20"/>
                                        </Button>
                                        <div className="text-left" style={{marginTop: "50px"}}><h4 className="mt-30"><b>업체 정보</b></h4></div>
                                        {funding.selectedCom ?
                                            <div style={{borderColor: "#635d5d", border: "1px solid #635d5d", borderRadius:"4px"}}>업체 이름 {funding.selectedCom.label}</div>
                                            :                                             <div style={{borderColor: "#635d5d", border: "1px solid #635d5d", borderRadius:"4px"}}>업체 이름</div>

                                        }
                                        {/*<div style={{borderColor: "#635d5d", border: "1px solid #635d5d", borderRadius:"4px"}}>업체 이름</div>*/}
                                    </Col>
                                </Row>
                            </div>
                        </Container>
                    </section>
                )
            }
        }
        // 참여자 일 때
        else{
            //리워드형 일때
            if(funding.fundingType==="reward"){
                const difference= new Date(funding.fundingEndDate)-currentDate.getTime();
                // console.log(difference/(1000*60*60*24))
                const period=Math.ceil(difference/(1000*60*60*24));
                // console.log(period)

                let percent=0;
                if(funding.progress!==0){
                    percent=Math.round(funding.progress/funding.itemRemain*100);

                }
                if(isChatView===true){
                    // console.log(props.history.location)
                    return(

                    <QuestionChat funding={funding} history={props.history}></QuestionChat>
                    )
                }
                return(
                    <section className="gallery5 mbr-gallery cid-sgtDmxvlJH" id="gallery5-q">
                        <Container>
                            {/*{console.log(props.history)}*/}
                            {/*{isChatView===true ? <QuestionChat funding={funding} history={props.history}></QuestionChat> :null }*/}
                            
                            <Button disabled className="xs ml-0" style={{backgroundColor:"#ebebeb"}}>{funding.artistSelect}</Button>
                            <div className="text-left"><h2><b>{funding.fundingTitle}</b></h2></div>
                            <div className="mt-5">
                                <Row xs="2">
                                    <Col xs="8"><CardImg top width="10%" src={funding.thumbnailImage} style={imgStyle}  alt="Card image cap" /></Col>
                                    <Col xs="4">
                                        <div>
                                            <div className="text-center" style={{fontSize:"1.5em"}} ><b>{percent}% 달성</b></div>
                                            <ProgressBar variant={"info"} min="0" max="100" now={percent}/>
                                            {/*<Progress color="info" value="80" />*/}
                                            <p style={{paddingLeft:"16px"}} style={{fontSize:"1.5em"}} className="mt-5"><b>{funding.progress}명</b>의 FAN</p>
                                            <p style={{paddingLeft:"16px"}} style={{fontSize:"1.5em"}} className="mt-3"><b>{period}일</b> 남음</p>
                                            <Row style={{paddingLeft:"16px"}} xs="2">
                                                <Button className="btn-responsive" color="info" onClick={toggle}>펀딩 참여하기</Button>
                                            </Row>
                                            <Modal style={{height:'1200px'}} isOpen={modal} toggle={toggle}>
                                                <Form onSubmit={(e)=>handleSubmit(e,funding)}>
                                                    <ModalHeader toggle={toggle} charCode="x">입금폼</ModalHeader>
                                                    <ModalBody>
                                                        <div className="companyRecruit text-center">
                                                            <h3>[{funding.artistSelect}]{funding.fundingTitle}</h3>

                                                            {/*<p>펀딩 계좌 정보 넣기</p>*/}
                                                            {/*<p>닉네임 넣기</p>*/}
                                                            {/*<p>주소 넣기</p>*/}
                                                            {/*<p>입금 확인 했는지 확인하는 checkbox</p>*/}


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
                                                            {/* <div className="address">{this.fullAddress}</div>
                                                            <div className="addressBox">
                                                                <input type="text" value={this.address} name="address" onChange={handleChange}/>
                                                            </div> */}
                                                           
                                                            
                                                            
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
                                            <Row xs="3">
                                                <Col><Button className="btn-responsive" style={{backgroundColor: '#bfbfbf', borderColor:"#bfbfbf"}} size="xs" block><BsHeart className="mr-2"/>  350</Button></Col>
                                                <Col><Button onClick={handleClickChatView} color="secondary" size="xs" block><BsChatSquareDots className="mr-2"/>  문의</Button></Col>
                                                <Col>
                                                    <CopyToClipboard text={url}>
                                                        <Button color="secondary" size="xs" block><FaShareAlt className="mr-2" />  공유</Button>
                                                    </CopyToClipboard>
                                                </Col>
                                            </Row>
                                            <Row style={{paddingTop: "50px", paddingLeft:"30px"}}>
                                                <CardText>
                                                   <CardText><b style={{fontSize:"1.5em"}}>펀딩 기간(입금 기간)</b></CardText>
                                                    <CardText>{funding.fundingStartDate} {funding.fundingStartTime} ~ {funding.fundingEndDate} {funding.fundingEndTime}</CardText>
                                                    <CardText><b style={{fontSize:"1.5em"}}>펀딩달성기준</b></CardText>
                                                    <CardText>{funding.itemRemain}명</CardText>
                                                </CardText>
                                            </Row>
                                        </div>
                                    </Col>
                                </Row>
                                <Row xs="3" style={{paddingTop: "50px"}}>
                                    <Col xs={8}>

                                        <CardText>
                                            <CardText><b style={{fontSize:"1.5em"}}>품목</b></CardText>
                                            <CardText>{funding.itemTitle}</CardText>
                                            <CardText><b style={{fontSize:"1.5em"}}>가격</b></CardText>
                                            <CardText>{funding.itemPrice}원</CardText>
                                            <CardText><b style={{fontSize:"1.5em"}}>입금 계좌</b></CardText>
                                            <CardText>{funding.bankName} {funding.accountNum} {funding.accountName}</CardText>
                                            <CardText><b style={{fontSize:"1.5em"}}>배송방법</b></CardText>
                                            <CardText>{funding.shippingMethod}</CardText>
                                            <CardText><b style={{fontSize:"1.5em"}}>배송비</b></CardText>
                                            <CardText>{funding.shippingFee}</CardText>
                                            <CardText><b style={{fontSize:"1.5em"}}>배송 안내</b></CardText>
                                            <CardText>{funding.shippingDetail}</CardText>
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
                                    </Col>
                                    <Col  xs={4}>
                                        <Button size="lg" block style={{backgroundColor:"#635d5d", borderColor:"#635d5d"}}>NOTICE <BsFillBellFill className="ml-2 mb-20"/>
                                        </Button>
                                        <div className="text-left" style={{marginTop: "50px"}}><h4 className="mt-30"><b>업체 정보</b></h4></div>
                                        {funding.selectedCom ?
                                            <div style={{borderColor: "#635d5d", border: "1px solid #635d5d", borderRadius:"4px"}}>업체 이름 {funding.selectedCom.label}</div>
                                            :                                             <div style={{borderColor: "#635d5d", border: "1px solid #635d5d", borderRadius:"4px"}}>업체 이름</div>

                                        }
                                        {/*<div style={{borderColor: "#635d5d", border: "1px solid #635d5d", borderRadius:"4px"}}>업체 이름</div>*/}
                                    </Col>
                                </Row>
                            </div>
                        </Container>
                    </section>
                )
            }
            //모금형 펀딩일때
            else{
                if(isChatView===true){
                    // console.log(props.history.location)
                    return(
                        <QuestionChat funding={funding} history={props.history}></QuestionChat>
                    )
                }

                return(

                    <section className="gallery5 mbr-gallery cid-sgtDmxvlJH" id="gallery5-q">
                        <Container>
                            <Button disabled className="xs ml-0" style={{backgroundColor:"#ebebeb"}}>{funding.artistSelect}</Button>
                            <div className="text-left"><h2><b>{funding.fundingTitle}</b></h2></div>
                            <div className="mt-5">
                                <Row xs="2">
                                    <Col xs="8"><CardImg top width="10%" src={funding.thumbnailImage} style={imgStyle}  alt="Card image cap" /></Col>
                                    <Col xs="4">
                                        <div>
                                            <div className="text-center" style={{fontSize:"1.5em"}} ><b>{percent}% 달성</b></div>
                                            <ProgressBar variant={"info"} min="0" max="100" now={percent}/>
                                            {/*<Progress color="info" value="80" />*/}
                                            <p style={{paddingLeft:"16px"}} style={{fontSize:"1.5em"}} className="mt-5"><b>{funding.progress}명</b>의 FAN</p>
                                            <p style={{paddingLeft:"16px"}} style={{fontSize:"1.5em"}} className="mt-3"><b>{period}일</b> 남음</p>
                                            <Row xs="2">
                                                <Button style={{paddingLeft:"16px"}} color="info" onClick={toggle}>펀딩 참여하기</Button>
                                            </Row>
                                            <Modal isOpen={modal} toggle={toggle}>
                                                <Form onSubmit={(e)=>handleSubmit(e,funding)}>
                                                    <ModalHeader toggle={toggle} charCode="x">입금폼</ModalHeader>
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
                                            <Row xs="3">
                                                <Col><Button style={{backgroundColor: '#bfbfbf', borderColor:"#bfbfbf"}} size="xs" block><BsHeart className="mr-2"/>  350</Button></Col>
                                                <Col><Button onClick={handleClickChatView} color="secondary" size="xs" block><BsChatSquareDots className="mr-2"/>문의</Button></Col>
                                                <Col>
                                                    <CopyToClipboard text={url}>
                                                        <Button color="secondary" size="xs" block><FaShareAlt className="mr-2" />공유</Button>
                                                    </CopyToClipboard>
                                                </Col>
                                            </Row>
                                            <Row style={{paddingTop: "50px", paddingLeft:"30px"}}>
                                                {/*<CardText>*/}
                                                {/*    /!*<h5 className="mt-30"><b>펀딩 기간(입금 기간)</b> {funding.fundingStartDate} {funding.fundingStartTime} ~ {funding.fundingEndDate} {funding.fundingEndTime}</h5>*!/*/}
                                                {/*    <CardText>{funding.fundingStartDate} {funding.fundingStartTime} ~ {funding.fundingEndDate} {funding.fundingEndTime}</CardText>*/}
                                                {/*</CardText>*/}
                                                {/*<CardText><h5 className="mt-30"><b>품목 : </b></h5></CardText>*/}
                                                {/*<CardText>{funding.itemTitle}</CardText>*/}
                                                {/*<CardText><h5 className="mt-30"><b>가격 : </b></h5>{funding.itemPrice}</CardText>*/}
                                                {/*<CardText><h5 className="mt-30"><b>펀딩달성기준 : </b></h5>{funding.itemRemain}</CardText>*/}
                                                {/*<CardText><h5 className="mt-30"><b>배송방법 : </b></h5>{funding.shippingMethod}</CardText>*/}
                                                {/*<CardText><h5 className="mt-30"><b>배송비 : </b></h5>{funding.shippingFee}</CardText>*/}
                                                {/*<CardText><h5 className="mt-30"><b>배송 안내 : </b></h5>{funding.shippingDetail}</CardText>*/}
                                                <div></div>
                                            </Row>
                                        </div>
                                    </Col>
                                </Row>
                                <Row xs="3" style={{paddingTop: "50px"}}>
                                    <Col xs={8}>
                                        <CardSubtitle><b>펀딩 기간(입금 기간) : </b> {funding.fundingStartDate} {funding.fundingStartTime} ~ {funding.fundingEndDate} {funding.fundingEndTime}</CardSubtitle>
                                        {/*<CardText><b>품목 : </b>{funding.itemTitle}</CardText>*/}
                                        {/*<CardText><b>가격 : </b>{funding.itemPrice}</CardText>*/}
                                        {/*<CardText><b>펀딩달성기준 : </b>{funding.itemRemain}</CardText>*/}
                                        {/*<CardText><b>배송방법 : </b>{funding.shippingMethod}</CardText>*/}
                                        {/*<CardText><b>배송비 : </b>{funding.shippingFee}</CardText>*/}
                                        {/*<CardText><b>배송 안내 : </b>{funding.shippingDetail}</CardText>*/}

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
                                    </Col>
                                    <Col  xs={4}>
                                        <Button size="lg" block style={{backgroundColor:"#635d5d", borderColor:"#635d5d"}}>NOTICE <BsFillBellFill className="ml-2 mb-20"/>
                                        </Button>
                                        <div className="text-left" style={{marginTop: "50px"}}><h4 className="mt-30"><b>업체 정보</b></h4></div>
                                        {funding.selectedCom ?
                                            <div style={{borderColor: "#635d5d", border: "1px solid #635d5d", borderRadius:"4px"}}>업체 이름 {funding.selectedCom.label}</div>
                                            :                                             <div style={{borderColor: "#635d5d", border: "1px solid #635d5d", borderRadius:"4px"}}>업체 이름</div>

                                        }
                                        {/*<div style={{borderColor: "#635d5d", border: "1px solid #635d5d", borderRadius:"4px"}}>업체 이름</div>*/}
                                    </Col>
                                </Row>
                            </div>
                        </Container>
                    </section>

                )
            }
            return(
                <section class="gallery5 mbr-gallery cid-sgtDmxvlJH" id="gallery5-q">
                <Container>
                <div>
                    <Card sm="6">
                        <CardImg src={funding.thumbnailImage} top width="100%" alt="Card image cap" />
                        <CardBody>
                            <CardTitle>[{funding.artistSelect}] {funding.fundingTitle}</CardTitle>
                            <CardSubtitle>펀딩 기간(입금 기간) : {funding.fundingStartDate} {funding.fundingStartTime} ~ {funding.fundingEndDate} {funding.fundingEndTime}</CardSubtitle>
                            <CardText>품목 : {funding.itemTitle}</CardText>
                            <CardText>가격 : {funding.itemPrice}</CardText>
                            <CardText>펀딩달성기준 : {funding.itemRemain}</CardText>
                            <CardText>배송방법 : {funding.shippingMethod}</CardText>
                            <CardText>배송비 : {funding.shippingFee}</CardText>
                            <CardText>배송 안내 : {funding.shippingDetail}</CardText>
                            <div>
                                <Viewer
                                    height="400px"
                                    initialValue={funding.content}
                                    ref={viewerRef}
                                    previewStyle="vertical"
                                    initialEditType="wysiwyg"
                                />
                            </div>
                            {/*<CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>*/}
                            <Button>찜하기</Button>
                            
                            {/* <Button onClick={handleOpenModal}>펀딩 참여하기</Button> */}
                            <Button onClick={toggle}>펀딩 참여하기</Button>
                            
                                
                                
                                <Modal isOpen={modal} toggle={toggle}>
                                <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                                <ModalBody>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
                                <Button color="secondary" onClick={toggle}>Cancel</Button>
                            </ModalFooter>
                            </Modal>

                            <Button>Notice</Button>
                            <Button>1:1 문의</Button>


                        </CardBody>
                    </Card>
                </div>
                                )
                                }
                </Container>
                </section>
            )

        }



    }
    else{

        if(props.auth.isLoaded&&funding){

            const percent=Math.round(funding.progress/funding.itemRemain*100);
            const difference= new Date(funding.fundingEndDate)-currentDate.getTime();

            const period=Math.ceil(difference/(1000*60*60*24));

            if(funding.fundingType==="reward"){
                console.log("로그인 안된 상세페이지");
                //////예외처리해야됨//////
                return(
                    <section className="gallery5 mbr-gallery cid-sgtDmxvlJH" id="gallery5-q">
                        <Container>
                            <Button disabled className="xs ml-0" style={{backgroundColor:"#ebebeb"}}>{funding.artistSelect}</Button>
                            <div className="text-left"><h2><b>{funding.fundingTitle}</b></h2></div>
                            <div className="mt-5">
                                <Row xs="12" sm="12" md="2">
                                    <Col xs="12" sm="12" md="8"><CardImg top width="10%" src={funding.thumbnailImage} style={imgStyle}  alt="Card image cap" /></Col>
                                    <Col xs="12" sm="12" md="4">
                                        <div>
                                            <div className="text-center"><b>{percent}% 달성</b></div>
                                            <ProgressBar variant={"info"} min="0" max="100" now={percent}/>
                                            {/*<Progress color="info" value="80" />*/}
                                            <p className="mt-5"><b>{funding.progress}명</b>의 FAN</p>
                                            <p className="mt-3"><b>{period}일</b> 남음</p>
                                            <Row xs="2">
                                                <Col xs="12">
                                                <Button className="btn-responsive" block color="info" onClick={toggle}>펀딩 참여하기</Button>
                                            </Col>
                                            </Row>
                                            <Row xs="12">
                                                <Col><Button className="btn-responsive" style={{backgroundColor: '#bfbfbf', borderColor:"#bfbfbf"}} size="xs" block><BsHeart className="mr-2"/>  350</Button></Col>
                                                <Col><Button className="btn-responsive" color="secondary" size="xs" block><BsChatSquareDots className="mr-2"/>  문의</Button></Col>
                                                <Col>
                                                    <CopyToClipboard text={url}>
                                                        <Button className="btn-responsive" color="secondary" size="xs" block><FaShareAlt className="mr-2" />  공유</Button>
                                                    </CopyToClipboard>
                                                </Col>
                                            </Row>
                                            <Row style={{paddingTop: "50px", paddingLeft:"30px"}}>
                                                {/*<CardText>*/}
                                                {/*    /!*<h5 className="mt-30"><b>펀딩 기간(입금 기간)</b> {funding.fundingStartDate} {funding.fundingStartTime} ~ {funding.fundingEndDate} {funding.fundingEndTime}</h5>*!/*/}
                                                {/*    <CardText>{funding.fundingStartDate} {funding.fundingStartTime} ~ {funding.fundingEndDate} {funding.fundingEndTime}</CardText>*/}
                                                {/*</CardText>*/}
                                                {/*<CardText><h5 className="mt-30"><b>품목 : </b></h5></CardText>*/}
                                                {/*<CardText>{funding.itemTitle}</CardText>*/}
                                                {/*<CardText><h5 className="mt-30"><b>가격 : </b></h5>{funding.itemPrice}</CardText>*/}
                                                {/*<CardText><h5 className="mt-30"><b>펀딩달성기준 : </b></h5>{funding.itemRemain}</CardText>*/}
                                                {/*<CardText><h5 className="mt-30"><b>배송방법 : </b></h5>{funding.shippingMethod}</CardText>*/}
                                                {/*<CardText><h5 className="mt-30"><b>배송비 : </b></h5>{funding.shippingFee}</CardText>*/}
                                                {/*<CardText><h5 className="mt-30"><b>배송 안내 : </b></h5>{funding.shippingDetail}</CardText>*/}
                                                <div></div>
                                            </Row>
                                        </div>
                                    </Col>
                                </Row>
                                <Row xs="3" style={{paddingTop: "50px"}}>
                                    <Col xs={8}>
                                        <CardSubtitle><b>펀딩 기간(입금 기간) : </b> {funding.fundingStartDate} {funding.fundingStartTime} ~ {funding.fundingEndDate} {funding.fundingEndTime}</CardSubtitle>
                                        <CardText><b>품목 : </b>{funding.itemTitle}</CardText>
                                        <CardText><b>가격 : </b>{funding.itemPrice}</CardText>
                                        <CardText><b>펀딩달성기준 : </b>{funding.itemRemain}</CardText>
                                        <CardText><b>배송방법 : </b>{funding.shippingMethod}</CardText>
                                        <CardText><b>배송비 : </b>{funding.shippingFee}</CardText>
                                        <CardText><b>배송 안내 : </b>{funding.shippingDetail}</CardText>

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
                                    </Col>
                                    <Col  xs={4}>
                                        <Button size="sm" color="success" className="btn-responsive" block >NOTICE <BsFillBellFill className="ml-2 mb-20"/>
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
            return(


                <section className="gallery5 mbr-gallery cid-sgtDmxvlJH" id="gallery5-q">
                    <Container>
                        <Button disabled className="xs ml-0" style={{backgroundColor:"#ebebeb"}}>{funding.artistSelect}</Button>
                        <div className="text-left"><h2><b>{funding.fundingTitle}</b></h2></div>
                        <div className="mt-5">
                            <Row xs="2">
                                <Col xs="8"><CardImg top width="10%" src={funding.thumbnailImage} style={imgStyle}  alt="Card image cap" /></Col>
                                <Col xs="4">
                                    <div>
                                        <ProgressBar variant={"info"} min="0" max="100" now={percent}/>
                                        {/*<Progress color="info" value="80" />*/}
                                        <p className="mt-5"><b>{funding.progress}명</b>의 FAN</p>
                                        <p className="mt-3"><b>15일</b> 남음</p>
                                        <Row xs="2">
                                            <Button color="info" onClick={toggle}>펀딩 참여하기</Button>
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
                                        <Row style={{paddingTop: "50px", paddingLeft:"30px"}}>
                                            {/*<CardText>*/}
                                            {/*    /!*<h5 className="mt-30"><b>펀딩 기간(입금 기간)</b> {funding.fundingStartDate} {funding.fundingStartTime} ~ {funding.fundingEndDate} {funding.fundingEndTime}</h5>*!/*/}
                                            {/*    <CardText>{funding.fundingStartDate} {funding.fundingStartTime} ~ {funding.fundingEndDate} {funding.fundingEndTime}</CardText>*/}
                                            {/*</CardText>*/}
                                            {/*<CardText><h5 className="mt-30"><b>품목 : </b></h5></CardText>*/}
                                            {/*<CardText>{funding.itemTitle}</CardText>*/}
                                            {/*<CardText><h5 className="mt-30"><b>가격 : </b></h5>{funding.itemPrice}</CardText>*/}
                                            {/*<CardText><h5 className="mt-30"><b>펀딩달성기준 : </b></h5>{funding.itemRemain}</CardText>*/}
                                            {/*<CardText><h5 className="mt-30"><b>배송방법 : </b></h5>{funding.shippingMethod}</CardText>*/}
                                            {/*<CardText><h5 className="mt-30"><b>배송비 : </b></h5>{funding.shippingFee}</CardText>*/}
                                            {/*<CardText><h5 className="mt-30"><b>배송 안내 : </b></h5>{funding.shippingDetail}</CardText>*/}
                                            <div></div>
                                        </Row>
                                    </div>
                                </Col>
                            </Row>
                            <Row xs="3" style={{paddingTop: "50px"}}>
                                <Col xs={8}>
                                    <CardSubtitle><b>펀딩 기간(입금 기간) : </b> {funding.fundingStartDate} {funding.fundingStartTime} ~ {funding.fundingEndDate} {funding.fundingEndTime}</CardSubtitle>
                                    {/*<CardText><b>품목 : </b>{funding.itemTitle}</CardText>*/}
                                    {/*<CardText><b>가격 : </b>{funding.itemPrice}</CardText>*/}
                                    {/*<CardText><b>펀딩달성기준 : </b>{funding.itemRemain}</CardText>*/}
                                    {/*<CardText><b>배송방법 : </b>{funding.shippingMethod}</CardText>*/}
                                    {/*<CardText><b>배송비 : </b>{funding.shippingFee}</CardText>*/}
                                    {/*<CardText><b>배송 안내 : </b>{funding.shippingDetail}</CardText>*/}

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
        auth: state.firebase.auth
    }
};

export default connect(
    mapStateToProps
)(FundingDetails);
