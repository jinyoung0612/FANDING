import React, { useState, useEffect } from "react";
import { render } from '@testing-library/react';
import App from './App';
import makeAnimated from "react-select/animated/dist/react-select.esm";

import {connect} from 'react-redux';
// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

import {describe, it} from "@jest/globals";
import configureMockStore from 'redux-mock-store';
import {Provider} from 'react-redux';

import {shallow, configure,mount} from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
configure({adapter:new Adapter()});

let container;
let store;
const mockStore = configureMockStore();
//
// beforeAll(() => {
//   // jest.mock('react-redux');
// });
// describe('App',()=>{
//
// });

