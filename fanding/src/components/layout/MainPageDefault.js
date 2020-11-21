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
import {CardDeck, Container} from 'reactstrap';
//import { MainPageFundingList } from "./MainPageFundingList";

const DefaultLayout= () => {
    return(
        <section class="header1 cid-s48MCQYojq mbr-fullscreen mbr-parallax-background" id="header1-f">

    

        <div class="mbr-overlay" style={{opacity: "0.4", backgroundColor: 'rgb(255, 255, 255)'}}></div>
        
        <div class="align-center container">
            <div class="row justify-content-center">
                <div class="col-12 col-lg-8">
                    <h1 class="mbr-section-title mbr-fonts-style mb-3 display-1"><strong>K-POP 팬을 위한 펀딩 공간</strong></h1>
                    
                    <p class="mbr-text mbr-fonts-style display-7">This is a default project. Click any text to edit or style it. Select text to insert a 
                        <a href="/">test</a>. Click the blue "Gear" icon at the top right corner to hide/show buttons, text, title, and change the block background. Click the red "+" button at the bottom right cor</p>
                    <div class="mbr-section-btn mt-3"><a class="btn btn-success display-4" href="/">Button 1</a> <a class="btn btn-success-outline display-4" href="https://mobirise.com">Button 2 &gt;</a></div>
                </div>
            </div>
        </div>
        </section>
    )

}
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
                   <DefaultLayout />
                    {/* <Media middle object src={main_image} className="img-fluid" alt="main_image" width='100%'/> */}
                    Loading...
                {/*    모든펀딩 보여줘야 */}
                </div>
            )
        }
        else{
            if(isLoaded(user)&&user.length!==0){
                console.log("일반사용자");
                return(
                    <div>
                        <DefaultLayout />
                        <section class="gallery5 mbr-gallery cid-sgtDmxvlJH" id="gallery5-q">
    

                        <Container>
                        
                        <MainPageUser></MainPageUser>

                      </Container>


                        </section>
                    </div>
                )
            }
            else if(isLoaded(company)&&company.length!==0){
                console.log("업체");
                return(
                    <div>
                        <DefaultLayout />
                        <MainPageCom></MainPageCom>

                    </div>
                )
            }
            else if(user.length===0 && company.length===0){
                console.log("로그인 안됨");

                return(
                    <div>
                        <DefaultLayout />
                        <section className="gallery5 mbr-gallery cid-sgtDmxvlJH" id="gallery5-q">


                            <Container>
                                <MainPageCom></MainPageCom>
                            </Container>


                        </section>
                    </div>
                )

            }
            else{
                return(
                    <div></div>
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

