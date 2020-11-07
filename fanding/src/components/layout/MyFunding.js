import React, {Component} from 'react';
import {connect} from 'react-redux';
import {loadFundings} from "../../store/actions/userActions";
import FundingList from "./FundingList";


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


    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.auth !== prevProps.auth){
                this.props.dispatch(loadFundings(this.props.auth.uid))

        }
        }



    render(){
        console.log("render");

        const {auth,user_data}=this.props;
        var str ="";
        console.log(this.props);

        if(this.props.user_data.length!=0){
            return(
                <FundingList fundings={user_data}/>
            )
        }
        else{

            return(

                <div>
                    <h2>생성한 펀딩이 없습니다.</h2>
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
        user_data: state.auth.user_data
    }
};
export default connect(
    mapStateToProps
)(MyFunding);
