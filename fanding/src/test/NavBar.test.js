import React from 'react';
import { render } from '@testing-library/react';
import NavbarTest from "../components/layout/Navbar";
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import firebase from 'firebase/app';
// import firebase from 'firebase/app';

// // Redux

configure({ adapter: new Adapter() });

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
// const TestComponent = <Provider store={store}><NavbarTest /></Provider>

// Now mock 'firebase/app`:
jest.mock('firebase/app', () => {
    const firebasemock = require('firebase-mock')
    const mockauth = new firebasemock.MockAuthentication()
    const mockfirestore = new firebasemock.MockFirestore()
    return new firebasemock.MockFirebaseSdk(
        null, // RTDB
        () => mockauth,
        () => mockfirestore
    )
})

describe("Just Testing", ()=>{
    test('simple Navbar test', () => {
        const store = mockStore({});
        const props = {
            auth : jest.fn(),
            profile: jest.fn()
        }
        const wrapper = mount(
            <Provider store={store}>
                <NavbarTest {...props} />
            </Provider>
        );
        console.log(wrapper.debug());
        expect(wrapper.find("navbar-caption").text()).toContain("FANDING");
        // const { getByText } = render(<NavbarTest />);
        // const linkElement = getByText("FANDING");
        // expect(linkElement).toBeInTheDocument();
    });

})