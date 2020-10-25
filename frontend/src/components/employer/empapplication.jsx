import React from "react"
import axios from "axios"
import Navbar from "../navbar.jsx"
import "../../styles/styles.css"



class EmpApplication extends React.Component{
    constructor(props){
        super();
        this.state = {
            Data : [
            ],
            Data2 : [

            ],
            password: false
        }
    }
    componentDidMount(){
        let location = window.location.href;
        location = location.split('=')[1];
        axios.post('/api/postings', {'location': location})
          .then((res) => {
              this.setState({Data: res.data});
          })
          .catch((err) => {
            console.log(err);
          });
        axios.post('/api/resumes', {'location': location})
          .then((res) => {
              this.setState({Data2: encodeURI(res.data)});
              console.log(this.state.Data2);
          })
          .catch((err) => {
            console.log(err);
          });
    }

    passwordCheck(){
        let pass = document.getElementById("Password").value;
        if(pass === "12345"){
            this.setState({password: true});
        }
    }

    render(){
        const data = this.state.Data;
        return(
            <div>
                {this.state.password ?
                    <div className="application">
                        <Navbar />
                        <div className="container">
                            <div className="box">
                                <p className="subtitle">{data.position}</p>
                                <p><strong>{data.company} | {data.pay}</strong></p>
                                <p>{data.description}</p>
                                <hr />
                                <a download="Title" href={"data:application/pdf;base64".concat(this.state.Data2)} title='Download pdf document'>RESUME</a>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="pwd">
                        <Navbar />
                        <div className= "container">
                                <label for = "pwd" className="title"> Password </label>
                                <input type="password" placeholder="Enter Password" name="Password" id="Password" />
                                <br />
                                <button type="submit" onClick={() => this.passwordCheck()} >Enter</button>
                        </div>

                    </div>
                }
            </div>

        )
    }
}

export default EmpApplication;