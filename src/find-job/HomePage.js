import {Link, useNavigate,useHistory} from "react-router-dom";
import axios from "axios";
import React, {useEffect, useState} from "react";
import * as Yup from "yup";

function HomePage() {
    const [company, setCompany] = useState([])
    const navigate = useNavigate()
    const [jobs, setJobs] = useState([])
    const [currentPage,setCurrentPage]=useState(0)
    const [totalPage,setTotalPage]=useState(0);
    const [job, setJob] = useState({
        id: 2,
        description: 'Programming and developing banking systems and applications.\n' +
            'Developing or collaborating with vendors to develop and implement IT solutions.\n' +
            'Managing and developing integrated services with core systems such as T24, WAY4, BPM, CRM, CIC ...',
        expiration: 1,
        gender: 'Male',
        quantity: 10,
        salaryMin: 2000,
        salaryMax: 1000,
        startDate: (new Date()).toDateString(),
        status: 'true',
        typeTime: 'Full time',
        career: {
            id: 1,
            name: 'IT'
        },
        city: {
            id: 1,
            name: 'Ha Noi'
        },
        employeeType: {
            id: 1,
            name: 'Dev'
        },
        company: {
            id: 2,
            account: {
                id: 1,
                email: 'abc@gmail.com',
                password: '123',
                status: true,
                roles: 'company',
                name: 'Niteco Co., Ltd Jobs'
            },
            address: 'Xa Dan II, Dong Da, Ha Noi',
            description: 'Niteco is a rapidly growing end to end digital agency of over 300 staff with offices in Sydney, UK, Sweden, US, Hong Kong and Vietnam.',
            googleMapLink: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1862.222103534161!2d105.830544!3d21.014905!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab2586e1baa5%3A0x19c9e39731ad8b99!2sCLand%20Tower!5e0!3m2!1svi!2sus!4v1681202243464!5m2!1svi!2sus',
            imagePath: '/image/niteco.png',
            phoneNumber: '+(84) 123 456787',
            totalEmployee: 33,
            city: {
                id: 1,
                name: 'Ha Noi'
            }
        }
    })

    useEffect(() => {
        getJob(currentPage)
        getCompanyTop()
        window.scrollTo(0, 0);
    },[])

    function getJob(page) {
        axios.get(`http://localhost:8080/jobs?page=${page}`).then((response) => {
            setJobs(response.data.content)
            setCurrentPage(response.data.number)
            setTotalPage(response.data.totalPages)
            console.log(response.data.number)
        }).catch(() => {
            navigate("/err")
        })
    }

    //Phan trang lui page
    function isPrevious() {
        getJob(currentPage-1)
        window.scrollTo(window.innerWidth, 760);
    }

    //Phan trang tien page
    function isNext() {
        getJob(currentPage+1)
        window.scrollTo(window.innerWidth, 760);
    }

    function getJobById(id) {
        axios.get(`http://localhost:8080/jobs/${id}`).then((response) => {
            setJob(response.data)
            navigate()
        }).catch(() => {
            navigate('/err')
        })
    }

    //Get top company
    function getCompanyTop() {
        axios.post(`http://localhost:8080/companies/top-company`).then((response) => {
            setCompany(response.data)
        }).catch(() => {
            navigate('/err')
        })
    }

    //Function tim kiem nhanh
    function find(value) {
        axios.get(`http://localhost:8080/jobs/findByKeyWord/${value.input_first}/${value.input_second}`).then((response) => {
            setJobs(response.data)
        }).catch(() => {
            navigate('/err')
        })
    }

    return (
        <>
            <div className="container-xxl bg-white p-0">

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

                {/*Banner*/}
                <div id="demo" className="carousel slide" data-bs-ride="carousel" data-interval="1000">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#demo" data-bs-slide-to="0"
                                className="active"></button>
                        <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
                        <button type="button" data-bs-target="#demo" data-bs-slide-to="2"></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src="/image/01.jpg" alt="Image Banner 1" className="d-block"
                                 style={{width: "100%", height: "680px"}}/>
                        </div>
                        <div className="carousel-item">
                            <img src="/image/02.jpg" alt="Image banner 2" className="d-block"
                                 style={{width: "100%", height: "680px"}}/>
                        </div>
                        <div className="carousel-item">
                            <img src="/image/03.jpg" alt="Image banner 3" className="d-block"
                                 style={{width: "100%", height: "680px"}}/>
                        </div>
                        <div
                            className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center animated slideInDown mb-4">
                            <div className="container">
                                <div className="row justify-content-start">
                                    <div className="col-10 col-lg-8">
                                        <h1 className="display-3 text-white mb-4">Find The
                                            Perfect Job That You Deserved</h1>
                                        <p className="fs-5 fw-medium text-white mb-4 pb-2">We've
                                            got monthly and daily
                                            plans that fit your needs.
                                            <br/>
                                            You can always exchange out jobs, upgrade or scale down when you need
                                            to.</p>
                                        <Link to={'/search-page'}
                                              className="btn btn-primary py-md-3 px-md-5 abcdef"> Find Job Here <i
                                            className="fas fa-search fa-lg"></i></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
                        <span className="carousel-control-next-icon"></span>
                    </button>
                </div>
                {/*Banner End*/}

                {/*Content list Job*/}
                <div className="container-xxl py-4 animated slideInUp">
                    <div className="container">
                        <h1 className="text-center mb-5">Job Listing</h1>
                        <hr/>
                        <div className="tab-class text-center wow fadeInUp">
                            <div className="pageHome">
                                <div className="pageHome1">

                                    {/*List*/}
                                    <div className="tab-content page1">
                                        <h3 style={{marginLeft: "-324px"}}>{jobs.length} quality-Jobs for you</h3>
                                        <div id="tab-1" className="tab-pane fade show p-0 active"
                                             style={{height: "800px", overflow: "auto"}}>
                                            {jobs.map((item) => {
                                                return (
                                                    <>
                                                        <button className="btn btn-link w-100"
                                                                onClick={() => getJobById(item.id)}>
                                                            <div className="job-item abc p-4 mb-4">
                                                                <div className="row g-4">
                                                                    <div className="col-sm-12 col-md-8 d-flex align-items-center">
                                                                        <img
                                                                            className="flex-shrink-0 img-fluid border rounded"
                                                                            src={item.company?.imagePath}
                                                                            style={{width: 80, height: 80}}
                                                                            alt="Avatar company"/>
                                                                        <div className="text-start ps-4">
                                                                            <h5 className="mb-3 ">{item.employeeType?.name} - {item.company?.account?.name}</h5>
                                                                            <span className="text-truncate me-3"><i
                                                                                className="fa fa-map-marker-alt text-primary me-2"></i>{item.company?.address}</span>
                                                                            <span className="text-truncate me-3"><i
                                                                                className="far fa-clock text-primary me-2"></i>{item.typeTime}</span>
                                                                            <span className="text-truncate me-0"><i
                                                                                className="far fa-money-bill-alt text-primary me-2"></i>${item.salaryMin} -${item.salaryMax}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className="col-sm-12 col-md-4 d-flex flex-column align-items-start align-items-md-end justify-content-center">
                                                                        <div className="d-flex mb-3">
                                                                            <Link to={'/login'}
                                                                                  className="btn btn-primary">Apply Now</Link>
                                                                        </div>
                                                                        <small className="text-truncate"><i
                                                                            className="far fa-calendar-alt text-primary me-2"></i>Date
                                                                            create: {item.startDate}</small>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </button>
                                                    </>
                                                )
                                            })}
                                            {/*Phan trang*/}
                                            <div className="row justify-content-center">
                                                <div className="col-12 text-center">
                                                    <ul className="pagination mt-3">
                                                        {currentPage===0?<li></li>:
                                                            <li className="page-item mr-auto">
                                                                <span className="btn btn-primary" onClick={isPrevious}>Prev</span>
                                                            </li>
                                                        }
                                                        <li className="page-item" style={{marginTop: "6px"}}>{currentPage+1}</li>
                                                        <li className="page-item" style={{marginTop: "6px"}}>/</li>
                                                        <li className="page-item" style={{marginTop: "6px"}}>{totalPage}</li>
                                                        {currentPage+1===totalPage?<li></li>:
                                                            <li className="page-item ml-auto">
                                                                <span className="btn btn-primary" onClick={isNext}>Next</span>
                                                            </li>
                                                        }
                                                    </ul>
                                                </div>
                                            </div>
                                            {/* Phan trang end*/}
                                        </div>
                                    </div>
                                    {/*End List*/}

                                    {/*Job Detail*/}
                                    <div className="tab-content page2">
                                        <div className="d-flex align-items-center mb-2" style={{marginLeft: "20px"}}>
                                            <img className="flex-shrink-0 img-fluid border rounded"
                                                 src={job.company?.imagePath} alt=""
                                                 style={{width: "80px", height: "80px"}}/>
                                            <div className="text-start ps-4">
                                                <h3 className="mb-3">{job.employeeType?.name} - {job.company?.account?.name}</h3>
                                                <span className="text-truncate me-3"><i
                                                    className="fa fa-map-marker-alt text-primary me-2"></i>{job.company?.address}</span>
                                                <span className="text-truncate me-3"><i
                                                    className="far fa-clock text-primary me-2"></i>{job.typeTime}</span>
                                                <span className="text-truncate me-3"><i
                                                    className="far fa-money-bill-alt text-primary me-2"></i>${job.salaryMax} - ${job.salaryMin}</span>
                                                <span className="text-truncate me-0"><i
                                                    className="far fa-calendar-alt text-primary me-2"></i>Date Created: {job.startDate}</span>
                                            </div>
                                        </div>
                                        <div
                                            className="col-30 align-items-start align-items-md-end justify-content-center"
                                            style={{marginLeft: "20px", width: "650px"}}>
                                            <div className="d-flex mb-3">
                                                <Link to={'/login'} className="btn btn-primary w-100"
                                                      style={{marginRight: "10px"}}><i
                                                    className="far fa-paper-plane"></i> Apply Now</Link>
                                            </div>
                                        </div>
                                        <div id="tab-1" className="tab-pane fade show p-0 active"
                                             style={{
                                                 height: "700px",
                                                 overflow: "auto",
                                                 marginLeft: "20px",
                                                 textAlign: "left"
                                             }}>

                                            <div className="mb-5" style={{marginTop: "14px"}}>
                                                <h4 className="mb-3">Job description</h4>
                                                <p>{job.description}</p>
                                                <ul className="list-unstyled">
                                                    <li><i className="fa fa-angle-right text-primary me-2"></i><b>Published
                                                        On: {job.startDate}</b></li>
                                                    <li><i className="fa fa-angle-right text-primary me-2"></i><b>Job
                                                        Nature: {job.typeTime}</b></li>
                                                    <li><i className="fa fa-angle-right text-primary me-2"></i><b>Salary:
                                                        ${job.salaryMax} - ${job.salaryMin}</b></li>
                                                    <li><i className="fa fa-angle-right text-primary me-2"></i><b>Location:
                                                        ${job.company?.address}</b></li>
                                                    <li><i
                                                        className="fa fa-angle-right text-primary me-2"></i><b>Gender: {job.gender}</b>
                                                    </li>
                                                </ul>
                                                <br/>
                                                <h4 className="mb-3">Job Requirements</h4>
                                                <ul className="list-unstyled">
                                                    <li><i className="fa fa-angle-right text-primary me-2"></i>A degree
                                                        of Computer
                                                        Science, Software Engineer/ Information Technology or
                                                        experiences in related
                                                        fields
                                                    </li>
                                                    <li><i className="fa fa-angle-right text-primary me-2"></i>From 3 to
                                                        5 years of
                                                        experience of “client-side” programming.
                                                    </li>
                                                    <li><i className="fa fa-angle-right text-primary me-2"></i> From 2
                                                        to 5 years of
                                                        coding experience in component-based UI framework (preferred
                                                        ReactJs,
                                                        Typescript).
                                                    </li>
                                                    <li><i className="fa fa-angle-right text-primary me-2"></i>Familiar
                                                        with agile
                                                        software development and engineering culture.
                                                    </li>
                                                    <li><i
                                                        className="fa fa-angle-right text-primary me-2"></i> Knowledge
                                                        and
                                                        experience in Cloud base infrastructure. (e.g. AWS, Google
                                                        Cloud).
                                                    </li>
                                                    <li><i
                                                        className="fa fa-angle-right text-primary me-2"></i> Knowledge
                                                        about
                                                        developing simple API server.
                                                    </li>
                                                    <li><i
                                                        className="fa fa-angle-right text-primary me-2"></i> Effective
                                                        communication and teamwork skills, particularly ability to work
                                                        in squad to
                                                        ensure delivering.
                                                    </li>
                                                    <li><i className="fa fa-angle-right text-primary me-2"></i> High
                                                        learning
                                                        agility and real passion for coding and programming, innovation,
                                                        and solving
                                                        challenging problems.
                                                    </li>
                                                    <li><i className="fa fa-angle-right text-primary me-2"></i> High
                                                        adaptability
                                                        and flexibility to the rapid changes of the business.
                                                    </li>
                                                    <li><i className="fa fa-angle-right text-primary me-2"></i>High
                                                        responsibility
                                                        and diligence.
                                                    </li>
                                                    <li><i className="fa fa-angle-right text-primary me-2"></i>Detail-oriented
                                                        and
                                                        efficient time manager who thrives in a dynamic and fast-paced
                                                        working
                                                        environment.
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    {/*End Job Detail*/}
                                </div>
                                <hr/>
                            </div>
                        </div>
                    </div>
                </div>
                {/*Content list Job*/}

                {/*Top Company*/}
                <div className="container-xxl animated slideInUp">
                    <div className="container">
                        <h1 className="text-center mb-5">Top Company</h1>
                        <div className="row g-4">
                            {company.map((item) => {
                                return (
                                    <>
                                        <div className="col-lg-4 col-sm-6">
                                            <div className="hover">
                                                <div className="col-sm-12 col-md-8 d-flex align-items-center"
                                                     style={{marginBottom: "2px"}}>
                                                    <Link to={`/view-company-detail/${item.company?.id}`} className="cat-item rounded p-4"
                                                          style={{display: "flex"}}>
                                                        <img className="flex-shrink-0 img-fluid border rounded"
                                                             src={item.company?.imagePath}
                                                             style={{width: 80, height: 80}}
                                                             alt="Avatar company"/>
                                                        <div className={"row11"}>
                                                            <h6 className="mb-3"
                                                                style={{paddingLeft: "28px"}}>{item.company?.account?.name} </h6>
                                                            <div className="text-start ps-4">

                                                                <span className="text-truncate me-3"
                                                                      style={{paddingLeft: 3}}> <i
                                                                    className="fa fa-map-marker-alt  me-2"></i>{item.company?.address}</span>
                                                                <span className="text-truncate me-3"><i
                                                                    className="fas fa-phone fa-flip-horizontal fa-fw"></i> {item.company?.phoneNumber}</span>
                                                                <span className="text-truncate me-3"><i
                                                                    className="fas fa-edit fa-fw "></i> {item.totalJob}</span>
                                                                <span className="text-truncate me-3"
                                                                      style={{marginLeft: "5px"}}><i
                                                                    className="fas fa-user-friends fa-fw"></i> {item.totalQuantity}</span>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            })}
                        </div>
                    </div>
                </div>
                {/*Top Company End*/}

                {/*Footer Start*/}
                <div className="container-fluid bg-dark text-white-50 footer pt-5 mt-5 ">
                    <div className="container py-5 ">
                        <div className="row g-5 ">
                            <div className="col-lg-3 col-md-6">
                                <h5 className="text-white mb-4">Company</h5>
                                <Link to={''} className="btn btn-link text-white-50">About Us</Link>
                                <Link to={''} className="btn btn-link text-white-50">Contact Us</Link>
                                <Link to={''} className="btn btn-link text-white-50">Our Services</Link>
                                <Link to={''} className="btn btn-link text-white-50">Privacy
                                    Policy</Link>
                                <Link to={''} className="btn btn-link text-white-50">Terms &
                                    Condition</Link>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <h5 className="text-white mb-4">Quick Links</h5>
                                <Link to={''} className="btn btn-link text-white-50">About Us</Link>
                                <Link to={''} className="btn btn-link text-white-50">Contact Us</Link>
                                <Link to={''} className="btn btn-link text-white-50">Our Services</Link>
                                <Link to={''} className="btn btn-link text-white-50">Privacy
                                    Policy</Link>
                                <Link to={''} className="btn btn-link text-white-50">Terms &
                                    Condition</Link>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <h5 className="text-white mb-4">Contact</h5>
                                <p className="mb-2"><i className="fa fa-map-marker-alt me-3"></i>Location,
                                    City, Country
                                </p>
                                <p className="mb-2"><i className="fa fa-phone-alt me-3"></i>+012 345
                                    67890</p>
                                <p className="mb-2"><i className="fa fa-envelope me-3"></i>info@example.com
                                </p>
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
                                    <input className="form-control bg-transparent w-100 py-3 ps-4 pe-5"
                                           type="text"
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

export default HomePage