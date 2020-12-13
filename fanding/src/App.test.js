import React, { useState, useEffect } from "react";
import { render } from '@testing-library/react';
import App from './App';
import {connect} from 'react-redux';
import {describe, it} from "@jest/globals";
jest.mock('react-redux');
// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });


describe('App',()=>{
  const connect=jest.fn();
});

it('renders',()=>{
  const {getByText}=render(<App/>);
})
