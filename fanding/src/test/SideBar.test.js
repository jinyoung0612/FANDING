import React from 'react';
import { render } from '@testing-library/react';
import SideBar from "../components/layout/SideBar";
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import firebase from 'firebase/app';

// // Redux

configure({ adapter: new Adapter() });

// Now mock 'firebase/app`:
// jest.mock('firebase/app', () => {
//   const firebasemock = require('firebase-mock')
//   const mockauth = new firebasemock.MockAuthentication()
//   const mockfirestore = new firebasemock.MockFirestore()
//   return new firebasemock.MockFirebaseSdk(
//     null, // RTDB
//     () => mockauth, 
//     () => mockfirestore
//   )
// })


// const TestComponent = <Provider store={store}><NavbarTest /></Provider>

describe("Just Testing", ()=>{
  test('simple Navbar test', () => {
    const wrapper = shallow(<SideBar />);
    console.log(wrapper.debug());
    expect(wrapper.find("h3").text()).toContain("내 정보");
  // const { getByText } = render(<NavbarTest />);
  // const linkElement = getByText("FANDING");
  // expect(linkElement).toBeInTheDocument();
});

})
