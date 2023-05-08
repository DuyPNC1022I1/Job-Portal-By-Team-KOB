import React, { Component } from "react";
import { ItemWrapper, Duration, Details } from './blankItms';


class EduItm extends Component {
    render() {
        const { cv, id } = this.props;  
        const from = cv.education[id].from.value;
        const to = cv.education[id].to.value;
        const institution = cv.education[id].institution.value;
        const city = cv.education[id].city.value;
        const qualification = cv.education[id].qualification.value

        return ( 
           <ItemWrapper>
                <Duration>{from} - {to}</Duration>
                <Details>
                    <div>{institution}</div>
                    <div>{qualification}, {city}</div>
                </Details>
           </ItemWrapper>
        )
    };
}

export default EduItm;