import React, {Component} from 'react';
import { connect } from 'react-redux'
import {firestoreConnect, isLoaded} from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { Card, CardImg, CardTitle, CardSubtitle, CardText, CardBody } from 'reactstrap';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer} from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';


//import moment from 'moment';
let imgStyle = {
    maxHeight: '400px',
    maxWidth: '400px'
  }
  
class CollectFundingDetail extends Component{

  constructor(props){
    super(props);
    this.state = {
      funding: this.props.funding,

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
    //console.log(this.state);
    
    console.log("props:",this.props.fundings)
      const{funding}=this.props

      console.log("funding:",funding)
    if(isLoaded(funding)&&funding)
    {
      return(
        <>
        <Card sm="6">
            <CardImg top width="10%" src={funding.url} style={imgStyle} alt="Card image cap" />
            <CardBody>
            <CardTitle>{funding.fundingTitle}</CardTitle>
            <CardSubtitle> subtitle</CardSubtitle>
            <CardText>{funding.content}</CardText>
            </CardBody>
            
            
        </Card>
        <div>
             <Viewer
              height="400px"
              initialValue={funding.content}
              ref={this.viewerRef}
              previewStyle="vertical"
              initialEditType="wysiwyg"
              />
        </div>
            </>
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
)(CollectFundingDetail)



//export default FundingDetail;