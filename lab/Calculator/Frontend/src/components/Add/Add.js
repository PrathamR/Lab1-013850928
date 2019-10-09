import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';

//Define a Login Component
class Add extends Component{
    //call the constructor method
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            op1 : "",
            op2 : "",
            result : ""
        }
        //Bind the handlers to this class
        this.op1ChangeHandler = this.op1ChangeHandler.bind(this);
        this.op2ChangeHandler = this.op2ChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }

    //op1 change handler to update state variable with the text entered by the user
    op1ChangeHandler = (e) => {
        this.setState({
            op1 : e.target.value
        })
    }
    //op2 change handler to update state variable with the text entered by the user
    op2ChangeHandler = (e) => {
        this.setState({
            op2 : e.target.value
        })
    }
    self = this;
    //submit Login handler to send a request to the node backend
    submitLogin = (e) => {
        //prevent page from refresh
        //e.preventDefault();
        const data = {
            op1 : this.state.op1,
            op2 : this.state.op2
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3006/add',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                console.log("Status Code : ",response.data);
                this.setState({
                    result : response.data
                })
                if(response.status === 200){
                } else {
                    console.log("Status Code : ",response.status);
                }
            }).catch(function (error) {
                console.log(error);
                console.log("Logging error");
           });
    }

    maxLengthCheck = (object) => {
        if (object.target.value.length > object.target.maxLength) {
         object.target.value = object.target.value.slice(0, object.target.maxLength)
          }
        }

    render(){
        //redirect based on successful login
        console.log("Rendering add");
        return(
            <div>
            <div class="container">
                
                <div class="login-form">
                    <div class="main-div">
                        <div class="panel">
                            <h2>Addition</h2>
                            <p>Enter operand 1 and 2. Click add. </p>
                        </div>
                        
                            <div class="form-group">
                                <input 
                                    onChange = {this.op1ChangeHandler} 
                                    type="number" 
                                    class="form-control" 
                                    name="op1" 
                                    placeholder="Operand 1" 
                                    maxLength = "10" onInput={this.maxLengthCheck} />
                            </div>
                            <div class="form-group">
                                <input 
                                    onChange = {this.op2ChangeHandler} 
                                    type="number" 
                                    class="form-control" 
                                    name="op2" 
                                    placeholder="Operand 2"
                                    maxLength = "10" onInput={this.maxLengthCheck}/>
                            </div>
                            <button onClick = {this.submitLogin} class="btn btn-primary">Add</button>    

                            <div className="card">
                                <div className="card-body">
                                <h2 className="card-title">{this.state.result}</h2>
{/*                                 <h6 className="card-subtitle mb-2 text-muted">
                                    {user.email}             
                                </h6> */}
                                </div>
                             </div>             
                    </div>
                </div>
            </div>
            </div>
        )
    }
}
//export Login Component
export default Add;