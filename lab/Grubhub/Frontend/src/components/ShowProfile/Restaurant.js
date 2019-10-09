import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

let email = localStorage.getItem("email");

class Restaurant extends Component {
    constructor(props){
        super(props);
        this.routeParam = props.match.params.restID;
        this.state = {  
            items : [],
            currentSection : "",
            price : 0,
            cartItems : {}
        }
        //Bind the handlers to this class
        this.quantChangeHandler = this.quantChangeHandler.bind(this);
        
    }
    componentDidMount(){
        axios.get(`http://localhost:3003/restaurant/menu/sections?rest=${this.routeParam}`)
                .then((response) => {
                    console.log(response.data);
                    let numItems = response.data.length;
                //update the state with the response data
                this.setState({
                    items : response.data,
                });
            });

        console.log(this.routeParam);
        localStorage.removeItem("items");
    }

    //quant change handler to update state variable with the text entered by the user
    quantChangeHandler = (e) => {
        if(e.target.value > 0)
            this.state.cartItems[e.target.name] = e.target.value * parseFloat(e.target.alt);
        let curPrice = 0;
        for(var item in this.state.cartItems){
            curPrice += parseFloat(this.state.cartItems[item]);
        }
        curPrice = curPrice.toFixed(2);
        console.log("CartItems at the moment ", JSON.stringify(this.state.cartItems), localStorage.length);

        this.setState({
            price : curPrice
        })
        localStorage.setItem('items', JSON.stringify(this.state.cartItems));
        console.log("Localstorage[items] is ", localStorage.getItem('items'));
    }

    render(){
        //iterate over books to create a table row
        console.log("Redirection")
        //if not logged in go to login page
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/login"/>
        }
        return(
            <div>
                {redirectVar}
                <div className="container">
             <div className="col-lg-12">
             <h1>Menu</h1>
             <h3>Cart price = {this.state.price}</h3>
             {this.state.items.map((item) => (
               <div className="col-xs-6" onClick={this.cardClickHandler} value ={item.id}>
                <div className="card-body">
                <h4 className="card-title">{item.sectionName}</h4>
                    <img src="https://www.fifteenspatulas.com/wp-content/uploads/2015/01/Hot-Chocolate-Recipe-Fifteen-Spatulas-2-640x427.jpg" 
                        height="200" 
                        width="400"></img>
                         
                    <h5 className="card-title">{item.name}</h5>
                    <h5 className="card-title">{item.price}</h5>
                   
                   <h6 className="card-subtitle mb-2 text-muted">
                   {item.cuisine}             
                   <div class="quant-group">
                                <input 
                                onChange = {this.quantChangeHandler} 
                                type="number" 
                                name={item.id} 
                                placeholder="0"
                                min="0" max="20"
                                alt={item.price}/>
                            </div>

                   </h6>
                 </div>
               </div>
             ))}
             </div>
            </div>
            </div>  
        )
    }
}
//export Home Component
export default Restaurant;