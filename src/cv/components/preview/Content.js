import React, { Component } from "react";
import styled from "styled-components";
import ExpItem from "./ExpItem";
import EduItm from "./EduItm";
import Section from "../utils/Section";


const ContentWrapper = styled.div`
    background-color: white;
    padding: 1.5rem;
`

class Content extends Component {
    render() {
        const { cv } = this.props;
        return ( 
            <ContentWrapper>
                <Section border title="Description">
                    <p>{cv["pInfo"]["description"].value}</p>
                </Section>
                <Section title="Experience" border>
                {Object.keys(cv.experience).map((key) => {
                            return(
                            <ExpItem key={key} id={key} cv={cv}
                            />
                            )
                        })}
                </Section>
                <Section title="Education" border>
                    {Object.keys(cv.education).map((key) => {
                            return(
                            <EduItm key={key} id={key} cv={cv}
                            />
                            )
                        })}
                </Section>
                
            </ContentWrapper>
        )
    };
}

export default Content;