import React, { Component } from "react";
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import {NavLink, Button, Form} from 'reactstrap';
import { compose } from 'redux';
import RecruitFormList from './RecruitFormList';
import firebase from 'firebase';

class CompanyRecruit extends Component {
    
    constructor(props){
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = () => {
        const {chongdae} = this.props;

        console.log("function chongdae: ",chongdae);
        if(chongdae.length>0){
        console.log("function chongdae[0]: ",chongdae[0]);
        const accessToken = chongdae[0].access_token;
        console.log(accessToken);
        
            if(accessToken!=null && accessToken!='error'){
                window.location.href = "http://localhost:3000/find_company_form";
            }
            else{
                alert("총대인증이 안돼있습니다. 업체모집을 하기 위해선 총대 인증을 먼저 하세요.");
                window.location.href = "http://localhost:3000/chongdae";    
            }
        }
        else{
            alert("총대인증이 안돼있습니다. 업체모집을 하기 위해선 총대 인증을 먼저 하세요.");
            window.location.href = "http://localhost:3000/chongdae";
        }
    }

    render(){
        const { recruitCompanies, chongdae } = this.props;

        console.log('chongdaes: ',chongdae);
        
        if(!isLoaded(chongdae)){
            return(
                <div>Loading...</div>
            )
        }
        else{            
        return(
            <div>

            {/*<NavLink href="/find_company_form"><Button className="pull-right" outline color="primary">업체모집 폼 생성</Button></NavLink>*/}
           
            <Button className="pull-right" outline color="primary" onClick={this.handleSubmit}>업체모집 폼 생성</Button>
            
            <RecruitFormList recruitCompanies={recruitCompanies} />
        
            </div>
        )    
      }
    }
}
const mapStateToProps = (state) => {
    console.log(state);
    return {
        recruitCompanies: state.firestore.ordered.recruitCompanies,
        chongdae: state.firestore.ordered.chongdaes,
        auth: state.firebase.auth,
        authError: state.auth.authError,
    }
}
export default compose(
    connect(mapStateToProps),
    firestoreConnect(props=>{
      const user_email = props.auth.email == null ? 'none': props.auth.email;
      console.log('user email: ', user_email);

      return[
        { collection: 'recruitCompanies',
        //where: ['fundingType', '==', 'reward'],
        },
        {
            collection: 'chongdaes',
            where: [['user_email','==',user_email]]
        } 
      ]
    })
)(CompanyRecruit);

