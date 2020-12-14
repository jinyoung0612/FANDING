import React, {useEffect, useState} from "react";
import {useFirestoreConnect} from "react-redux-firebase";
import firebase from "firebase";
import {connect, useDispatch, useSelector} from "react-redux";
import {
    Card,
    CardBody,
    CardImg,
    CardSubtitle,
    CardTitle,
    CardDeck,
    Button,
    Row,
    Col,
    Modal,
    Form,
    ModalHeader, ModalBody, FormGroup, Label, Input, ModalFooter, CardText
} from "reactstrap";
import {Link} from "react-router-dom";
import DaumPostCode from "react-daum-postcode";
import { modify_participation} from "../../store/actions/userActions";

let imgStyle = {
    maxHeight: '200px',
    maxWidth: '200px'
  }
const ParticipationList=({participation})=>{
    // console.log(participation)
    const dispatch = useDispatch();

    const fid=participation.fid;

    useFirestoreConnect([
        {
        collection: 'fundings',
        doc:fid
    },
        {
            collection:'progress',
            where:
                ["funding_id","==",fid]

        }
    ]);

    const [modal, setModal] = useState(false);
    const [zoneCode, setZoneCode] = useState(false);
    const [fullAddress, setFullAdd] = useState(false);
    const [modify, setModify] = useState(false);
    const [nestedModal, setNestedModal] = useState(false);
    const [inputs, setInputs]=useState({

    });

    const funding=useSelector(({firestore:{data}})=>data.fundings && data.fundings[fid]);
    const progress=useSelector((state)=>state.firestore.ordered.progress);

    const toggle = () => {
        setModal(!modal);
        if(modify===true){
            setModify(false);
        }
    }
    const toggleNested = () => {
        setNestedModal(!nestedModal);
    }

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

    const handleChange=(e)=> {

        const {value, name}=e.target;
        setInputs({
            ...inputs,
            [name]:value
        })

    }

    var data={}
    const handleSubmit=()=>{
        alert("수정되었습니다.")
        Object.assign(data,inputs)
        if(fullAddress!==false){
            // console.log("실행");
            Object.assign(data, {"fullAddress": fullAddress});
        }
        if(zoneCode!==false){
            Object.assign(data, {"zonCode": zoneCode});
        }
        dispatch(modify_participation(participation.id,data));

        toggle();
    }

    const handleModify=()=>{
        if(progress.state==="상품배송" || progress.state==="펀딩종료"){
            alert("입금폼을 수정할 수 없습니다.")
        }
        else{
            setModify(!modify);

        }
    }


    if(funding && participation){

        return(
            <CardDeck style={{display: 'flex', flexDirection: 'row', 
            justifyContent: 'left', margin:'10px', flexFlow:'row wrap'}}>

                <Link className="inactive" activeClassName="active" to={'funding_detail/'+fid} funding={funding}>
                <Card className="col-sm-12 col-12 align-items-sm-stretch card-bigger border-custom"
                      body style={{width:'18em',flex: '1', height:'20em', margin: '8px', paddingTop:'10px',
                    paddingBottom:'10px', paddingLeft:'10px', paddingRight:'10px'}}>
                        <CardImg src={funding.thumbnailImage}top width="100" alt="Card image cap" style={{height:"194px"}}/>
                        <CardBody>
                            <CardTitle>[{funding.artistSelect}] {funding.fundingTitle}</CardTitle>
                            <CardSubtitle> {funding.fundingStartDate} {funding.fundingStartTime} ~ {funding.fundingEndTime} {funding.fundingEndTime}</CardSubtitle>
                        </CardBody>
                </Card>
                </Link>
                <CardBody>
                    <Row xs="2">
                        <Col xs="12">
                            <Button onClick={toggle}>내 입금폼보기</Button>
                        </Col>
                    </Row>
                    <Modal style={{height:'1120px'}} isOpen={modal} toggle={toggle}>
                        <Form onSubmit={(e)=>handleSubmit(e,funding)}>
                            <ModalHeader toggle={toggle} charCode="x">입금폼</ModalHeader>
                            <ModalBody>
                                <div className="companyRecruit text-center">
                                    <h3>[{funding.artistSelect}]{funding.fundingTitle}</h3>
                                    <FormGroup>
                                        <Label for="PaymentInfo"><b>내 입금폼</b></Label>

                                        {
                                            modify===false ?
                                                <div>
                                                <CardText className="companyRecruit text-left"><b>입금자명</b></CardText>
                                                <CardText className="companyRecruit text-left">{participation.name}</CardText>
                                                </div>
                                            :
                                                <Input type="name" name="name" id="name"
                                                       placeholder="입금자명"
                                                       onChange={handleChange}
                                                />

                                        }

                                    </FormGroup>
                                    <FormGroup>
                                        {
                                            modify===false ?
                                                <div>
                                                    <CardText className="companyRecruit text-left"><b>입금 금액</b></CardText>
                                                    <CardText className="companyRecruit text-left">{participation.price}</CardText>
                                                </div>
                                                :
                                                <Input type="price" name="price" id="price"
                                                       placeholder="입금 금액(숫자만 입력)"
                                                       onChange={handleChange}

                                                />

                                        }
                                    </FormGroup>
                                    <FormGroup className="ml-auto">

                                        {
                                            modify===false ?
                                                <div>
                                                    <CardText className="companyRecruit text-left"><b>입금 날짜</b></CardText>
                                                    <CardText className="companyRecruit text-left">{participation.date}</CardText>
                                                </div>
                                                :
                                                <Input
                                                    type="date"
                                                    name="date"
                                                    id="paymentDate"
                                                    placeholder="입금 날짜"
                                                    onChange={handleChange}
                                                />

                                        }
                                    </FormGroup>
                                    <FormGroup>
                                        {
                                            modify===false ?
                                                <div>
                                                    <CardText className="companyRecruit text-left"><b>입금 시각</b></CardText>
                                                    <CardText className="companyRecruit text-left">{participation.time}</CardText>
                                                </div>
                                                :
                                                <Input
                                                    type="time"
                                                    name="time"
                                                    id="paymentTime"
                                                    placeholder="00:00"
                                                    onChange={handleChange}
                                                />

                                        }
                                    </FormGroup>
                                    <FormGroup>
                                        {
                                            modify===false ?
                                                <div>
                                                    <CardText className="companyRecruit text-left"><b>환불계좌 정보</b></CardText>
                                                    <CardText className="companyRecruit text-left"><b>은행명</b></CardText>
                                                    <CardText className="companyRecruit text-left">{participation.bank}</CardText>
                                                </div>
                                                :
                                                <div>
                                                    <Label for="Refund"><b>환불계좌정보입력</b></Label>
                                                    <Input type="bank" name="bank" id="bank"
                                                           placeholder="은행명"
                                                           onChange={handleChange}
                                                    />
                                                </div>


                                        }
                                    </FormGroup>
                                    <FormGroup>
                                        {
                                            modify===false ?
                                                <div>
                                                    <CardText className="companyRecruit text-left"><b>계좌번호</b></CardText>
                                                    <CardText className="companyRecruit text-left">{participation.accountNumber}</CardText>
                                                </div>
                                                :
                                                <Input type="accountNumber" name="accountNumber" id="accountNumber"
                                                       placeholder="계좌번호"
                                                       onChange={handleChange}
                                                />

                                        }

                                    </FormGroup>
                                    <FormGroup>
                                        {
                                            modify===false ?
                                                <div>
                                                    <CardText className="companyRecruit text-left"><b>예금주명</b></CardText>
                                                    <CardText className="companyRecruit text-left">{participation.accountName}</CardText>
                                                </div>
                                                :
                                                <Input type="accountName" name="accountName" id="accountName"
                                                       placeholder="예금주명"
                                                       onChange={handleChange}
                                                />

                                        }
                                    </FormGroup>
                                    {
                                        modify === false ? null
                                            :
                                            <div>
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
                                            </div>
                                    }


                                    <FormGroup>
                                        {
                                            modify===false ?
                                                <div>
                                                    <CardText className="companyRecruit text-left"><b>우편번호</b></CardText>
                                                    <CardText className="companyRecruit text-left">{participation.zoneCode}</CardText>
                                                </div>
                                                :
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
                                            modify===false ?
                                                <div>
                                                    <CardText className="companyRecruit text-left"><b>주소</b></CardText>
                                                    <CardText className="companyRecruit text-left">{participation.fullAddress}</CardText>
                                                </div>
                                                :
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
                                        {
                                            modify===false ?
                                                <div>
                                                    <CardText className="companyRecruit text-left"><b>상세주소</b></CardText>
                                                    <CardText className="companyRecruit text-left">{participation.detailAddress}</CardText>
                                                </div>
                                                :
                                                <Input type="detailAddress" name="detailAddress" id="detailAddress"
                                                       placeholder="상세 주소를 입력하세요"
                                                       onChange={handleChange}
                                                />

                                        }

                                    </FormGroup>
                                    <FormGroup>
                                        {
                                            modify===false ?
                                                <div>
                                                    <CardText className="companyRecruit text-left"><b>이메일 주소</b></CardText>
                                                    <CardText className="companyRecruit text-left">{participation.email}</CardText>
                                                </div>
                                                :
                                                <div>
                                                    <Label>이메일 주소</Label>
                                                    <Input type="email" name="email" id="email"
                                                           placeholder={firebase.auth().currentUser.email}
                                                           onChange={handleChange}
                                                    />
                                                </div>

                                        }
                                    </FormGroup>
                                    <ModalFooter>
                                        {
                                            modify===false ?
                                                <Button color="primary" onClick={handleModify}>수정하기</Button>
                                                :
                                                <Button color="primary"onClick={handleSubmit}>제출하기</Button>


                                        }
                                        <Button color="secondary" onClick={toggle}>닫기</Button>
                                    </ModalFooter>
                                </div>

                            </ModalBody>
                        </Form>
                    </Modal>
                </CardBody>



            </CardDeck>
    )
    }
    else{
        return(
            <div>
                <h2>참여한 펀딩이 없습니다.</h2>
            </div>
        )
    }


}
// export default ParticipationList;
const mapStateToProps = (state) => {
    return{
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
};

export default connect(
    mapStateToProps
)(ParticipationList);