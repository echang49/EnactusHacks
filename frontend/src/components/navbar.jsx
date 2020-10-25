import React from "react"
import "../styles/styles.css"
import { Link } from "react-router-dom"
import Logo from "../assets/logo.png"


class Navbar extends React.Component{
    render(){
            return(
                <div className = "navbar">
                    <Link to = {"/"}><img src={Logo} /></Link>
                    <Link className="button" to = {"/newjob"}>Create Job</Link>
                </div>
            );
    }
}

export default Navbar; 
