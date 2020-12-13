import React, { Component } from "react";
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import FundingList from './CollectFundingList';
import NewOrdered from './NewOrdered';
import DefaultOrdered from './DeafaultOrdered';
import PopOrdered from './PopOrdered';
import {ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';

class CollectFunding extends Component {
    
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.changeValue = this.changeValue.bind(this);
        this.state = {
            actions: [],
            dropDownValue: '보기 방식',
            dropdownOpen: false
        };
    }
    toggle(event) {

        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    changeValue(e) {
        this.setState({dropDownValue: e.currentTarget.textContent},
            ()=>{this.forceUpdate()});
        //let id = e.currentTarget.getAttribute("id");
        //console.log(this.state.dropDownValue);
    }
    
    render(){
        // const { fundings } = this.props;

        return(
            <section class="gallery5 mbr-gallery cid-sgtDmxvlJH" id="gallery5-q">
    
            
                <div class="mbr-section-head">
                    <h3 class="mbr-section-title mbr-fonts-style align-center m-0 display-2"><strong>모금 펀딩</strong></h3>
                    <p class="mbr-section-subtitle  mbr-fonts-style mb-0 mt-2 display-5"
                    style={{fontSize: '1.5rem', paddingLeft:'110px', paddingRight:'110px'}}>
                    모금 펀딩은 자금이 필요한 총대가 펀딩을 통해 자금을 모아 기부 혹은 아티스트를 위한 모금을 진행할 때 사용합니다. 
                    </p>
                </div>
                <div class="container-fluid">
                <ButtonDropdown className="ml-70" isOpen={this.state.dropdownOpen} toggle={this.toggle}>

                <DropdownToggle caret className="mt-30">
                    {this.state.dropDownValue}
                </DropdownToggle>
                <DropdownMenu>
                        {/* {this.state.actions.map(e => {
                            return <DropdownItem id={e.id} key={e.id} onClick={this.changeValue}>{e.name}</DropdownItem>
                        })} */}
                    <DropdownItem>
                        <div onClick={this.changeValue}>보기 방식</div>
                    </DropdownItem>
                    <DropdownItem>
                        <div onClick={this.changeValue}>최신순</div>
                    </DropdownItem>
                    <DropdownItem>
                        <div onClick={this.changeValue}>인기순</div>
                    </DropdownItem>
                    {/* <DropdownItem>
                        <div onClick={this.changeValue}>인기순</div>  */}
                            {/* 참여퍼센테이지가 높은 순*/}
                    {/* </DropdownItem> */}
                        

                </DropdownMenu>

        </ButtonDropdown>
            {this.state.dropDownValue === "보기 방식" && <DefaultOrdered onClick={this.changeValue}/>}
            {this.state.dropDownValue === "최신순" && <NewOrdered onClick={this.changeValue}/>}
            {this.state.dropDownValue === "인기순" && <PopOrdered onClick={this.changeValue}/>}
        </div>
        {/* </div> */}
        </section>

        )
    }
}
// const mapStateToProps = (state) => {
//     console.log(state);
//     return {
//         fundings: state.firestore.ordered.fundings
//     }
// }
// export default compose(
//     connect(mapStateToProps),
//     firestoreConnect([//data sync
//         { collection: 'fundings',
//         where: ['fundingType', '==', 'collect'],
//         } 
//     ])
// )(CollectFunding);

export default CollectFunding;