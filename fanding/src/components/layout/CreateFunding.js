import React, {Component} from 'react';
import { Button, Col, Form, FormGroup, Label, Input, FormText, CustomInput, Container } from 'reactstrap';
import { Link } from "react-router-dom";
import {BsStop} from "react-icons/bs"
import { connect } from 'react-redux';
import {firebase_funding_save} from '../../store/actions/formActions';
import {storage} from "../../config/fbConfig";
import { Redirect } from 'react-router-dom';
import Select from 'react-select';
import makeAnimated from 'react-select/animated'
//toast-ui
import { Editor } from '@toast-ui/react-editor';
import 'tui-color-picker/dist/tui-color-picker.css';
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import colorSyntaxPlugin from '@toast-ui/editor-plugin-color-syntax';
import hljs from "highlight.js";
import codeSyntaxHighlightPlugin from '@toast-ui/editor-plugin-code-syntax-highlight';
//chart plugin
import 'tui-chart/dist/tui-chart.css';
import chart from '@toast-ui/editor-plugin-chart';
import {compose} from "redux";
import { firestore } from 'firebase';
import {firestoreConnect, isLoaded} from "react-redux-firebase";
import {BsArrowDown} from 'react-icons/bs'


import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';

import FanAuth from "./FanAuth";

const style = {
    control: base => ({
      ...base,
      border: 1,
      // This line disable the blue border
        boxShadow: 'none',
    })
  };
class createFundingDefault extends Component{
    constructor() {
        super();
        this.state={
            isFan:false,
            urls:[]
        }
        this.handler=this.handler.bind(this)
    }
    handler=(urls)=>{
        this.setState({
            isFan:true,
            urls:urls
        })
        console.log("parent",this.state.urls)
    }
    render() {
        console.log(this.state.isFan);
        return (
            this.state.isFan===false ?
                <FanAuth handler={this.handler}/>
                :
                <CreateFunding user={this.props.user} company={this.props.company} bank={this.props.bank} urls={this.state.urls} firebase_funding_save={this.props.firebase_funding_save}/>
        );
    }

}
class CreateFunding extends Component{

