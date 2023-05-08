import {Link} from "react-router-dom";
import React, {useEffect} from "react";

function AboutPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <>
            <div className="container-xxl bg-white p-0">

                {/*Navbar Start*/}
                <nav className="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0">
                    <Link to={'/home-page'} className="navbar-brand d-flex align-items-center text-center py-0 px-4 px-lg-5">
                        <img src="/image/KOB.png" alt="Image Avatar KOB" className="d-block"
                             style={{width: "250px", height: "70px"}}/>
                    </Link>
                    <button type="button" className="navbar-toggler me-4" data-bs-toggle="collapse"
                            data-bs-target="#navbarCollapse">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <div className="navbar-nav ms-auto p-4 p-lg-0">
                            <Link to={'/home-page'}  className="nav-item nav-link active iconNavbar">Home Page</Link>
                            <Link to={'/about'} className="nav-item nav-link iconNavbar">About Us</Link>
                            <div className="nav-item dropdown ">
                                <Link to={''} className="nav-link dropdown-toggle iconNavbar" data-bs-toggle="dropdown">Pages</Link>
                                <div className="dropdown-menu rounded-0 m-0 iconNavbar">
                                    <Link to={'/search-page'} className="dropdown-item">Search A Job</Link>
                                </div>
                            </div>
                        </div>
                        <Link to={"/login"} className="btn btn-primary rounded-0 py-4 px-lg-5 d-none d-lg-block" ><i
                            className="far fa-user pr-2"></i> Sign in <i
                            className="fa fa-arrow-right ms-3"></i></Link>
                    </div>
                </nav>
                {/*Navbar End*/}

                {/*<!-- Header Start*/}
                <div className="container-xxl py-5 bg-dark page-header-about-us mb-5 animated slideInDown">
                    <div className="container my-5 pt-5 pb-4">
                        <h1 className="display-3 text-white mb-3">About Us</h1>
                    </div>
                </div>
                {/*<!-- Header End*/}

                {/*About Start*/}
                <div className="container-xxl animated slideInUp" >
                    <div className="container">
                        <div className="row g-5 align-items-center">
                            <div className="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                                <div className="row g-0 about-bg rounded overflow-hidden">
                                    <div className="col-6 text-start">
                                        <img className="img-fluid w-100" src="/image/about-1.jpg"/>
                                    </div>
                                    <div className="col-6 text-start">
                                        <img className="img-fluid" src="/image/about-2.jpg"
                                             style={{width: "85%", marginTop: "15%"}}/>
                                    </div>
                                    <div className="col-6 text-end">
                                        <img className="img-fluid add" src="/image/about-3.jpg" style={{width: "85%"}}/>
                                    </div>
                                    <div className="col-6 text-end">
                                        <img className="img-fluid w-100" src="/image/about-4.jpg"/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
                                <h1 className="mb-4">About KOB webstite</h1>
                                <p className="mb-4">KOB team was established in March 2023 at CodeGym Ha Noi.
                                    With the mission of connecting employers and talented human resources, our website is built with the following basic functions:</p>
                                <p><i className="fa fa-check text-primary me-3"></i>We Help To Get The Best Job And Find A Talent</p>
                                <p><i className="fa fa-check text-primary me-3"></i>We make finding a job easy and fast</p>
                                <p><i className="fa fa-check text-primary me-3"></i>Employers can find talented candidates and view their resumes/CVs</p>
                                <Link to={''} className="btn btn-primary py-3 px-5 mt-3">Read More</Link>
                            </div>
                        </div>
                    </div>
                </div>
                {/*About End*/}

                {/*Footer Start*/}
                <div className="container-fluid bg-dark text-white-50 footer pt-5 mt-5">
                    <div className="container py-5">
                        <div className="row g-5">
                            <div className="col-lg-3 col-md-6">
                                <h5 className="text-white mb-4">Company</h5>
                                <Link to={''} className="btn btn-link text-white-50">About Us</Link>
                                <Link to={''} className="btn btn-link text-white-50">Contact Us</Link>
                                <Link to={''} className="btn btn-link text-white-50">Our Services</Link>
                                <Link to={''} className="btn btn-link text-white-50">Privacy Policy</Link>
                                <Link to={''} className="btn btn-link text-white-50">Terms & Condition</Link>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <h5 className="text-white mb-4">Quick Links</h5>
                                <Link to={''} className="btn btn-link text-white-50">About Us</Link>
                                <Link to={''} className="btn btn-link text-white-50">Contact Us</Link>
                                <Link to={''} className="btn btn-link text-white-50">Our Services</Link>
                                <Link to={''} className="btn btn-link text-white-50">Privacy Policy</Link>
                                <Link to={''} className="btn btn-link text-white-50">Terms & Condition</Link>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <h5 className="text-white mb-4">Contact</h5>
                                <p className="mb-2"><i className="fa fa-map-marker-alt me-3"></i>Location, City, Country
                                </p>
                                <p className="mb-2"><i className="fa fa-phone-alt me-3"></i>+012 345 67890</p>
                                <p className="mb-2"><i className="fa fa-envelope me-3"></i>info@example.com</p>
                                <div className="d-flex pt-2">
                                    <Link to={''} className="btn btn-outline-light btn-social"><i
                                        className="fab fa-twitter"></i></Link>
                                    <Link to={''} className="btn btn-outline-light btn-social"><i
                                        className="fab fa-facebook-f"></i></Link>
                                    <Link to={''} className="btn btn-outline-light btn-social"><i
                                        className="fab fa-youtube"></i></Link>
                                    <Link to={''} className="btn btn-outline-light btn-social"><i
                                        className="fab fa-linkedin-in"></i></Link>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <h5 className="text-white mb-4">Newsletter</h5>
                                <p>Dolor amet sit justo amet elitr clita ipsum elitr est.</p>
                                <div className="position-relative mx-auto" style={{maxWidth: "400px"}}>
                                    <input className="form-control bg-transparent w-100 py-3 ps-4 pe-5" type="text"
                                           placeholder="Your email"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="copyright">
                            <div className="row">
                                <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                                    &copy; <Link to={''} className="border-bottom">Your Site
                                    Name</Link>, All Right Reserved.
                                    Designed By <Link to={''} className="border-bottom">Free
                                    Website Code</Link>
                                </div>
                                <div className="col-md-6 text-center text-md-end">
                                    <div className="footer-menu">
                                        <Link to={''}>Home</Link>
                                        <Link to={''}>Cookies</Link>
                                        <Link to={''}>Help</Link>
                                        <Link to={''}>FQAs</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*Footer End*/}

                {/*Back to Top*/}
                <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top"><i
                    className="fas fa-angle-up"></i></a>
            </div>
        </>
    )
}

export default AboutPage