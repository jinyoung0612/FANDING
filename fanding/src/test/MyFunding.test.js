import React from 'react';
import renderer from 'react-test-renderer';
import MyFunding from "../components/layout/MyFunding";
import {mapStateToProps} from "../components/layout/MyFunding";
import {describe, it} from "@jest/globals";
import {Provider} from 'react-redux';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {shallow, configure,mount} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import {getFirebase, ReactReduxFirebaseProvider} from "react-redux-firebase";
import firebase from "firebase";
import fbconfig from "../config/fbConfig";
import {createFirestoreInstance, getFirestore, reduxFirestore} from "redux-firestore";
import {jest} from '@jest/globals'
import {applyMiddleware, compose, createStore} from "redux";
import rootReducer from "../store/reducers/rootReducer";
import thunk from "redux-thunk";
import logger from "redux-logger";

configure({adapter:new Adapter()});

let container;
// let store;
// const mockStore = configureMockStore();
// const initState ={
//     authError: null,
//     auth: null,
//     user_data: []
// }
// store = mockStore(initState)
const store = createStore(rootReducer,
    compose(
        applyMiddleware(thunk.withExtraArgument( { getFirebase, getFirestore }),logger),
        reduxFirestore(fbconfig),
    ) //enhancer
);
const rrfProps = {
    firebase,
    config: fbconfig,
    dispatch: store.dispatch,
    createFirestoreInstance,
};
let props;
props={
    authError: null,
    auth: null,
    user_data: []
}

beforeAll(() => {
    jest.mock('react-redux');
});

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);

});
afterEach(() => {
    document.body.removeChild(container);
    container = null;
});

describe('can render', () => {
    // 첫 render와 componentDidMount를 테스트


    let component;
    let dispatch;
    beforeEach(()=>{

        dispatch = jest.fn().mockReturnValue(Promise.resolve({
            user_data: []
        }));
        component = shallow(
            <Provider store={store}>
                 <ReactReduxFirebaseProvider {...rrfProps}>
                     <BrowserRouter>
                         <MyFunding props={props}/>
                     </BrowserRouter>
                 </ReactReduxFirebaseProvider>
            </Provider>
        )
    });

    it('should check componentDidMount()', () => {


        // expect(dispatch).toBeCalled();
        // const instance=component.instance();
        // const loadFundings=jest.fn()
        // console.log(instance)

        // jest.spyOn(instance,loadFundings());
        // instance.componentDidMount();
        // expect(instance.dispatch(loadFundings())).toHaveBeenCalledTimes(1);
        // const dispatch=jest.fn()
        // if(firebase.auth().currentUser){
        //     expect(dispatch(loadFundings(firebase.auth().currentUser.uid)));
        //
        // }
        // else{
        //     expect(props.user_data=[])
        // }
    });

    it('matches snapshot', () => {
        // const result=renderer.create(component)
        // const tree=result.toJSON();
        // expect(tree).toMatchSnapshot();
    });

    it('renders fundings', () => {
       // const text=component.find('h2');
       // console.log(text);
       // expect(text.toEqual(['생성한 펀딩이 없습니다.']))

        // const container = component.find("gallery5 mbr-gallery cid-sgtDmxvlJH");
        // console.log(container.debug())
        // expect(component.find('section'))

    });

});