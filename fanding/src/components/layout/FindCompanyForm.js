import React, {Component} from 'react';
import { Link } from "react-router-dom";
import { Button, NavLink, Col, Form, FormGroup, Label, Input, FormText, CustomInput } from 'reactstrap';
import { connect } from 'react-redux';
import {firebase_recruit_save} from '../../store/actions/recruitCompanyActions';

class FindCompanyForm extends Component {

    state = {
        itemTitle: '',
        itemImage:'',
        detailText:'',
        itemPrice:'',
        itemRemain:'',
        shippingMethod:'' 
      };

    handleChange = e => {
        this.setState({
          [e.target.id]: e.target.value,
        });
      };

    handleSubmit = e => {
        e.preventDefault();
        this.props.firebase_recruit_save(this.state); // 변경할 부분
        };

    handleClick = e =>{
        // history.replace("/");
    }

    render()
    {
        //const { authError, auth } = this.props;
        //if (auth.uid) return <Redirect to='/' />
        console.log(this.props);
        return (
            <>
            <Form>
                <FormGroup>
                    <Label for="itemTitle">제작할 상품 종류</Label>
                    <Input type="text" name="title" id="itemTitle" 
                    placeholder="제작할 상품 종류 ex)키링, 그립톡"
                    onChange={this.handleChange}/>
                </FormGroup>
            </Form>
                
                <Form>
                <FormGroup>
                    <Label for="fileBrowser">예상 디자인 (size: 350*250)</Label>
                    <CustomInput type="file" id="itemImage" name="customFile" 
                    label="이미지를 업로드 하세요" 
                    onChange={this.handleChange}
                    />
                </FormGroup>

                <FormGroup>
                    <Label for="detailText">상세 설명</Label>
                    <Input type="textarea" name="text" id="detailText" onChange={this.handleChange}/>
                </FormGroup>
                </Form>
                
                <Form inline>
                <FormGroup>
                    <Label for="itemPrice">원하는 가격</Label>
                    <Input type="text" name="title" id="itemPrice" placeholder="" onChange={this.handleChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for="itemRemain">예상 제작 개수</Label>
                    <Input type="text" name="title" id="itemRemain" placeholder="" onChange={this.handleChange}/>
                </FormGroup>
                </Form>
                
                <Label for="shipping">배송</Label>
                <Form>
                    <FormGroup>
                    <Label for="shippingMethod">원하는 배송방법</Label>
                    <Input type="text" name="title" id="shippingMethod" 
                    placeholder="예)택배, 준등기"
                    onChange={this.handleChange}
                    />
                    </FormGroup>
                </Form>
                
                
                
                <Form onSubmit={this.handleSubmit}>
                    {/*<Link to='/find_company'>

                        <Button color="warning" size="lg" block>폼 만들기</Button>
                    </Link>
                    */}
                <Button color="warning" size="lg" block onChange={this.handleClick}>폼 만들기</Button>
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
        firebase_recruit_save: (creds) => dispatch(firebase_recruit_save(creds))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(FindCompanyForm);