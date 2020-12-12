import React, {Component} from 'react';
import {connect, useSelector} from 'react-redux';
import {useFirestoreConnect} from "react-redux-firebase";
import { Container, Row, Col, Card, CardImg, CardBody, CardTitle, CardSubtitle} from 'reactstrap';
import SideBar from './SideBar';
import {Link} from "react-router-dom";

const MyList=({fid})=>{
    // console.log(fid)
    useFirestoreConnect([{
        collection: 'fundings',
        doc:fid
    }]);
    var funding=useSelector(({firestore:{data}})=>data.fundings && data.fundings[fid]);

    return(
            funding ?
                <div>
                    <Link className="inactive" activeClassName="active" to={'funding_detail/'+fid} funding={funding}>
                        <Card className="col-sm-12 col-12 align-items-sm-stretch card-bigger border-custom"
                              body style={{width:'18em',flex: '1', height:'20em', margin: '8px', paddingTop:'10px',
                            paddingBottom:'10px', paddingLeft:'10px', paddingRight:'10px'}} >
                            <CardImg src={funding.thumbnailImage}top width="100" alt="Card image cap" style={{height:"194px"}}/>
                            <CardBody>
                                <CardTitle>[{funding.artistSelect}] {funding.fundingTitle}</CardTitle>
                                <CardSubtitle> {funding.fundingStartDate} {funding.fundingStartTime} ~ {funding.fundingEndDate} {funding.fundingEndTime}</CardSubtitle>
                            </CardBody>
                        </Card>
                    </Link>
                </div>
            : null
    )


}

const MyCart =(props)=> {

    const user_email= props.auth.email == null ? "none" : props.auth.email

    useFirestoreConnect([{
        collection: 'users',
        where:[
            ["user_email","==",user_email]
        ]
    }]);

    const user=useSelector(({firestore:{data}})=>data.users && data.users[user_email]);
    // console.log(user);
    var likes="";
    if(user){
        likes=user.like
    }
    return(
        <>
            <section class="gallery5 mbr-gallery cid-sgtDmxvlJH" id="gallery5-q">

                <Container>
                    <Row>
                        <Col sm={3}>
                            <SideBar/>
                        </Col>
                        <Col>
                            {
                                likes!=="" ?
                                    likes.map(like=>{
                                        return(
                                            <MyList fid={like}/>
                                        )
                                    })
                                    : null
                            }
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )


}

const mapStateToProps = (state) => {
    return{
        authError: state.auth.authError,
        auth: state.firebase.auth,

    }
};
export default connect(
    mapStateToProps
)(MyCart);
