import React, { useState, Component, PureComponent } from "react";
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import {firebaseConnect, isLoaded, isEmpty} from "react-redux-firebase";
import {connect} from "react-redux";
import SelectedArtist from "./SelectedArtist";
import FundingContents from "./FundingContents";
import {CardDeck} from 'reactstrap';


const artistsMap = [1, 2, 3];

class MainPage extends Component {

    constructor() {
        super();
        this.state={
            search:'',
            prevSearch:'',
            searchOn:false
        };
    }


    render(){

        // console.log(this.props.fundings)
        //const { fundings } = this.props;
        const { auth, user,fundings} = this.props;
        console.log("auth", auth);
        console.log("users", user);

        if(!isLoaded(auth) || !isLoaded(user)) {
            return (

                <div>
                    {/*<Media middle object src={main_image} className="img-fluid" alt="main_image" width='100%'/>*/}
                    Loading...
                </div>
            )
        }
        else{
            if(!user[0].artistSelect){
                console.log("artistSelect 없음");
                if(isLoaded(fundings)){
                    return(

                        <div>
                            <CardDeck style={{display: 'flex', flexDirection: 'row', justifyContent: 'center',
                                margin:'10px', flexFlow:'row wrap', alignItems:'center'}}>
                                {
                                    fundings.map((funding,i)=>{
                                        return(
                                            <FundingContents funding={funding} key={i}></FundingContents>
                                        )
                                    })

                                }

                            </CardDeck>
                        </div>

                    )

                }

                return(
                    // <Media middle object src={main_image} className="img-fluid" alt="main_image" width='100%'/>
                    <div>
                    </div>
                )
            }
            else{
                console.log("artistSelect 있음");
                console.log("ArtistSelect", user[0].artistSelect);
                return(
                    <div>
                        <SelectedArtist artist={user[0].artistSelect}></SelectedArtist>
                    </div>


                )
            }


        }


    }
}
const mapStateToProps = (state) => {
     console.log("mapStateToProps", state);
    return {

        uid: state.firebase.auth.uid,
        auth: state.firebase.auth,
        authError: state.auth.authError,
        user: state.firestore.ordered.users,
        fundings: state.firestore.ordered.fundings,


    }
}

 export default compose(
    connect(mapStateToProps),
    firestoreConnect(props=> {
        const user_email = props.auth.email == null ? "none": props.auth.email;

        console.log('user email:', user_email);

        return[
            {
                collection: 'users',
                where: [['user_email', '==', user_email]],
            },
            {
                collection:'fundings'
            }

            ]
        }
    )
)(MainPage);

