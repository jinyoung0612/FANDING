import React, {Component} from 'react';
import {connect} from 'react-redux';
import {loadFundings} from "../../store/actions/userActions";
import FundingList from "./FundingList";
import {Container, Row, Col, CardDeck} from "reactstrap";
import SideBar from "./SideBar"
import TopNavbar from "./TopNavbar"
class MyFunding extends Component {

    constructor(props) {
        super(props);
        this.state={

        }
    }

    // componentDidMount() {
    //     console.log("didmount")
    //     const uid=this.props.params.uid;
    //     console.log(uid)
    //
    //     this.props.dispatch(loadFundings())
    //     // this.setState({data_state:true})
    // }
    componentWillUnmount(){
        console.log("unmount")
    }


    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     if(this.props.auth !== prevProps.auth){
    //             this.props.dispatch(loadFundings(this.props.auth.uid))
    //
    //     }
    //     }
    componentDidMount() {
        this.props.dispatch(loadFundings(this.props.auth.uid))
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
                            <TopNavbar />
                            <SideBar />
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
                            <TopNavbar />
                            <SideBar />
                            </Col>
                            <Col>
                            
                    <h2 style={{paddingTop:'90px'}}>생성한 펀딩이 없습니다.</h2>
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
        user_data: state.auth.user_data
    }
};
export default connect(
    mapStateToProps
)(MyFunding);
