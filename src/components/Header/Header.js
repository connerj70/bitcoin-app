import React, {Component} from 'react';
import './Header.css';
import auth0 from 'auth0-js';
import axios from 'axios';
import {Link} from 'react-router-dom';

var webAuth = new auth0.WebAuth({
    domain:       'connerj70.auth0.com',
    clientID:     'pOWrib1naxvMbmknTCwvOE2x6fnaeTle'
  });

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {}
        }
        this.handleLogin = this.handleLogin.bind(this);
        customSetState = customSetState.bind(this);
        addUser = addUser.bind(this);
    }

    // componentDidMount() {
    //     console.log(window.location.hash);
    //     if(window.location.hash && window.location.hash != "#/") {
    //         console.log('entered for loop')
    //         webAuth.parseHash({ hash: window.location.hash }, function(err, authResult) {
    //             if (err) {
    //                 return console.log(err);
    //             }
        
    //             webAuth.client.userInfo(authResult.accessToken, function(err, user) {
    //                 //Now you have the user's information\
    //                 console.log(user);
                   
    //                 customSetState(user)
    //                 addUser();
    //             });
    //         });
           
    //     }
    // }

   

    handleLogin() {
        console.log(webAuth);
        webAuth.authorize({
            responseType: 'token',
            connection: 'google-oauth2',
            clientID: 'pOWrib1naxvMbmknTCwvOE2x6fnaeTle',
            redirectUri: 'http://localhost:3000'
        })
    }

    render() {
        return (
            <div className="main-nav">
                <div className="left-container">
                    <ul>
                        <li className="special-li"><Link to="/">Coin<span>Compare</span></Link></li>
                        <li>Coins</li>
                        <li>Exchanges</li>
                        <li>Mining</li>
                        <li>Wallets</li>
                        <li>Spend</li>
                        <li>Forumn</li>
                        <li><Link to="/portfolio">Portfolio</Link></li>
                    </ul>
                </div>
                <div className='right-container'>
                    <input type='text' placeholder="Type to search..."/>
                    <div className="user-input-container">
                        {this.state.user.name ? <h4>{this.state.user.name}</h4> : null}
                        {this.state.user.name ? <img className='user-picture' src={this.state.user.picture}/> : null}
                    </div>
                    {!this.state.user.name ? <button className="login-button" onClick={this.handleLogin}>LOGIN</button> : null}
                </div>
            </div>
        )
    }
}

function  customSetState(val) {
    this.setState({
        user: val
    }, console.log(this.state.user));
}

function addUser() {
    axios.post('http://localhost:3030/api/users', this.state.user).then(resp => {
        console.log(resp);
       
    })
}

export default Header