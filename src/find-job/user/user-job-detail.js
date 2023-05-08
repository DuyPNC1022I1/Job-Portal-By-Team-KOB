import {Link, useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import './UserManager.css';
import Swal from "sweetalert2";


export default function UserJobDetail() {
    const [user, setUser] = useState({})
    const navigate = useNavigate()
    const param = useParams()
    const [notification, setNotification] = useState([])
    const [count, setCount] = useState(0);
    const [flag, setFlag] = useState(false)
    const [jobs, setJobs] = useState({})
    const [company, setCompany] = useState({})

    useEffect(() => {
        getJobById()
        GetUser()
        window.scrollTo(0, 0);
    }, [flag])

    function GetUser() {
        let id = JSON.parse(sessionStorage.getItem('userId'));
        axios.get(`http://localhost:8080/users/${id}`).then((response) => {
            setUser(response.data)
            GetNotification(response.data.account.id)
            sessionStorage.setItem("userId", JSON.stringify(response.data.id));
        }).catch(() => {
            navigate("/err")
        })
    }

    function getJobById() {
        axios.get(`http://localhost:8080/jobs/${param.id}`).then((response) => {
            setJobs(response.data)
        }).catch(() => {
            navigate('/err')
        })
    }

    function getCompanyById() {
        axios.get(`http://localhost:8080/companies/${jobs.company?.id}`).then((response) => {
            setCompany(response.data)
            navigate(`/company-home/${jobs.company?.id}`)
        }).catch(() => {
            navigate("/err")
        })
    }


    // Hiển thị số thông báo chưa đọc
    function checkStatus(arr) {
        let count = 0;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].status === true) {
                count++
            }
        }
        setCount(count)
    }

    function readNotification(id) {
        axios.get(`http://localhost:8080/notification/${id}`).then(() => {
            setFlag(!flag)
        })
    }

    // Thông báo khi user apply job
    function GetNotification(id) {
        axios.post(`http://localhost:8080/notification/${id}`).then((res) => {
            setNotification(res.data)
            checkStatus(res.data)
        })
    }

    //Show notification
    function showNotification() {
        const listItems = notification.map((item) => `<li><i class="far fa-comment fa-lg"></i><a href="/user-manager-job/${user.id}"> ${item.text}</a></li>`).join('');
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
                const ul = Swal.getHtmlContainer().querySelector('ul');
                notification.forEach((item, index) => {
                    const onItemClick = () => {
                        readNotification(item.id);
                    };
                    const li = ul.querySelectorAll('li')[index];
                    li.addEventListener('click', onItemClick);
                });
            },
        })

        Toast.fire({
            title: 'Notification from the Company.',
            width: 650,
            color: '#ff6600',
            html: `<ul>${listItems}</ul>`,
        })
    }

    function ApplyOK(jobId) {
        axios.post(`http://localhost:8080/action-jobs/apply/${jobId}/${user.id}`).then((response) => {
            Swal.fire(
                'Apply Complete!',
                'You clicked the button!',
                'success',
            )
            navigate(`/user-manager-job/${user.id}`)
        })
            .catch((error) => {
                console.error(error);
                if (error.response.status === 404) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Apply Fail, you have applied this job',
                        text: 'Please apply other job!',
                        footer: '<a href="">Why do I have this issue?</a>'
                    })
                }
            })
    }

    function ApplyFail() {
        Swal.fire({
            icon: 'error',
            title: 'Apply Fail...!',
            text: 'Please create CV!',
            footer: '<a href="">Why do I have this issue?</a>'
        })
        navigate(`/user-my-profile/${user.id}`)
    }

    function ApplyJob(id) {
        {
            user.cvPath !== null ? ApplyOK(id) : ApplyFail()
        }
    }


    return (
        <>
            <div className="container-xxl bg-white p-0">

                {/*<!-- Navbar Start*/}
                <nav className="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0">
                    <Link to={`/user-search-page/${user.id}`}
                          className="navbar-brand d-flex align-items-center text-center py-0 px-4 px-lg-5">
                        <img src="/image/KOB.PNG" alt="Avatar KOB" className="d-block"
                             style={{width: "250px", height: "70px"}}/>
                    </Link>
                    <button type="button" className="navbar-toggler me-4" data-bs-toggle="collapse"
                            data-bs-target="#navbarCollapse">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <div className="navbar-nav ms-auto p-4 p-lg-0">
                            <div className="navbar-nav ms-auto p-4 p-lg-0">
                                <Link to={`/user-search-page/${jobs.user?.id}`} className="nav-item nav-link iconNavbar">Home
                                    Page</Link>
                            </div>
                        </div>
                        {/*Logo Account*/}
                        <div className="nav-item dropdown" style={{marginTop: "-5px", marginRight: "20px"}}>
                            <Link to={''} className="nav-item nav-link iconUp2"><i
                                className="fas fa-user-tie fa-lg"></i> {user.account?.name}</Link>
                            <div className="dropdown-menu rounded-0 m-4">
                                <Link to={'/home-page'} className="dropdown-item">Log out</Link>
                            </div>
                        </div>
                        <div className="nav-item dropdown"
                             style={{marginRight: "10px", marginLeft: "-15px", marginTop: "-5px"}}>
                            <div className="nav-item dropdown"
                                 style={{marginRight: "20px", marginLeft: "-15px", marginTop: "-5px"}}>
                                <button className="btn btn-link iconNavbar2" onClick={() => {
                                    showNotification()
                                }}><i className="bi bi-bell bell fa-lg "></i><span style={{
                                    position: "absolute",
                                    top: "-1px",
                                    color: "white",
                                    fontSize: "13px",
                                    backgroundColor: "#ff6600",
                                    borderRadius: "50%",
                                    width: "20px",
                                    height: "20px"
                                }}>{count}</span></button>
                            </div>
                        </div>
                        {/*Logo Account End*/}
                        <Link to={`/user-search-page/${user.id}`}
                              className="btn btn-primary rounded-0 py-4 px-lg-5 d-none d-lg-block"><i
                            className="	fa fa-search fa-lg"></i> Find Job<i
                            className="fa fa-arrow-right ms-3"></i></Link>
                    </div>
                </nav>
                {/*<!-- Navbar End*/}

                {/*User inform*/}
                <div className="header-inner bg-light animated slideInLeft" style={{height: "220px"}}>
                    <div className="container">
                        <div className="row gy-5 gx-4">
                            <div className="d-flex align-items-center mb-5 animated slideInDown"
                                 style={{marginBottom: "1px", paddingTop: "20px", paddingLeft: "55px"}}>
                                <img className="flex-shrink-0 img-fluid border" src={user.imagePath}
                                     alt="Avatar Company"
                                     style={{width: "120px", height: "120px", borderRadius: "50%"}}/>
                                <div className="text-start ps-4">
                                    <h3 className="mb-3">{user.account?.name}</h3>
                                    <span className="text-truncate me-3"><i
                                        className="fa fa-map-marker-alt text-primary me-2"></i> {user.address}</span>
                                    <span className="text-truncate me-3"><i
                                        className="fas fa-phone fa-flip-horizontal fa-fw"></i> {user.phoneNumber}</span>
                                    <span className="text-truncate me-3"><i
                                        className="fas fa-envelope fa-fw"></i> {user.account?.email}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*/End User Inform*/}

                {/*Thanh Menu User */}
                <section>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="sticky-top secondary-menu-sticky-top">
                                    <div className="secondary-menu"
                                         style={{display: "flex", justifyContent: "center"}}>
                                        <ul>
                                            <li><Link to={`/user-my-profile/${user.id}`}>My Profile</Link></li>
                                            <li><Link to={''}>My CV</Link></li>
                                            <li><Link to={`/user-change-password/${user.id}`}>Change
                                                Password</Link>
                                            </li>
                                            <li><Link to={`/user-manager-job/${user.id}`}>Applied
                                                Jobs</Link></li>
                                            <li><Link to={'/home-page'}>Log Out</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/*End thanh menu User*/}

                {/*Job Detail*/}
                <div className="container-xxl bg-white p-0" style={{overflow: "hidden"}}>
                    <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
                        <div className="container">
                            <div className="row gy-5 gx-4">
                                <div className="col-lg-8 animated slideInLeft">
                                    <div className="d-flex align-items-center mb-5">
                                        <img className="flex-shrink-0 img-fluid border rounded"
                                             src={jobs.company?.imagePath}
                                             alt="Avatar Company" style={{width: "80px", height: "80px"}}/>
                                        <div className="text-start ps-4">
                                            <h3 className="mb-3">{jobs.company?.account?.name}</h3>
                                            <span className="text-truncate me-3"><i
                                                className="fa fa-map-marker-alt text-primary me-2"></i> {jobs.company?.address}</span>
                                            <span className="text-truncate me-3"><i
                                                className="far fa-clock text-primary me-2"></i>{jobs.typeTime}</span>
                                            <span className="text-truncate me-0"><i
                                                className="far fa-money-bill-alt text-primary me-2"></i>${jobs.salaryMin} - ${jobs.salaryMax}</span>
                                        </div>
                                    </div>

                                    <div className="mb-5">
                                        <h4 className="mb-3">Job Description</h4>
                                        <p>{jobs.description}</p>
                                        <ul className="list-unstyled">
                                            <li><i className="fa fa-angle-right text-primary me-2"></i>Published
                                                On: {jobs.startDate}</li>
                                            <li><i className="fa fa-angle-right text-primary me-2"></i>Job
                                                Nature: {jobs.typeTime}</li>
                                            <li><i className="fa fa-angle-right text-primary me-2"></i>Salary:
                                                ${jobs.salaryMin} - ${jobs.salaryMax}</li>
                                            <li><i className="fa fa-angle-right text-primary me-2"></i>Location:
                                                ${jobs.company?.address}</li>
                                            <li><i
                                                className="fa fa-angle-right text-primary me-2"></i>Gender: {jobs.gender}
                                            </li>
                                            <li><i className="fas fa-user-friends text-primary me-2"></i>Quantity: {jobs.quantity}
                                            </li>
                                        </ul>

                                        <h4 className="mb-3">Job Requirements</h4>
                                        <ul className="list-unstyled">
                                            <li><i className="fa fa-angle-right text-primary me-2"></i>A degree of
                                                Computer
                                                Science, Software Engineer/ Information Technology or experiences in
                                                related
                                                fields
                                            </li>
                                            <li><i className="fa fa-angle-right text-primary me-2"></i>From 3 to 5 years
                                                of
                                                experience of “client-side” programming.
                                            </li>
                                            <li><i className="fa fa-angle-right text-primary me-2"></i> From 2 to 5
                                                years of
                                                coding experience in component-based UI framework (preferred ReactJs,
                                                Typescript).
                                            </li>
                                            <li><i className="fa fa-angle-right text-primary me-2"></i>Familiar with
                                                agile
                                                software development and engineering culture.
                                            </li>
                                            <li><i className="fa fa-angle-right text-primary me-2"></i> Knowledge and
                                                experience in Cloud base infrastructure. (e.g. AWS, Google Cloud).
                                            </li>
                                            <li><i className="fa fa-angle-right text-primary me-2"></i> Knowledge about
                                                developing simple API server.
                                            </li>
                                            <li><i className="fa fa-angle-right text-primary me-2"></i> Effective
                                                communication and teamwork skills, particularly ability to work in squad
                                                to
                                                ensure delivering.
                                            </li>
                                            <li><i className="fa fa-angle-right text-primary me-2"></i> High learning
                                                agility and real passion for coding and programming, innovation, and
                                                solving
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
                                                efficient time manager who thrives in a dynamic and fast-paced working
                                                environment.
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                {/*Manager Job*/}
                                <div className="col-lg-4 animated slideInRight">
                                    <div className="sidebar mb-0">
                                        <div className="widget">
                                            <div className="col-12">
                                                <Link  onClick={() => {
                                                    ApplyJob(jobs.id)
                                                }} className="btn btn-lg btn-primary w-100" type="submit"><i
                                                    className="far fa-paper-plane"></i> Apply for job</Link>
                                            </div>
                                        </div>
                                        <div className="widget"><p></p></div>
                                        <div className="widget">
                                            <div className="company-address widget-box">
                                                <div className="d-flex align-items-center mb-2"
                                                     style={{marginBottom: "2px"}}>
                                                    <img className="flex-shrink-0 img-fluid border rounded"
                                                         src={jobs.company?.imagePath}
                                                         alt="Avatar Company"
                                                         style={{width: "100px", height: "100px"}}/>
                                                    <div className="text-start ps-4">
                                                    <span
                                                        className="text-truncate me-8"
                                                        style={{fontSize: "16px"}}><b>{jobs.company?.account?.name}</b></span>
                                                        <span className="text-truncate me-3"><i
                                                            className="fa fa-map-marker-alt text-primary me-2"></i> {jobs.company?.address}</span>
                                                        <span className="text-truncate me-3"><i
                                                            className="fas fa-phone fa-flip-horizontal fa-fw"></i> {jobs.company?.phoneNumber}</span>
                                                        <span className="text-truncate me-3"><i
                                                            className="fas fa-envelope fa-fw"></i> {jobs.company?.account?.email}</span>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <button
                                                            className="btn btn-outline-warning w-100"
                                                            type="submit">About Company
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/*    End Manager Job*/}
                            </div>
                        </div>
                    </div>
                </div>
                {/*Job Detail*/}

                {/*<!-- Footer Start*/}
                <div className="container-fluid bg-dark text-white-50 footer pt-5 mt-5 wow fadeIn"
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
    );
}