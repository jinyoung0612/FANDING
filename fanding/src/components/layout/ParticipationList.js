import React, {useEffect} from "react";
import {useFirestoreConnect} from "react-redux-firebase";
import firebase from "firebase";
import {connect, useSelector} from "react-redux";
import {Card, CardBody, CardImg, CardSubtitle, CardTitle, CardDeck} from "reactstrap";
import {Link} from "react-router-dom";
let imgStyle = {
    maxHeight: '200px',
    maxWidth: '200px'
  }
const ParticipationList=({participation})=>{
    // console.log(participation)
    const fid=participation.fid;

    useFirestoreConnect([{
        collection: 'fundings',
        doc:fid
    }]);

    const funding=useSelector(({firestore:{data}})=>data.fundings && data.fundings[fid]);

    // console.log(funding);

    if(funding && participation){
        // console.log(fid)
        return(
            <CardDeck style={{display: 'flex', flexDirection: 'row', 
            justifyContent: 'left', margin:'10px'}}>

                <Link to={'funding_detail/'+fid} funding={funding}>
                <Card body style={{width:'15em',flex: '1',
        backgroundColor: "#ebebeb", height:'20em', margin: '5px'}} >
                        <CardImg src={funding.thumbnailImage}top width="100" alt="Card image cap" style={imgStyle}/>
                        <CardBody>
                            <CardTitle>[{funding.artistSelect}] {funding.fundingTitle}</CardTitle>
                            <CardSubtitle> {funding.fundingStartDate} {funding.fundingStartTime} ~ {funding.fundingEndTime} {funding.fundingEndTime}</CardSubtitle>
                            {/*<CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>*/}
                            {/*<Button>Button</Button>*/}
                        </CardBody>
                    </Card>
                </Link>

        </CardDeck>
    )
    }
    else{
        return(
            <div>
                <h2>참여한 펀딩이 없습니다.</h2>
            </div>
        )
    }


}
// export default ParticipationList;
const mapStateToProps = (state) => {
    return{
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
};

export default connect(
    mapStateToProps
)(ParticipationList);