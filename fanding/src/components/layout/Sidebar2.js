import React, { Component } from 'react'
import { NavLink, Link } from 'react-router-dom'

class Sidebar2 extends Component {
    render() {
      return (
        <div className="sidebar">
          <div className="sidebar-wrapper" style={{paddingTop:'100px'}}> 
            <div className="logo">
              <Link to='/' className="simple-text">
                내 정보
              </Link>
            </div>
            <ul className="nav">
              <li className="nav-item">
                <NavLink className="nav-link" to='/dashboard'>
                  
                  <p>Dashboard</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to='/profile'>
                  
                  <p>프로필</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to='/payment'>
                  
                  <p>수수료 결제</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to='/payment'>
                  
                  <p>펀딩 관리</p>
                </NavLink>
              </li>
  
            </ul>
          </div>
        </div>
      )
    }
  }
  
  export default Sidebar2