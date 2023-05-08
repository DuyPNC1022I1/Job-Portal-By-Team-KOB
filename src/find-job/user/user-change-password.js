import {Link, useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import './UserManager.css';
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as yup from 'yup';
import * as Yup from "yup";
import Swal from "sweetalert2";


export default function UserChangePassword() {
    const [user, setUser] = useState({})
    const navigate = useNavigate()
    const param = useParams()
    const [notification, setNotification] = useState([])
    const [count, setCount] = useState(0);
    const [flag, setFlag] = useState(false)

    useEffect(() => {
        axios.get(`http://localhost:8080/users/${param.id}`).then((response) => {
            setUser(response.data)
            GetNotification(response.data.account?.id)
        }).catch(() => {
            navigate("/err")
        })

        window.scrollTo(0, 0); // Quay lại đầu trang khi tải lại trang
    }, [flag])


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

    const validation = yup.object().shape({
        oldPassword: Yup.string()
            .max(14, '* Too Long')
            .min(4, '* Too short')
            .required('* Cannot be left blank '),
        newPassword: Yup.string()
            .max(14, '* Too Long')
            .min(4, '* Too short')
            .required('* Cannot be left blank '),
        ConfirmPass: Yup.string()
            .required("Confirm password is required")
            .oneOf([Yup.ref("newPassword")], "Passwords do not match"),
    });

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
                                            <li><Link className="active" to={`/user-change-password/${user.id}`}>Change
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
                {/*End thanh menu Company*/}

                {/*<!-- Job Detail Start*/}
                <div className="container-xxl wow fadeInUp">
                    <div className="container">
                        <div className="row gy-5 gx-4">
                            <div className="col-lg-7">
                                <div className="mb-5">
                                    {/*{user.description}*/}
                                    <div className={'form-update-user'}>
                                        <Formik
                                            initialValues={{
                                                accountId: "",
                                                oldPassword: '',
                                                newPassword: ''
                                            }}
                                            validationSchema={validation}
                                            onSubmit={(values) => {
                                                updatePassword(values);
                                            }}

                                        >
                                            {({values, setFieldValue, errors, touched}) => (
                                                <Form>
                                                    <h4 style={{fontSize: 22}}>Change Password</h4>
                                                    <div className="form-group1 col-md-12">
                                                        <label htmlFor="oldPassword" style={{marginBottom: 5}}>Current
                                                            Password</label>
                                                        <Field type="password"
                                                               className={`form-control input-address-phone ${errors.oldPassword && touched.oldPassword ? 'is-invalid' : ''}`}
                                                               name="oldPassword"/>
                                                        <ErrorMessage name="oldPassword" component="div"
                                                                      className="invalid-feedback"/>
                                                    </div>
                                                    <div className="form-group1 col-md-12">
                                                        <label htmlFor="newPassword" style={{marginBottom: 5}}>New
                                                            Password </label>
                                                        <Field type="password"
                                                               className={`form-control input-address-phone ${errors.newPassword && touched.newPassword ? 'is-invalid' : ''}`}
                                                               name="newPassword"/>
                                                        <ErrorMessage name="newPassword" component="div"
                                                                      className="invalid-feedback"/>
                                                    </div>
                                                    <div className="form-group1 col-md-12">
                                                        <label htmlFor="ConfirmPass" style={{marginBottom: 5}}>Confirm
                                                            New Password </label>
                                                        <Field type="password"
                                                               className={`form-control input-address-phone ${errors.ConfirmPass && touched.ConfirmPass ? 'is-invalid' : ''}`}
                                                               name="ConfirmPass"/>
                                                        <ErrorMessage name="ConfirmPass" component="div"
                                                                      className="invalid-feedback"/>
                                                    </div>
                                                    <button className={"btn btn-primary"} style={{marginLeft: "5px"}}
                                                            onClick={() => setFieldValue("accountId", user.account.id)}
                                                            type="submit">Change Password
                                                    </button>
                                                </Form>
                                            )}
                                        </Formik>
                                    </div>
                                </div>
                            </div>

                            {/*Slide image*/}
                            <div id="demo" className="carousel slide" data-bs-ride="carousel" style={{width: "558px"}}>
                                <div className="carousel-indicators">
                                    <button type="button" data-bs-target="#demo" data-bs-slide-to="0"
                                            className="active"></button>
                                    <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
                                    <button type="button" data-bs-target="#demo" data-bs-slide-to="2"></button>
                                </div>
                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <img src="/image/changepass3.jpg" alt="Los Angeles" className="d-block"
                                             style={{width: "100%", height: "427px"}}/>
                                    </div>
                                    <div className="carousel-item">
                                        <img src="/image/changepassword.PNG" alt="Chicago" className="d-block"
                                             style={{width: "100%", height: "427px"}}/>
                                    </div>
                                    <div className="carousel-item">
                                        <img src="/image/changepassword2.PNG" alt="New York" className="d-block"
                                             style={{width: "100%", height: "427px"}}/>
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
                            {/* Slide Image End*/}
                        </div>
                    </div>
                </div>
                {/*<!-- Job Detail End*/}


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

    function updatePassword(values) {
        axios.post('http://localhost:8080/auth/change-password', values).then((response) => {
            Swal.fire(
                'Changed Password',
                'Please sign in again with New Password!',
                'success',
                navigate("/login")
            )
        })
            .catch((error) => {
                console.error(error);
                if (error.response.status === 400) {
                    alert('Wrong old password');
                }
            });
    }

}