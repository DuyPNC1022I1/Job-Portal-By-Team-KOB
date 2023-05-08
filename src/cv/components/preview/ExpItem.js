import React, { Component } from "react";
import { ItemWrapper, Duration, Details } from './blankItms';

class ExpItem extends Component {
    render() {
        const { cv, id } = this.props;  
        const from = cv.experience[id].from.value;
        const to = cv.experience[id].to.value;
        const position = cv.experience[id].position.value;
        const organisation = cv.experience[id].organisation.value;
        const location = cv.experience[id].location.value

        return ( 
           <ItemWrapper>
                <Duration>{from} - {to}</Duration>
                <Details>
                    <div><b>{position}</b></div>
                    <div>{organisation}, {location}</div>
                </Details>
           </ItemWrapper>
        )
    };
}

export default ExpItem;