// import React, {Component} from 'react';
// // import {loadTasks} from "../../store/actions/userActions";
// import {connect, useSelector} from 'react-redux';
// import {store} from '../../index';
// import firebase from "firebase";
// import {signIn} from "../../store/actions/authActions";
// // import {firebase_fetchMyFunding} from "../../store/actions/userActions"
// import {Button, Card, CardTitle, FormGroup, Input, Label, Form} from "reactstrap";
// import CardText from "reactstrap/es/CardText";
//
// class Test extends Component{
//     constructor(props) {
//         super(props);
//         this.state={
//             user_data:props.user_data
//         }
//
//
//     }
//     // const {user_data}=useSelector((state)=>({
//     //     user_data: state.user_data,
//     // }))
//     // }
//     // return(
//     //     <h2>{user_data}</h2>
//     // )
//     //
//     // componentWillReceiveProps() {
//     //     console.log("will")
//     //     // this.props.dispatch(loadTasks())
//     //     // this.setState({user_data:this.props.user_data})
//     //
//     // }
//     //     // // componentDidMount() {
//     //     // //     this.setState({user_data:this.props.user_data})
//     //     // // }
//     //     //
//     //     // // componentDidMount() {
//     //     // //         this.props.dispatch(loadTasks());
//     //     // // }
//     //     shouldComponentUpdate(nextProps) {
// //     //         console.log("should");
// //     //         // console.log("지금state",this.props)
// //     //         return true;
// //     //
// //     //     }
//
//     // componentDidUpdate(prevProps, prevState, snapshot) {
//     //     console.log("update")
//     //         console.log(this.props)
//     //     }
//
//         componentWillUpdate(nextProps, nextState, nextContext) {
//         console.log(nextState)
//             return true;
//         }
//     // componentWillReceiveProps(nextProps, nextContext) {
//     //     console.log("will")
//     //     this.props.dispatch(loadTasks())
//     //
//     // }
//     //
//     // renderFunding=()=>{
//     //      const{user_data}=this.props;
//     //      console.log("rendirFUnding",user_data)
//     // }
//     //
//
//     renderData=(props)=>(
//         <div>
//             <p>{props.user_data}</p>
//         </div>
//
//         )
//
//
//
//     render(){
//         const {auth,user_data}=this.props;
//         console.log(user_data)
//         // console.log("myFunding:",this.props.store.getState().value);
//         // console.log("render");
//         // console.log(store.getState().value)
//         // console.log(this.props);
//         // console.log(this.props.user_data);
//         // console.log(auth.uid)
//         console.log(this.props.payload)
//         return(
//             // <div>
//             //     <h2>{user_data}</h2>
//             // </div>
//             //
//
//             // <FormGroup>
//             //     <Button onClick={this.props.loadTask}>dfd</Button>
//             //     <Label for="Password">User Data: {this.state.user_data}</Label>
//             //
//             // </FormGroup>
//             <Form>
//                 <FormGroup>
//                     <div>
//                         <Button onClick={this.props.loadTask}>dfd</Button>
//                         {this.props.user_data ? this.props.user_data.map(data=><this.renderData user_data={user_data} /> ):null}
//                     </div>
//                 </FormGroup>
//             </Form>
//
//             // <div>
//             //     {this.props.user_data ? this.props.user.data.map(data=><this.renderData user_data={user_data} /> ):null}
//             // </div>
//
//
//         )
//
//
//
//         //     return(
//         //         <div>
//         //             <h2>gdgd</h2>
//         //         </div>
//         // )
//     }
//
//
// }
//
// // signIn: creds => dispatch(signIn(creds)),
// // const mapDispatchToProps = dispatch => {
// //     return{
// //         loadTask: ()=> dispatch(loadTasks())
// //
// //     }
// // }
// // store의 state 값을 props로 연결해줌
// const mapStateToProps = (state) => {
//     return{
//         authError: state.auth.authError,
//         auth: state.firebase.auth,
//         user_data: state.user_data
//     }
// };
// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(Test);
//
