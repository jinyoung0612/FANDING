import React, {Component} from 'react';
import { Button, Form, Input, Label, Card, CardHeader, CardText } from 'reactstrap';
import {connect,useSelector} from 'react-redux';
import axios from 'axios';
import {verifyChongdae} from '../../store/actions/chongdaeAction';

class Account_auth extends Component{

  
    constructor(props) {
        super(props);
        
        this.state = {
          access_token: '',
          refresh_token: '',
          user_seq_no: '',
          account_num: '',
          bank_name: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      componentDidMount(){
        let currentComponent = this;
        token(currentComponent);
      }

      handleChange = (e) => {
        this.setState({
          [e.target.id]: e.target.value,
        });
        console.log(this.state)
      };
    
      handleSubmit = (e) => {
        e.preventDefault();
    
        console.log(this.state.access_token);
        console.log(this.state);
        if(this.state.bank_name!=="" && this.state.account_num!==""){
          this.props.verifyChongdae(this.state);
          alert("본인인증이 완료되었습니다.");
          if(this.state){
            this.props.history.push("/chongdae");
          }  
        }
        else{
          alert("은행과 계좌번호를 모두 입력하세요.");
        }
        
      };

      
    render()
    {
        return(
          <div>  
              <Card body>
                <CardHeader tag="h3">본인인증 step2</CardHeader>
                <CardText className="abs">
                  <small className="text-muted">
                    본인인증시 등록한 은행이름과 계좌번호를 입력 후, 아래 버튼을 클릭해주세요.
                  </small>
                </CardText>
                <Form onSubmit = {this.handleSubmit}>
                  <Input type="hidden" id="access_token" placeholder={this.state.access_token} onChange={this.handleChange}/>
                  <Input type="hidden" id="refresh_token" placeholder={this.state.refresh_token} onChange={this.handleChange} />
                  <Input type="hidden" id="user_seq_no" placeholder={this.state.user_seq_no} onChange={this.handleChange} />
                  <Label><strong>은행</strong></Label>
                  <p>정확한 은행이름을 입력하세요.</p>
                  <Input type="text" id="bank_name" onChange={this.handleChange} />
                  <br></br>
                  <Label><strong>계좌번호</strong></Label>
                  <p>기호없이 숫자만 입력하세요.</p>
                  <Input type="text" id="account_num" onChange={this.handleChange} />
                  <br />
                <Button id='verifyButton' color="warning" >완료</Button>
                </Form>
              </Card>     
          </div>
        )
    }
}

const mapStateToProps = (state) => {
  return{
    authError: state.auth.authError,
    auth: state.firebase.auth
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
      verifyChongdae: (creds) => dispatch(verifyChongdae(creds))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Account_auth);

async function token(currentComponent){
  console.log(window.location.href);
  if(getQueryStringObjectToken()){
    var authCode = getQueryStringObjectToken()
    axios.post('/api/token',{
      code: authCode
    })
    .then((res)=>{
      if(res.data.rsp_code){
      var errCode = res.data.rsp_code
      console.log(`arror: ${errCode}`)

      currentComponent.setState({
        access_token: 'error',
        refresh_token: 'error',
        user_seq_no: 'error'
      })

      }
      else{
      var accesstoken = res.data.access_token
      console.log(`access_token: ${accesstoken}`)
      var refreshtoken = res.data.refresh_token
      console.log(`refresh_token: ${refreshtoken}`)
      var userseqno = res.data.user_seq_no
      console.log(`user_seq_no: ${userseqno}`)
      
      currentComponent.setState({
        access_token: accesstoken,
        refresh_token: refreshtoken,
        user_seq_no: userseqno
      })
     }
    })
    .catch(function(error){
      console.log(error);
    })
  }
  else{
    alert("본인인증에 실패했습니다. 다시 인증하세요.");
    window.location.href = "/chongdae";
  }
}

function getQueryStringObjectToken(){
  var a = window.location.href.split('&');
  if(a=="") return {};
  var p = a[0].split('=',2);
  console.log('code: ',p[1]);
  return p[1];
}
