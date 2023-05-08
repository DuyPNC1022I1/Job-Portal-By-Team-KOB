import {Link} from "react-router-dom";
import {useEffect} from "react";

function Err404() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (
        <>
            <div className="container-xxl bg-white p-0" style={{overflow: "hidden"}}>
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
                                    <Link to={''} className="dropdown-item">Search A Talent</Link>
                                </div>
                            </div>
                        </div>
                        <Link to={"/login"} className="btn btn-primary rounded-0 py-4 px-lg-5 d-none d-lg-block" ><i
                            className="far fa-user pr-2"></i> Sign in <i
                            className="fa fa-arrow-right ms-3"></i></Link>
                    </div>
                </nav>
                {/*Navbar End*/}

                {/*<!-- Header End*/}
                <div className="container-xxl py-5 bg-dark page-header2 mb-5" >
                    <div className="container text-center" style={{color: "white"}}>
                        <div className="row justify-content-center">
                            <div className="col-lg-6" style={{marginTop: "34px"}}>
                                <i className="bi bi-exclamation-triangle display-1 text-primary"></i>
                                <h1 className="display-1" style={{color: "#ff8a00"}}>404</h1>
                                <h1 className="mb-4" style={{color: "#ff8a00"}}>Page Not Found</h1>
                                <p className="mb-4">We’re sorry, the page you have looked for does not exist in our
                                    website! Maybe go to our home page or try to use a search?</p>
                                <Link to={'/home-page'} className="btn btn-primary py-3 px-5" href="">Go Back To
                                    Home</Link>
                            </div>
                        </div>
                    </div>
                </div>
                {/*<!-- Header End*/}

                {/*<!-- Footer Start*/}
                <div className="container-fluid bg-dark text-white-50 footer pt-5 mt-5 wow fadeIn"
                     data-wow-delay="0.1s">
                    <div className="container py-5">
                        <div className="row g-5">
                            <div className="col-lg-3 col-md-6">
                                <h5 className="text-white mb-4">Company</h5>
                                <a className="btn btn-link text-white-50" href="">About Us</a>
                                <a className="btn btn-link text-white-50" href="">Contact Us</a>
                                <a className="btn btn-link text-white-50" href="">Our Services</a>
                                <a className="btn btn-link text-white-50" href="">Privacy Policy</a>
                                <a className="btn btn-link text-white-50" href="">Terms & Condition</a>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <h5 className="text-white mb-4">Quick Links</h5>
                                <a className="btn btn-link text-white-50" href="">About Us</a>
                                <a className="btn btn-link text-white-50" href="">Contact Us</a>
                                <a className="btn btn-link text-white-50" href="">Our Services</a>
                                <a className="btn btn-link text-white-50" href="">Privacy Policy</a>
                                <a className="btn btn-link text-white-50" href="">Terms & Condition</a>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <h5 className="text-white mb-4">Contact</h5>
                                <p className="mb-2"><i className="fa fa-map-marker-alt me-3"></i>Location, City, Country
                                </p>
                                <p className="mb-2"><i className="fa fa-phone-alt me-3"></i>+012 345 67890</p>
                                <p className="mb-2"><i className="fa fa-envelope me-3"></i>info@example.com</p>
                                <div className="d-flex pt-2">
                                    <a className="btn btn-outline-light btn-social" href=""><i
                                        className="fab fa-twitter"></i></a>
                                    <a className="btn btn-outline-light btn-social" href=""><i
                                        className="fab fa-facebook-f"></i></a>
                                    <a className="btn btn-outline-light btn-social" href=""><i
                                        className="fab fa-youtube"></i></a>
                                    <a className="btn btn-outline-light btn-social" href=""><i
                                        className="fab fa-linkedin-in"></i></a>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <h5 className="text-white mb-4">Newsletter</h5>
                                <p>Dolor amet sit justo amet elitr clita ipsum elitr est.</p>
                                <div className="position-relative mx-auto">
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
                                    &copy; <a className="border-bottom" href="https://freewebsitecode.com">Your Site
                                    Name</a>, All Right Reserved.


                                    Designed By <a className="border-bottom" href="https://freewebsitecode.com">Free
                                    Website Code</a>
                                </div>
                                <div className="col-md-6 text-center text-md-end">
                                    <div className="footer-menu">
                                        <a href="">Home</a>
                                        <a href="">Cookies</a>
                                        <a href="">Help</a>
                                        <a href="">FQAs</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*<!-- Footer End*/}


                {/*<!-- Back to Top*/}
                <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top"><i
                    className="bi bi-arrow-up"></i></a>
            </div>
        </>
    )
}

export default Err404