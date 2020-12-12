import React, {Component} from 'react';
import {connect} from 'react-redux';
import FundingList from "../FundingList";
import {Container, Row, Col} from "reactstrap";
import SideBarCom from "./SideBarCom";
import {loadAppliedFundings} from "../../../store/actions/companyAction";
import {firestoreConnect} from 'react-redux-firebase';
import {firebase } from 'firebase';
import { compose } from 'redux';
class MyAppliedFunding extends Component {

    constructor(props) {
        super(props);
        this.state={

        }
    }
    componentWillUnmount(){
        console.log("unmount")
    }
    componentDidMount() {
        this.props.dispatch(loadAppliedFundings(this.props.applied.recruit_id))
    }
    render(){
        console.log("render");

        const {auth,user_data}=this.props;
        console.log(this.props);

        if(this.props.user_data.length!==0){
            // console.log(user_data);
            return(

                <section class="gallery5 mbr-gallery cid-sgtDmxvlJH" id="gallery5-q"
                style={{paddingTop:'25px'}}>
                    <Container>
                        <Row>
                            <Col sm={3}>
                            <SideBarCom />
                            </Col>
                            <Col>
                            <FundingList fundings={user_data}/>
                            </Col>
                        </Row>
                    </Container>
                </section>
            )
        }
        else{

            return(

                <section class="gallery5 mbr-gallery cid-sgtDmxvlJH" id="gallery5-q"
                style={{paddingTop:'25px'}}>
                    <Container>
                        <Row>
                            <Col sm={3}>
                            <SideBarCom />
                            </Col>
                            <Col>
                            <h2 style={{paddingTop:'90px'}}>지원한 펀딩이 없습니다.</h2>
                            </Col>
                        </Row>
                    </Container>
                </section>

            )
        }


    }

}

// store의 state 값을 props로 연결해줌
const mapStateToProps = (state) => {
    return{
        authError: state.auth.authError,
        auth: state.firebase.auth,
        user_data: state.auth.user_data,
        applied: state.firestore.ordered.applications
    }
};
export default compose(
    connect(mapStateToProps),
    firestoreConnect(props=>{
        const uid = firebase.auth().currentUser.uid == null ? "none" : firebase.auth().currentUser.uid;
        console.log('Hello!');
        console.log('uid:', uid);
        return[
            {
                collection: 'applications',
                where:[
                ["uid","==",uid]
                ]
            }
            
        ]
        
    })
)(MyAppliedFunding);