import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

let email = localStorage.getItem("email");

class Profile extends Component {
    constructor(){
        super();
        this.state = {  
            user : {}
        }
        //Bind the handlers to this class
        this.firstnameChangeHandler = this.firstnameChangeHandler.bind(this);
        this.lastnameChangeHandler = this.lastnameChangeHandler.bind(this);
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.phoneChangeHandler = this.phoneChangeHandler.bind(this);
        this.submitChange = this.submitChange.bind(this);
    }
    //get the books data from backend  
    componentDidMount(){
        axios.get(`http://localhost:3003/users/profile?email=${email}`)
                .then((response) => {
                //update the state with the response data
                this.setState({
                    user : response.data[0]
                });
            });
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
    //phone change handler to update state variable with the text entered by the user
    phoneChangeHandler = (e) => {
        this.setState({
            phone : e.target.value
        })
    }
    self = this;
    //submit Change handler to send a request to the node backend
    submitChange = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            firstname : this.state.firstname,
            lastname : this.state.lastname,
            email : this.state.email,
            password : this.state.password,
            phone : this.state.phone
        };
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
        console.log(email);
        console.log(this.state.user);
        //iterate over books to create a table row
        /* let details = this.state.books.map(book => {
            return(
                <tr>
                    <td>{book.BookID}</td>
                    <td>{book.Title}</td>
                    <td>{book.Author}</td>
                </tr>
            )
        }) */
        console.log("Redirection")
        //if not logged in go to login page
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/login"/>
        }
        return(
            <div>
                {redirectVar}
            <div class="container">
                
                <div class="login-form">
                    <div class="main-div">
                        <div class="panel">
                            
                        </div>
                        
                        <div class="form-group"> First Name
                                <input onChange = {this.firstnameChangeHandler} type="text" class="form-control" name="firstname" placeholder={this.state.user.first_name}/>
                            </div>

                            <div class="form-group"> Last Name 
                                <input onChange = {this.lastnameChangeHandler} type="text" class="form-control" name="lastname" placeholder={this.state.user.last_name}/>
                            </div>

                            <div class="form-group"> Email 
                                <input onChange = {this.emailChangeHandler} type="text" class="form-control" name="email" placeholder={this.state.user.email}/>
                            </div>
                            <div class="form-group"> Phone Number
                                <input onChange = {this.passwordChangeHandler} type="password" class="form-control" name="password" placeholder={this.state.user.phone}/>
                            </div>
                            <button onClick = {this.submitChange} class="btn btn-primary">Update</button>                 
                    </div>
                </div>
            </div>
            </div>  
        )
    }
}
//export Home Component
export default Profile;