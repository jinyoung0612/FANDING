import React, {Component} from 'react';
import {connect} from 'react-redux';

import {loadRecruits} from "../../store/actions/recruitCompanyActions";
import {Link} from "react-router-dom";
import RecruitFormSummary from "./company/RecruitFormSummary";
import {Container, Row, Col} from 'reactstrap';
import SideBar from './SideBar';

class MyRecruit extends Component {

    constructor(props) {
        super(props);
        this.state={

        }
    }

    componentWillUnmount(){
        console.log("unmount")
    }


    componentDidMount() {
        this.props.dispatch(loadRecruits(this.props.auth.uid))
    }


    render(){
        console.log("render");

        // const {recruits}=this.props;
        console.log(this.props.recruits);

        if(this.props.recruits.length!==0){
            const recruits=Object.values(this.props.recruits);

            return(
                <section class="gallery5 mbr-gallery cid-sgtDmxvlJH" id="gallery5-q">
                    <Container>
                    <Row>
                        <Col sm={3}>
                            <SideBar />
                        </Col>
                    { recruits && recruits.map(recruit => {
                        return (
                            <Link to={'/find_company/' + recruit.id}>
                                <RecruitFormSummary recruitCompany={recruit} key={recruit.id} />
                            </Link>
                        )
                    })}
                    </Row>
                </Container>
                </section>
            )
        }
        else{

            return(

                <div>
                    <h2>생성한 업체 모집글이 없습니다</h2>
                </div>


            )
        }


    }


}

// store의 state 값을 props로 연결해줌
const mapStateToProps = (state) => {
    return{
        authError: state.auth.authError,
        auth: state.firebase.auth,
        recruits: state.auth.recruits
    }
};
export default connect(
    mapStateToProps
)(MyRecruit);
