import React from 'react';
import { render } from '@testing-library/react';
import createFundingDefault from '../components/layout/CreateFunding'
import {shallow, configure} from 'enzyme';
import chart from '@toast-ui/editor-plugin-chart';
import {describe, it} from "@jest/globals";
import CreateFunding from "../components/layout/CreateFunding";

jest.mock('@toast-ui/editor-plugin-chart')
describe('CreateFundingDefault',()=>{
    it('has input and a button',()=>{
        // const wrapper = shallow(<CreateFundingDefault/>);
        // const {getByText, getByPlaceholderText}=render(<CreateFundingDefault/>);
        // getByPlaceholderText('펀딩 내용 입력하세을요'); // input이 있는지 확인
        // getByText('생성'); // button이 있는지 확인
    })
})