// Code for create account form
import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

let self     = null;  

//Define a Login Component
class Register extends Component{
    //call the constructor method
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            firstname : "",
            lastname : "",
            email : "",
            password : "",
            authFlag : false,
            loginErr : false
        }
        //Bind the handlers to this class
        this.firstnameChangeHandler = this.firstnameChangeHandler.bind(this);
        this.lastnameChangeHandler = this.lastnameChangeHandler.bind(this);
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitSignup = this.submitSignup.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount(){
        this.setState({
            authFlag : false,
            loginErr : false
        })
    }

    //firstname change handler to update state variable with the text entered by the user
    firstnameChangeHandler = (e) => {
        this.setState({
            firstname : e.target.value
        })
    }

    //lastname change handler to update state variable with the text entered by the user
    lastnameChangeHandler = (e) => {
        this.setState({
            lastname : e.target.value
        })
    }

    //email change handler to update state variable with the text entered by the user
    emailChangeHandler = (e) => {
        this.setState({
            email : e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    passwordChangeHandler = (e) => {
        this.setState({
            password : e.target.value
        })
    }
    self = this;
    //submit Signup handler to send a request to the node backend
    submitSignup = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            firstname : this.state.firstname,
            lastname : this.state.lastname,
            email : this.state.email,
            password : this.state.password
        };
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3003/users/signup', data)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    this.setState({
                        authFlag : true
                    })
                } else {
                    console.log("Status Code : ",response.status);
                    //errorMsg = <p> Incorrect username / password </p>
                    this.setState({
                        authFlag : false,
                        loginErr : true
                    })
                }
            }).catch(function (error) {
                console.log(error);
                console.log("Logging error");
                //errorMsg = <p> Incorrect username / password </p>;
/*                     self.setState({
                        authFlag : false,
                        loginErr : true
                    }) */
           });

           this.setState({
            authFlag : false,
            loginErr : true
        })
    }

    render(){
        //redirect based on successful login
        console.log("Rendering again");
        let redirectVar = null;
        let errorMsg = null;

        if(cookie.load('cookie')){
            redirectVar = <Redirect to= "/home"/>
        } else if (this.state.loginErr === true) {
            errorMsg = <p> Hey Stranger! We don't recognize that login. Spell check your info and try again! </p>
        }
        return(
            <div>
                {redirectVar}
            <div class="container">
                
                <div class="login-form">
                    <div class="main-div">
                        <div class="panel">
                        {errorMsg}
                            <h2>Create your account</h2>
                            
                        </div>
                        
                            <div class="form-group">
                                <input onChange = {this.firstnameChangeHandler} type="text" class="form-control" name="firstname" placeholder="First name"/>
                            </div>

                            <div class="form-group">
                                <input onChange = {this.lastnameChangeHandler} type="text" class="form-control" name="lastname" placeholder="Last name"/>
                            </div>

                            <div class="form-group">
                                <input onChange = {this.emailChangeHandler} type="text" class="form-control" name="email" placeholder="Email"/>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.passwordChangeHandler} type="password" class="form-control" name="password" placeholder="Password (8 character minimum)"/>
                            </div>
                            <button onClick = {this.submitSignup} class="btn btn-primary">Create your account</button>                 
                    </div>
                </div>
            </div>
            </div>
        )
    }
}
//export Login Component
export default Register;