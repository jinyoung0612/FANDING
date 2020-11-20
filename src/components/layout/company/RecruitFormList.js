import React from 'react';
//import { Card, CardImg, CardTitle, CardSubtitle, CardText, CardBody } from 'reactstrap';
import RecruitFormSummary from './RecruitFormSummary';
import { Link } from 'react-router-dom';

const RecruitFormList = ({recruitCompanies}) => {
    return(
        <div>
            { recruitCompanies && recruitCompanies.map(recruitCompany => {
                return (
                    <Link to={'/find_company/' + recruitCompany.id}>
                        <RecruitFormSummary recruitCompany={recruitCompany} key={recruitCompany.id} />
                    </Link>
                )
            })}

        </div>
    )
}

export default RecruitFormList;