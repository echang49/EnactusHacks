import React from "react"
import axios from "axios"
import Navbar from "../navbar.jsx"


class Application extends React.Component{
    constructor(props){
        super();
        this.state = {
            Data : [
            ]
        }
    }

    //add function that submits pdf everytime it changes
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
    }

    onChangeHandler=event=>{
        console.log(event.target.files[0]);
        let file = event.target.files[0];
        const data = new FormData() 
        data.append('file', file)

        axios.post("/api/upload?id=".concat(this.state.Data._id), data, { // receive two parameter endpoint url ,form data 
        })
        .then(res => { // then print response status
            console.log(res.statusText)
            alert('thanks for applying');
        })
    }

    render(){
        const data = this.state.Data;
        return(
            <div className="application">
               <Navbar />
               <div className="container">
                   <div className="box">
                        <div className="flex-row">
                            <div>
                                <p className="subtitle">{data.position}</p>
                                <p><strong>{data.company} | {data.pay}</strong></p>
                            </div>
                            <div>
                                <label for="file-upload" class="custom-file-upload">
                                    Apply
                                </label>
                                <input id="file-upload" type="file" onChange={this.onChangeHandler} />
                            </div>
                        </div>
                        
                        
                        <p>{data.description}</p>
                   </div>
               </div>
               
               
            </div>

        )
    }

}

export default Application;