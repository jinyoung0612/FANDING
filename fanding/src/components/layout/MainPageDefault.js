import React, { useState, Component, PureComponent } from "react";
import {Button, Input, InputGroup, InputGroupAddon, Media} from 'reactstrap';
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
import {Link,animateScroll as scroll} from "react-scroll";
import {BsSearch } from "react-icons/bs";
import {Link as Link2}from "react-router-dom";
import Search from "./Search";


const DefaultLayout= () => {
    return(
        <section class="header1 cid-s48MCQYojq mbr-fullscreen mbr-parallax-background" id="header1-f">

    

        <div class="mbr-overlay" style={{opacity: "0.4", backgroundColor: 'rgb(255, 255, 255)'}}></div>
        
        <div class="align-center container">
            <div class="row justify-content-center">
                <div class="col-12 col-sm-8">
                    <h1 class="mbr-section-title mbr-fonts-style mb-3 display-1"><strong>K-POP 팬을 위한 펀딩 공간</strong></h1>
                    
                    <p class="mbr-text mbr-fonts-style display-7">
                        <strong>FANDING은 K-POP 팬을 위한 크라우드 펀딩 서비스입니다. 
                        이제 여러 플랫폼을 사용하지 말고 FANDING만을 사용하여 크라우드 펀딩을 시작해보세요!
                        </strong></p>
                        
                    <div class="mbr-section-btn mt-3">
                        <a class="btn btn-success-outline display-4" href="/">메뉴얼 &gt;</a>
                        <a class="btn btn-success-outline display-4" href="/">
                            <Link activeClass="active" to="gallery5-q" spy={true} smooth={true}>둘러보기 &gt;</Link>
                            </a>
                    </div>
                </div>
            </div>
        </div>
        </section>
    )

}

export class SearchBar extends Component{
    constructor() {
        super();
        this.state={
            search:""
        }

    }

    updateSearch=(e)=>{

        this.setState({
            search:e.target.value.substr(0,20)
        });
        // console.log(this.state.search)

    }

    handleClick=(e)=>{
        // console.log(this.props.history)
        this.props.history.push(`/search?keyword=${this.state.search}`)
    }
    handleKeyPress=(e)=>{
        // console.log(e);
        if(e.key==="Enter"){
            this.handleClick();
        }
    }
    render() {
        // console.log(this.props)
        return(
            <InputGroup>
                <Input placeholder="Search" value={this.state.search} onChange={this.updateSearch} onKeyPress={this.handleKeyPress}/>
                {/*<Link2 to={`/search?keyword=${this.state.search}`}>*/}
                    <InputGroupAddon addonType="append"><Button color="secondary" style={{marginLeft: "0px",marginTop:"0px",marginBottom:"0px"}}onClick={this.handleClick}> <BsSearch/></Button></InputGroupAddon>
                {/*</Link2>*/}
            </InputGroup>
        )
    }


}
class MainPageDefault extends Component {


    render(){
        //const { fundings } = this.props;
        const { auth, user, company, fundings} = this.props;
        // console.log("auth", auth);
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

                        <Container fluid style={{dispaly:'flex', flexFlow:'row wrap'}}>
                          <SearchBar history={this.props.history}/>
                        
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
                        <section className="gallery5 mbr-gallery cid-sgtDmxvlJH" id="gallery5-q">


                        <Container fluid style={{dispaly:'flex', flexFlow:'row wrap'}}>
                                <SearchBar history={this.props.history}/>
                                <MainPageCom></MainPageCom>

                        </Container>


                        </section>


                    </div>
                )
            }
            else if(user.length===0 && company.length===0){
                console.log("로그인 안됨");

                return(
                    <div>
                        <DefaultLayout />

                        <section className="gallery5 mbr-gallery cid-sgtDmxvlJH" id="gallery5-q">


                        <Container fluid style={{dispaly:'flex', flexFlow:'row wrap'}}>
                                <SearchBar history={this.props.history}/>
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

