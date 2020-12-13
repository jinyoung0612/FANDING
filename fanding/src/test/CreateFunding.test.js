import React from 'react';
import { render } from '@testing-library/react';
import createFundingDefault from 'src/components/layout/CreateFunding';

import {describe, it} from "@jest/globals";

describe('<CreateFundingDefault/>',()=>{
    it('has input and a button',()=>{
        const {getByText, getByPlaceholderText}=render(<CreateFundingDefault/>);
        getByPlaceholderText('펀딩 내용 입력하세을요'); // input이 있는지 확인
        getByText('생성'); // button이 있는지 확인
    })
})