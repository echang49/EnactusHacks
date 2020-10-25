import React from "react"
import axios from "axios"
import { Redirect } from "react-router-dom"
import Navbar from "../navbar.jsx"

class Results extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            Data : [
            ],
            redirect: null
        }
    }

    componentDidMount(){
        let location = window.location.href;
        location = location.split('=')[1];
        axios.post('/api/results', {'location': location})
          .then((res) => {
              this.setState({Data: res.data});
          })
          .catch((err) => {
            console.log(err);
          });
    }

    openApplication(id){
        let url = "/application?search=".concat(id);
        this.setState({redirect: url});
    }

    render(){
         const Data = this.state.Data; 
         const DataComponent = Data.map(data => { 
             return (
                 <div className="box" onClick={() => this.openApplication(data._id)}>
                    <p className="subtitle">{data.position}</p>
                    <p><strong>{data.company} | {data.pay}</strong></p>
                    <p>{data.description}</p>
                 </div>
            )
        });
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return(
            <div className="results">
               <Navbar />
               <div className="container">
                    <h1 className="title">Available Positions</h1>
                    {DataComponent}
               </div>
            </div>

        )
    }

}

export default Results; 