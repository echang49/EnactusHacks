import React from "react"
import { Redirect } from "react-router-dom"
import Navbar from "./navbar.jsx"
import "../styles/styles.css"
import Image from "../assets/earth.png"

class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          redirect: null
        }
    }

    search(){
      let search = document.getElementById("search").value;
      let url = "/results?search=".concat(search);
      this.setState({redirect: url});
    }

    render() {
      if (this.state.redirect) {
        return <Redirect to={this.state.redirect} />
      }
      return (
        <div className="home">
          <Navbar />
          <div className="container">
              <div>
                <h1 className="title">Do what you do. Make what you dream.</h1>
                <label className="subtitle"> Job Title </label>
                <div className="flex-row">
                  <input className="mr-20" type="text" placeholder="Search.." name="search" id="search"/>
                  <button type="submit" onClick={() => this.search()}>Search</button>
                </div>    
              </div>
              <div>
                <img src={Image} />
              </div>
          </div>
        </div>
      )
    }
  }
  
  export default Home;