import React, {Component} from "react";
import styled from "styled-components";
import buttonStyle from "../styling/buttonStyle"

const ButtonWrapper = styled.button`
  ${buttonStyle}
`;

class Button extends Component {
    render() {
        return (
            <ButtonWrapper className={buttonStyle} name={this.props.eHandlerType} id={this.props.id}
                           onClick={this.props.onClick}>{this.props.text}</ButtonWrapper>
        )
    };
}

export default Button;