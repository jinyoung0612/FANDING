import React from "react";
import {ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";


class Dropdown extends React.Component {

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
        this.setState({dropDownValue: e.currentTarget.textContent});
        //let id = e.currentTarget.getAttribute("id");
        console.log(this.state.dropDownValue);
    }


    

    render() {
        return (
            <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle caret>
                    {this.state.dropDownValue}
                </DropdownToggle>
                <DropdownMenu>
                    {/* {this.state.actions.map(e => {
                        return <DropdownItem id={e.id} key={e.id} onClick={this.changeValue}>{e.name}</DropdownItem>
                    })} */}

                    <DropdownItem>
                        <div onClick={this.changeValue}>최신순</div>
                    </DropdownItem>
                    <DropdownItem>
                        <div onClick={this.changeValue}>인기순</div> 
                        {/* 참여퍼센테이지가 높은 순*/}
                    </DropdownItem>
                    

                </DropdownMenu>

            </ButtonDropdown>
        );
    }

}

export default Dropdown;