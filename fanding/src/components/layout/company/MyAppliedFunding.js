import React, {Component} from 'react';
import {connect} from 'react-redux';
import RecruitFormList from "./RecruitFormList";
import {Container, Row, Col} from "reactstrap";
import SideBarCom from "./SideBarCom";
import {loadAppliedFundings} from "../../../store/actions/companyAction";
import {firestoreConnect, isLoaded} from 'react-redux-firebase';
import {firebase, firestore } from 'firebase';
import { compose } from 'redux';
class MyAppliedFunding extends Component {

    constructor(props) {
        super(props);
        this.state={
            doc_array : this.props.doc_array
        }
        console.log('array:', this.state.doc_array)
    }
    componentWillUnmount(){
        console.log("unmount")
        
    }
    //    componentDidUpdate(prevProps, prevState, snapshot) {
    //     if(this.props.auth !== prevProps.auth){
    //             this.props.dispatch(loadAppliedFundings(this.props.applied[0].recruit_id))
    
    //     }
    //     }
    componentDidMount() {
        console.log('did mount')
        
        
        this.props.dispatch(loadAppliedFundings(this.state.doc_array))
        
        
    }
    render(){
        console.log("render");

        const {auth,user_data}=this.props;
        // console.log(this.state.recruit_id);
        // console.log(this.state.applied.length);
        // if(!isLoaded(auth) || !isLoaded(user_data) || !isLoaded(applied)) {
        //     return(
        //         <div>Loading...</div>
        //     )
        // }
        
        // if(this.props.user_data.length!==0){
            // console.log(user_data);
            return(

                <section class="gallery5 mbr-gallery cid-sgtDmxvlJH" id="gallery5-q"
                style={{paddingTop:'25px'}}>
                    <Container>
                        <Row>
                            
                            <Col>
                            <RecruitFormList recruitCompanies={user_data}/>
                            </Col>
                        </Row>
                    </Container>
                </section>
            )
        }
        
}





// store의 state 값을 props로 연결해줌
const mapStateToProps = (state) => {
    return{
        authError: state.auth.authError,
        auth: state.firebase.auth,
        user_data: state.auth.user_data,
        applied: state.firestore.ordered.applications,
        recruitCompanies: state.firestore.ordered.recruitCompanies,
        test:state.applied
    }
};
export default compose(
    connect(mapStateToProps),
    // firestoreConnect(props=>{
    //     console.log(props.test);
    //     return[
    //         {
    //             collection:'recruitCompanies',
    //             where: 
    //         }
    //     ]
    // })
)(MyAppliedFunding);
