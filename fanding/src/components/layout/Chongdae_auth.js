import React, {Component} from 'react';
import { Button } from 'reactstrap';
import { Link } from "react-router-dom";

class Chongdae_auth extends Component{

    render()
    {
        return(
            
            <React.Fragment>
            <Link to="/identity_auth">
              <Button>본인 인증</Button>  
            </Link>
            <Link to="/account_auth">
              <Button>계좌 인증</Button>  
            </Link>
            </React.Fragment>
        
        );
    }
}


export default Chongdae_auth;