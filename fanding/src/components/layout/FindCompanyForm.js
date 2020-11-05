import React, {Component} from 'react';
import { Link } from "react-router-dom";
import { Button, NavLink, Col, Form, FormGroup, Label, Input, FormText, CustomInput } from 'reactstrap';
import { connect } from 'react-redux';
import {firebase_recruit_save} from '../../store/actions/recruitCompanyActions';
import {storage} from "../../config/fbConfig";
import { Redirect } from 'react-router-dom';
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

class FindCompanyForm extends Component {

    constructor(props){
        super(props);

        this.state={
            image:null,
            url:"",
            progress:0,
            itemTitle: '',
            itemImage:'',
            detailText:'',
            itemPrice:'',
            itemRemain:'',
            shippingMethod:'',
            content:''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    

    editorRef = React.createRef();

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

   
    
    handleChangeEditor = e =>
    {
        const content = this.editorRef.current.getInstance().getHtml();
        console.log("I am editor" + content)

        this.setState({
            content: content
        });
    }
    handleSubmit = e => {
        e.preventDefault();
        
        console.log(this.state.content);

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
                            this.props.firebase_recruit_save(this.state)
                            this.setState({redirectToReferrer: true})

                        })
                }
            )
        }
        else{
            this.props.firebase_recruit_save(this.state);
            this.setState({redirectToReferrer: true})

        }
    };
    render()
    {
        //const { authError, auth } = this.props;
        //if (auth.uid) return <Redirect to='/' />
        if(this.state.redirectToReferrer===true){
            alert("업체 모집폼이 생성되었습니다");
           return  <Redirect to='/' />
        }
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
                    onChange={this.handleImageChange}
                    />
                </FormGroup>
                </Form>

                <Form>
                <FormGroup>
                    <Label for="detailText">상세 설명</Label>
                    <Editor
                        previewStyle="vertical"
                        height="400px"
                        initialEditType="wysiwyg"
                        initialValue="hello"
                        ref={this.editorRef}
                        plugins= {[codeSyntaxHighlightPlugin.bind(hljs), colorSyntaxPlugin, chart]}
                        onChange = {this.handleChangeEditor}
                        />
                

                        <div id="toastEditor">
                            <h1>Toast UI Editor Example</h1>
                            <div id="editSection"></div>
                            {/*<button onClick={this.saveArticle} className="btn_save">Save</button>*/}
                            <button onChange={this.handleChangeEditor} className="btn_save">Save</button>
                            <div>
                                <h2>result</h2>
                                <textarea className="tf_result" value={this.state.content} readOnly="readOnly"></textarea>
                            </div>
                        </div>
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