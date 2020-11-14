import React, {Component} from 'react';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import {firebaseConnect, isLoaded, isEmpty} from "react-redux-firebase";
import {connect} from "react-redux";
import SelectedArtistFundingList from './SelectedArtistFundingList';
import {loadMain, loadMain2} from "../../store/actions/searchActions";
import FundingContents from "./FundingContents";


class SelectedArtist extends Component {

    constructor(props) {
            super(props);
            this.state={
                selectedArtist : this.props.artist
            }

        //console.log("Selected Artist", this.state.selectedArtist);
    }


    componentDidMount(){
        this.props.dispatch(loadMain(this.props.artist));

    }

    componentWillUnmount(){
        console.log("unmount")
    }

    render()
    {
        // const { auth, user, fundings } = this.props;

        console.log(this.props.user_data);
        console.log(typeof(this.props.user_data));



        if(this.props.user_data.length!==0){
            const fundings=Object.values(this.props.user_data)
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
        else{
            console.log("없음")
            return(
                <div>
                    {/*<p>{this.props.artist} 관련 펀딩</p>*/}
                    {/* <SelectedArtistDetail artist={this.state.selectedArtist}></SelectedArtistDetail>*/}
                </div>

            )
        }

    }
}


const mapStateToProps = (state) => {
    // console.log("mapStateToProps 2", state);
   return {
      
        auth: state.firebase.auth,
        authError: state.auth.authError,
        // user: state.firestore.ordered.users
       user_data:state.auth.user_data,

   }
}

export default compose(
   connect(mapStateToProps)
)(SelectedArtist);

