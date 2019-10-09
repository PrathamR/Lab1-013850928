// Code for the search items page

import React, {Component} from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

class Search extends Component{
    constructor(props){
        super(props);
        this.state = {  
            id    : "",
            items : []
        }
    }

    //search change handler to update state variable with the text entered by the user
    searchChangeHandler = (e) => {
        console.log(`Setting value ${e.target.value}`)
        this.setState({
            id : e.target.value
        })
    }

    cardClickHandler = (e) => {
        console.log(`Setting value ${e.target.value}`)
        this.setState({
            id : e.target.value
        })
        //redirectVar = <Redirect to = "/restaurant/:"/>
    }

    //submit Search handler to send a request to the node backend
    submitSearch = (e) => {
        //prevent page from refresh
        e.preventDefault();
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.get(`http://localhost:3003/search?search=${this.state.id}`)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    this.setState({
                        items : response.data
                    })
                } else {

                }
            }).catch(function (error) {
                console.log(error);
                console.log("Logging error");

           });

    }

    render(){

        //if not logged in go to login page
        let redirectVar = null;
        let errorMsg = null;
        console.log("Redirection")
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to = "/login"/>
        }

        return(
            <div>
            {redirectVar}
            <div class="container">
                    <div style={{width: "50%",float: "left"}} class="form-group">
                        <input onChange = {this.searchChangeHandler}  type="text" class="form-control" name="serachItem" placeholder="Pizza, Sushi, ... "/>
                    </div>
                    
                    <button onClick = {this.submitSearch} class="btn btn-primary">Find Food</button> 
                    
            </div>
            <div className="container">
             <div className="col-lg-12">
             <h1>Search results for {this.state.id}</h1>
             {this.state.items.map((item) => (
               <div className="col-xs-6" onClick={this.cardClickHandler} value ={item.id}>
                   <a href={"http://localhost:3000/restaurant/" + item.id}>
                <div className="card-body">
                <p>
                    
                    <img src="https://www.fifteenspatulas.com/wp-content/uploads/2015/01/Hot-Chocolate-Recipe-Fifteen-Spatulas-2-640x427.jpg" 
                        height="200" 
                        width="400"></img>
                        
                        </p>
                    <h5 className="card-title">{item.name}</h5>
                   <h6 className="card-subtitle mb-2 text-muted">
                   {item.cuisine}             
                   </h6>
                   <a href="localhost.com:3000/restaurant/:"{...item.id}></a>
                 </div></a>
               </div>
             ))}
             </div>
            </div>
            </div>
        )
    }
}

export default Search;