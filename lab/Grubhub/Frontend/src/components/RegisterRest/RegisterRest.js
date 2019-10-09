// Code for create account form
import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

let self     = null;  

//Define a RegisterRest Component
class RegisterRest extends Component{
    //call the constructor method
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            restname : "",
            ownername : "",
            email : "",
            password : "",
            cuisine : "",
            authFlag : false,
            loginErr : false
        }
        //Bind the handlers to this class
        this.ownernameChangeHandler = this.ownernameChangeHandler.bind(this);
        this.restnameChangeHandler = this.restnameChangeHandler.bind(this);
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.cuisineChangeHandler = this.cuisineChangeHandler.bind(this);
        this.submitSignup = this.submitSignup.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount(){
        this.setState({
            authFlag : false,
            loginErr : false
        })
    }

    //ownername change handler to update state variable with the text entered by the user
    ownernameChangeHandler = (e) => {
        this.setState({
            ownername : e.target.value
        })
    }

    //restname change handler to update state variable with the text entered by the user
    restnameChangeHandler = (e) => {
        this.setState({
            restname : e.target.value
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
    //cuisine change handler to update state variable with the text entered by the user
    cuisineChangeHandler = (e) => {
        this.setState({
            cuisine : e.target.value
        })
    }
    self = this;
    //submit Signup handler to send a request to the node backend
    submitSignup = (e) => {
        console.log("Signing up", this.state.ownername);
        //prevent page from refresh
        e.preventDefault();
        const data = {
            ownername : this.state.ownername,
            restname : this.state.restname,
            email : this.state.email,
            password : this.state.password,
            cuisine : this.state.cuisine
        };
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3003/restaurant/signup', data)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    this.setState({
                        authFlag : true
                    })
                } else {
                    console.log("Status Code : ",response.status);
                    this.setState({
                        authFlag : false,
                        loginErr : true
                    })
                }
            }).catch(function (error) {
                console.log(error);
                console.log("Logging error");

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
                            <h2>GRUBHUB FOR RESTAURANTS</h2>
                            
                        </div>
                        
                            <div class="form-group">
                                <input onChange = {this.ownernameChangeHandler} type="text" class="form-control" name="ownername" placeholder="Owner name"/>
                            </div>

                            <div class="form-group">
                                <input onChange = {this.restnameChangeHandler} type="text" class="form-control" name="restname" placeholder="Restaurant name"/>
                            </div>

                            <div class="form-group">
                                <input onChange = {this.emailChangeHandler} type="text" class="form-control" name="email" placeholder="Email"/>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.passwordChangeHandler} type="password" class="form-control" name="password" placeholder="Password (8 character minimum)"/>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.cuisineChangeHandler} type="text" class="form-control" name="cuisine" placeholder="Cuisine"/>
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
export default RegisterRest;