import React,{Component} from 'react';
import {Link} from 'react-router-dom';

//create the Navbar Component
class Navbar extends Component {
    constructor(props){
        super(props);
    }

    render(){
        //if Cookie is set render Logout Button
        /* let navLogin = null;
        if(cookie.load('cookie')){
            console.log("Able to read cookie");
            navLogin = (
                <ul class="nav navbar-nav navbar-right">
                        <li><Link to="/" onClick = {this.handleLogout}><span class="glyphicon glyphicon-user"></span>Logout</Link></li>
                </ul>
            );
        }else{
            //Else display login button
            console.log("Not Able to read cookie");
            navLogin = (
                <ul class="nav navbar-nav navbar-right">
                        <li><Link to="/login"><span class="glyphicon glyphicon-log-in"></span> Login</Link></li>
                </ul>
            )
        }
        let redirectVar = null;
        if(cookie.load('cookie')){
            redirectVar = <Redirect to="/home"/>
        } */
        return(
            <div>
            <nav class="navbar navbar-inverse">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <a class="navbar-brand" href="#">Calculator</a>
                    </div>
                    <ul class="nav navbar-nav">
                        <li><Link to="/add">Add</Link></li>
                        <li><Link to="/subtract">Subtract</Link></li>
                        <li><Link to="/multiply">Multiply</Link></li>
                        <li><Link to="/divide">Divide</Link></li>
                    </ul>
                </div>
            </nav>
        </div>
        )
    }
}

export default Navbar;