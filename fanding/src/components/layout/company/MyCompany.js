import React, {Component, useEffect, useState} from 'react';
import {Container, Row} from 'reactstrap';
import SideBarCom from './SideBarCom';
import {connect} from 'react-redux';

const MyCompany = (props) => {
    if(props.auth.isLoaded){
        return (
          <>
          
          <section class="gallery5 mbr-gallery cid-sgtDmxvlJH" 
          id="gallery5-q" style={{paddingTop:'25px'}}>
          <Container>
            <Row>
              <SideBarCom />
              <div>
              <h4 style={{paddingTop: '28px', paddingLeft:'25px'}}>내 정보에서는 프로필 관리, 펀딩 관리를 할 수 있습니다. </h4>
              </div>
            </Row>
            </Container>
            </section>
        </>
        )
    }
    else{
        return(
          <div>Loading...</div>
        )
      }    
}

const mapStateToProps = (state) => {
    return{
      authError: state.auth.authError,
      auth: state.firebase.auth,
      user_data: state.user_data
    }
  };
  

  export default connect(
      mapStateToProps
  )(MyCompany);