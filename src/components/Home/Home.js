import React, { Component } from "react";
import "./Home.css";
import io from "socket.io-client";
import { CCC } from "../../ccc-streamer-utilities";
import { Line } from "react-chartjs-2";
import axios from "axios";
import UserReview from "../UserReview/UserReview";
import PriceBox from "../PriceBox/PriceBox";
import Guide from "../Guide/Guide";
import auth0 from "auth0-js";
import AdSense from "react-adsense";

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            historicalBtcData: [1, 100],
            historicalLabels: [],
            historicalEthData: [],
            historicalEthLabels: [],
            historicalLtcData: [],
            historicalLtcLabels: [],
            historicalBchData: [],
            historicalBchLabels: [],
            change: true,
            streamUrl: "https://streamer.cryptocompare.com/",
            currentPrice: {},
            imageUrl: "https://bitcoin.org/img/icons/opengraph.png",
            btcPrices: [],
            random: [1, 2, 3],
            data: {
                labels: ["hello", "h", "h", "h", "h", "h", "h", "h"],
                datasets: [
                    {
                        label: "BTC",
                        backgroundColor: "rgb(255, 99, 132)",
                        borderColor: "rgb(100, 99, 100)",
                        data: [1, 2000, 1, 2000, 1]
                    }
                ],
                options: {
                    title: {
                        display: true,
                        text: "hello"
                    }
                }
            },
            currentBtcData: { price: "", percent: "", volume: "" },
            currentEthData: { price: "", percent: "", volume: "" },
            currentLtcData: { price: "", percent: "", volume: "" },
            currentBchData: { price: "", percent: "", volume: "" },
            currentXprData: { price: "", percent: "", volume: "" },
            currentXmrData: { price: "", percent: "", volume: "" }
        };

        this.dataUnpack = this.dataUnpack.bind(this);
    }

    componentDidMount() {
        axios
            .get(
                "https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=60&aggregate=3&e=CCCAGG"
            )
            .then(resp => {
                let tempArr = [];
                let tempLabelsArr = [];
                resp.data.Data.map(val => {
                    tempArr.push(val.close);
                    tempLabelsArr.push(" ");
                });

                this.setState(
                    {
                        historicalBtcData: tempArr,
                        historicalLabels: tempLabelsArr
                    },
                    () => console.log(this.state.historicalBtcData)
                );
            });

        axios
            .get(
                "https://min-api.cryptocompare.com/data/histoday?fsym=ETH&tsym=USD&limit=60&aggregate=3&e=CCCAGG"
            )
            .then(resp => {
                let tempArr = [];
                let tempLabelsArr = [];
                resp.data.Data.map(val => {
                    tempArr.push(val.close);
                    tempLabelsArr.push(" ");
                });

                this.setState(
                    {
                        historicalEthData: tempArr,
                        historicalEthLabels: tempLabelsArr
                    },
                    () => console.log(this.state.historicalEthData)
                );
            });

        axios
            .get(
                "https://min-api.cryptocompare.com/data/histoday?fsym=LTC&tsym=USD&limit=60&aggregate=3&e=CCCAGG"
            )
            .then(resp => {
                let tempArr = [];
                let tempLabelsArr = [];
                resp.data.Data.map(val => {
                    tempArr.push(val.close);
                    tempLabelsArr.push(" ");
                });

                this.setState(
                    {
                        historicalLtcData: tempArr,
                        historicalLtcLabels: tempLabelsArr
                    },
                    () => console.log(this.state.historicalEthData)
                );
            });

        axios
            .get(
                "https://min-api.cryptocompare.com/data/histoday?fsym=BCH&tsym=USD&limit=60&aggregate=3&e=CCCAGG"
            )
            .then(resp => {
                let tempArr = [];
                let tempLabelsArr = [];
                resp.data.Data.map(val => {
                    tempArr.push(val.close);
                    tempLabelsArr.push(" ");
                });

                this.setState(
                    {
                        historicalBchData: tempArr,
                        historicalBchLabels: tempLabelsArr
                    },
                    () => console.log(this.state.historicalEthData)
                );
            });

        axios
            .get(
                "https://min-api.cryptocompare.com/data/generateAvg?fsym=BTC&tsym=USD&e=Bitfinex"
            )
            .then(resp =>
                this.setState({
                    currentBtcData: {
                        price: resp.data.DISPLAY.PRICE,
                        percent: resp.data.DISPLAY.CHANGEPCT24HOUR,
                        volume: resp.data.DISPLAY.VOLUME24HOURTO
                    }
                })
            );
        axios
            .get(
                "https://min-api.cryptocompare.com/data/generateAvg?fsym=ETH&tsym=USD&e=Bitfinex"
            )
            .then(resp =>
                this.setState({
                    currentEthData: {
                        price: resp.data.DISPLAY.PRICE,
                        percent: resp.data.DISPLAY.CHANGEPCT24HOUR,
                        volume: resp.data.DISPLAY.VOLUME24HOURTO
                    }
                })
            );
        axios
            .get(
                "https://min-api.cryptocompare.com/data/generateAvg?fsym=LTC&tsym=USD&e=Bitfinex"
            )
            .then(resp =>
                this.setState({
                    currentLtcData: {
                        price: resp.data.DISPLAY.PRICE,
                        percent: resp.data.DISPLAY.CHANGEPCT24HOUR,
                        volume: resp.data.DISPLAY.VOLUME24HOURTO
                    }
                })
            );
        axios
            .get(
                "https://min-api.cryptocompare.com/data/generateAvg?fsym=BCH&tsym=USD&e=Bitfinex"
            )
            .then(resp =>
                this.setState({
                    currentBchData: {
                        price: resp.data.DISPLAY.PRICE,
                        percent: resp.data.DISPLAY.CHANGEPCT24HOUR,
                        volume: resp.data.DISPLAY.VOLUME24HOURTO
                    }
                })
            );
        axios
            .get(
                "https://min-api.cryptocompare.com/data/generateAvg?fsym=XRP&tsym=USD&e=Bitfinex"
            )
            .then(resp =>
                this.setState({
                    currentXprData: {
                        price: resp.data.DISPLAY.PRICE,
                        percent: resp.data.DISPLAY.CHANGEPCT24HOUR,
                        volume: resp.data.DISPLAY.VOLUME24HOURTO
                    }
                })
            );
        axios
            .get(
                "https://min-api.cryptocompare.com/data/generateAvg?fsym=XMR&tsym=USD&e=Bitfinex"
            )
            .then(resp =>
                this.setState({
                    currentXmrData: {
                        price: resp.data.DISPLAY.PRICE,
                        percent: resp.data.DISPLAY.CHANGEPCT24HOUR,
                        volume: resp.data.DISPLAY.VOLUME24HOURTO
                    }
                })
            );

        setInterval(
            function() {
                axios
                    .get(
                        "https://min-api.cryptocompare.com/data/generateAvg?fsym=BTC&tsym=USD&e=Bitfinex"
                    )
                    .then(resp =>
                        this.setState(
                            {
                                currentBtcData: {
                                    price: resp.data.DISPLAY.PRICE,
                                    percent: resp.data.DISPLAY.CHANGEPCT24HOUR,
                                    volume: resp.data.DISPLAY.VOLUME24HOURTO
                                }
                            },
                            console.log(this.state)
                        )
                    );
            }.bind(this),
            10000
        );
        setInterval(
            function() {
                axios
                    .get(
                        "https://min-api.cryptocompare.com/data/generateAvg?fsym=ETH&tsym=USD&e=Bitfinex"
                    )
                    .then(resp =>
                        this.setState({
                            currentEthData: {
                                price: resp.data.DISPLAY.PRICE,
                                percent: resp.data.DISPLAY.CHANGEPCT24HOUR,
                                volume: resp.data.DISPLAY.VOLUME24HOURTO
                            }
                        })
                    );
            }.bind(this),
            10000
        );
        setInterval(
            function() {
                axios
                    .get(
                        "https://min-api.cryptocompare.com/data/generateAvg?fsym=LTC&tsym=USD&e=Bitfinex"
                    )
                    .then(resp =>
                        this.setState({
                            currentLtcData: {
                                price: resp.data.DISPLAY.PRICE,
                                percent: resp.data.DISPLAY.CHANGEPCT24HOUR,
                                volume: resp.data.DISPLAY.VOLUME24HOURTO
                            }
                        })
                    );
            }.bind(this),
            10000
        );
        setInterval(
            function() {
                axios
                    .get(
                        "https://min-api.cryptocompare.com/data/generateAvg?fsym=BCH&tsym=USD&e=Bitfinex"
                    )
                    .then(resp =>
                        this.setState({
                            currentBchData: {
                                price: resp.data.DISPLAY.PRICE,
                                percent: resp.data.DISPLAY.CHANGEPCT24HOUR,
                                volume: resp.data.DISPLAY.VOLUME24HOURTO
                            }
                        })
                    );
            }.bind(this),
            10000
        );
        setInterval(
            function() {
                axios
                    .get(
                        "https://min-api.cryptocompare.com/data/generateAvg?fsym=XRP&tsym=USD&e=Bitfinex"
                    )
                    .then(resp =>
                        this.setState({
                            currentXprData: {
                                price: resp.data.DISPLAY.PRICE,
                                percent: resp.data.DISPLAY.CHANGEPCT24HOUR,
                                volume: resp.data.DISPLAY.VOLUME24HOURTO
                            }
                        })
                    );
            }.bind(this),
            10000
        );
        setInterval(
            function() {
                axios
                    .get(
                        "https://min-api.cryptocompare.com/data/generateAvg?fsym=XMR&tsym=USD&e=Bitfinex"
                    )
                    .then(resp =>
                        this.setState({
                            currentXmrData: {
                                price: resp.data.DISPLAY.PRICE,
                                percent: resp.data.DISPLAY.CHANGEPCT24HOUR,
                                volume: resp.data.DISPLAY.VOLUME24HOURTO
                            }
                        })
                    );
            }.bind(this),
            10000
        );

        //    var socket = io.connect(this.state.streamUrl);
        //    var subscription = ['5~CCCAGG~BTC~USD'];
        //    socket.emit('SubAdd', { subs: subscription });

        //    socket.on("m", function(message) {
        //         var messageType = message.substring(0, message.indexOf("~"));
        //         var res = {};
        //         if (messageType == CCC.STATIC.TYPE.CURRENTAGG) {
        //             res = CCC.CURRENT.unpack(message);
        //             this.dataUnpack(res);
        //         }
        //    }.bind(this));
    }

    dataUnpack(data, chart1) {
        console.log(chart1);
        console.log(data);
        var from = data["FROMSYMBOL"];
        var to = data["TOSYMBOL"];
        var fsym = CCC.STATIC.CURRENCY.getSymbol(from);
        var tsym = CCC.STATIC.CURRENCY.getSymbol(to);
        var pair = from + to;
        let dataCopy = this.state.data.datasets[0].data.slice();
        let dataCopy2 = Object.assign({}, this.state.data);
        dataCopy2.datasets[0].data.push(data.PRICE);
        dataCopy2.labels.push("price");
        this.setState(
            {
                data: dataCopy2
            },
            () => console.log(this.state.data)
        );

        if (!this.state.currentPrice.hasOwnProperty(pair)) {
            let temp1 = Object.assign({}, this.state.currentPrice);
            temp1[pair] = {};
            this.setState({
                currentPrice: temp1,
                change: false
            });
        }
        for (var key in data) {
            var temp = Object.assign({}, this.state.currentPrice);
            temp[pair][key] = data[key];
            this.setState({
                currentPrice: temp
            });
        }

        if (this.state.currentPrice[pair]["LASTTRADEID"]) {
            let temp = Object.assign({}, this.state.currentPrice);
            temp[pair]["LASTTRADEID"] = parseInt(
                this.state.currentPrice[pair]["LASTTRADEID"]
            ).toFixed(0);
            this.setState({
                currentPrice: temp
            });
        }
        let temp2 = Object.assign({}, this.state.currentPrice);
        temp2[pair]["CHANGE24HOUR"] = CCC.convertValueToDisplay(
            tsym,
            this.state.currentPrice[pair]["PRICE"] -
                this.state.currentPrice[pair]["OPEN24HOUR"]
        );
        temp2[pair]["CHANGE24HOURPCT"] =
            (
                ((this.state.currentPrice[pair]["PRICE"] -
                    this.state.currentPrice[pair]["OPEN24HOUR"]) /
                    this.state.currentPrice[pair]["OPEN24HOUR"]) *
                100
            ).toFixed(2) + "%";
    }

    render() {
        const data = {
            labels: this.state.historicalLabels,
            datasets: [
                {
                    label: "Bitcoin",
                    data: this.state.historicalBtcData,
                    backgroundColor: [
                        "rgba(255,99,132,0.2)",
                        "rgba(255,99,132,0.2)",
                        "rgba(255,99,132,0.2)",
                        "rgba(255,99,132,0.2)",
                        "rgba(255,99,132,0.2)",
                        "rgba(255,99,132,0.2)"
                    ],
                    borderColor: [
                        "rgba(255,99,132,1)",
                        "rgba(255,99,132,1)",
                        "rgba(255,99,132,1)",
                        "rgba(255,99,132,1)",
                        "rgba(255,99,132,1)",
                        "rgba(255,99,132,1)"
                    ],
                    borderWidth: 1
                }
            ]
        };

        const ethData = {
            labels: this.state.historicalEthLabels,
            datasets: [
                {
                    label: "Ethereum",
                    data: this.state.historicalEthData,
                    backgroundColor: [
                        "rgba(255,215,132,0.2)",
                        "rgba(255,215,132,0.2)",
                        "rgba(255,215,132,0.2)",
                        "rgba(255,215,132,0.2)",
                        "rgba(255,215,132,0.2)",
                        "rgba(255,215,132,0.2)"
                    ],
                    borderColor: [
                        "rgba(255,215,132,1)",
                        "rgba(255,215,132,1)",
                        "rgba(255,215,132,1)",
                        "rgba(255,215,132,1)",
                        "rgba(255,215,132,1)",
                        "rgba(255,215,132,1)"
                    ],
                    borderWidth: 1
                }
            ]
        };

        const ltcData = {
            labels: this.state.historicalLtcLabels,
            datasets: [
                {
                    label: "Litecoin",
                    data: this.state.historicalLtcData,
                    backgroundColor: [
                        "rgba(40,215,132,0.2)",
                        "rgba(40,215,132,0.2)",
                        "rgba(40,215,132,0.2)",
                        "rgba(40,215,132,0.2)",
                        "rgba(40,215,132,0.2)",
                        "rgba(40,215,132,0.2)"
                    ],
                    borderColor: [
                        "rgba(40,215,132,1)",
                        "rgba(40,215,132,1)",
                        "rgba(40,215,132,1)",
                        "rgba(40,215,132,1)",
                        "rgba(40,215,132,1)",
                        "rgba(40,215,132,1)"
                    ],
                    borderWidth: 1
                }
            ]
        };
        const bchData = {
            labels: this.state.historicalBchLabels,
            datasets: [
                {
                    label: "Bitcoin Cash",
                    data: this.state.historicalBchData,
                    backgroundColor: [
                        "rgba(40,215,10,0.2)",
                        "rgba(40,215,10,0.2)",
                        "rgba(40,215,10,0.2)",
                        "rgba(40,215,10,0.2)",
                        "rgba(40,215,10,0.2)",
                        "rgba(40,215,10,0.2)"
                    ],
                    borderColor: [
                        "rgba(40,215,10,1)",
                        "rgba(40,215,10,1)",
                        "rgba(40,215,10,1)",
                        "rgba(40,215,10,1)",
                        "rgba(40,215,10,1)",
                        "rgba(40,215,10,1)"
                    ],
                    borderWidth: 1
                }
            ]
        };

        return (
            <div className="home-wrapper">
                <div className="chart-container">
                    <div className="chart1">
                        <Line
                            data={data}
                            width={100}
                            height={70}
                            options={{
                                elements: { point: { radius: 0 } },
                                scales: {
                                    xAxes: [
                                        {
                                            gridLines: {
                                                color: "rgba(0, 0, 0, 0)"
                                            }
                                        }
                                    ],
                                    yAxes: [
                                        {
                                            gridLines: {
                                                color: "rgba(0, 0, 0, 0)"
                                            }
                                        }
                                    ]
                                }
                            }}
                        />
                    </div>
                    <div className="chart2">
                        <Line
                            data={ethData}
                            width={100}
                            height={70}
                            options={{
                                elements: { point: { radius: 0 } },
                                scales: {
                                    xAxes: [
                                        {
                                            gridLines: {
                                                color: "rgba(0, 0, 0, 0)",
                                                display: false
                                            }
                                        }
                                    ],
                                    yAxes: [
                                        {
                                            gridLines: {
                                                color: "rgba(0, 0, 0, 0)"
                                            }
                                        }
                                    ]
                                }
                            }}
                        />
                    </div>
                    <div className="chart3">
                        <Line
                            data={ltcData}
                            width={100}
                            height={70}
                            options={{
                                elements: { point: { radius: 0 } },
                                scales: {
                                    xAxes: [
                                        {
                                            gridLines: {
                                                display: false,
                                                drawBorder: false
                                            }
                                        }
                                    ],
                                    yAxes: [
                                        {
                                            gridLines: {
                                                display: false,
                                                drawBorder: false
                                            }
                                        }
                                    ]
                                }
                            }}
                        />
                    </div>
                    <div className="chart4">
                        <Line
                            data={bchData}
                            width={100}
                            height={70}
                            options={{
                                elements: { point: { radius: 0 } },
                                scaleLineColor: "transparent",
                                scales: {
                                    xAxes: [
                                        {
                                            gridLines: {
                                                display: false,
                                                drawBorder: false
                                            }
                                        }
                                    ],
                                    yAxes: [
                                        {
                                            gridLines: {
                                                display: false,
                                                drawBorder: false
                                            }
                                        }
                                    ]
                                }
                            }}
                        />
                    </div>
                </div>
                <div className="feature-container">
                    <div className="feature1">
                        <PriceBox
                            price={this.state.currentBtcData.price}
                            percent={this.state.currentBtcData.percent}
                            volume={this.state.currentBtcData.volume}
                            name="BTC"
                        />
                    </div>
                    <div className="feature2">
                        <PriceBox
                            price={this.state.currentEthData.price}
                            percent={this.state.currentEthData.percent}
                            volume={this.state.currentEthData.volume}
                            name="ETH"
                        />
                    </div>
                    <div className="feature3">
                        <PriceBox
                            price={this.state.currentBchData.price}
                            percent={this.state.currentBchData.percent}
                            volume={this.state.currentBchData.volume}
                            name="BCH"
                        />
                    </div>
                    <div className="feature4">
                        <PriceBox
                            price={this.state.currentXmrData.price}
                            percent={this.state.currentXmrData.percent}
                            volume={this.state.currentXmrData.volume}
                            name="XMR"
                        />
                    </div>
                    <div className="feature5">
                        <PriceBox
                            price={this.state.currentXprData.price}
                            percent={this.state.currentXprData.percent}
                            volume={this.state.currentXprData.volume}
                            name="XRP"
                        />
                    </div>
                    <div className="feature6">
                        <PriceBox
                            price={this.state.currentLtcData.price}
                            percent={this.state.currentLtcData.percent}
                            volume={this.state.currentLtcData.volume}
                            name="LTC"
                        />
                    </div>
                </div>
                <div className="mid-social">
                    <div id="line-chart-div2">
                        <i className="fa fa-comments" />
                    </div>
                    <h1>WE ARE SOCIAL</h1>
                    <div id="green-border" />
                    <h3>
                        CryptoCompare is an interactive platform where you can
                        discuss the latest Crypto trends and monitor all markets
                        streaming in real time
                    </h3>
                    <div className="panel-heading">
                        <i className="fa fa-star-o" aria-hidden="true" />
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

                    <div className="top-lists">
                        <div id="line-chart-div">
                            <icon className="fa fa-line-chart" />
                        </div>
                        <div>
                            <h1>WE HAVE TOPLISTS</h1>
                        </div>
                        <div className="yellow-bar" />
                        <div>
                            CryptoCompare is an interactive platform where you
                            can discuss the latest Crypto trends and monitor all
                            markets streaming in real time
                        </div>
                        <div>
                            <table>
                                <thead>
                                    <tr>
                                        <td>#</td>
                                        <td>Coin Name</td>
                                        <td>Volume</td>
                                        <td>% Change</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="table-row">
                                        <td>1</td>
                                        <td>
                                            <strong>BTC</strong>
                                        </td>
                                        <td>50,2000</td>
                                        <td>-0.13%</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>
                                            <strong>ETH</strong>
                                        </td>
                                        <td>50,2000</td>
                                        <td>-0.13%</td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>
                                            <strong>LTC</strong>
                                        </td>
                                        <td>50,2000</td>
                                        <td>-0.13%</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="top-lists">
                        <div id="book2">
                            <i className="fa fa-book" />
                        </div>
                        <div>
                            <h1>WE HAVE GUIDES</h1>
                        </div>
                        <div />
                        <div>
                            CryptoCompare is the perfect place to learn about
                            crypto currencies and start to understand some of
                            the fundamental concepts behind the blockchain.
                        </div>
                        <div className="guide-container1">
                            <Guide
                                imageUrl="https://www.cryptocompare.com/media/1383970/enj.png?width=350"
                                title="How to install and use the Enjin smart wallet."
                                mainText="The Enjin Smart Wallet is a Bitcoin, Ethereum, Litecoin & ERC20 token wallet designed for fast, secure and simple coin management. Since its release, the Enjin wallet has garnered over 30,000 downloads and more than 550 overwhelmingly positive review…"
                            />
                            <Guide
                                imageUrl="https://www.cryptocompare.com/media/1383970/enj.png?width=350"
                                title="How to install and use the Enjin smart wallet."
                                mainText="The Enjin Smart Wallet is a Bitcoin, Ethereum, Litecoin & ERC20 token wallet designed for fast, secure and simple coin management. Since its release, the Enjin wallet has garnered over 30,000 downloads and more than 550 overwhelmingly positive review…"
                            />
                            <Guide
                                imageUrl="https://www.cryptocompare.com/media/1383970/enj.png?width=350"
                                title="How to install and use the Enjin smart wallet."
                                mainText="The Enjin Smart Wallet is a Bitcoin, Ethereum, Litecoin & ERC20 token wallet designed for fast, secure and simple coin management. Since its release, the Enjin wallet has garnered over 30,000 downloads and more than 550 overwhelmingly positive review…"
                            />
                            <Guide
                                imageUrl="https://www.cryptocompare.com/media/1383970/enj.png?width=350"
                                title="How to install and use the Enjin smart wallet."
                                mainText="The Enjin Smart Wallet is a Bitcoin, Ethereum, Litecoin & ERC20 token wallet designed for fast, secure and simple coin management. Since its release, the Enjin wallet has garnered over 30,000 downloads and more than 550 overwhelmingly positive review…"
                            />
                            <Guide
                                imageUrl="https://www.cryptocompare.com/media/1383970/enj.png?width=350"
                                title="How to install and use the Enjin smart wallet."
                                mainText="The Enjin Smart Wallet is a Bitcoin, Ethereum, Litecoin & ERC20 token wallet designed for fast, secure and simple coin management. Since its release, the Enjin wallet has garnered over 30,000 downloads and more than 550 overwhelmingly positive review…"
                            />
                            <Guide
                                imageUrl="https://www.cryptocompare.com/media/1383970/enj.png?width=350"
                                title="How to install and use the Enjin smart wallet."
                                mainText="The Enjin Smart Wallet is a Bitcoin, Ethereum, Litecoin & ERC20 token wallet designed for fast, secure and simple coin management. Since its release, the Enjin wallet has garnered over 30,000 downloads and more than 550 overwhelmingly positive review…"
                            />
                            <Guide
                                imageUrl="https://www.cryptocompare.com/media/1383970/enj.png?width=350"
                                title="How to install and use the Enjin smart wallet."
                                mainText="The Enjin Smart Wallet is a Bitcoin, Ethereum, Litecoin & ERC20 token wallet designed for fast, secure and simple coin management. Since its release, the Enjin wallet has garnered over 30,000 downloads and more than 550 overwhelmingly positive review…"
                            />
                            <Guide
                                imageUrl="https://www.cryptocompare.com/media/1383970/enj.png?width=350"
                                title="How to install and use the Enjin smart wallet."
                                mainText="The Enjin Smart Wallet is a Bitcoin, Ethereum, Litecoin & ERC20 token wallet designed for fast, secure and simple coin management. Since its release, the Enjin wallet has garnered over 30,000 downloads and more than 550 overwhelmingly positive review…"
                            />
                        </div>
                    </div>
                </div>
                <AdSense.Google
                    client="ca-pub-7292810486004926"
                    slot="7806394673"
                    style={{ width: 500, height: 300, float: "left" }}
                    format=""
                />
            </div>
        );
    }
}

export default Home;
