import React, { useState, Component, PureComponent } from "react";
import {Media} from 'reactstrap';
import main_image from './fanding_main_image.png';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import {firebase } from 'firebase';
//import FundingList from './funding/reward/RewardFundingList';
import {firebaseConnect, isLoaded, isEmpty} from "react-redux-firebase";
import {connect} from "react-redux";
//import { MainPageFundingList } from "./MainPageFundingList";
import SelectedArtist from "./SelectedArtist";
import {loadMain} from "../../store/actions/searchActions";
import FundingContents from "./FundingContents";

const artistsMap = [1, 2, 3];
class MainPage extends Component {


    render(){
        //const { fundings } = this.props;
        const { auth, user,fundings} = this.props;
        console.log("auth", auth);
        console.log("users", user);
        // console.log("funding", fundings);

        // const artist1 = user.artist1;
        //console.log(artist1);
        //this.props.auth.isLoaded
        //if (this.props.auth.isLoaded) //logined user -> show interested artists' funding
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
                            {
                                fundings.map((funding,i)=>{
                                    return(
                                        <FundingContents funding={funding} key={i}></FundingContents>
                                    )
                                })

                            }
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
                        {/*<Media middle object src={main_image} className="img-fluid" alt="main_image" width='100%'/>*/}
                        <SelectedArtist artist={user[0].artistSelect}></SelectedArtist>
                    </div>
                )
            }
        }



        //this.handleArtist(this.props);
        // const mapToComponent = data => {
        //     return data.map((artist, i) => {
        //       return (<SelectedArtist artist={user[0].artist+{i}} key={i}/>);
        //     });
        //   };
        // console.log("users", user[0].artistSelect)
        //     if(this.props.auth.uid)
        //     {
        //         //console.log("auth", auth);
        //         console.log("ArtistSelect", user.artistSelect);
        //
        //         console.log("logined user");
                //const { user_data } = this.props;
                //console.log(this.props);
                //console.log(this.props.fundings);
                //console.log("auth artist: ",this.props.users.artist1);
           //
           //      if(!isLoaded(user))
           //      {
           //
           //          return <div>Loading...</div>
           //
           //      }
           //      else{
           //
           //          return(
           //
           //              <div>
           //                  <Media middle object src={main_image} class="img-fluid" alt="main_image" width='100%'/>
           //                  {/*<SelectedArtist artist={user[0].artistSelect}></SelectedArtist>*/}
           //              </div>
           //          )
           //      }
           //
           //  }
           // else
           // {
           //      console.log("not loginned");
           //      console.log(this.props);
           //      return (
           //          <Media middle object src={main_image} class="img-fluid" alt="main_image" width='100%'/>
           //          //default fundings
           //      )
           //  }


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
        // const artist1 = props.user.artist1 == null ? "none" : props.user.artist1;
        // const artist2 = props.user.artist2 == null ? "none" : props.user.artist2;
        // const artist3 = props.user.artist3 == null ? "none" : props.user.artist3;

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



/*
export default compose(
    firebaseConnect(),
    connect((state, props) => ({
        uid: state.firebase.auth.uid,
        fundings: state.firestore.ordered.fundings,
        auth: state.firebase.auth,
        authError: state.auth.authError,
        user: state.firestore.ordered.users
    })),
    firestoreConnect(props=>
        [{
            collection: 'users',
            where: [['user_id', '==', props.auth.uid]],
        }]),
)(MainPage);
*/

//export default MainPage;