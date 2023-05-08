import React, { Component } from "react";
import styled from "styled-components";
import { FaGithub } from "react-icons/fa";

const FooterWrapper = styled.footer`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme.colors.headerFooter};
    color: white;
    gap: 0.5rem;
    font-size: 1rem;
`;

const Link = styled.a`
    color: white;
    font-size: 1.2rem;
    :hover {opacity: 0.5}
    }  

`;

class Footer extends Component {
    render() {
        return (
            <FooterWrapper>
                <p style={{marginBottom:0,padding: 30}}>source: by KOB =></p>
                <Link href="https://github.com/DuyPNC1022I1/Job-Portal-KOB-FE">
                    <FaGithub />
                </Link>
            </FooterWrapper>
        )
    };
}

export default Footer;