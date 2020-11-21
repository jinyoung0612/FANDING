import React from 'react';
//import { Card, CardImg, CardTitle, CardSubtitle, CardText, CardBody } from 'reactstrap';
import RecruitFormSummary from './RecruitFormSummary';
import { Link } from 'react-router-dom';
import {CardDeck} from 'reactstrap';

const RecruitFormList = ({recruitCompanies}) => {
    return(
        <CardDeck style={{display: 'flex', flexDirection: 'row', 
        justifyContent: 'left', margin:'10px'}}>
            { recruitCompanies && recruitCompanies.map(recruitCompany => {
                return (
                    <Link to={'/find_company/' + recruitCompany.id}>
                        <RecruitFormSummary recruitCompany={recruitCompany} key={recruitCompany.id} />
                    </Link>
                )
            })}
        </CardDeck>
        
    )
}

export default RecruitFormList;