import React, {Component} from 'react';
import "./PriceBox.css";

class PriceBox extends Component {
    constructor(props) {
        super(props)

        this.state = {};
    }


    render() {
        return (
            <div className="price-box">
                <div class="to-flex">
                    <strong>{this.props.name}</strong>
                    <span>{this.props.percent.charAt(0) !== '-' ? <span className='green-green'>{this.props.percent}%</span> : <span className='red-red'>{this.props.percent}%</span>}</span>
                </div>
                <div>
                    <strong>Price:</strong> {this.props.price}
                </div>
                <div>
                    <strong>V:</strong> {this.props.volume}
                </div>
            </div>
        )
    }
}

export default PriceBox;