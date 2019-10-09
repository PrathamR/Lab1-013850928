// Code for the search items page

import React, {Component} from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

class Cart extends Component{
    constructor(props){
        super(props);
        this.state = {  
            items : {},
            cartItems: [],
            quantities: [],
            address : "",
            userID : "",
            restID : "",
            submitted : false
        }
    }
    //search change handler to update state variable with the text entered by the user
    searchChangeHandler = (e) => {
        console.log(`Setting value ${e.target.value}`)
        this.setState({
            id : e.target.value
        })
    }

    sendOrder = (e) => {

        console.log("Items are", Object.keys(this.state.items));
        console.log("Quantitites are", this.state.quantities);

        const data = {
            itemsList : Object.keys(this.state.items),
            quantities : this.state.quantities,
            address : this.state.address,
            userID : localStorage.getItem('id'),
            restID : localStorage.getItem('restId')        };

        console.log(JSON.stringify(data));

        axios.post(`http://localhost:3003/checkout`, data)
                .then((response) => {
                    console.log(response.data);

                    this.setState({
                        cartItems : response.data
                    })
            });
        this.setState({
                submitted : true
            })
    }

    //address change handler to update state variable with the text entered by the user
   addressChangeHandler = (e) => {
        this.setState({
            address : e.target.value
        })
    }

    componentDidMount(){
        this.state.items = JSON.parse(localStorage.getItem('items'));
        console.log("Items are ", JSON.stringify(this.state.items), Object.keys(this.state.items));

        //for (let item in this.state.items) {
        let itemObject = {};
        //console.log("Item is", item);
        axios.get(`http://localhost:3003/restaurant/menu/itemsByID?id=${Object.keys(this.state.items)}`)
                .then((response) => {
                    console.log(response.data);

                    this.setState({
                        cartItems : response.data
                    })

                    
                //update the state with the response data
                /*itemObject.name     = response.data[0].name;
                itemObject.id       = response.data[0].id;
                itemObject.quantity = this.state.items[item];
                this.state.cartItems.push(itemObject);

                this.state.cartItems[item] = {};
                this.state.cartItems[item].name  = response.data[0].name;
                this.state.cartItems[item].id  = response.data[0].id;
                this.state.cartItems[item].quantity  = this.state.items[item];*/
                localStorage.setItem('id', 1);
                localStorage.setItem('restId', 1);
                //index += 1; 
            });
        //}

        console.log("To be bought ", this.state.cartItems);
    }

    render(){

        //if not logged in go to login page
        let redirectVar = null;
        let errorMsg = null;
        console.log("Redirection")
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to = "/login"/>
        } else if(this.state.submitted) {
            redirectVar = <Redirect to = "/upcoming"/>
        }
        console.log("Lets render the cart", this.state.cartItems);
 
        let price = 0;
        for (let i = 0 ; i < this.state.cartItems.length; i++) {
            this.state.quantities[i] = Math.round(this.state.cartItems[i].id / this.state.cartItems[i].price);
            price += parseFloat(this.state.cartItems[i].id);
        }
        console.log(price);
        console.log(this.state.quantities);

        return(
            <div>
            {redirectVar}
{/*             <div class="container">
                    <div style={{width: "50%",float: "left"}} class="form-group">
                        <input onChange = {this.searchChangeHandler}  type="text" class="form-control" name="serachItem" placeholder="Pizza, Sushi, ... "/>
                    </div>
                    
                    <button onClick = {this.submitSearch} class="btn btn-primary">Find Food</button> 
                    
            </div> */}
            <div className="container">
             <div className="col-lg-12">
             <h1>Your current order</h1>
             <h2>Total price {price}</h2>

             {this.state.cartItems.map((item, index) => (
               <div className="col-xs-6" >
                <div className="card-body">
  
                    <h5 className="card-title">{item.name}</h5>
                   <h6 className="card-subtitle mb-2 text-muted"> Total price:  
                   {this.state.items[item.id]}
                   </h6>
                   <h6 className="card-subtitle mb-2 text-muted"> Total items:  
                   {this.state.items[item.id] / item.price}             
                   </h6>
                 </div>
               </div>
             ))}

                <div class="form-group">
                    <input onChange = {this.addressChangeHandler} type="text" class="form-control" name="address" placeholder="Address"/>
                </div>

            <button onClick = {this.sendOrder} class="btn btn-primary">Confirm Order</button> 

             </div>
            </div>
            </div>
        )
    }
}

export default Cart;