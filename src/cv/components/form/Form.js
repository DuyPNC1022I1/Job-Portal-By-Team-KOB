import React, { Component } from "react";
import styled from "styled-components";
import PersonalInfo from "./PersonalInfo";
import Experience from "./Experience";
import Education from "./Education";
import Button from "../utils/Button";


const FormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background-color: ${props => props.theme.colors.form};
    width: 150mm;
    max-width: 100%;
    gap: 1rem;
    padding: 1rem;
    box-sizing:border-box;
    border-radius: 5px;
    box-shadow:  ${props => props.theme.shadowing.boxShadow};
}`;

const Menu = styled.div`
    display: flex;
    flex-direction: row;
    height: 45%;
    gap: 1rem;
    max-height: 3rem; 
}`;

class Form extends Component {    
    render() {
        return (
            <FormWrapper>
                <Menu >
                    <Button text="Display Demo" onClick={this.props.genExample}/>
                    <Button text="Take your CV" onClick={this.props.handleReset} />
                    <Button text="Export PDF" onClick={this.props.print}/>
                </Menu>
                <PersonalInfo cv={this.props.cv} eHandler={this.props.eHandler} addPhoto={this.props.addPhoto} />
                <Experience cv={this.props.cv} eHandler={this.props.eHandler} addSection={this.props.addSection} deleteSection={this.props.deleteSection}/>
                <Education cv={this.props.cv} eHandler={this.props.eHandler} addSection={this.props.addSection} deleteSection={this.props.deleteSection}/>
            </FormWrapper>
        )
    };
}

export default Form;