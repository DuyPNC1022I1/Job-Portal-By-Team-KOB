import React, { Component } from "react";
import styled from "styled-components";

const HeaderWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    grid-column: span 2;
    padding: 1.5rem;
    line-height: 2.5rem;
    background-color: ${props => props.theme.colors.buttonAndPreviewBorder};
    color: white;
}`;

const FullName = styled.h1`
    margin: 0;
    font-size: 2.5rem;
}`;

const JobTitle = styled.h3`
    margin: 0;
    font-size: 1.5rem;
}`;


class Header extends Component {
    render() {
        const { cv } = this.props;
        return (
            <HeaderWrapper>
                <FullName>{cv["pInfo"]["firstName"].value} {cv["pInfo"]["secondName"].value}</FullName>
                <JobTitle>{cv["pInfo"]["title"].value}</JobTitle>
            </HeaderWrapper>
        )
    };
}

export default Header;