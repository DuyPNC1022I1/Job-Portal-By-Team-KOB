import React, { Component } from "react";
import styled from "styled-components";

const HeaderContainer = styled.div`
    background-color: ${props => props.theme.colors.headerFooter};
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    padding: 0 3rem;

    @media (max-width: 1000px) {
        justify-content: center;
        margin: 0;
    }
`;

const HeaderWrapper = styled.div`
    display: flex;
    color: #eee;
    font-size: 1.5rem;
        
    @media (max-width: 1600px) {
        
        margin: 0;
    }
`;

class Header extends Component {
    render() {
        return (
            <HeaderContainer>
                <HeaderWrapper>
                   <img src="/image/KOB.png" style={{width: "250px", height:"70px"}}/>
                </HeaderWrapper>
            </HeaderContainer>
        )
    };
}

export default Header;