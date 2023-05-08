import styled from "styled-components";

const ItemWrapper = styled.div`
    display: flex;
    box-sizing: border-box;
    margin-bottom: 1rem;  
`;

const Duration = styled.div`
    width: 25%;
    margin-right: 2rem;
`;

const Details = styled.div`
    width: 75%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

export { ItemWrapper, Duration, Details }