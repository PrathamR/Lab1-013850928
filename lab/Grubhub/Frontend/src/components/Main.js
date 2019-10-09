import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Login from './Login/Login';
import Home from './Home/Home';
import Delete from './Delete/Delete';
import Create from './Create/Create';
import Profile from './Profile/Profile';
import RestProfile from './Profile/RestProfile';
import Navbar from './LandingPage/Navbar';
import Register from './Register/Register';
import Search from './Search/Search';
import RegisterRest from './RegisterRest/RegisterRest';
import RestLogin from './RestLogin/RestLogin';
import UpcomOrders from './UpcomOrders/UpcomOrders';
import PastOrders from './PastOrders/PastOrders';
import ShowUser from './ShowProfile/User';
import ShowRestaurant from './ShowProfile/Restaurant';
import CreateMenu from './CreateMenu/CreateMenu';
import CreateItems from './CreateItems/CreateItems';
import Cart from './Cart/Cart';
import DisplayMenu from './DisplayMenu/DisplayMenu';
class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route path="/" component={Navbar}/>
                <Route path="/login" component={Login}/>
                <Route path="/home" component={Home}/>
                <Route path="/delete" component={Delete}/>
                <Route path="/create-account" component={Register}/>
                <Route path="/profile" component={Profile}/>
                <Route path="/search" component={Search}/>
                <Route path="/create-restaurant" component={RegisterRest}/>
                <Route path="/login-restaurant" component={RestLogin}/>
                <Route path="/upcoming" component={UpcomOrders}/>
                <Route path="/past" component={PastOrders}/>
                <Route path="/user" component={ShowUser}/>
                <Route path="/restaurant/:restID" component={ShowRestaurant}/>
                <Route path="/create-menu" component={CreateMenu}/>
                <Route path="/create-items" component={CreateItems}/>
                <Route path="/cart" component={Cart}/>
                <Route path="/profile-restaurant" component={RestProfile}/>
                <Route path="/menu" component={DisplayMenu}/>
            </div>
        )
    }
}
//Export The Main Component
export default Main;