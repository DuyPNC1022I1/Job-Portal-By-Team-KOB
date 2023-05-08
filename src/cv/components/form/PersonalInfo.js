import React, { Component } from "react";
import styled from "styled-components";
import Section from "../utils/Section";
import { Input, InputCSS } from "../utils/Input";
import buttonStyles from "../styling/buttonStyle";

const PersonalInfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const TextArea = styled.textarea.attrs({rows: "4"})`  
    ${InputCSS}
    box-sizing: border-box;
    width: 100%;
    margin-top: 0.5rem;
    resize: vertical;
}`;

const FileInputWrapper = styled.input`
    display: none;
`;

const Label = styled.label`    
    ${buttonStyles}  
}`;

class PersonalInfo extends Component {    
    render() {
        const inputItems = this.props.cv.pInfo;

        const filteredItems = Object.entries(inputItems)
            .filter((key) => !key.includes('description'))
            .filter((key) => !key.includes('photo'))
            .reduce((obj, [key, value]) => {
                obj[key] = value;
                return obj;
            }, {});

        const stateSection = 'pInfo.'
        const txtAreaName = stateSection.concat("description");
        const photoName = stateSection.concat("photo");    
       
        return (
            <PersonalInfoWrapper>
                <Section title="Personal Details">
                    <Input type="text" inputItems={filteredItems} 
                    stateSection={stateSection}
                    eHandler={this.props.eHandler}/>
                    <TextArea name={txtAreaName} placeholder="Description" onChange={this.props.eHandler} value={inputItems["description"].value}/> 
                    <Label>
                        <FileInputWrapper type="file" onChange={this.props.addPhoto} name={photoName} />
                        Upload Photo
                    </Label>
                </Section>
            </PersonalInfoWrapper>   
        )
    };
}

export default PersonalInfo;