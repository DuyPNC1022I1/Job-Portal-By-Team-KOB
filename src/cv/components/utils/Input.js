import React, { Component } from "react";
import styled, { css } from "styled-components";

const InputCSS = css`
    background-color: white;
    border: 1px solid transparent;
    border-radius: 5px;
    padding: 0.5rem;  

    &:focus {
        border: 1px solid #aaa;
    }
`;

const InputWrapper = styled.input`
    ${InputCSS}
    display: ${props => props.file ?  `none` : "" };
`;

const InputSectionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 0.5rem;  
    }    
`;

class Input extends Component {
    render() {
        const inputItems = this.props.inputItems;
        const stateSection = this.props.stateSection;
        return (
            <InputSectionWrapper>
                { Object.entries(inputItems).map(([key, item]) => {
                    let path = stateSection.concat(key);
                    return (
                        <InputWrapper
                        type={this.props.type}
                        key={item.id}
                        name={path}
                        placeholder={item.placeholder}
                        onChange={this.props.eHandler}
                        value={item.value}
                        />  
                    )
                })}
            </InputSectionWrapper>
            
        )
    };
}

export { Input, InputCSS };