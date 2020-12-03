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
import {CardText, Row} from 'reactstrap';
var preArtist = null;
var nowArtist = "";
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
            console.log('selected artist', this.state.selectedArtist.length);
 
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


                    <Row className="justify-content-md-center">
                        <CardDeck style={{display: 'flex', flexDirection: 'row',
                            margin:'10px', flexFlow:'row wrap', alignItems:'center'}}>

                            {


                                fundings.map((funding,i)=>{
                                    //console.log("in map", funding.artistSelect);
                                    nowArtist = funding.artistSelect;
                                    // console.log('preArtist', preArtist);
                                    // console.log('nowArtist', nowArtist);
                                    // console.log(funding.fundingTitle);
                                    if(preArtist !== nowArtist)
                                    {
                                        preArtist = nowArtist;
                                        return(
                                            <>
                                                <div style={{width:"100%", marginLeft:"20px"}}>
                                                    <p className="artist-p" style={{float: 'left', textAlign: 'left',marginTop:'50px',
                                                        fontSize:'2.0rem'}}><strong>{nowArtist}</strong> 관련 펀딩</p>

                                                </div>
                                                {/* <CardDeck style={{display: 'flex', flexDirection: 'row', justifyContent: 'left', margin:'10px'}}> */}
                                                <div>
                                                    <FundingContents funding={funding} key={i}></FundingContents>

                                                </div>
                                                {/* </CardDeck> */}
                                            </>
                                        )
                                    }
                                    else{
                                        return(
                                            <FundingContents funding={funding} key={i}></FundingContents>
                                        )


                                    }




                                })

                            }
                        </CardDeck>
                    </Row>
                    {/*<CardDeck style={{display: 'flex', flexDirection: 'row', justifyContent: 'left',*/}
                    {/*margin:'10px', flexFlow:'row wrap', alignItems:'center'}}>*/}

                    {/*    {*/}
                    {/*        */}
                    {/*        */}
                    {/*        fundings.map((funding,i)=>{*/}
                    {/*            //console.log("in map", funding.artistSelect);*/}
                    {/*            nowArtist = funding.artistSelect;*/}
                    {/*            // console.log('preArtist', preArtist);*/}
                    {/*            // console.log('nowArtist', nowArtist);*/}
                    {/*            // console.log(funding.fundingTitle);*/}
                    {/*            if(preArtist !== nowArtist)*/}
                    {/*            {*/}
                    {/*                preArtist = nowArtist;*/}
                    {/*                return(*/}
                    {/*                <>*/}
                    {/*                <div style={{width:"100%", marginLeft:"20px"}}>*/}
                    {/*                        <p className="artist-p" style={{float: 'left', textAlign: 'left',marginTop:'50px',*/}
                    {/*                            fontSize:'2.0rem'}}><strong>{nowArtist}</strong> 관련 펀딩</p>*/}

                    {/*                </div>*/}
                    {/*                /!* <CardDeck style={{display: 'flex', flexDirection: 'row', justifyContent: 'left', margin:'10px'}}> *!/*/}
                    {/*                <div>*/}
                    {/*                    <FundingContents funding={funding} key={i}></FundingContents>*/}

                    {/*                </div>*/}
                    {/*                /!* </CardDeck> *!/*/}
                    {/*                </>*/}
                    {/*                )*/}
                    {/*            }*/}
                    {/*            else{*/}
                    {/*                return(*/}
                    {/*                    <FundingContents funding={funding} key={i}></FundingContents>*/}
                    {/*                )*/}
                    {/*                */}
                    {/*                */}
                    {/*            }*/}
                    {/*            */}
                    {/*            */}
                    {/*            */}

                    {/*        })*/}

                    {/*    }*/}
                    {/*</CardDeck>*/}
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

