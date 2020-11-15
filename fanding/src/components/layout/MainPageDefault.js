import React, { useState, Component, PureComponent } from "react";
import {Media} from 'reactstrap';
import main_image from './fanding_main_image.png';
import {firestoreConnect, useFirestoreConnect} from 'react-redux-firebase';
import { compose } from 'redux';
import {firebase } from 'firebase';
//import FundingList from './funding/reward/RewardFundingList';
import {firebaseConnect, isLoaded, isEmpty} from "react-redux-firebase";
import {connect, useSelector} from "react-redux";
import MainPageUser from "./MainPage";
import MainPageCom from "./MainPageCom";
//import { MainPageFundingList } from "./MainPageFundingList";

class MainPageDefault extends Component {


    render(){
        //const { fundings } = this.props;
        const { auth, user, company, fundings} = this.props;
        console.log("auth", auth);
        console.log("users", user);
        console.log("companies", company);
        // console.log("fundings", fundings);


        // const artist1 = user.artist1;
        //console.log(artist1);
        //this.props.auth.isLoaded
        //if (this.props.auth.isLoaded) //logined user -> show interested artists' funding
        if(!isLoaded(auth) || !isLoaded(user) || !isLoaded(company)) {
            return (

                <div>
                    <Media middle object src={main_image} className="img-fluid" alt="main_image" width='100%'/>
                    Loading...
                {/*    모든펀딩 보여줘야 */}
                </div>
            )
        }
        else{
            if(isLoaded(user)&&user.length!=0){
                console.log("일반사용자");
                return(
                    <div>
                        <Media middle object src={main_image} className="img-fluid" alt="main_image" width='100%'/>
                        <MainPageUser></MainPageUser>
                    </div>
                )
            }
            else if(isLoaded(company)&&company.length!=0){
                console.log("업체");
                return(
                    <div>
                        <Media middle object src={main_image} className="img-fluid" alt="main_image" width='100%'/>
                        <MainPageCom></MainPageCom>

                    </div>
                )
            }
            else if(user.length==0 && company.length==0){
                console.log("로그인 안됨");

                return(
                    <div>
                        <Media middle object src={main_image} className="img-fluid" alt="main_image" width='100%'/>
                        {/*<MainPageCom></MainPageCom>*/}
                    </div>
                )

            }

        }
        return(
            <div>

            </div>
        )

    }
}
const mapStateToProps = (state) => {
    console.log("mapStateToProps", state);
    return {

        uid: state.firebase.auth.uid,
        auth: state.firebase.auth,
        authError: state.auth.authError,
        user: state.firestore.ordered.users,
        company: state.firestore.ordered.companies,
        fundings:state.firestore.ordered.fundings



    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect(props=> {
        const user_email = props.auth.email == null ? "none": props.auth.email;
        console.log('user email:', user_email);

        return[
            {
                collection:'fundings',
            },

            {
                collection: 'users',
                where: [['user_email', '==', user_email]],
                },
                {
                    collection:'companies',
                    where:[['email','==',user_email]]
                },


        ]
    }
    )
)(MainPageDefault);

