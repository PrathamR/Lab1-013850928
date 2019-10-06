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
    }
    //get the books data from backend  
    componentDidMount(){
        axios.get(`http://localhost:3003/users/profile?email=${email}`)
                .then((response) => {
                //update the state with the response data
                this.setState({
                    user : response.data
                });
            });
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
                Show a picture and a Search textbox
{/*                 <div class="container">
                    <h2>List of All Books</h2>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Book ID</th>
                                    <th>Title</th>
                                    <th>Author</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/*Display the Tbale row based on data recieved}
                                {details}
                            </tbody>
                        </table>
                </div> */}
            </div>  
        )
    }
}
//export Home Component
export default Profile;