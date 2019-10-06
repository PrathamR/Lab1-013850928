import React, {Component} from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

class Create extends Component{
    constructor(props){
        super(props);
        this.state = {  
            id   : "",
            book : "",
            author : ""
        }
    }

    //Call the Will Mount to set the auth Flag to false
    componentWillMount(){
        this.setState({
            createFlag : false,
            createErr  : false
        })
    }

    //id change handler to update state variable with the text entered by the user
    idChangeHandler = (e) => {
        this.setState({
            id : e.target.value
        })
    }
    //book change handler to update state variable with the text entered by the user
    titleChangeHandler = (e) => {
        this.setState({
            book : e.target.value
        })
    }
    //author change handler to update state variable with the text entered by the user
    authorChangeHandler = (e) => {
        this.setState({
            author : e.target.value
        })
    }

    //submit Create handler to send a request to the node backend
    submitCreate = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            BookID : this.state.id,
            Author : this.state.author,
            Title :  this.state.book
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/create',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    this.setState({
                        createFlag : true,
                        createErr  : false
                    })
                } else {
                    this.setState({
                        createFlag : false,
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
                createFlag : false,
                createErr : true
            })
    }

    render(){

        //if not logged in go to login page
        let redirectVar = null;
        let errorMsg = null;
        console.log("Redirection")
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/login"/>;
        } else if (this.state.createFlag === true) {
            redirectVar = <Redirect to= "/home"/>;
        } else if (this.state.createErr === true) {
            errorMsg = <p> Book ID already exists </p>;
        }

        return(
            <div>
                {redirectVar}
                <br/>
                <div class="container">
                    {/* <form action="http://127.0.0.1:3001/create" method="post"> */}
                        <div style={{width: '30%'}} class="form-group">
                            <input onChange = {this.idChangeHandler} type="text" class="form-control" name="BookID" placeholder="Book ID"/>
                        </div>
                        <br/>
                        <div style={{width: '30%'}} class="form-group">
                                <input onChange = {this.titleChangeHandler} type="text" class="form-control" name="Title" placeholder="Book Title"/>
                        </div>
                        <br/>
                        <div style={{width: '30%'}} class="form-group">
                                <input onChange = {this.authorChangeHandler} type="text" class="form-control" name="Author" placeholder="Book Author"/>
                        </div>
                        <br/>
                        <button onClick = {this.submitCreate} class="btn btn-primary">Create</button> 
                        
                        {/* <div style={{width: '30%'}}>
                            <button class="btn btn-success" type="submit">Create</button>
                        </div>  */}
                    {/* </form> */}
                </div>
                <div class="container">
                {errorMsg}
                </div>
            </div>
        )
    }
}

export default Create;