import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Divide from './Divide/Divide';
import Add from './Add/Add';
import Subtract from './Subtract/Subtract';
import Multiply from './Multiply/Multiply';
import Navbar from './LandingPage/Navbar';
//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route path="/" component={Navbar}/>
                <Route path="/add" component={Add}/>
                <Route path="/subtract" component={Subtract}/>
                <Route path="/multiply" component={Multiply}/>
                <Route path="/divide" component={Divide}/>
            </div>
        )
    }
}
//Export The Main Component
export default Main;