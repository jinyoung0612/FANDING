import React, {Component} from 'react';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { Card, CardImg, CardTitle, CardSubtitle, CardText, CardBody, Container, Row, Col, Button, Progress } from 'reactstrap';
//import { Viewer } from '@toast-ui/editor/dist/toastui-editor-viewer';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Editor, Viewer} from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import { BsHeart, BsChatSquareDots } from "react-icons/bs";
import {FaShareAlt} from "react-icons/fa";


//import moment from 'moment';
let imgStyle = {
    maxHeight: '400px',
    maxWidth: '400px'
  }
  
class RecruitFormDetail extends Component{

  constructor(props){
    super(props);
    this.state = {
      recruitCompany: this.props.recruitCompany,

    }
    /*
    this.editor = Editor.factory({
          el:document.querySelector('#editor'),
          viewer: true,
          height: '500px',
          initialValue: this.state.props.content,
          ref: this.viewerRef
        })
        */
  }


  viewerRef = React.createRef();

  
  render(){
    //console.log(this.state);
    
    
    if(this.state.recruitCompany)
    {
      return(
        <>
        <Container>
          
         <div className="text-center"><h2><b>{this.state.recruitCompany.itemTitle}</b></h2></div> 
        <Row xs="2">
          <Col><CardImg top width="10%" src={this.state.recruitCompany.url} style={imgStyle} alt="Card image cap" /></Col>
          <Col>
            <div>
              
              
            </div>
          </Col>
          
      </Row>
        
        <div className="mt-auto">
             <Viewer
              height="400px"
              initialValue={this.state.recruitCompany.content}
              ref={this.viewerRef}
              previewStyle="vertical"
              initialEditType="wysiwyg"
              />
        </div>
        </Container>
            </>
      )
    }
    else
    {
      return(
        <div>
              <p>Loading form...</p>
        </div>
      )
    }
  }
   
}
/*
const FundingDetail = (props) => {
    //const id = props.match.params.id; //route information
    //const { funding, auth } = props;
    //if(!auth.uid) return <Redirect to='/signin' />
    
    //const viewerRef = React.createRef();
    const { funding } = props;
    const rootE1 = React.createRef();
    var viewerInst = null;

    
    var Viewer = { Editor };
    var viewer = new Viewer(
      {
        el: document.querySelector('#viewer'),
        initialValue: 'hello'
      }
    )

    
    
    if (funding)
     {
       

         return(
            <Card sm="6">
            <CardImg top width="10%" src={funding.url} style={imgStyle} alt="Card image cap" />
            <CardBody>
            <CardTitle>{funding.fundingTitle}</CardTitle>
            <CardSubtitle> subtitle</CardSubtitle>
            <CardText>{funding.content}</CardText>
            </CardBody>
            {viewer}
            
            </Card>
            
         )
     }
     else{
         return (
           <div>
               <p>Loading funding...</p>
           </div>
        )
     }
        
}

*/

const mapStateToProps = (state, ownProps) => {
    console.log(state);
    const id = ownProps.match.params.id;
    const recruitCompanies = state.firestore.data.recruitCompanies;
    const recruitCompany = recruitCompanies ? recruitCompanies[id] : null
    return {
      recruitCompany: recruitCompany,
      auth: state.firebase.auth
    }
  }



export default compose(
    connect(mapStateToProps),
    firestoreConnect(props => [{
        collection: 'recruitCompanies', doc: props.match.params.id
    }])
)(RecruitFormDetail)



//export default FundingDetail;