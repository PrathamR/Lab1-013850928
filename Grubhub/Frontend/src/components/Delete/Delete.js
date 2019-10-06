import React, {Component} from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

class Delete extends Component{
    constructor(props){
        super(props);
        this.state = {  
            id   : ""
        }
    }

    //Call the Will Mount to set the auth Flag to false
    componentWillMount(){
        this.setState({
            deleteFlag : false,
            deleteErr  : false
        })
    }

    //id change handler to update state variable with the text entered by the user
    idChangeHandler = (e) => {
        this.setState({
            id : e.target.value
        })
    }

    //submit Create handler to send a request to the node backend
    submitDelete = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            BookID : this.state.id,
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/delete',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    this.setState({
                        deleteFlag : true
                    })
                } else {
                    this.setState({
                        deleteFlag : false,
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
            deleteFlag : false,
            deleteErr : true
        })
    }

    render(){

        //if not logged in go to login page
        let redirectVar = null;
        let errorMsg = null;
        console.log("Redirection")
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/login"/>
        } else if (this.state.deleteFlag === true) {
            redirectVar = <Redirect to= "/home"/>
        } else if (this.state.deleteErr === true) {
            errorMsg = <p> No book with this BookID </p>;
        }

        return(
            <div>
            {redirectVar}
            <div class="container">
                    <div style={{width: "50%",float: "left"}} class="form-group">
                        <input onChange = {this.idChangeHandler}  type="text" class="form-control" name="BookID" placeholder="Search a Book by Book ID"/>
                    </div>
                    {/* <div style={{width: "50%", float: "right"}}>
                            <button class="btn btn-success" type="submit">Delete</button>
                    </div>  */}
                    <button onClick = {this.submitDelete} class="btn btn-primary">Delete</button> 
                    
            </div>
            <div class="container">
            {errorMsg}
            </div>
            </div>
        )
    }
}

export default Delete;