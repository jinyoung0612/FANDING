import React, {Component} from 'react';
import { Button } from 'reactstrap';
import { Link } from "react-router-dom";


class MyAccount extends Component{

    render()
    {

        return(

        <React.Fragment>

            <Link to="/chongdae">
                    <Button>총대 인증</Button>
            </Link>

            
        </React.Fragment>

        )
    }
}



export default MyAccount;