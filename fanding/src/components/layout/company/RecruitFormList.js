import React from 'react';
import RecruitFormSummary from './RecruitFormSummary';
import { Link } from 'react-router-dom';
import {CardDeck} from 'reactstrap';

const RecruitFormList = ({recruitCompanies}) => {
    return(
        <CardDeck style={{display: 'flex', flexDirection: 'row', 
        margin:'10px',flexFlow:"row wrap"}}>
            { recruitCompanies && recruitCompanies.map(recruitCompany => {
                return (
                    <Link className="inactive" activeClassName="active" to={'/find_company/' + recruitCompany.id}>
                        <RecruitFormSummary recruitCompany={recruitCompany} key={recruitCompany.id} />
                    </Link>
                )
            })}
        </CardDeck>
        
    )
}

export default RecruitFormList;