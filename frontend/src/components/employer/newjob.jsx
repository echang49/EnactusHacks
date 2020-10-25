import React from "react"
import axios from "axios"
import { Redirect } from "react-router-dom"
import Navbar from "../navbar.jsx"
import "../../styles/styles.css"


class Newjob extends React.Component{
    submit(){
        let position = document.getElementById("title").value;
        let company = document.getElementById("name").value;
        let pay = document.getElementById("wage").value;
        let description = document.getElementById("description").value;

        axios.post('/api/emp_postings', {position, company, pay, description})
            .then((res) => {
                console.log(res.data);
                alert("Thanks for creating a job offer! You can view your job posting at http://localhost:5000/empapplication?search=".concat(res.data).concat(". Password is: 12345"));
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render(){

        return(

            <div className= "newjob">
                <Navbar /> 
                 <div className = "container">
                    <h1> Job Title </h1>
                    <input type="text" placeholder="Type.." id="title"/>
                    <h1>Company Name</h1>
                    <input type="text" placeholder="Type.." id="name"/>
                    <h1> Company Wage</h1>
                    <input type="text" placeholder="Type.." id="wage"/>
                    <h1>Job Description</h1>
                    <input type="text" placeholder="Type.." id="description"/>
                    <br />
                    <button onClick={() => this.submit()}>Create</button>
                </div>
            </div>

        )
    }

}

export default Newjob; 