import React, {Component} from 'react';
import "./UserReview.css";

class UserReview extends Component {
    constructor(props) {
        super(props)

        this.state = {};
    }

    render() {
        return (
            <div className="user-review">
                    <div className="user-photo"><img alt='review' src="https://www.cryptocompare.com/media/350777/hashflare-ethereum.png?anchor=center&mode=crop&width=80&height=80" /></div>
                    <div className="review-content">
                        <div className="review-general review-header">Ethereum Medium Mining Contract</div>
                        <div className="review-general review-stuff">
                        <span className="blue"><i className="fa fa-user" aria-hidden="true"></i>nobe</span> 
                        <i class="fa fa-clock-o" aria-hidden="true"></i>
                        43 min ago
                        <span id="stars">
                            <i class="fa fa-star" aria-hidden="true"></i>
                            <i class="fa fa-star" aria-hidden="true"></i>
                            <i class="fa fa-star" aria-hidden="true"></i>
                            <i class="fa fa-star-o" aria-hidden="true"></i>
                            <i class="fa fa-star-o" aria-hidden="true"></i>
                        </span>
                        </div>
                        <div className="review-general review-content2">Hashflare is the best cloud mining company ever. it is now renewed and contracts are all ok. i invested 2k(dolars) a month ago and allready …</div>
                        <div className="review-general review-footer">
                            
                            <i class="fa fa-reply" aria-hidden="true"></i>
                            Reply
                            <span id="thumbs">
                                <span className="thumbs-container-up">
                                    <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
                                    Agree
                                </span>
                                <span className="thumbs-container-down">
                                    <i class="fa fa-thumbs-o-down" aria-hidden="true"></i>
                                    Disagree
                                </span>
                            </span>
                            </div>
                    </div>
            </div>
        )
    }
}

export default UserReview;