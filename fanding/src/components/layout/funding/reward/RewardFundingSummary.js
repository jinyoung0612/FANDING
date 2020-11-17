import React from 'react';
import { Card, CardImg, CardTitle, CardSubtitle, CardText, CardBody } from 'reactstrap';
let imgStyle = {
    maxHeight: '128px',
    maxWidth: '128px'
  }
const FundingSummary = ({funding}) => {
    return(

        // <div class="item features-image сol-12 col-md-6 col-lg-3">
        //     <div class="item-wrapper">
        //         <div class="item-img">
        //             <img src={funding.url} style={imgStyle} alt=""/>
        //         </div>

        //         <div class="item-content">
        //             <h5 class="item-title mbr-fonts-style display-7">
        //                 <strong>{funding.fundingTitle}</strong>
        //             </h5>
                    
        //             <p class="mbr-text mbr-fonts-style mt-3 display-7">
        //                 Card Text. You don't have to code to create a site with Mobirise Builder. <a href="#" class="text-primary">Read more..</a></p>
        //         </div>
            
        //     </div>
        // </div>
        // <div class="col-12 col-md-6 col-lg-3 item gallery-image">
        <div>
            <div class="col-12 col-md-6 col-lg-3 item gallery-image">
        <div class="item-wrapper">
            <img class="w-100" src={funding.url} alt="" data-slide-to="0" data-target="#lb-sgtDtjHEYn" />
            <div class="icon-wrapper">
                <span class="mobi-mbri mobi-mbri-search mbr-iconfont mbr-iconfont-btn"></span>
            </div>
        </div>
        <h6 class="mbr-item-subtitle mbr-fonts-style align-center mb-2 mt-2 display-7">
        {funding.fundingTitle}
        </h6>
        </div>
    </div>
        
    )
}

export default FundingSummary;

{/* <Card sm="6">
            <CardImg top width="100%" src={funding.url} style={imgStyle} alt="Card image cap" />
            <CardBody>
            <CardTitle>{funding.fundingTitle}</CardTitle>
            <CardSubtitle>{funding.fundingType}</CardSubtitle>
            <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
            </CardBody>
        </Card> */}