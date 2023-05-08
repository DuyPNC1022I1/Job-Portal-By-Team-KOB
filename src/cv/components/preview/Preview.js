import React, { Component } from "react";
import styled from "styled-components";
import Header from "./Header";
import Content from "./Content";
import SideBar from "./SideBar";

const PreviewWrapper = styled.div`
    width: 210mm;
    height: 297mm;
    position: sticky;
    top: 10px;
    box-shadow:  ${props => props.theme.shadowing.boxShadow};
    display: grid;
    grid-template-columns: 70% 30%;
    grid-template-rows: 10% 90%;
    max-width: 100%;
`;

class Preview extends Component {
    render() {
        const { cv } = this.props;
        return (
            <PreviewWrapper>
                <Header cv={cv}/>
                <Content cv={cv}/>
                <SideBar cv={cv}/>
            </PreviewWrapper>
        )
    };
}

export default Preview;