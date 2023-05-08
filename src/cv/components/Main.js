    import React, {useState, useRef, useEffect} from "react";
    import styled from "styled-components";
    import Form from './form/Form';
    import Preview from './preview/Preview';
    import uniqid from "uniqid";
    import { createCVItm, cvObj } from "./utils/cvObj";
    import { createExpItm } from "./utils/experienceObj";
    import { createEduItm } from "./utils/educationObj";
    import exampleCV from "./utils/exampleCvObj";
    import { useReactToPrint } from 'react-to-print';
    import axios from "axios";
    import {useParams} from "react-router-dom";

    const Mainwrapper = styled.main`
        background-color: ${props => props.theme.colors.main};
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        padding: 2rem 3rem;
        gap: 3rem;
        @media (max-width: 1000px) {
            flex-direction: column;
            align-items: center;
            max-width: 90%;
          }
    }`;
    const Main = ({props}) => {
        const param = useParams();
        const [user, setUser] = useState({});
        useEffect(() => {
            axios
                .get(`http://localhost:8080/users/${param.id}`)
                .then((response) => {
                    setUser(response.data);
                });
            window.scrollTo(0, 0);
        }, []);
        const [cv, setCV] = useState(exampleCV);
        const printRef = useRef();

        function updateNestedObj(obj, value, path) {
            const [head, ...rest] = path.split(".");
            !rest.length
                ? (obj[head] = value)
                : updateNestedObj(obj[head], value, rest.join("."));
            return obj;
        }

        const handleInputChange = (e) => {
            const { name, value } = e.target;
            const path = name + ".value";
            setCV((state) => {
                const currentState = structuredClone(state);
                const newState = updateNestedObj(currentState, value, path);
                return newState;
            });
        };

        const handleAddSection = (e) => {
            const { name } = e.target;
            setCV((state) => {
                const currentState = structuredClone(state);
                const importItem =
                    name === "experience" ? createExpItm() : createEduItm();
                const newState = {
                    ...currentState,
                    [name]: {
                        ...currentState[name],
                        [uniqid()]: importItem,
                    },
                };
                return newState;
            });
        };

        const handleDeleteSection = (e) => {
            const { id, name } = e.target;
            setCV((state) => {
                const currentState = structuredClone(state);
                const { [id]: _, ...restOfObjSection } = currentState[name];
                const newState = {
                    ...currentState,
                    [name]: { ...restOfObjSection },
                };
                return newState;
            });
        };

        const generateExample = () => setCV(exampleCV);

        const handleReset = () => setCV(createCVItm(user));

        const handlePrint = useReactToPrint({ content: () => printRef.current });

        const handleAddPhoto = (e) => {
            const { name } = e.target;
            setCV((state) => {
                const currentState = structuredClone(state);
                const path = name + ".value";
                const file = e.target.files[0];
                const img = URL.createObjectURL(file);
                const newState = updateNestedObj(currentState, img, path);
                return newState;
            });
        };

        return (
            <Mainwrapper>
                <Form
                    cv={cv}
                    eHandler={handleInputChange}
                    addSection={handleAddSection}
                    deleteSection={handleDeleteSection}
                    genExample={generateExample}
                    handleReset={handleReset}
                    print={handlePrint}
                    addPhoto={handleAddPhoto}
                />
                <Preview cv={cv} ref={printRef} />
            </Mainwrapper>
        );
    };

    export default Main;
