import React, { Component } from "react";
import styled from "styled-components";
import Section from "../utils/Section";
import { Input } from "../utils/Input";
import Button from "../utils/Button";

const ExperienceWrapper = styled.div``

const ExperienceSectionWrapper = styled.div``

class Experience extends Component {    
    render() {
        const inputItems = this.props.cv.experience;
        return (
            <ExperienceWrapper>
                <Section title="Experience">
                {Object.keys(inputItems).map((key) => {
                    const stateSection = 'experience.' + key + ".";
                    return (
                        <ExperienceSectionWrapper key={key}>
                            <Input type="text"
                            inputItems={inputItems[key]} 
                            stateSection={stateSection}
                            eHandler={this.props.eHandler}/>
                            <Button id={key} text="Delete" onClick={this.props.deleteSection} eHandlerType="experience"/>
                        </ExperienceSectionWrapper>
                    )})}
                    <Button eHandlerType="experience" text="Add" onClick={this.props.addSection}/>
                </Section>
            </ExperienceWrapper>
           
        )
    };
}

export default Experience;