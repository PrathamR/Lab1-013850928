import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

let self     = null;  

//Define a Login Component
class Login extends Component{
    //call the constructor method
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            email : "",
            password : "",
            authFlag : false,
            loginErr : false
        }
        //Bind the handlers to this class
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount(){
        this.setState({
            authFlag : false,
            loginErr : false
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
    //submit Login handler to send a request to the node backend
    submitLogin = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        //e.preventDefault();
        const data = {
            email : this.state.email,
            password : this.state.password
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3003/users/login',data)
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
                            <h2>Sign in with your Grubhub account</h2>
                            
                        </div>
                        
                            <div class="form-group">
                                <input onChange = {this.emailChangeHandler} type="text" class="form-control" name="email" placeholder="Email"/>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.passwordChangeHandler} type="password" class="form-control" name="password" placeholder="Password"/>
                            </div>
                            <button onClick = {this.submitLogin} class="btn btn-primary">Login</button>                 
                    </div>
                </div>
            </div>
            </div>
        )
    }
}
//export Login Component
export default Login;