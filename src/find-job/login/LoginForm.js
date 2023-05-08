import "../loginCss/AppFormLogin.css";
import "../loginCss/csstesst.css";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from 'yup';
import Modal from "./ResetPass";
import Swal from "sweetalert2";


export default function LoginForm() {
    const [account, setAccount] = useState({})
    const [showPass, setShowPass] = useState("password")
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    useEffect(() => {
        window.scrollTo(0, 0); // Quay lại đầu trang khi tải lại trang
    },[])

    const Validation = Yup.object().shape({
        password: Yup.string()
            .max(14, '* Too Long')
            .min(4, '* Too short')
            .required('* Cannot be left blank '),
        email: Yup.string()
            .email('* Invalid email').required('* Cannot be left blank'),
    });

    return (
        <>
            <div style={{backgroundColor: "white", margin: 0, padding: 0}}>

                {/*Navbar Start*/}
                <div className="header row" style={{
                    height: 75,
                    margin: 0,
                    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                    textAlign: 'center'
                }}>
                    <nav className="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0">
                        <Link to={'/home-page'}
                              className="navbar-brand d-flex align-items-center text-center py-0 px-4 px-lg-5">
                            <img src="/image/KOB.png" alt="Los Angeles" className="d-block"
                                 style={{width: "250px", height: "70px"}}/>
                        </Link>
                        <button type="button" className="navbar-toggler me-4" data-bs-toggle="collapse"
                                data-bs-target="#navbarCollapse">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarCollapse">
                            <div className="navbar-nav ms-auto p-4 p-lg-0">
                                <Link to={'/home-page'} className="nav-item nav-link active">Home Page</Link>
                                <Link to={'/about'} className="nav-item nav-link">About Us</Link>
                                <div className="nav-item dropdown ">
                                    <Link to={''} className="nav-link dropdown-toggle iconNavbar"
                                          data-bs-toggle="dropdown">Pages</Link>
                                    <div className="dropdown-menu rounded-0 m-0 iconNavbar">
                                        <Link to={'/search-page'} className="dropdown-item">Search A Job</Link>
                                    </div>
                                </div>
                            </div>
                            <Link to={"/home-page"}
                                  className="btn btn-primary rounded-0 py-4 px-lg-5 d-none d-lg-block"><i
                                className="	far fa-arrow-alt-circle-left fa-lg"></i> Back to Home </Link>
                        </div>
                    </nav>
                </div>
                {/*Navbar End*/}

                {/*Login Form*/}
                <div className="container" style={{padding: 0}}>
                    <h1 className="animated slideInDown" style={{
                        letterSpacing: 5,
                        fontWeight: 500,
                        margin: 30,
                        textAlign: 'center',
                        color: '#25316D'
                    }}>LOGIN TODAY</h1>
                    <div className="grid wide">
                        <div className="container-form row">
                            <div className="col l-6 animated slideInLeft">
                                <div className="main-form" style={{background: '#ebf8ff', height: 562}}>
                                    <div className="list-info" id="list-info">
                                        <div className="job-items">
                                            <div className="figure row" style={{display: "-webkit-box"}}>
                                                <div className="col l-33">
                                                    <div className="image is-blue">
                                                        <img className="lazy-bg" alt=""
                                                             src="https://static.careerbuilder.vn/themes/careerbuilder/img/job-alert/i1.png"/>
                                                    </div>
                                                </div>
                                                <div className="figcaption col l-9">
                                                    <div className="title">
                                                        <h3>JOB ANNOUNCEMENT</h3>
                                                    </div>
                                                    <div className="caption">
                                                        <p>Get updated with the latest job opportunities from many
                                                            leading
                                                            companies</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="job-items" style={{margin: '60px' + ' 0px'}}>
                                            <div className="figure row" style={{display: "-webkit-box"}}>
                                                <div className="col l-33">
                                                    <div className="image is-green">
                                                        <img className="lazy-bg" alt=""
                                                             src="https://static.careerbuilder.vn/themes/careerbuilder/img/job-alert/i1.png"/>
                                                    </div>
                                                </div>
                                                <div className="figcaption col l-9">
                                                    <div className="title">
                                                        <h3>EASY WORKING</h3>
                                                    </div>
                                                    <div className="caption">
                                                        <p>Find a job you love that matches your skills and
                                                            interests</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="job-items">
                                            <div className="figure row" style={{display: "-webkit-box"}}>
                                                <div className="col l-33">
                                                    <div className="image is-yellow">
                                                        <img className="lazy-bg" alt=""
                                                             src="https://static.careerbuilder.vn/themes/careerbuilder/img/job-alert/i1.png"/>
                                                    </div>
                                                </div>
                                                <div className="figcaption col l-9">
                                                    <div className="title">
                                                        <h3>QUICK APPLYING</h3>
                                                    </div>
                                                    <div className="caption">
                                                        <p>Easily apply for many positions without spending much time
                                                            time</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col l-6 animated-02 slideInRight">
                                <div className="main-form" style={{height: 562}}>
                                    <ul className="list-tabs">
                                        <li className="iconNavbar"><Link to={"/login"} style={{
                                            textDecoration: 'none',
                                            color: 'red'
                                        }}> Sign
                                            in
                                        </Link></li>
                                        <li className="active iconNavbar"><Link to={"/signup"}
                                                                                style={{
                                                                                    textDecoration: 'none',
                                                                                    color: 'black'
                                                                                }}
                                        >Sign up</Link></li>
                                    </ul>
                                    <div className="choose-follow">
                                        <p>Sign in with </p>
                                        <ul className="list-follow">
                                            <li>
                                                <button className="fb abc"><em className="fa fa-facebook"></em>Facebook
                                                </button>
                                            </li>
                                            <li>
                                                <button className="gg abc"><em className="fa fa-google"></em>Google
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="or-line" style={{textAlign: "center"}}><span>  Or  </span></div>
                                    <div className="form-register">
                                        <Formik
                                            initialValues={{
                                                email: '',
                                                password: ''
                                            }}
                                            onSubmit={(account) => {
                                                check(account)
                                            }}
                                            validationSchema={Validation}>
                                            <Form>
                                                <label htmlFor="email" style={{marginTop: 10}}>Email </label>
                                                <div className="form-group form-text">
                                                    <Field name="email" id="email" placeholder="Email"
                                                           autocomplete={"current-email"}/>
                                                    <span style={{fontSize: 18 + "px", color: "red"}}> <ErrorMessage
                                                        name={'email'}></ErrorMessage></span>
                                                </div>
                                                <label htmlFor="password" style={{marginTop: 10}}>Password </label>
                                                <div className="form-group form-text">
                                                    <div className={'icon-eye'} onClick={seePass}>
                                                    <span id={"eye-off"}
                                                          className="material-symbols-outlined">visibility_off</span>
                                                        <span id={"eye-on"} className="material-symbols-outlined"
                                                              style={{display: 'none'}}>visibility</span>
                                                    </div>
                                                    <Field name="password" id="password" placeholder="Password"
                                                           autocomplete="current-password"
                                                           type={showPass}/>
                                                    <span style={{fontSize: 18 + "px", color: "red"}}>
                                                    <ErrorMessage name={'password'}></ErrorMessage></span>
                                                </div>
                                                <div>
                                                </div>

                                                <div className="form-group form-submit abc">
                                                    <button type={"submit"} className="btn-gradient sign-up"
                                                            style={{marginTop: 40}}>Sign in
                                                    </button>
                                                </div>
                                            </Form>
                                        </Formik>
                                        <button onClick={handleShowModal} style={{
                                            float: "right",
                                            backgroundColor: 'white',
                                            color: "blue"
                                        }}> Forget your password ?
                                        </button>
                                        <Modal show={showModal} handleClose={handleCloseModal}
                                               style={{float: "right"}}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*Footer*/}
                    <div>
                        <footer className="site-footer" style={{padding: 40}}>
                            <div className="container">
                                <div className="row" style={{padding: 40}}>
                                    <div className="col l-6">
                                        <h6 style={{textAlign: 'center'}}>About</h6>
                                        <p className="text-justify">Scanfcode.com <i>CODE WANTS TO BE SIMPLE </i> is an
                                            initiative to help the upcoming programmers with the code. Scanfcode focuses
                                            on
                                            providing the most efficient code or snippets as the code wants to be
                                            simple. We
                                            will help programmers build up concepts in different programming languages
                                            that
                                            include C, C++, Java, HTML, CSS, Bootstrap, JavaScript, PHP, Android, SQL
                                            and
                                            Algorithm.</p>
                                    </div>

                                    <div className="col l-3">
                                        <h6>Categories</h6>
                                        <ul className="footer-links">
                                            <li><a>C</a></li>
                                            <li><a>UI Design</a></li>
                                            <li><a>PHP</a></li>
                                            <li><a>Java</a></li>
                                            <li><a>Android</a></li>
                                            <li><a>Templates</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="container" style={{padding: 40}}>
                                <div className="row">
                                    <div className="col l-11">
                                        <p className="copyright-text">Copyright &copy; 2017 All Rights Reserved by
                                            <a href="#">Scanfcode</a>.
                                        </p>
                                    </div>

                                </div>
                            </div>
                        </footer>
                    </div>
                    {/*  End footer*/}
                </div>
                {/*Login Forn End*/}

            </div>
        </>
    )

    function check(account) {
        axios.post('http://localhost:8080/auth/login', account).then((response) => {
            if (response.data.account.roles === 'company') {
                Swal.fire(
                    'Login Success!',
                    'Welcome to recruiter page!',
                    'success'
                )
                //Dang nhap vao trang User neu roles = 'company'
                navigate(`/company-home/${response.data.id}`)
            } else {
                Swal.fire(
                    'Login Success!',
                    'Welcome to user page!',
                    'success'
                )
                //Dang nhap vao trang User neu roles = 'user'
                navigate(`/user-my-profile/${response.data.id}`)
            }
        })
            .catch((error) => {
                console.error(error);
                if (error.response.status === 400) {
                    alert('Please active your account');
                    Swal.fire({
                        icon: 'error',
                        title: 'Please active your account',
                        text: 'Please check again!',
                        footer: '<a href="">Why do I have this issue?</a>'
                    })
                } else if (error.response.status === 404) {
                    // alert('wrong username or password');
                    Swal.fire({
                        icon: 'error',
                        title: 'Wrong username or password!',
                        text: 'Please check again!',
                        footer: '<a href="">Why do I have this issue?</a>'
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Login Fail!!',
                        text: 'Please check again!',
                        footer: '<a href="">Why do I have this issue?</a>'
                    })
                }
            });
    }

    function seePass() {
        if (showPass === "password") {
            setShowPass("text")
            document.getElementById("eye-off").style.display = "none"
            document.getElementById("eye-on").style.display = "block"
        } else {
            setShowPass("password")
            document.getElementById("eye-off").style.display = "block"
            document.getElementById("eye-on").style.display = "none"
        }
    }

}

