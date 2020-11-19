import React, {Component} from 'react';
import { connect } from 'react-redux'
import { firestoreConnect, isLoaded } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { Card, CardImg, CardTitle, CardSubtitle, CardText, CardBody, Container, Row, Col, Button, Progress } from 'reactstrap';
//import { Viewer } from '@toast-ui/editor/dist/toastui-editor-viewer';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Editor, Viewer} from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import { BsHeart, BsChatSquareDots } from "react-icons/bs";
import {FaShareAlt} from "react-icons/fa";
import ModalPortal from "../../../../ModalPortal";
import MyModal from "../../../../MyModal";
import Test2 from "../../../../components/test2"
import { CopyToClipboard } from 'react-copy-to-clipboard'

//import moment from 'moment';
let imgStyle = {
    maxHeight: '400px',
    maxWidth: '400px'
  }
  
 
class FundingDetail extends Component{

  constructor(props){
    super(props);
    this.state = {
      funding: this.props.funding,
        isModalOpen:false

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
  
   handleOpenModal=()=>{
        this.setState({isModalOpen:true})
    }
   handleCloseModal=()=>{
       this.setState({isModalOpen:false})
    }

  handleChangeEditor = e =>
    {
        const content = this.editorRef.current.getInstance().getHtml();
        console.log("I am editor" + content)

        this.setState({
            content: content
        });
    }
  viewerRef = React.createRef();

  
  render(){
    console.log(this.state.funding);
    const url=window.location.href; 
  
    if(this.state.funding)
    {
      return(
        
        <section class="gallery5 mbr-gallery cid-sgtDmxvlJH" id="gallery5-q">
        
         <Container>  
         <div className="text-left"><h2><b>{this.state.funding.fundingTitle}</b></h2></div>
         <Button disabled className="xs ml-0" style={{backgroundColor:"#ebebeb"}}>{this.state.funding.artistSelect}</Button>
         <div className="mt-5">
        <Row xs="2">
          <Col><CardImg top width="10%" src={this.state.funding.url} style={imgStyle} alt="Card image cap" /></Col>
          <Col>
            <div>
              <div className="text-center"><b>80% 달성</b></div>
              <Progress color="info" value="80" />
              <p className="mt-5"><b>257명</b>의 FAN</p>
              <p className="mt-3"><b>15일</b> 남음</p>
              <Row xs="2">
                <Button color="info" onClick={this.handleOpenModal}>펀딩 참여하기</Button>
                {/* <Test2></Test2> */}
                {this.state.isModalOpen && (
                    <ModalPortal>
                        <MyModal onClose={this.handleCloseModal} funding={this.state.funding} fid={this.props.match.params.id}/>
                    </ModalPortal>
                )}
              </Row>
              <Row xs="3">
                <Col><Button style={{backgroundColor: '#bfbfbf'}} size="xs" block><BsHeart className="mr-2"/>  350</Button></Col>
                <Col><Button color="secondary" size="xs" block><BsChatSquareDots className="mr-2"/>  문의</Button></Col>
                <Col>
                <CopyToClipboard text={url}>
                <Button color="secondary" size="xs" block><FaShareAlt className="mr-2" />  공유</Button>
                </CopyToClipboard>
                </Col>
              </Row>
            </div>
          </Col>
          
      </Row>
        
        <div className="mt-auto">
             <Viewer
              height="400px"
              initialValue={this.state.funding.content}
              ref={this.viewerRef}
              previewStyle="vertical"
              initialEditType="wysiwyg"
              />
        </div>
        </div>
        </Container>
        </section>
      )
    }
    else
    {
      return(
        <div>
              <p>Loading funding...</p>
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
    const fundings = state.firestore.data.fundings;
    const funding = fundings ? fundings[id] : null
    return {
      funding: funding,
      auth: state.firebase.auth
    }
  }



export default compose(
    connect(mapStateToProps),
    firestoreConnect(props => [{
        collection: 'fundings', doc: props.match.params.id
    }])
)(FundingDetail)



//export default FundingDetail;