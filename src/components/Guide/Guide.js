import React from 'react';
import "./Guide.css";

export default function Guide(props) {
    return (
        <div className='guide-comp-container'>
          <div>
                <img src={props.imageUrl} />
          </div>
          <div>
              <div><strong>{props.title}</strong></div>
              <div id="second-div">{props.mainText}</div>
          </div>
        </div>
    )
}