    constructor(props) {
        super(props);
        this.state={
            image:null,
            url:"",
            // progress:0,
            artistSelect: '',
            fundingType: "reward",
            fundingTitle: '',
            fundingStartDate: '',
            fundingEndDate: '',
            fundingStartTime: '',
            fundingEndTime: '',
            fundingPeriodLimit: '',
            // thumbnailImage: '',
            detailText: '',
            itemTitle:'',
            itemPrice:'',
            itemLimitBox:'',
            itemRemain:'',
            itemLimit:'',
            shippingMethod:'',
            shippingFee:'',
            shippingDetail:'',
            redirectToReferrer: false,
            content: '',
            selectedCom:'',
            accountName:'',
            bankName:'',
            accountNum:'',
            gift:false,
           isAgreed:false,
            urls:this.props.urls
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    options=[
        {value:'BTS', label:"BTS"},
        {value:'BLACKPINK', label:"BLACKPINK"},
        {value: "APINK", label:"APINK"},
        {value: "TXT", label:"TXT"},
        {value: "DAY6", label:"DAY6"},
        {value: "TWICE", label:"TWICE"},
        {value: "Stray Kids", label:"Stray Kids"},
        {value: "B1A4", label:"B1A4"},
        {value: "NU'EST", label:"NU'EST"},
        {value: "IDLE", label:"IDLE"},
        {value: "기타", label:"기타"},
    ];

    // companies=[
    // ]

    animatedComponents =makeAnimated();

    handleImageChange = e => {

        if (e.target.files[0]) {
            this.setState({image: e.target.files[0]});
        }

    }
    

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value,
        });
        this.handleAccount()
        // console.log(e.target.value);
        console.log(this.state)
    };
    handleChangeSelect = e => {
        console.log(e)
        this.setState({
            artistSelect:e.value
        });
    };
    handleChangeCom = e => {
        console.log(e)
        this.setState({
            selectedCom:e
        });
    };
    handleRadioChange = e => {
        this.setState({
            fundingType: e.target.value
        });
        console.log(this.state.fundingType);
    }

    handleCheckChange = e =>{
        this.setState({
            gift:!this.state.gift
        })
    }
    
    handleChangeEditor = e =>
    {
        const content = this.editorRef.current.getInstance().getHtml();
        console.log("I am editor" + content)

        this.setState({
            content: content
        });
    }

    handleAccount(){
        console.log("handleAccount")
        if(isLoaded(this.props.bank)){
            console.log(this.props.bank[0])
            this.setState({
                accountNum:this.props.bank[0].account_num,
                bankName:this.props.bank[0].bank_name
            });
        }
    }

    handleAgree=(e)=>{
        console.log("checked");
        this.setState({
            isAgreed:!this.state.isAgreed
        })
        console.log(this.state.isAgreed)
    }

    handleSubmit = e => {

        e.preventDefault();

        console.log(this.state);
        if(this.state.isAgreed===false) {
            alert("약관에 동의해주세요");
        }
        else{
            if(this.state.image!=null){
                const uploadTask = storage.ref(`images/${this.state.image.name}`).put(this.state.image);
                uploadTask.on(
                    "state_changed",
                    snapshot => {
                        // const progress = Math.round(
                        //     (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        // );
                        // this.setState({progress: progress});
                    },
                    error => {
                        console.log(error);
                    },
                    () => {
                        storage
                            .ref("images")
                            .child(this.state.image.name)
                            .getDownloadURL()
                            .then(url => {
                                this.setState({url:url});
                                console.log(this.state.url)
                                // console.log(this.state);
                                this.setState({image:this.state.image.name})
                                console.log(this.state);
                                this.props.firebase_funding_save(this.state)
                                this.setState({redirectToReferrer: true})

                            })
                    }
                )
            }
            else{
                console.log(this.state);

                // this.props.firebase_funding_save(this.state);
                this.props.firebase_funding_save(this.state);
                this.setState({redirectToReferrer: true})

            }
        }


        
    };

    editorRef = React.createRef();


    render()
    {


        console.log(this.props.user);
        const {bank}= this.props;
        console.log(this.props.bank);

        // console.log("urlurlurl",this.props.urls)

        if(this.state.redirectToReferrer===true){
            alert("펀딩이 생성되었습니다.");
           return  <Redirect to='/' />
        }

        if(this.state.fundingType==="reward"){
            return (
              <>
             <section className="gallery5 mbr-gallery cid-sgtDmxvlJH" id="gallery5-q">
             <div className="mbr-section-head" style={{paddingBottom: '30px'}}>
                        <h3 className="mbr-section-title mbr-fonts-style align-center m-0 pb-30 mb-10 display-2"><strong>펀딩 생성하기</strong></h3>

            </div>
            <Container
            style={{backgroundColor:"#fafafa", borderRadius:"10px", padding:"3em 2em"}}>

            <Form>
                {/*<FormGroup>*/}
                {/*<Label for="artistSelect">아티스트</Label>*/}
                {/*<CustomInput type="select" id="artistSelect" name="customSelect" onChange={this.handleChange} multiple>*/}
                {/*    {*/}
                {/*        this.state.options.map((e,key) => {*/}
                {/*            return <option value={e.value}>{e.name}</option>;*/}
                {/*        })*/}
                {/*        */}
                {/*    }*/}
                {/*    */}
                {/*</CustomInput>*/}
                {/*</FormGroup>*/}
                <FormGroup>
                    <Label><strong>아티스트</strong></Label>
                    <Select
                    styles={style}
                    id="artistSelect" components={this.animatedComponents} options={this.options} menuPortalTarget={document.body} style={{menuPortal:base=>({...base,zIndex:9999})}} onChange={this.handleChangeSelect}/>
                </FormGroup>


                <FormGroup className="mt-5">
                    <Label for="Radio"><strong>펀딩 유형 선택</strong></Label>
                    <div>
                    <CustomInput
                    type="radio" id="fundingType" value = "reward" name="customRadio" label="리워드형 펀딩"
                    checked={this.state.fundingType === 'reward'}
                    onChange={this.handleRadioChange}

                    inline/>

                    <CustomInput type="radio" id="fundingType2" value="collect" name="customRadio" label="모금형 펀딩"
                    checked={this.state.fundingType === 'collect'}
                    onChange={this.handleRadioChange}
                    inline/>
                </div>

                </FormGroup>

                 <FormGroup className="mt-5">
                            <Label for="fundingTitle"><strong>업체목록 가져오기</strong></Label>
                            {isLoaded(this.props.user) ? <Select id="selectedCom" components={this.animatedComponents} options={[{value:this.props.user[0].selectedCompany,label:this.props.user[0].selectedCompanyName}]}
                                                                 menuPortalTarget={document.body} onChange={this.handleChangeCom}>Select...</Select> :  <Select>Select...</Select>}
                        </FormGroup>

                <FormGroup className="mt-5">
                    <Label for="fundingTitle"><strong>펀딩 제목</strong></Label>
                    <Input type="text" name="title" id="fundingTitle"
                    placeholder="펀딩 제목을 입력하세요"
                    onChange={this.handleChange}/>
                </FormGroup>
                </Form>

                <Label for="startDate" className="mt-5"><strong>펀딩 기간</strong>(입금 기간)</Label>
                <Form inline>
                    <FormGroup >

                        <Input
                            type="date"
                            name="date"
                            id="fundingStartDate"
                            placeholder="펀딩 시작일"
                            onChange={this.handleChange}
                        />

                        <Input
                            type="time"
                            name="time"
                            id="fundingStartTime"
                            placeholder="00:00"
                            onChange={this.handleChange}
                        />

                    <Label for="wave" className="ml-5 mr-5"><strong>~</strong></Label>

                        <Input
                            type="date"
                            name="date"
                            id="fundingEndDate"
                            placeholder="펀딩 종료일"
                            onChange={this.handleChange}
                        />

                        <Input
                            type="time"
                            name="time"
                            id="fundingEndTime"
                            placeholder="00:00"
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                </Form>

                <Form className="mt-5">
                    <FormGroup>
                        <Label for="fileBrowser"><strong>썸네일 이미지</strong>(size: 350*250)</Label>
                        <CustomInput type="file" id="thumthbnailImage" name="customFile"
                                     label="이미지를 업로드 하세요"
                                     onChange={this.handleImageChange}
                        />


                    </FormGroup>
                </Form>
                <Form className="mt-5">
                    <FormGroup>
                        <Label for="detailText"><strong>상세 설명</strong></Label>
                       {/* <Input type="textarea" name="text" id="detailText" onChange={this.handleChange}/>*/}
                        <Editor
                        previewStyle="vertical"
                        height="400px"
                        initialEditType="wysiwyg"
                        initialValue="상세 설명을 입력하세요"
                        ref={this.editorRef}
                        plugins= {[codeSyntaxHighlightPlugin.bind(hljs), colorSyntaxPlugin, chart]}
                        onChange = {this.handleChangeEditor}
                        />


                        {/* <div id="toastEditor">
                            <h1>Toast UI Editor Example</h1>
                            <div id="editSection"></div> */}
                            {/*<button onClick={this.saveArticle} className="btn_save">Save</button>*/}
                            {/* <button onChange={this.handleChangeEditor} className="btn_save">Save</button>
                            <div>
                                <h2>result</h2>
                                <textarea className="tf_result" value={this.state.content} readOnly="readOnly"></textarea>
                            </div>
                        </div>   */}


                    </FormGroup>
                </Form>

                <Label for="itemInfo" className="mt-5"><strong>상품정보</strong></Label>
                <Form inline>

                    <FormGroup>
                        <Label className="mr-1" for="itemTitle">상품명</Label>
                        <Input type="text" name="title" id="itemTitle" placeholder="" onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label className="ml-2 mr-1" for="itemPrice">가격</Label>
                        <Input type="text" name="title" id="itemPrice" placeholder="" onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label className="ml-2 mr-1" for="itemRemain">목표 수량</Label>
                        <Input type="text" name="title" id="itemRemain" placeholder="" onChange={this.handleChange}/>
                    </FormGroup>

                    <FormGroup className="mt-3">
                        <CustomInput className="mr-2" type="checkbox" id="itemLimitBox" label="구매개수 제한" onChange={this.handleChange} />
                        <Input type="text" name="title" id="itemLimit" placeholder="예)2개" onChange={this.handleChange}/>
                    </FormGroup>
                    {/*상품추가 버튼 만들기*/}
                </Form>

                <Label for="shipping" className="mt-5"><strong>배송</strong></Label>
                <Form inline>
                    <FormGroup>
                        <Label className="mr-2" for="shippingMethod">배송방법</Label>
                        <Input type="text" name="title" id="shippingMethod"
                               placeholder="예)택배, 준등기"
                               onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup className="ml-5">
                        <Label for="shippingFee">배송비</Label>
                        <Input type="text" name="title" id="shippingFee"
                               placeholder="0"
                               onChange={this.handleChange}
                        />
                    </FormGroup>
                </Form>

                <Form className="mb-10">
                    <Label for="shippingDetail">배송 안내</Label>
                    <Input  type="textarea" name="text" id="shippingDetail"
                           onChange={this.handleChange}
                    />
                </Form>
                {/*배송방법추가 버튼 만들기*/}


                <Label for="shipping" className="mt-5"><strong>계좌 정보</strong></Label>

                {/*{isLoaded(this.props.bank) ? <Label>{bank[0].bank_name}</Label> : <Label>loading...</Label>}*/}

                <Form className="mb-10" inline>
                    <FormGroup>
                    <Label for="bankName" className="mr-2"><b>은행 이름</b></Label>
                    {/*<Input  type="text" name="text" id="bankName"*/}
                    {/*       onChange={this.handleChange}*/}
                    {/*    //    placeholder={bank.bank_name}*/}
                    {/*/>*/}
                    {isLoaded(this.props.bank) ? <Label>{bank[0].bank_name}</Label> : <Label>loading...</Label>}

                    </FormGroup>

                    <FormGroup className="ml-5">
                    <Label for="accountNum" className="mr-2"><b>계좌번호</b></Label>
                    {/*<Input  type="text" name="text" id="accountNum"*/}
                    {/*       onChange={this.handleChange}*/}
                    {/*    //    placeholder={bank.account_num}*/}
                    {/*/>*/}
                    {isLoaded(this.props.bank) ? <Label>{bank[0].account_num}</Label> : <Label>loading...</Label>}
                    </FormGroup>

                    <FormGroup className="ml-5">
                        <Label for="accountName" className="mr-2">예금주(초성만)</Label>
                        <Input  type="text" name="text" id="accountName"
                                onChange={this.handleChange}
                        />
                    </FormGroup>
                </Form>

                    <FormGroup className="mb-10" style={{marginTop:"30px"}}>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<BsArrowDown />}
                                aria-label="Expand"
                                aria-controls="additional-actions1-content"
                                id="additional-actions1-header">
                                <FormControlLabel
                                    aria-label="Acknowledge"
                                    onClick={(event) => event.stopPropagation()}
                                    onFocus={(event) => event.stopPropagation()}
                                    control={<Checkbox onChange={this.handleAgree}/>}
                                    label="약관에 동의합니다."
                                />

                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography color="textSecondary">
                                    FANDING은 통신판매중개자이며 통신판매의 당사자가 아닙니다.
                                    따라서 개별 판매자가 등록하여 판매한 모든 상품에 대한 거래 정보 및 거래에 대한 책임은 각 판매자가 부담하고, 이에 대하여 FANDING은 일체 책임지지 않습니다.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </FormGroup>


                <Form className="mt-10" onSubmit={this.handleSubmit} >
                    {/*<Link to='/'>*/}

                    {/*    <Button color="warning" size="lg" block onChange={this.handleClick}>폼 만들기</Button>*/}
                    {/*</Link>*/}
                    <Button color="warning" size="lg" block style={{marginTop:"50px"}}>펀딩 만들기</Button>
                </Form>
            </Container>
            </section>
            </>

            )

        }

        else{
            return (
                <>
                   <section className="gallery5 mbr-gallery cid-sgtDmxvlJH" id="gallery5-q">
                   <div className="mbr-section-head" style={{paddingBottom: '30px'}}>
                   <h3 className="mbr-section-title mbr-fonts-style align-center m-0 pb-30 mb-10 display-2"><strong>펀딩 생성하기</strong></h3>
                    </div>
                    <Container
                    style={{backgroundColor:"#fafafa", borderRadius:"10px", padding:"3em 2em"}}>

                    <Form>

                    <FormGroup>
                    <Label><strong>아티스트</strong></Label>
                    <Select
                    styles={style}
                    id="artistSelect" components={this.animatedComponents} options={this.options} menuPortalTarget={document.body} style={{menuPortal:base=>({...base,zIndex:9999})}} onChange={this.handleChangeSelect}/>
                    </FormGroup>


                     <FormGroup className="mt-5">
                    <Label for="Radio"><strong>펀딩 유형 선택</strong></Label>
                    <div>
                    <CustomInput
                    type="radio" id="fundingType" value = "reward" name="customRadio" label="리워드형 펀딩"
                    checked={this.state.fundingType === 'reward'}
                    onChange={this.handleRadioChange}

                    inline/>

                    <CustomInput type="radio" id="fundingType2" value="collect" name="customRadio" label="모금형 펀딩"
                    checked={this.state.fundingType === 'collect'}
                    onChange={this.handleRadioChange}
                    inline/>
                    </div>

                </FormGroup>
                        {/*{console.log("user 정보",this.props.user)}*/}



                        <FormGroup>
                            <Label for="fundingTitle">업체목록 가져오기</Label>
                            {isLoaded(this.props.user) ? <Select id="selectedCom" components={this.animatedComponents} options={[{value:this.props.user[0].selectedCompany,label:this.props.user[0].selectedCompanyName}]}
                                                                 menuPortalTarget={document.body} onChange={this.handleChangeCom}>Select...</Select> :  <Select>Select...</Select>}
                        </FormGroup>

                        <FormGroup className="mt-5">
                            <Label for="fundingTitle">펀딩 제목</Label>
                            <Input type="text" name="title" id="fundingTitle"
                                   placeholder="펀딩 제목을 입력하세요"
                                   onChange={this.handleChange}/>
                        </FormGroup>
                    </Form>

                    <Label for="startDate" className="mt-5"><strong>펀딩 기간</strong>(입금 기간)</Label>
                    <Form inline>
                        <FormGroup>

                            <Input
                                type="date"
                                name="date"
                                id="fundingStartDate"
                                placeholder="펀딩 시작일"
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Input
                                type="time"
                                name="time"
                                id="fundingStartTime"
                                placeholder="00:00"
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <Label for="wave" className="mx-auto"><strong>~</strong></Label>

                        <FormGroup>
                            <Input
                                type="date"
                                name="date"
                                id="fundingEndDate"
                                placeholder="펀딩 종료일"
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Input
                                type="time"
                                name="time"
                                id="fundingEndTime"
                                placeholder="00:00"
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                    </Form>

                    <Form className="mt-5">
                        <FormGroup>
                            <Label for="fileBrowser">썸네일 이미지 (size: 350*250)</Label>
                            <CustomInput type="file" id="thumbnailImage" name="customFile"
                                         label="이미지를 업로드 하세요"
                                         onChange={this.handleImageChange}
                            />


                        </FormGroup>
                    </Form>

                    <Form className="mt-5">
                        <FormGroup>
                            <Label for="detailText">상세 설명</Label>
                            {/* <Input type="textarea" name="text" id="detailText" onChange={this.handleChange}/>*/}
                            <Editor
                                previewStyle="vertical"
                                height="400px"
                                initialEditType="wysiwyg"
                                initialValue="hello"
                                ref={this.editorRef}
                                plugins= {[codeSyntaxHighlightPlugin.bind(hljs), colorSyntaxPlugin, chart]}
                                onChange = {this.handleChangeEditor}
                            />



                        {/* <div id="toastEditor">
                            <h1>Toast UI Editor Example</h1>
                            <div id="editSection"></div> */}
                            {/*<button onClick={this.saveArticle} className="btn_save">Save</button>*/}
                            {/* <button onChange={this.handleChangeEditor} className="btn_save">Save</button>
                            <div>
                                <h2>result</h2>
                                <textarea className="tf_result" value={this.state.content} readOnly="readOnly"></textarea>
                            </div>
                        </div>   */}



                        </FormGroup>
                    </Form>

                    <Label for="itemInfo" className="mt-5"><strong>모금정보</strong></Label>
                    <Form inline>

                        <FormGroup>
                            <Label className="mr-1" for="itemRemain">목표 금액</Label>
                            <Input type="text" name="title" id="itemRemain" placeholder="" onChange={this.handleChange}/>
                        </FormGroup>

                        <FormGroup>
                            <CustomInput className="mr-2" type="checkbox" id="gift" value = "gift" name="customRadio" label="특전 있음"
                                             onChange={this.handleCheckChange}/>
                        </FormGroup>

                        {this.state.gift===true ?  <FormGroup>
                            <Label className="mr-2" for="shippingDetail">특전 배송 안내</Label>
                            <Input className="mr-2" type="textarea" name="text" id="shippingDetail"
                                   onChange={this.handleChange}
                            />
                        </FormGroup> : null}

                    </Form>


                    <Form className="mt-10" onSubmit={this.handleSubmit}>
                        {/*<Link to='/'>*/}

                        {/*    <Button color="warning" size="lg" block onChange={this.handleClick}>폼 만들기</Button>*/}
                        {/*</Link>*/}
                        <Button color="warning" size="lg" block >펀딩 만들기</Button>
                    </Form>
              </Container>
              </section>
                </>

            )

        }

    }
}


