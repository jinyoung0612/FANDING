import React, {Component} from 'react';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import {firebaseConnect, isLoaded, isEmpty} from "react-redux-firebase";
import {connect} from "react-redux";
import SelectedArtistFundingList from './SelectedArtistFundingList';

class SelectedArtist extends Component {

    constructor(props) {
        super(props);
        this.state={
            selectedArtist : this.props.artist
        }

        console.log("Selected Artist", this.state.selectedArtist);
    }
    render()
    {
        const { auth, user, fundings } = this.props;
        /*
        if(!isLoaded(fundings))
        {   
            return <div>Loading...</div>
        }
*/
        console.log("check artist", this.props.artist);
        console.log("loaded funding: ", fundings);
        
        return(
            <div>
                <p>{this.state.selectedArtist} 관련 펀딩</p>
                <SelectedArtistFundingList fundings={fundings}/>
            </div>
            
        )
    }
}


const mapStateToProps = (state) => {
    console.log("mapStateToProps", state);
   return {
      
       uid: state.firebase.auth.uid,
       fundings: state.firestore.ordered.fundings,
       auth: state.firebase.auth,
       authError: state.auth.authError,
       user: state.firestore.ordered.users
   }
}

export default compose(
   connect(mapStateToProps),
   firestoreConnect(props=> {
       //const artist = props.fundings.artistSelect == null ? "none": props.auth.email;
       console.log('props:', props);
       console.log('props.artist:', props.artist);
       //console.log('fundings: ', props.fundings);
       return[
           {
               collection: 'fundings',
               where: [['artistSelect', '==', props.artist]]
           }
           ] 
       }
              
   )
)(SelectedArtist);

