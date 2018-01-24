import React, {Component} from 'react';
import "./Home.css";
import io from 'socket.io-client';
import {CCC} from '../../ccc-streamer-utilities';
import {Line} from 'react-chartjs-2';
import axios from 'axios';
import UserReview from '../UserReview/UserReview';
import PriceBox from '../PriceBox/PriceBox';
import * as Scroll from 'react-scroll';
import {Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller} from 'react-scroll';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            change: true,
            streamUrl: "https://streamer.cryptocompare.com/",
            currentPrice: {},
            imageUrl: 'https://bitcoin.org/img/icons/opengraph.png',
            btcPrices: [],
            random: [1, 2, 3],
            data: {
                datasets: [{
                    label: "BTC",
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(100, 99, 100)',
                    data: [],
                }],
                options: {
                        title: {
                            display: true,
                            text: "hello"
                        }
                    }
            },
            currentBtcData: {price: '', percent: '', volume: ""},
            currentEthData: {price: '', percent: '', volume: ""},
            currentLtcData: {price: '', percent: '', volume: ""},
            currentBchData: {price: '', percent: '', volume: ""},
            currentXprData: {price: '', percent: '', volume: ""},
            currentXmrData: {price: '', percent: '', volume: ""}
        };
    }

    scrollToTop() {
        scroll.scrollToTop();
    }
    
    scrollTo() {
        scroller.scrollTo("scroll-container", {duration: 5000, delay: 100, smooth: true, offset: 50});
    }

    componentDidMount() {

        Events.scrollEvent.register('begin', function(to, element) {
            console.log("begin", arguments);
          });

        // axios.get("https://www.cryptocompare.com/api/data/coinsnapshotfullbyid/?id=1182").then(resp => {
        //     console.log(resp);
        //     this.setState({
        //         imageUrl: resp.data.Data.General.ImageUrl
        //     });
        // });
        axios.get("https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=10&aggregate=3&e=CCCAGG").then(resp => {
            console.log(resp.data.Data);
            let stateCopy = this.state.data.datasets[0].data.slice();
            stateCopy = resp.data.Data.map(val => {
              return val.close
                
            });
            console.log('statecopy',stateCopy)
            this.setState((prevState) => ({
                change: !prevState.change,
                data: {
                    datasets: [{
                        label: "BTC",
                        backgroundColor: 'rgb(255, 99, 132)',
                        borderColor: 'rgb(250, 99, 100)',
                        data: stateCopy,
                    }],
                }
            }));
        });

        axios.get('https://min-api.cryptocompare.com/data/generateAvg?fsym=BTC&tsym=USD&e=Bitfinex').then(resp => this.setState({currentBtcData: {price: resp.data.DISPLAY.PRICE, percent:resp.data.DISPLAY.CHANGEPCT24HOUR, volume: resp.data.DISPLAY.VOLUME24HOURTO}}));
        axios.get('https://min-api.cryptocompare.com/data/generateAvg?fsym=ETH&tsym=USD&e=Bitfinex').then(resp => this.setState({currentEthData: {price: resp.data.DISPLAY.PRICE, percent:resp.data.DISPLAY.CHANGEPCT24HOUR, volume: resp.data.DISPLAY.VOLUME24HOURTO}}));
        axios.get('https://min-api.cryptocompare.com/data/generateAvg?fsym=LTC&tsym=USD&e=Bitfinex').then(resp => this.setState({currentLtcData: {price: resp.data.DISPLAY.PRICE, percent:resp.data.DISPLAY.CHANGEPCT24HOUR, volume: resp.data.DISPLAY.VOLUME24HOURTO}}));
        axios.get('https://min-api.cryptocompare.com/data/generateAvg?fsym=BCH&tsym=USD&e=Bitfinex').then(resp => this.setState({currentBchData: {price: resp.data.DISPLAY.PRICE, percent:resp.data.DISPLAY.CHANGEPCT24HOUR, volume: resp.data.DISPLAY.VOLUME24HOURTO}}));
        axios.get('https://min-api.cryptocompare.com/data/generateAvg?fsym=XRP&tsym=USD&e=Bitfinex').then(resp => this.setState({currentXprData: {price: resp.data.DISPLAY.PRICE, percent:resp.data.DISPLAY.CHANGEPCT24HOUR, volume: resp.data.DISPLAY.VOLUME24HOURTO}}));
        axios.get('https://min-api.cryptocompare.com/data/generateAvg?fsym=XMR&tsym=USD&e=Bitfinex').then(resp => this.setState({currentXmrData: {price: resp.data.DISPLAY.PRICE, percent:resp.data.DISPLAY.CHANGEPCT24HOUR, volume: resp.data.DISPLAY.VOLUME24HOURTO}}));
        

       var socket = io.connect(this.state.streamUrl);
       var subscription = ['5~CCCAGG~BTC~USD'];
       socket.emit('SubAdd', { subs: subscription });
       
       socket.on("m", function(message) {
            var messageType = message.substring(0, message.indexOf("~"));
            var res = {};
            if (messageType == CCC.STATIC.TYPE.CURRENTAGG) {
                res = CCC.CURRENT.unpack(message);
                this.dataUnpack(res);
            }
       }.bind(this));
    }

    dataUnpack(data) {
		var from = data['FROMSYMBOL'];
		var to = data['TOSYMBOL'];
		var fsym = CCC.STATIC.CURRENCY.getSymbol(from);
		var tsym = CCC.STATIC.CURRENCY.getSymbol(to);
		var pair = from + to;
        console.log(data);
        this.setState({
            data: {
                datasets: [{
                    label: "BTC",
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(250, 99, 100)',
                    data: [...this.state.data.datasets[0].data, data.PRICE],
                }],
            }
        }, () => console.log(this.state.data.datasets[0].data));

		if (!this.state.currentPrice.hasOwnProperty(pair)) {
			this.state.currentPrice[pair] = {};
		}

		for (var key in data) {
			this.state.currentPrice[pair][key] = data[key];
		}

		if (this.state.currentPrice[pair]['LASTTRADEID']) {
			this.state.currentPrice[pair]['LASTTRADEID'] = parseInt(this.state.currentPrice[pair]['LASTTRADEID']).toFixed(0);
		}
		this.state.currentPrice[pair]['CHANGE24HOUR'] = CCC.convertValueToDisplay(tsym, (this.state.currentPrice[pair]['PRICE'] - this.state.currentPrice[pair]['OPEN24HOUR']));
		this.state.currentPrice[pair]['CHANGE24HOURPCT'] = ((this.state.currentPrice[pair]['PRICE'] - this.state.currentPrice[pair]['OPEN24HOUR']) / this.state.currentPrice[pair]['OPEN24HOUR'] * 100).toFixed(2) + "%";
    }

    render() {
        return (
            <div className="home-wrapper">
            <Element name="scroll-container" className="scroll-container"></Element>
                <div className="chart1">
                        <Line
                            data={this.state.data}
                            width={100}
                            height={70}
                            options={{
                            }}
                        />
                </div>
                <div className="chart2">
                        <Line 
                            data={this.state.data}
                            width={100}
                            height={70}
                        />
                </div>
                <div className="chart3">
                        <Line 
                            data={this.state.data}
                            width={100}
                            height={70}
                        />
                </div>
                <div className="chart4">
                        <Line 
                            data={this.state.data}
                            width={100}
                            height={70}
                        />
                </div>
                <div className="feature1"><PriceBox price={this.state.currentBtcData.price} percent={this.state.currentBtcData.percent} volume={this.state.currentBtcData.volume} name="BTC"/></div>
                <div className="feature2"><PriceBox price={this.state.currentEthData.price} percent={this.state.currentEthData.percent} volume={this.state.currentEthData.volume} name="ETH"/></div>
                <div className="feature3"><PriceBox price={this.state.currentBchData.price} percent={this.state.currentBchData.percent} volume={this.state.currentBchData.volume} name="BCH"/></div>
                <div className="feature4"><PriceBox price={this.state.currentXmrData.price} percent={this.state.currentXmrData.percent} volume={this.state.currentXmrData.volume} name="XMR"/></div>
                <div className="feature5"><PriceBox price={this.state.currentXprData.price} percent={this.state.currentXprData.percent} volume={this.state.currentXprData.volume} name="XRP"/></div>
                <div className="feature6"><PriceBox price={this.state.currentLtcData.price} percent={this.state.currentLtcData.percent} volume={this.state.currentLtcData.volume} name="LTC"/></div>
                <div className="mid-social">
                    <h1>WE ARE SOCIAL</h1>
                    <div id="green-border"></div>
                    <h3>CryptoCompare is an interactive platform where you can discuss the
                         latest Crypto trends and monitor all markets streaming
                          in real time
                    </h3>
                    <div className="panel-heading">
                        <i className="fa fa-star-o" aria-hidden="true"></i>
                        Latest user Reviews
                    </div>
                    <div className="review-container">
                        <UserReview />
                        <UserReview />
                        <UserReview />
                        <UserReview />
                        <UserReview />
                        <UserReview />
                        <UserReview />
                        <UserReview />
                    </div>
                </div>
                <Link to="scroll-container"/>
                <button onClick={this.scrollToTop}>Scroll To Top</button>
                <button onClick={this.scrollTo}>Scroll To</button>
            </div>
        )
    }
}

export default Home;