const mapStateToProps = (state) => {
    console.log("mapStateToProps");
    return{
        authError: state.auth.authError,
        auth: state.firebase.auth,
        user:state.firestore.ordered.users,
        company:state.firestore.ordered.companies,
        bank: state.firestore.ordered.chongdaes,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        firebase_funding_save: (funding) => dispatch(firebase_funding_save(funding)) //creds -> funding
    };
};

export default compose(
    connect(
    mapStateToProps,
    mapDispatchToProps),

    firestoreConnect(props=>{

        const user_email = props.auth.email == null ? "none": props.auth.email;
        console.log("Compose");
        // console.log(props.user);
        const company = props.user == null ? "none": props.user
        const bank = props.bank == null ? "none" : props.bank
        console.log(company)
       if(user_email){
           return[
               {
                   collection:"users",
                   where:["user_email","==",user_email]
               },
               

           ]
       }
       if(company!=="none"){
           return[

               {
                   collection:"companies",
                   where: ["email","==",company[0].selectedCompany]
               }
           ]
       }
       if(bank !== "none")
       {
           return[
                {
                    collection:"chongdaes",
                    where:["user_email", "==", user_email]
                }
           ]

       }

        // return[
        //     {
        //         collection:"users",
        //         where:["user_email","==",user_email]
        //     },
        //     // {
        //     //     collection:"companies",
        //     //     where: ["email","==",props.user[0].selectedCompany]
        //     // }
        // ]

           

    })

    )(createFundingDefault);