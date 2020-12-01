import React, { Component } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Switch, Route, Redirect } from 'react-router-dom'
import Dashboard from './Dashboard'
import UserProfile from './UserProfile'
import SideBar from './Sidebar'

class Main extends Component {
  render() {
    return (
      <div>
          <SideBar />
        {/* <Navbar /> */}
       {/* <Dashboard></Dashboard> */}
        <Footer />
      </div>
    )
  }
}
export default Main