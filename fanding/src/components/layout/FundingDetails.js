import React, {useState} from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, CardImg, CardBody,
    CardSubtitle,Form } from 'reactstrap';
import {connect, useSelector} from "react-redux";
import { Link } from 'react-router-dom';
import {useFirestoreConnect} from "react-redux-firebase";
import firebase from "firebase/app"
import ReactHtmlParser from 'react-html-parser';
import ModalPortal from "../../ModalPortal";
import MyModal from "../../MyModal";
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer} from '@toast-ui/react-editor';


const FundingDetails = (props)=>{

    const viewerRef = React.createRef();

    const doc_id=props.match.params.id;
    // console.log(doc_id)
    useFirestoreConnect([{
        collection: 'fundings',
        doc: doc_id
    }]);

    const [isModalOpen,setModal]=useState(false);

    const handleOpenModal=()=>{
        setModal(true);
    }
    const handleCloseModal=()=>{
        setModal(false);
    }

    const funding=useSelector(({firestore:{data}})=>data.fundings && data.fundings[doc_id]);
    // console.log(funding);
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


    if(funding && firebase.auth().currentUser){
        if(firebase.auth().currentUser.uid===funding.user_uid){
            console.log("생성자");
            const content=funding.content;

            return(

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
                            <Button>수정하기</Button>
                        </CardBody>
                    </Card>
                    <div>
                        <Viewer
                            height="400px"
                            initialValue={funding.content}
                            ref={viewerRef}
                            previewStyle="vertical"
                            initialEditType="wysiwyg"
                        />
                    </div>
                </div>

            )

        }
        else{
            return(

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
                            {/*<CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>*/}
                            <Button>찜하기</Button>
                            <Button onClick={handleOpenModal}>펀딩 참여하기</Button>
                            {isModalOpen && (
                                <ModalPortal>
                                    <MyModal onClose={handleCloseModal} funding={funding} fid={doc_id}/>
                                </ModalPortal>
                            )}
                            {/*참여했으면*/}
                            <Button>Notice</Button>
                            <Button>1:1 문의</Button>


                        </CardBody>
                    </Card>
                </div>
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
