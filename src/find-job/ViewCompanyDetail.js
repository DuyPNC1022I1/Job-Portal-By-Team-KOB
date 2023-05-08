import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";

function ViewCompanyDetail() {
    const [company, setCompany] = useState({})
    const navigate = useNavigate()
    const param = useParams()
    const [flag,setFlag]=useState(false)
    const [jobs, setJobs] = useState([])
    const [currentPage,setCurrentPage]=useState(0)
    const [totalPage,setTotalPage]=useState(0);

    useEffect(() => {
        getCompany();
        getJob(currentPage)
        window.scrollTo(0, 0);
    }, [flag])

    function getJob(page) {
        axios.get(`http://localhost:8080/jobs/findByCompany/${param.id}`).then((response) => {
            setJobs(response.data.content)
            setCurrentPage(response.data.number)
            setTotalPage(response.data.totalPages)
            console.log(response.data.number)
        }).catch(() => {
            navigate("/err")
        })
    }

    function getCompany() {
        axios.get(`http://localhost:8080/companies/${param.id}`).then((response) => {
            setCompany(response.data)
        }).catch(() => {
            navigate("/err")
        })
    }

    return (
        <>
            <div className="container-xxl bg-white p-0" style={{overflow: "hidden"}}>

                {/*Navbar Start*/}
                <nav className="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0">
                    <Link to={'/home-page'}
                          className="navbar-brand d-flex align-items-center text-center py-0 px-4 px-lg-5">
                        <img src="/image/KOB.png" alt="Image Avatar KOB" className="d-block"
                             style={{width: "250px", height: "70px"}}/>
                    </Link>
                    <button type="button" className="navbar-toggler me-4" data-bs-toggle="collapse"
                            data-bs-target="#navbarCollapse">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <div className="navbar-nav ms-auto p-4 p-lg-0">
                            <Link to={'/home-page'} className="nav-item nav-link active iconNavbar">Home Page</Link>
                            <Link to={'/about'} className="nav-item nav-link iconNavbar">About Us</Link>
                        </div>
                        <Link to={"/login"} className="btn btn-primary rounded-0 py-4 px-lg-5 d-none d-lg-block"><i
                            className="far fa-user pr-2"></i> Sign in <i
                            className="fa fa-arrow-right ms-3"></i></Link>
                    </div>
                </nav>
                {/*Navbar End*/}

                {/*<!-- Header Start*/}
                <div className="container-xxl py-5 bg-dark page-header mb-5 animated slideInDown">
                    <div className="container my-5 pt-5 pb-4">
                        <h1 className="display-3 text-white mb-3">About Company</h1>
                    </div>
                </div>
                {/*<!-- Header End*/}

                {/*<!-- Job Detail Start*/}
                <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
                    <div className="container">
                        <div className="row gy-5 gx-4">
                            <div className="col-lg-8 animated slideInLeft">
                                <div className="d-flex align-items-center mb-5">
                                    <img className="flex-shrink-0 img-fluid border rounded" src={company.imagePath}
                                         alt="This is image" style={{width: "110px", height: "100px"}}/>
                                    <div className="text-start ps-4">
                                        <h3 className="mb-3">{company.account?.name}</h3>
                                        <span className="text-truncate me-3"><i
                                            className="fa fa-map-marker-alt text-primary me-2"></i> {company.address}</span>
                                        <span className="text-truncate me-3"><i
                                            className="fas fa-phone fa-flip-horizontal fa-fw"></i> {company.phoneNumber}</span>
                                        <span className="text-truncate me-3"><i
                                            className="fas fa-envelope fa-fw"></i> {company.account?.email}</span>
                                    </div>
                                </div>

                                <div className="mb-2">
                                    <h4 className="mb-3">About Us</h4>
                                    <p>{company.account?.name} - We are looking for you!
                                        {company.account?.name} is part of {company.account?.name} Inc., providing the No.1 cloud-based construction project management service in Japan with more than 410,000 users. {company.account?.name} covers from communication, site schedule arrangement, quality check, order control to management improvement in the construction industry. {company.account?.name} was established in early January 2022, is a start-up company in the Vietnamese market.
                                        Software engineers and development team in {company.account?.name} enjoy dynamic roles of SaaS product development within an international working environment, not consuming tasks but more on creative engineering works for clients and users in the construction industry.</p>
                                    <h4>Our Brand promise</h4>
                                    <p>| GET THE FUTURE YOU WANT
                                        Our brand promise captures the spirit of our people, committed to bringing to life our purpose of unleashing human energy through technology for a sustainable and inclusive future. We want our teams, our clients, our partners, and our communities to feel that change can happen the way they want it to, and that we will help them achieve it.</p>
                                    <p>Reimagining the way we work
                                        Hybrid working is becoming a day-to-day reality at Capgemini. Underpinned by our trust-based managerial culture, we aim to empower everyone, in all countries, to deliver exceptional work, contributing to an inclusive and sustainable future for our people, our clients, and society.</p>
                                    {/*slide image*/}
                                    <div id="demo" className="carousel slide" data-bs-ride="carousel">
                                        <div className="carousel-indicators">
                                            <button type="button" data-bs-target="#demo" data-bs-slide-to="0"
                                                    className="active"></button>
                                            <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
                                            <button type="button" data-bs-target="#demo" data-bs-slide-to="2"></button>
                                        </div>
                                        <div className="carousel-inner" style={{height: "400px"}}>
                                            <div className="carousel-item active">
                                                <img src="/image/company01.webp" alt="Los Angeles" className="d-block"
                                                     style={{width: "100%", height: "100%"}}/>
                                            </div>
                                            <div className="carousel-item">
                                                <img src="/image/company02.webp" alt="Chicago" className="d-block"
                                                     style={{width: "100%", height: "100%"}}/>
                                            </div>
                                            <div className="carousel-item">
                                                <img src="/image/company03.webp" alt="New York" className="d-block"
                                                     style={{width: "100%", height: "100%"}}/>
                                            </div>
                                        </div>
                                        <button className="carousel-control-prev" type="button" data-bs-target="#demo"
                                                data-bs-slide="prev">
                                            <span className="carousel-control-prev-icon"></span>
                                        </button>
                                        <button className="carousel-control-next" type="button" data-bs-target="#demo"
                                                data-bs-slide="next">
                                            <span className="carousel-control-next-icon"></span>
                                        </button>
                                    </div>
                                    {/*    End Slide Image*/}
                                </div>
                            </div>

                            {/*Manager Job*/}
                            <div className="col-lg-4">
                                <div className="bg-light rounded p-5 mb-4">
                                    <h4 className="mb-4">List Jobs</h4>
                                    {jobs.map((item) => {
                                        return (
                                            <>
                                                <p><i className="fa fa-angle-right text-primary me-2"></i>{item.employeeType?.name} - {item.company?.account?.name}</p>
                                            </>
                                        )
                                    })}
                                </div>
                            </div>
                            {/*    End Manager Job*/}

                        </div>
                    </div>
                </div>
                {/*<!-- Job Detail End*/}

                {/*<!-- Footer Start*/}
                <div className="container-fluid bg-dark text-white-50 footer pt-5 mt-5 "
                     data-wow-delay="0.1s">
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
                                        <Link to={'CompanyHomePage'}>Home</Link>
                                        <Link to={'CompanyHomePage'}>Cookies</Link>
                                        <Link to={'CompanyHomePage'}>Help</Link>
                                        <Link to={'CompanyHomePage'}>FQAs</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*<!-- Footer End*/}

                {/*<!-- Back to Top*/}
                <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top"><i
                    className="fas fa-angle-up"></i></a>
            </div>
        </>
    )
}
export default ViewCompanyDetail