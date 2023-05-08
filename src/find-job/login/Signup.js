import "../loginCss/AppFormLogin.css";
import "../loginCss/csstesst.css";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from 'yup';
import Swal from "sweetalert2";

export default function Signup() {
    const navigate = useNavigate()
    const [account, setAccount] = useState({})
    const [checked, setChecked] = useState(false)
    const [roles, setRoles] = useState("user")
    const [showPass, setShowPass] = useState("password")
    const [showPassConfirm, setShowPassConfirm] = useState("password")
    const Validation = Yup.object().shape({
        password: Yup.string()
            .max(20, '* Too Long')
            .min(6, '* Too short')
            .required('* Cannot be left blank '),
        passwordConfirm: Yup.string()
            .required("* Confirm password is required")
            .oneOf([Yup.ref("password")], "* Passwords do not match"),
        email: Yup.string()
            .email('* Invalid email')
            .required('* Cannot be left blank'),
        name: Yup.string()
            .min(6, '* Too short')
            .max(30, '* Too long')
            .required('* Cannot be left blank'),
    });
    return (
        <>
            <div style={{backgroundColor: "white", overflow: 'hidden'}}>
                <div className="header row" style={{
                    height: 75,
                    marginBottom: 40,
                    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                    textAlign: 'center'
                }}>
                    <nav className="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0">
                        <Link to={'/home-page'} className="navbar-brand d-flex align-items-center text-center py-0 px-4 px-lg-5">
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
                                    <Link to={''} className="nav-link dropdown-toggle iconNavbar" data-bs-toggle="dropdown">Pages</Link>
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
                    }}>REGISTER TODAY</h1>
                    <div className="grid wide">
                        <div className="container-form row">
                            <div className="col l-6 animated slideInLeft">
                                <div className="main-form" style={{background: '#ebf8ff', height: 850}}>
                                    <div className="list-info" id="list-info">
                                        <div className="job-items">
                                            <div className="figure row"
                                                 style={{display: '-webkit-box', paddingBottom: 50}}>
                                                <div className="col l-3">
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
                                                            leading companies</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="job-items" style={{margin: '60px' + ' 0px'}}>
                                            <div className="figure row"
                                                 style={{display: '-webkit-box', paddingBottom: 50}}>
                                                <div className="col l-3">
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
                                            <div className="figure row"
                                                 style={{display: '-webkit-box', paddingBottom: 50}}>
                                                <div className="col l-3">
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
                                <div className="main-form" style={{height: 850}}>
                                    <ul className="list-tabs">
                                        <li className="iconNavbar"><Link to={"/login"} style={{
                                            textDecoration: 'none',
                                            color: 'black'
                                        }}> Sign in
                                        </Link></li>
                                        <li className="active iconNavbar"><Link to={"/signup"} style={{
                                            textDecoration: 'none',
                                            color: 'red'
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
                                                <button className="gg abc"><em className="fa fa-google"></em>Google</button>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="or-line"><span>  Or  </span></div>
                                    <div className="form-register">
                                        <Formik initialValues={{
                                            email: '',
                                            name: '',
                                            password: '',
                                            roles: 'user'
                                        }} onSubmit={(account) => {
                                            createAccount(account)
                                        }}
                                                validationSchema={Validation}
                                        >

                                            {({values, setFieldValue}) => (<Form>
                                                <label for="email" style={{marginTop: 10}}>Email </label>
                                                <div className="form-group form-text">
                                                    <Field name="email" id="email" placeholder="Email"/>
                                                    <span style={{fontSize: 18 + "px", color: "red"}}> <ErrorMessage
                                                        name={'email'}></ErrorMessage></span>
                                                </div>

                                                <label htmlFor="name" style={{marginTop: 10}}>Name </label>
                                                <div className="form-group form-text">
                                                    <Field name="name" id="name"
                                                           placeholder="Name (Company name if you are a recruiters)"/>
                                                    <span style={{fontSize: 18 + "px", color: "red"}}> <ErrorMessage
                                                        name={'name'}></ErrorMessage></span>
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
                                                           type={showPass}/>
                                                    <span style={{fontSize: 18 + "px", color: "red"}}> <ErrorMessage
                                                        name={'password'}></ErrorMessage></span>
                                                </div>
                                                <label htmlFor="passwordConfirm" style={{marginTop: 10}}>Confirm Password </label>
                                                <div className="form-group form-text">
                                                    <div className={'icon-eye-Confirm'} onClick={seePassConfirm}>
                                                        <span id={"eye-off-1"}
                                                              className="material-symbols-outlined pass-off">visibility_off</span>
                                                        <span id={"eye-on-2"}
                                                              className="material-symbols-outlined pass-on"
                                                              style={{display: 'none'}}>visibility</span>
                                                    </div>
                                                    <Field name="passwordConfirm" id="passwordConfirm"
                                                           placeholder="Confirm Password" type={showPassConfirm}/>
                                                    <span style={{fontSize: 18 + "px", color: "red"}}> <ErrorMessage
                                                        name={'passwordConfirm'}></ErrorMessage></span>
                                                </div>
                                                <div style={{display: 'flex'}}>
                                                    <Field id={'checkbox-role'} name="role" type="checkbox" style={{
                                                        width: '5%',
                                                        height: 25,
                                                        cursor: 'pointer',
                                                        marginRight: "0",
                                                    }}
                                                           checked={checked} onClick={setCheck}
                                                           onChange={values.roles === "user" ? () => setFieldValue("roles", "company") : () => setFieldValue("roles", "user")}/>
                                                    <div className="col-8">
                                                        <label style={{marginLeft: 5, display: "flex"}}> If you are a Company </label>
                                                    </div>
                                                </div>
                                                <div className="form-group form-submit" style={{marginTop: 30}}>
                                                    <button type={'submit'} className="btn-gradient sign-up">Sign up
                                                    </button>
                                                </div>
                                            </Form>)}
                                        </Formik>
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
                    {/*Footer End*/}
                </div>
                {/*Login Form*/}

            </div>
        </>
    )

    function createAccount(account) {
        Swal.fire(
            'Please check your email to active your account!',
            '',
            'success'
        )
        axios.post('http://localhost:8080/auth/register', account).then(() => {
            navigate("/login")
        })
    }

    function setCheck() {
        setChecked(!checked)
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

    function seePassConfirm() {
        if (showPassConfirm === "password") {
            setShowPassConfirm("text")
            document.getElementById("eye-off-1").style.display = "none"
            document.getElementById("eye-on-2").style.display = "block"
        } else {
            setShowPassConfirm("password")
            document.getElementById("eye-off-1").style.display = "block"
            document.getElementById("eye-on-2").style.display = "none"
        }
    }
}

