import React, {Component} from 'react';
import './Header.css';

class Header extends Component {
    render() {
        return (
            <div className="main-nav">
                <div className="left-container">
                    <ul>
                        <li className="special-li">Coin<span>Compare</span></li>
                        <li>Coins</li>
                        <li>Exchanges</li>
                        <li>Mining</li>
                        <li>Wallets</li>
                        <li>Spend</li>
                        <li>Forumn</li>
                        <li>Portfolio</li>
                    </ul>
                </div>
                <input type='text' placeholder="Type to search..."/>
            </div>
        )
    }
}

export default Header