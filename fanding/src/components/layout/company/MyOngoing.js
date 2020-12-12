import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Container, Row, Col} from "reactstrap";
import SideBarCom from "./SideBarCom";
import {firestoreConnect, isLoaded} from 'react-redux-firebase';
import { compose } from 'redux';
import FundingList from "../FundingList"
// import MyAppliedFunding from "./MyAppliedFunding";

class MyOngoing extends Component {

    constructor(props) {
        super(props);
        this.state={

        }
    }
    
    render(){
        console.log("render");

        const {auth, fundings}=this.props;
        
        if(!isLoaded(auth) || !isLoaded(fundings)){
            return(
                <div>Loading...</div>
            )
        }
        console.log(this.props);
        console.log(this.props.fundings);
        // console.log(this.props.applied[0].recruit_id);
        if(this.props.fundings !==0){
            // console.log(user_data);
            // const array = [];
            // const test = applied.map(ids =>{
                
            //     array.push(ids.recruit_id);
            //     return array
            // })
            // console.log('Myapplied_array:', array);
            
            return(

                <section class="gallery5 mbr-gallery cid-sgtDmxvlJH" id="gallery5-q"
                style={{paddingTop:'25px'}}>
                    <Container>
                        <Row>
                            <Col sm={3}>
                            <SideBarCom />
                            </Col>
                            <Col>
                            <FundingList fundings={this.props.fundings}/>
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
                            <h2 style={{paddingTop:'90px'}}>참여한 펀딩이 없습니다.</h2>
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
        // applied: state.firestore.ordered.applications
        fundings:state.firestore.ordered.fundings
    }
};
export default compose(
    connect(mapStateToProps),
    firestoreConnect(props=>{
        // const uid = firebase.auth().currentUser.uid == null ? "none" : firebase.auth().currentUser.uid;
        const user_email = props.auth.email == null ? "none": props.auth.email;
        console.log('user email:', user_email);

        // console.log('uid:', uid);
        return[
            {
                collection: 'fundings',
                where:[
                ["selectedCom.value","==", user_email]
                ]
            }
            
        ]
        
    })
)(MyOngoing);

