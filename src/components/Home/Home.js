import React, {Component} from 'react';
import "./Home.css";
import io from 'socket.io-client';
import {CCC} from '../../ccc-streamer-utilities';
import {Line} from 'react-chartjs-2';
import axios from 'axios';
import UserReview from '../UserReview/UserReview';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            streamUrl: "https://streamer.cryptocompare.com/",
            currentPrice: {},
            imageUrl: '',
            btcPrices: [],
            rando: [1, 2, 3],
            data: {
                labels: ["btcPrice"],
                datasets: [{
                    label: "BTC",
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: [],
                }],
                options: {
                        title: {
                            display: true,
                            text: "hello"
                        }
                    }
            },
        };
    }

    componentDidMount() {

        axios.get("http://www.cryptocompare.com/api/data/coinsnapshotfullbyid/?id=1182").then(resp => {
            console.log(resp);
            this.setState({
                imageUrl: resp.data.Data.General.ImageUrl
            });
        });

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
                labels: ["btcPrice"],
                datasets: [{
                    label: "BTC",
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: [...this.state.data.datasets[0].data, data.PRICE],
                }]
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
                <div className="chart1">
                        <Line 
                            data={this.state.data}
                            width={100}
                            height={70}
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
                <div className="feature1">
                    <img className="pic" src={`https://www.cryptocompare.com/${this.state.imageUrl}`} />
                </div>
                <div className="feature2">
                    <img className="pic" src={`https://www.cryptocompare.com/${this.state.imageUrl}`} />
                </div>
                <div className="feature3"><img className="pic" src={`https://www.cryptocompare.com/${this.state.imageUrl}`} /></div>
                <div className="feature4"><img className="pic" src={`https://www.cryptocompare.com/${this.state.imageUrl}`} /></div>
                <div className="feature5"><img className="pic" src={`https://www.cryptocompare.com/${this.state.imageUrl}`} /></div>
                <div className="feature6"><img className="pic" src={`https://www.cryptocompare.com/${this.state.imageUrl}`} /></div>
                <div className="mid-social">
                    <h1>WE ARE SOCIAL</h1>
                    <h3>CryptoCompare is an interactive platform where you can discuss the
                         latest Crypto trends and monitor all markets streaming
                          in real time
                    </h3>
                    <div className="panel-heading">
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
            </div>
        )
    }
}

export default Home;