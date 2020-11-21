import React, {useState} from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, CardImg, CardBody,
    CardSubtitle,Form , Modal, ModalHeader, ModalBody, ModalFooter, Container} from 'reactstrap';
import {connect, useSelector} from "react-redux";
import { Link } from 'react-router-dom';
import {useFirestoreConnect} from "react-redux-firebase";
import firebase from "firebase/app"
import ReactHtmlParser from 'react-html-parser';
import ModalPortal from "../../ModalPortal";
//import MyModal from "../../MyModal";
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer} from '@toast-ui/react-editor';
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

    // const [isModalOpen,setModal]=useState(false);

    // const handleOpenModal=()=>{
    //     setModal(true);
    // }
    // const handleCloseModal=()=>{
    //     setModal(false);
    // }

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const funding=useSelector(({firestore:{data}})=>data.fundings && data.fundings[doc_id]);
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
        if(firebase.auth().currentUser.uid===funding.user_uid){
            const content=funding.content;

            return(
                <section class="gallery5 mbr-gallery cid-sgtDmxvlJH" id="gallery5-q">
                <Container>
                <Button disabled className="xs ml-0" style={{backgroundColor:"#ebebeb"}}>{funding.artistSelect}</Button>  
                <div className="text-left"><h2><b>{funding.fundingTitle}</b></h2></div>
                <div className="mt-5">
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
                            <Button>수정하기</Button>
                            <Link to ={'../funding_state/'+doc_id} funding={funding}>
                                <Button>참여 현황 보기</Button>
                            </Link>
                        </CardBody>
                    </Card>
                
                </div>
                </div>
                </Container>
                </section>

            )

        }
        // 참여자 일 때
        else{
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
                </Container>
                </section>
            )

        }



    }
    else{
        return(

            <div>
                {/*<Card sm="6">*/}
                {/*    <CardImg src={funding.thumbnailImage}top width="100" alt="Card image cap" />*/}
                {/*    <CardBody>*/}
                {/*        <CardTitle>[{funding.artistSelect}] {funding.fundingTitle}</CardTitle>*/}
                {/*        <CardSubtitle> {funding.fundingStartDate} {funding.fundingStartTime} ~ {funding.fundingEndTime} {funding.fundingEndTime}</CardSubtitle>*/}
                {/*        /!*<CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>*!/*/}
                {/*        /!*<Button>Button</Button>*!/*/}
                {/*    </CardBody>*/}
                {/*</Card>*/}
            </div>
        )

    }

}

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
