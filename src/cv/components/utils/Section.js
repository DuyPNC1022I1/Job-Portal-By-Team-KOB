import React, { Component } from "react";
import styled from "styled-components";

const SectionWrapper = styled.div`  
`;

const Title = styled.h3`
    margin-top: 0;
    font-size: 1.25rem;
    border-bottom: ${props => props.border ?  `2px solid ${props.theme.colors.lightBorder}` : "none"};
`;

const Children = styled.div`
`;

class Section extends Component {
    render() {
        return (
            <SectionWrapper>
                <Title border={this.props.border} >{this.props.title}</Title>
                <Children>{this.props.children}</Children>
            </SectionWrapper>
        )
    };
}

export default Section;