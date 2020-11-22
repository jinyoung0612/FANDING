const express = require('express');
const router = express.Router();
const axios = require('axios');
const request = require('request');
const config = require('../../config/finConfig');
//const check_deposit = require('../../store/actions/userActions');

router.get('/api', (req,res)=> res.json({username:"jinyoung2"}));

router.post('/api/token', (req,res) =>{
    const authCode = req.body.code;
    console.log(authCode);
    const option = {
        method: "POST",
        url: "https://testapi.openbanking.or.kr/oauth/2.0/token",
        headers: "",
        form: {
            code: authCode,
            client_id: config.client_id,
            client_secret: config.client_secret,
            redirect_uri: "http://localhost:3000/account_auth",
            grant_type: "authorization_code"
        }
    }
    request(option, (error, response, body) => {
        console.log('/token');
        var result = JSON.parse(body);

        console.log('token result');
        console.log(result);

        res.send(result);
    });
})

//사용자/계좌 관리
router.post('/api/user/me', (req,res) =>{
    console.log('/api/user/me');
    
    var accessToken = req.body.access_token;
    var userSeqNo = req.body.user_seq_no;
    console.log('req.body.access_token: ',accessToken);
    console.log('req.body.user_seq_no: ', userSeqNo);

    var option2 = {
        method: "GET",
        url: "https://testapi.openbanking.or.kr/v2.0/user/me",
        headers: {
            Authorization:'Bearer '+ accessToken
        },
        qs: {
            user_seq_no: userSeqNo
        }
    }
    request(option2,function(error,response,body){
        console.log('/user/me');
        var result2 = JSON.parse(body);
       
       res.send(result2);
    })
})

// 거래내역 조회
router.post('/api/account/transaction', (req,res) => {
    console.log('/api/account/transaction');

    var accessToken = req.body.access_token;
    var finNum = req.body.fintech_use_num;
    console.log('req.body.access_token: ',accessToken);
    console.log('req.body.fintech_use_num: ', finNum);
    

    var countnum = Math.floor((Math.random()*(1000000000-1)+1));

    var bankTranID = "T991666810U" + countnum;

    var option3 = {
        method: "GET",
        url: "https://testapi.openbanking.or.kr/v2.0/account/transaction_list/fin_num",
        headers: {
            Authorization: "Bearer " + accessToken
        },
        qs: {
            bank_tran_id: bankTranID,
            fintech_use_num: finNum,
            inquiry_type: "A",
            inquiry_base: "D",
            from_date: "20201020",
            to_date: "20201119",
            sort_order: "D",
            tran_dtime: "20201116170400"
        }
    }
    request(option3,function(error,response,body){
        console.log('/account/transaction');
        var result3 = JSON.parse(body);
        console.log('transaction list : ',result3);

        res.send(result3);
    })
})

// 거래내역 조회 및 입금확인
router.post('/api/account/transaction/check', (req,res) => {
    console.log('/api/account/transaction/check');

    var accessToken = req.body.access_token;
    var finNum = req.body.fintech_use_num;
    console.log('req.body.access_token: ',accessToken);
    console.log('req.body.fintech_use_num: ', finNum);
    
    var participants = req.body.participants;

    var countnum = Math.floor((Math.random()*(1000000000-1)+1));

    var bankTranID = "T991666810U" + countnum;

    var option3 = {
        method: "GET",
        url: "https://testapi.openbanking.or.kr/v2.0/account/transaction_list/fin_num",
        headers: {
            Authorization: "Bearer " + accessToken
        },
        qs: {
            bank_tran_id: bankTranID,
            fintech_use_num: finNum,
            inquiry_type: "A",
            inquiry_base: "D",
            from_date: "20201020",
            to_date: "20201119",
            sort_order: "D",
            tran_dtime: "20201116170400"
        }
    }

    function changeState(transactions,participants){
        if(transactions!=null){
            var count = transactions.length;
            
            var p_count = participants.length;
            console.log("participants count: ", p_count);
            
            var realResult = {}

            for(var j=0; j<p_count; j++){
                var uid = participants[j].uid;
                for(var i=0; i<count; i++){
                    if(participants[j].name===transactions[i].print_content
                        &&participants[j].price===transactions[i].tran_amt){
                            realResult[uid]= 'true';
                        }
                    else{
                        if(realResult[uid]!=='true'){
                        realResult[uid]= 'false';
                        }
                    }
                }
            }
            
            console.log("real result: ", realResult);
            
            res.send(realResult);
        }
    }
    request(option3,function(error,response,body){
        console.log('/account/transaction');
        var result3 = JSON.parse(body);
        //console.log('transaction list : ',result3);
        var transactions = result3.res_list;
        changeState(transactions,participants);
    })

})

// 토큰 발급 - 2-legged
router.get('/api/oobToken', function(req, res) {
    var option = {
        method : "POST",
        url : "https://testapi.openbanking.or.kr/oauth/2.0/token",
        headers : "",
        form : {
            client_id : config.client_id,
            client_secret : config.client_secret,
            scope : 'oob',
            grant_type : 'client_credentials'
        }
    }
    request(option, function (error, response, body) {
        console.log('/oobToken');
        console.log(body);    
        var result = JSON.parse(body);
        var oob_token = result.access_token;
        console.log(oob_token);
    });
})


module.exports=router;