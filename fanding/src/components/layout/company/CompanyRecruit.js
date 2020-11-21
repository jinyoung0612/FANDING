import React, { Component } from "react";
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import {NavLink, Button, Container} from 'reactstrap';
import { compose } from 'redux';
import RecruitFormList from './RecruitFormList';

class CompanyRecruit extends Component {
    render(){
        const { recruitCompanies } = this.props;
        
        return(
            <div>
            <section class="gallery5 mbr-gallery cid-sgtDmxvlJH" id="gallery5-q">
                <Container>
            <div className="mbr-section-head">
                        <h3 className="mbr-section-title mbr-fonts-style align-center m-0 display-2"><strong>업체 찾기</strong></h3>
                        <p className="mbr-section-subtitle mbr-fonts-style mb-0 mt-2 display-5"
                        style={{fontSize: '1.5rem'}}>
                        총대는 업체 모집 폼을 통해 업체를 모집할 수 있습니다.
                        업체는 원하는 펀딩을 찾아 리워드, 모금 펀딩에 참여할 수 있습니다.
                        </p>
                    </div>
                
                    <NavLink href="/find_company_form">
                        <div className="text-right" style={{paddingRight:'80px'}}>
                        <Button  outline color="primary">업체모집 폼 생성</Button>
                        </div>
                    </NavLink>
                    <RecruitFormList recruitCompanies={recruitCompanies} />
                </Container>
            </section>
            </div>
        )    
    }
}
const mapStateToProps = (state) => {
    console.log(state);
    return {
        recruitCompanies: state.firestore.ordered.recruitCompanies
    }
}
export default compose(
    connect(mapStateToProps),
    firestoreConnect([//data sync
        { collection: 'recruitCompanies',
        //where: ['fundingType', '==', 'reward'],
        } 
    ])
)(CompanyRecruit);