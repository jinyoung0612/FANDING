import React, { useState, Component, PureComponent } from "react";
import {Button, Input, InputGroup, InputGroupAddon, Media} from 'reactstrap';
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
import {CardDeck, CardText} from 'reactstrap';
import FundingSummary from "./funding/reward/RewardFundingSummary";
import {Link} from "react-router-dom";
import CollectFundingSummary from "./funding/collect/CollectFundingSummary";
import { BsPeopleCircle, BsBell,BsSearch } from "react-icons/bs";

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

    updateSearch=(e)=>{

        this.setState({
            search:e.target.value.substr(0,20)
        });


        if(e.target.value===""){
            this.setState({
                searchOn:false
            })
        }
    }

    handleSearch(e){
        console.log("실행")
        this.setState({
            searchOn:true
        })
    }


    render(){

        const filteredByArtist=this.props.fundings.filter(
            (fundings)=>{
                return fundings.artistSelect.toLowerCase().indexOf(this.state.search.toLowerCase())!==-1;
            }
        )
        const filteredByTitle=this.props.fundings.filter(
            (fundings)=>{
                return fundings.fundingTitle.toLowerCase().indexOf(this.state.search.toLowerCase())!==-1;
            }
        )
        // console.log(this.props.fundings)
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

                        <CardDeck style={{display: 'flex', flexDirection: 'row', justifyContent: 'left', margin:'10px'}}>

                            {
                                fundings.map((funding,i)=>{
                                    return(
                                        <FundingContents funding={funding} key={i}></FundingContents>
                                    )

                                })

                            }
                        </CardDeck>

                        // <CardDeck style={{display: 'flex', flexDirection: 'row', justifyContent: 'left', margin:'10px'}}>
                        //     {
                        //         fundings.map((funding,i)=>{
                        //             if(funding.fundingType==="reward"){
                        //                 return(
                        //                     <Link to={'reward_funding/' + funding.id}>
                        //                         <FundingSummary funding={funding} key={funding.id} />
                        //                     </Link>
                        //                 )
                        //             }
                        //             else {
                        //                 return(
                        //                     <Link to={'collect_funding/' + funding.id}>
                        //                         <CollectFundingSummary funding={funding} key={funding.id} />
                        //                     </Link>
                        //                 )
                        //             }
                        //
                        //         })
                        //
                        //
                        //     }
                        // </CardDeck>

                        

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
                console.log("filter:",filteredByArtist);
                console.log("filter2:",filteredByTitle);
                return(
                    <div>
                        {/*{filteredContents.map((fundings)=>{*/}
                        {/*    console.log(fundings)*/}
                        {/*})}*/}
                        {/*<Media middle object src={main_image} className="img-fluid" alt="main_image" width='100%'/>*/}
                        {/*<InputGroup>*/}
                        {/*    /!*<InputGroupButtonDropdown addonType="prepend" isOpen={dropdownOpen} toggle={toggleDropDown}>*!/*/}
                        {/*    /!*    /!*<Button outline>Split Button</Button>*!/*!/*/}
                        {/*    /!*    /!*<DropdownToggle split outline />*!/*!/*/}
                        {/*    /!*    <DropdownToggle caret>*!/*/}
                        {/*    /!*        Button Dropdown*!/*/}
                        {/*    /!*    </DropdownToggle>*!/*/}
                        {/*    /!*    <DropdownMenu>*!/*/}
                        {/*    /!*        <DropdownItem header>Header</DropdownItem>*!/*/}
                        {/*    /!*        <DropdownItem disabled>Action</DropdownItem>*!/*/}
                        {/*    /!*        <DropdownItem>Another Action</DropdownItem>*!/*/}
                        {/*    /!*        <DropdownItem divider />*!/*/}
                        {/*    /!*        <DropdownItem>Another Action</DropdownItem>*!/*/}
                        {/*    /!*    </DropdownMenu>*!/*/}
                        {/*    /!*</InputGroupButtonDropdown>*!/*/}
                        {/*    <Input placeholder="Search" value={this.state.search} onChange={this.updateSearch.bind(this)} />*/}
                        {/*    <Link to={`/search?keyword=${this.state.search}`}>*/}
                        {/*        <InputGroupAddon addonType="append"><Button color="secondary"> <BsSearch/></Button></InputGroupAddon>*/}
                        {/*    </Link>*/}
                        {/*</InputGroup>*/}

                        {/*{*/}
                        {/*    this.state.searchOn===true ?*/}
                        {/*        <div>*/}
                        {/*            <CardText>"{this.state.search}" 검색 결과입니다.</CardText>*/}
                        {/*        <CardDeck style={{display: 'flex', flexDirection: 'row', justifyContent: 'left', margin:'10px'}}>*/}

                        {/*        {*/}
                        {/*            filteredByArtist.map((funding,i)=>{*/}
                        {/*                return(*/}
                        {/*                    <FundingContents funding={funding} key={i}></FundingContents>*/}
                        {/*                )*/}

                        {/*            })*/}

                        {/*        }*/}
                        {/*    </CardDeck></div> : <SelectedArtist artist={user[0].artistSelect}></SelectedArtist>*/}
                        {/*}*/}
                        <SelectedArtist artist={user[0].artistSelect}></SelectedArtist>
                    </div>


                )
            }
            //
            // if(this.state.searchOn===true){
            //     console.log("검색")
            //     return(
            //         <CardDeck style={{display: 'flex', flexDirection: 'row', justifyContent: 'left', margin:'10px'}}>
            //
            //             {
            //                 filteredByArtist.map((funding,i)=>{
            //                     return(
            //                         <FundingContents funding={funding} key={i}></FundingContents>
            //                     )
            //
            //                 })
            //
            //             }
            //         </CardDeck>
            //     )
            // }

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