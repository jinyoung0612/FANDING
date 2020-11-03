import React, {Component} from 'react';
import { Button, Col, Form, FormGroup, Label, Input, FormText, CustomInput } from 'reactstrap';
import { Link } from "react-router-dom";
import {BsStop} from "react-icons/bs"
import { connect } from 'react-redux';
import {firebase_funding_save} from '../../store/actions/formActions';
import {storage} from "../../config/fbConfig";
import { Redirect } from 'react-router-dom';


class CreateFunding extends Component{

    constructor(props) {
        super(props);
        this.state={
            image:null,
            url:"",
            progress:0,
            artistSelect: '',
            fundingType: '',
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
            redirectToReferrer: false
        };
    }

    handleImageChange = e => {

        if (e.target.files[0]) {
            this.setState({image: e.target.files[0]});
        }

    }

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value,
        });
    };

    handleSubmit = e => {


        e.preventDefault();
        if(this.state.image!=null){
            const uploadTask = storage.ref(`images/${this.state.image.name}`).put(this.state.image);
            uploadTask.on(
                "state_changed",
                snapshot => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    this.setState({progress: progress});
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
            this.props.firebase_funding_save(this.state);
            this.setState({redirectToReferrer: true})

        }


    };

    handleClick = e =>{
        // history.replace("/");
    }

    render()
    {

        if(this.state.redirectToReferrer===true){
            alert("펀딩이 생성되었습니다.");
           return  <Redirect to='/' />
        }
        return (
            <>
                <Form>
                    <FormGroup>
                        <Label for="artistSelect">아티스트</Label>
                        <CustomInput type="select" id="artistSelect" name="customSelect" onChange={this.handleChange}>
                            <option value="">Select</option>
                            <option>BTS</option>
                            <option>BLACKPINK</option>
                            <option>TWICE</option>
                            <option>ITZY</option>
                            <option>GOT7</option>
                            <option>기타</option>
                        </CustomInput>
                    </FormGroup>

                    <FormGroup>
                        <Label for="Radio">펀딩 유형 선택</Label>
                        <div>
                            <CustomInput type="radio" id="fundingType" name="customRadio" label="리워드형 펀딩"  onChange={this.handleChange} inline/>
                            <CustomInput type="radio" id="fundingType" name="customRadio" label="모금형 펀딩"  onChange={this.handleChange} inline/>
                        </div>
                    </FormGroup>

                    <FormGroup>
                        <Label for="fundingTitle">펀딩 제목</Label>
                        <Input type="text" name="title" id="fundingTitle"
                               placeholder="펀딩 제목을 입력하세요"
                               onChange={this.handleChange}/>
                    </FormGroup>
                </Form>

                <Form inline>
                    <FormGroup>
                        <Label for="startDate">펀딩 기간(입금 기간)</Label>
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

                    <FormGroup className="ml-auto">
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
                    <FormGroup>
                        <Label for="exampleCheckbox"></Label>
                        <CustomInput type="checkbox" id="fundingPeriodLimit" label="기간 제한 없음" onChange={this.handleChange}/>
                    </FormGroup>
                </Form>

                <Form>
                    <FormGroup>
                        <Label for="fileBrowser">썸네일 이미지 (size: 350*250)</Label>
                        <CustomInput type="file" id="thumbnailImage" name="customFile"
                                     label="이미지를 업로드 하세요"
                                     onChange={this.handleImageChange}
                        />


                    </FormGroup>

                    <FormGroup>
                        <Label for="detailText">상세 설명</Label>
                        <Input type="textarea" name="text" id="detailText" onChange={this.handleChange}/>
                    </FormGroup>
                </Form>

                <Label for="itemInfo">상품정보</Label>
                <Form inline>

                    <FormGroup>
                        <Label for="itemTitle">상품명</Label>
                        <Input type="text" name="title" id="itemTitle" placeholder="" onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="itemPrice">가격</Label>
                        <Input type="text" name="title" id="itemPrice" placeholder="" onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="itemRemain">재고</Label>
                        <Input type="text" name="title" id="itemRemain" placeholder="" onChange={this.handleChange}/>
                    </FormGroup>

                    <FormGroup>
                        <CustomInput type="checkbox" id="itemLimitBox" label="구매개수 제한" onChange={this.handleChange} />
                        <Input type="text" name="title" id="itemLimit" placeholder="" onChange={this.handleChange}/>
                    </FormGroup>
                    {/*상품추가 버튼 만들기*/}
                </Form>

                <Label for="shipping">배송</Label>
                <Form inline>
                    <FormGroup>
                        <Label for="shippingMethod">배송방법</Label>
                        <Input type="text" name="title" id="shippingMethod"
                               placeholder="예)택배, 준등기"
                               onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup className="ml-3">
                        <Label for="shippingFee">배송비</Label>
                        <Input type="text" name="title" id="shippingFee"
                               placeholder="0"
                               onChange={this.handleChange}
                        />
                    </FormGroup>
                </Form>

                <Form>
                    <Label for="shippingDetail">배송 안내</Label>
                    <Input type="textarea" name="text" id="shippingDetail"
                           onChange={this.handleChange}
                    />
                </Form>
                {/*배송방법추가 버튼 만들기*/}

                <Form onSubmit={this.handleSubmit}>
                    {/*<Link to='/'>*/}

                    {/*    <Button color="warning" size="lg" block onChange={this.handleClick}>폼 만들기</Button>*/}
                    {/*</Link>*/}
                    <Button color="warning" size="lg" block >폼 만들기</Button>
                </Form>
            </>
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
        firebase_funding_save: (creds) => dispatch(firebase_funding_save(creds))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CreateFunding);