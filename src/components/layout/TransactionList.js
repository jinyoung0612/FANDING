import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { Card, CardText, CardTitle, Input, Label} from 'reactstrap';

class TransactionList extends Component{

  constructor(props){
    super(props);
    this.state={
      transaction_list : '',
    }
  }
  
    render(){
        const {auth, chongdaes, transactionLists} = this.props;
        console.log('auth', auth);
        console.log('chongdaes', chongdaes);
        console.log('transactionLists', transactionLists);

        if(!isLoaded(auth)){
            return <div> Loading... </div>
        }
        if(this.props.auth.uid){
            if(!isLoaded(chongdaes)){
                return <div>Loading...</div> 
            }else{
                if(chongdaes[0]!=null){
                  
                    console.log('chongdae_access_token: ',chongdaes[0].access_token);
                    
                    if(transactionLists[0]!=null){
                      console.log('transactionLists[0].fintech_use_num: ',transactionLists[0].fintech_use_num);
                      // 거래내역 가져오기
                      let currentComponent = this;
                      getTransactionList(chongdaes,transactionLists,currentComponent)
                     
                      var Lists = this.state.transaction_list;
                      var transactions = [[],[]];
                      transactions = storeTransactions(Lists);
                      console.log("transactions.result", transactions.PromiseResult);
                      console.log("transactions:",transactions);
                      console.log("transactions[0]:",transactions[0]);
                      console.log("transactions[0]['print_content]:",transactions[0]['print_content']);
                      console.log("transactions[0]['tran_amt]:",transactions[0]['tran_amt']);
                      console.log("transactions[1]:",transactions[1]);

                      return(
                        <Card body>
                          <CardTitle>거래내역</CardTitle>
                        </Card>
                      );
                    //}
                  }   
                }
            }//else
        }//uid if
    }//render
}

const mapStateToProps = (state) => {
    console.log('mapStateToProps', state);
    return {
      uid : state.firebase.auth.uid,
      chongdaes : state.firestore.ordered.chongdaes,
      transactionLists : state.firestore.ordered.transactionLists,
      auth : state.firebase.auth,
      authError : state.auth.authError,
    }
  }

  /*
  const mapDispatchToProps = (dispatch) => {
    console.log(dispatch);
    return {
        getTransactionList: (creds) => dispatch(getTransactionList(creds))
    };
  };
  */
  export default compose(
    connect(mapStateToProps),
    firestoreConnect(props=> {
      const user_email = props.auth.email == null ? 'none': props.auth.email;
      console.log('user email: ', user_email);
  
      return[
        {
          collection: 'transactionLists',
          where: [['chongdae_email', '==', user_email]],
        },
        {
          collection: 'chongdaes',
          where: [['user_email', '==', user_email]],
        },
      ];
    })

    //connect(null,mapDispatchToProps)
  )(TransactionList);
  
  async function getTransactionList(chongdaes, transactionLists, currentComponent){
    console.log('chongdae_access_token: ',chongdaes[0].access_token);
    const access_token = chongdaes[0].access_token;
    const fintech_use_num = transactionLists[0].fintech_use_num;

    // 본인인증한 user 이름, 계좌 정보 가져오기
    axios.post('/api/account/transaction',{
      access_token : access_token,
      fintech_use_num : fintech_use_num
    })
    .then((res)=>{
      if(res.data.page_record_cnt){
        const bankName = res.data.bank_name;
        console.log('bank name: ',bankName);
        const result = res.data.res_list;
        console.log('transaciton list: ',result);
        console.log('transaciton [0]print_content: ',result[0].print_content);
        
          currentComponent.setState({
            transaction_list: result
          });
        
      }
      else{
        console.log('transaction list 불러오기 실패');
        console.log('fail. this.state.trlist: ', currentComponent.state.transaction_list);
      }  
    })
    .catch(function(error){
      console.log(error);
    })

  }

  function storeTransactions(Lists){
    console.log("lists length: ", Lists.length);
    console.log('Lists:',Lists);
    var count = Lists.length;
    var transactions = [[],[]];
    
    for(var i=0; i<count; i++){
      for(var key in Lists[i]){  
        console.log(Lists[i][key]);
        transactions[i][key] = Lists[i][key];
        console.log("transactions["+i+"]["+key+"]:",transactions[i][key]);
        }
    }

    return transactions
  }
