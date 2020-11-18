import React, {Component} from 'react';
import {Button, Card, CardText, CardTitle, Col} from 'reactstrap';
import { Link } from "react-router-dom";
import axios from "axios";

class Identity_auth extends Component{

    constructor(props) {
        super(props);
        this.state={
            authCode:null,
            accessToken:null
        };
    }
    //
    componentDidMount() {
        fetch("/api/authResult")
            .then(data=>data.json())
            .then(data=>{
                console.log(data);
                this.setState({accessToken: data})
            });

    //     let getData = () =>
    //         axios
    //             .get("/authResult")
    //             .then(data=>{
    //             console.log("실행됨");
    //             console.log(data);
    //             // setTimeout(getData, 1000*5)
    //         })
    //             .then(data=>{
    //                 axios({
    //                     method: 'post',
    //                     url: "https://testapi.openbanking.or.kr/oauth/2.0/token",
    //                     data:{
    //                         code : data.query.code,
    //                         client_id : 'fHcAK2eGVzYpQN6p860McUqC0xiku8UnU95iqRyM',
    //                         client_secret : '3dmg9c0lkuW6jJJVrmNqTyPKY301Xdy3dPyBJv64',
    //                         redirect_uri : 'http://localhost:3001/api/authResult',
    //                         grant_type : 'authorization_code'
    //                     },
    //                     headers:{
    //                         'Content-Type' : 'application/x-www-form-urlencoded'
    //                     }
    //
    //                 })
    //             })
    //             .then(data=>{
    //                 var result= JSON.parse(data);
    //                 var accessToken = result.access_token;
    //                 this.setState({accessToken:accessToken})
    //
    //             })
    //     getData();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        fetch("api/authResult")
            .then(data=>data.json())
            .then(data=>{
                console.log(data);
            });
    }
    // loadAuthCode = async()=>{
    //     axios.get("/api/authResult")
    //         .get(({data})=>{
    //             console.log(실행됨)
    //             console.log(data)
    //         })
    //
    // }


    handleClick=()=>{
        // window.open("https://testapi.openbanking.or.kr/oauth/2.0/authorize?response_type=code&client_id=fHcAK2eGVzYpQN6p860McUqC0xiku8UnU95iqRyM&redirect_uri=http://localhost:3001/api/authResult&scope=login inquiry transfer&state=12345678901234567890123456789012&auth_type=0&lang=kor")
        window.location.href = 'https://testapi.openbanking.or.kr/oauth/2.0/authorize?response_type=code&client_id=fHcAK2eGVzYpQN6p860McUqC0xiku8UnU95iqRyM&redirect_uri=http://localhost:3000/authResult&scope=login inquiry transfer&state=12345678901234567890123456789012&auth_type=0&lang=kor';
    };

    render()
    {
        console.log(this.props.param);
        console.log(this.state.accessToken);
        console.log("rendering");
        return(
            <div>
            <h5>여기서 뭔가 이뤄지나...?
            일단은 본인 인증 버튼을 누르면 /identity_auth로 페이지 이동을 하게 해놓음
            </h5>
                <Col sm="6">
                    <Card body>
                        <CardTitle>본인 인증</CardTitle>
                        <CardText>펀딩을 생성하려면 본인 인증이 필요합니다.</CardText>
                        <Button color="warning" onClick={this.handleClick}>본인 인증</Button>
                    </Card>
                </Col>
            </div>
        )
    }
}

export default Identity_auth;