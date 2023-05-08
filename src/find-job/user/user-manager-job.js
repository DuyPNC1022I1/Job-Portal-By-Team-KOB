import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function UserManagerJob() {
    const [user, setUser] = useState({})
    const navigate = useNavigate()
    const param = useParams()
    const [notification, setNotification] = useState([])
    const [count, setCount] = useState(0);
    const [currentPage,setCurrentPage]=useState(0)
    const [totalPage,setTotalPage]=useState(0);
    const [flag, setFlag] = useState(false)
    const [jobs, setJobs] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:8080/users/${param.id}`).then((response) => {
            setUser(response.data)
            showApplyJob(currentPage)
            GetNotification(response.data.account?.id)
        }).catch(() => {
            navigate("/err")
        })
        window.scrollTo(0, 0);
    }, [flag])

    function showApplyJob(page) {
        axios.post(`http://localhost:8080/action-jobs/find-user-apply-job/${param.id}?page=${page}`).then((response) => {
            setJobs(response.data.content)
            setCurrentPage(response.data.number)
            setTotalPage(response.data.totalPages)
        }).catch(() => {
            navigate("/err")
        })
    }

    function cancelApplyJob(id) {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to cancel!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, cancel it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Cancel Success!',
                    'Welcome to user page!',
                    'success',
                )
                axios.post(`http://localhost:8080/action-jobs/cancel/${id}`).then((res) => {
                    setFlag(!flag)
                })
            }
        }).catch((error) => {
            if (error.response.status === 404) {
                alert('Please active your account');
                Swal.fire({
                    icon: 'error',
                    title: 'Please check your action',
                    text: 'Please check again!',
                    footer: '<a href="">Why do I have this issue?</a>'
                })
            }
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
    function isPrevious() {
        showApplyJob(currentPage-1)
    }

//hàm tiến page
    function isNext() {
        showApplyJob(currentPage+1)
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
                                <Link to={`/user-search-page/${user.id}`} className="nav-item nav-link iconNavbar">Home
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
                                    backgroundColor: "#ff6600",
                                    borderRadius: "50%",
                                    fontSize: "13px",
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
                {/*/End Company Inform*/}

                {/*Thanh Menu Company */}
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
                                            <li><Link to={`/user-change-password/${user.id}`}>Change Password</Link>
                                            </li>
                                            <li><Link className="active" to={`/user-manager-job/${user.id}`}>Applied
                                                Jobs</Link></li>
                                            <li><Link to={'/home-page'}>Log Out</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/*End thanh menu Company*/}

                {/*<!-- Table saved Job*/}
                <section>
                    <div className="container">
                        <div className="row ">
                            <div className="col-md-12 ">
                                <div className="user-dashboard-info-box mb-0">
                                    <div className="row mb-4">
                                        <div className="col-md-7 col-sm-5 d-flex align-items-center">
                                            <div className="section-title-02 mb-0 ">
                                                <h4 className="mb-0">Applied Jobs</h4>
                                            </div>
                                        </div>
                                        <div className="col-md-5 col-sm-7 mt-3 mt-sm-0">
                                            <div className="search abc">
                                                <i className="fas fa-search"></i>
                                                <input type="text" className="form-control"
                                                       placeholder="Search..."/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="user-dashboard-table table-responsive">
                                        <table className="table table-bordered">
                                            <thead className="bg-light">
                                            <tr style={{textAlign: "center"}}>
                                                <th scope="col">Job Title</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {jobs.map((item) => {
                                                return (
                                                    <tr>
                                                        <td style={{width: "40%", color: "black", fontSize: "16px"}}
                                                            scope="row">
                                                            <b>{item.job?.employeeType?.name} - {item.job?.company?.account?.name}</b>
                                                        </td>
                                                        <td style={{
                                                            width: "20%",
                                                            textAlign: "center",
                                                            color: "black"
                                                        }}><b> {item.status}</b></td>
                                                        <td style={{width: "30%", textAlign: "center"}}>
                                                            {item.status === "Pending" ?
                                                                <button style={{fontSize: "14px"}}
                                                                        onClick={() => {
                                                                            cancelApplyJob(item.id)
                                                                        }}
                                                                        className="btn btn-link iconUp"
                                                                        data-toggle="tooltip"
                                                                        title="Cancel"><i
                                                                    className="fas fa-times-circle fa-lg"
                                                                    style={{color: "red"}}> Cancel</i></button> : ""}
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/*Phân trang*/}
                                    <div className="row justify-content-center">
                                        <div className="col-12 text-center">
                                            <ul className="pagination mt-3">
                                                {currentPage===0?<li></li>:
                                                    <li className="page-item mr-auto">
                                                        <span className="page-link" onClick={isPrevious}>Prev</span>
                                                    </li>
                                                }
                                                <li className="page-item" style={{paddingTop: "8px"}}>{currentPage+1}</li>
                                                <li className="page-item" style={{paddingTop: "8px"}}>/</li>
                                                <li className="page-item" style={{paddingTop: "8px"}}>{totalPage}</li>
                                                {currentPage+1===totalPage?<li></li>:
                                                    <li className="page-item ml-auto">
                                                        <span className="page-link" onClick={isNext}>Next</span>
                                                    </li>
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                    {/*Phân trang End*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/*<!-- End Table saved Job*/}


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
                                <p className="mb-2"><i className="fa fa-map-marker-alt me-3"></i>Location, City,
                                    Country
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

export default UserManagerJob