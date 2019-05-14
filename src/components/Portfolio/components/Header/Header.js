import React from 'react';
import "./Header.css";
export default function Header(props) {
    return (
        <div className="header-wrapper">
            <div className="left-div">
                <i className="fa fa-line-chart" aria-hidden="true"></i>
                <h1>MY PORTFOLIOS</h1>
            </div>
            <div className="right-div">
                <img src="https://www.cryptocompare.com/media/20780803/enjin-wallet-banner.png"/>
                <button className="add-portfolio-btn">ADD PORTFOLIO<i className="fa fa-plus" /></button>
            </div>
        </div>
    )
}