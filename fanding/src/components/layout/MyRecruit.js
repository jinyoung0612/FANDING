import React, {Component} from 'react';
import {connect} from 'react-redux';

import {loadRecruits} from "../../store/actions/recruitCompanyActions";


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

        const {recruits}=this.props;
        console.log(this.props.recruits);

        if(this.props.recruits.length!==0){
            // console.log(user_data);
            return(

                <div>

                </div>
            )
        }
        else{

            return(

                <div>
                    <h2>생성한 업체 모집글이 없습니다..</h2>
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
