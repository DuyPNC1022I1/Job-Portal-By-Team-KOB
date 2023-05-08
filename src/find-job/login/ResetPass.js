import React, {useRef, useEffect, useState} from "react";
import "../loginCss/Modal.css";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";


const Modal = ({handleClose, show}) => {
    const modalRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    // const navigate = useNavigate()
    // const [isOpen, setIsOpen] = useState(false);

    const showHideClassName = show ? "modal display-block" : "modal display-none";
    const Validation = Yup.object().shape({
        email: Yup.string().email("* Invalid email").required("* cannot be left blank"),
    });

    useEffect(() => {
        function handleClickOutside(event) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                handleClose();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [modalRef, handleClose]);

    function sentEmail(values) {
        setIsLoading(true);
        console.log(values);
        axios
            .post(`http://localhost:8080/auth/forget-password?email=${values.email}`)
            .then((res) => {
            })
            .finally(() => setIsLoading(false));

    }

    return (
        <div id={'modal-show'} className={showHideClassName}>
            <section className="modal-main" ref={modalRef}>
                <Formik
                    initialValues={{
                        email: "",
                    }}
                    onSubmit={(values) => {
                        sentEmail(values);
                    }}
                    validationSchema={Validation}
                >
                    <Form>
                        <h3
                            style={{
                                textAlign: "center",
                                letterSpacing: "2px",
                                padding: 10 + 0,
                                lineHeight: 2,
                                fontWeight: 600,
                                fontSize: 30,
                                color: "rgb(37, 49, 109)",
                            }}
                        >
                            Are you sure you will recover your password?
                        </h3>
                        <div style={{textAlign: "center"}}>
                            {" "}
                            <label
                                style={{
                                    display: "inline-block",
                                    textAlign: "center",
                                    opacity: 0.5,
                                }}
                            >
                                We will send one new password to your email address !!
                            </label>
                        </div>
                        <label htmlFor="email" style={{display: "inline-block"}} style={{marginTop: 10}}>
                            {" "}
                            <p>Enter your Email</p>
                        </label>

                        <div className="form-group form-text">
                            <Field
                                name="email"
                                id="email"
                                placeholder="Email"
                                autocomplete={"current-email"}
                            />
                            <span style={{fontSize: 14 + "px", color: "red"}}>{" "}<ErrorMessage name={"email"}></ErrorMessage></span>
                        </div>
                        <button
                            type={"submit"}
                            className={"sentEmail"}
                        >
                            {isLoading ? <div className="loading"> loading... </div> : "Reset password"}
                        </button>
                    </Form>
                </Formik>
                <div>
                    <button onClick={handleClose} className={"close-modal"}>X
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Modal;
