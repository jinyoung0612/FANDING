import React, {Component} from 'react';
import { compose } from 'redux';
import {firebaseConnect, isLoaded, isEmpty} from "react-redux-firebase";
import {connect} from "react-redux";
import {loadMain} from "../../store/actions/searchActions";
import FundingContents from "./FundingContents";
import {CardDeck} from "reactstrap";
import FundingSummary from "./funding/reward/RewardFundingSummary";
import FundingList from "./funding/reward/RewardFundingList";
import {Link} from "react-router-dom";
import CollectFundingSummary from "./funding/collect/CollectFundingSummary";


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

        // console.log(this.props.user_data);

        if(this.props.user_data.length!==0){
            const fundings=Object.values(this.props.user_data);
              return(
                <div>
                    {/*<CardDeck style={{display: 'flex', flexDirection: 'row', justifyContent: 'left', margin:'10px'}}>*/}
                    {/*{*/}
                    {/*  fundings.map((funding,i)=>{*/}
                    {/*      if(funding.fundingType==="reward"){*/}
                    {/*          return(*/}
                    {/*              <Link to={'reward_funding/' + funding.id}>*/}
                    {/*                  <FundingSummary funding={funding} key={funding.id} />*/}
                    {/*              </Link>*/}
                    {/*          )*/}
                    {/*      }*/}
                    {/*      else {*/}
                    {/*          return(*/}
                    {/*              <Link to={'collect_funding/' + funding.id}>*/}
                    {/*                  <CollectFundingSummary funding={funding} key={funding.id} />*/}
                    {/*              </Link>*/}
                    {/*          )*/}
                    {/*      }*/}

                    {/*  })*/}


                    {/*}*/}
                    {/*</CardDeck>*/}
                    <CardDeck style={{display: 'flex', flexDirection: 'row', justifyContent: 'left', margin:'10px'}}>

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
        else{
            console.log("Loading")
            return(
                <div>
                    Loading...
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

