import {Link, useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";
function CompanyMangerUser() {
    const [company, setCompany] = useState({});
    const navigate = useNavigate();
    const param = useParams()
    const [jobApply, setJobApply] = useState([])
    const [flag, setFlag] = useState(false)
    const [notification,setNotification]=useState([])
    const [count, setCount] = useState(0);

    useEffect(() => {
        GetCompany()
        getJobApply()
        window.scrollTo(window.innerWidth, 500);
    }, [flag])

    function GetCompany() {
        axios.get(`http://localhost:8080/companies/${param.id}`).then((response) => {
            setCompany(response.data)
            sessionStorage.setItem("companyId", JSON.stringify(response.data.id));
            ShowNotification(response.data.account?.id)
        }).catch(() => {
            navigate("/err")
        })
    }

    //Get list user đã apply job tại công ty
    function getJobApply() {
        axios.post(`http://localhost:8080/action-jobs/find-apply-job/${param.id}`).then((response) => {
            setJobApply(response.data)
        })
    }

    //Tuyển dụng ứng viên
    function applyUser(id) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Apply it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Applied!',
                    'This job havs been accept!',
                    'success'
                )
                axios.post(`http://localhost:8080/action-jobs/accept/${id}`).then((response) => {
                    setFlag(!flag)
                }).catch(() => {
                    navigate("/err")
                })
            }
        })
    }

    //Loại ứng viên
    function rejectUser(id) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Reject it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Rejected!',
                    'This job havs been rejected!',
                    'success'
                )
                axios.post(`http://localhost:8080/action-jobs/reject/${id}`).then((response) => {
                    setFlag(!flag)
                }).catch(() => {
                    navigate("/err")
                })
            }
        })
    }

    // Hiển thị số thông báo chưa đọc
    function checkStatus(arr){
        let count=0;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].status===true){
                count++
            }
        }
        setCount(count)
    }

    // Thông báo khi user apply job
    function ShowNotification(id) {
        axios.post(`http://localhost:8080/notification/${id}`).then((res)=>{
            setNotification(res.data)
            checkStatus(res.data)
        })
    }

    function readNotification(id){
        axios.get(`http://localhost:8080/notification/${id}`).then(()=>{
            setFlag(!flag)
        })
    }

    //Show notification
    function showNotification() {
        const listItems = notification.map((item) => `<li><i class="far fa-comment fa-lg"></i><a href="/company-manger-user/${company.id}"> ${item.text}</a></li>`).join('');
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
            title: 'Notification from the Candidate.',
            width: 650,
            color: '#ff6600',
            html: `<ul>${listItems}</ul>`,
        })
    }

    return (
        <>
                <div className="container-xxl bg-white p-0" style={{overflow: "hidden"}}>

                    {/*<!-- Navbar Start*/}
                    <nav className="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0">
                        <Link to={`/company-home/${company.id}`}
                              className="navbar-brand d-flex align-items-center text-center py-0 px-4 px-lg-5">
                            <img src="/image/KOB.png" alt="Los Angeles" className="d-block"
                                 style={{width: "250px", height: "70px", borderRadius: "50px"}}/>
                        </Link>
                        <button type="button" className="navbar-toggler me-4" data-bs-toggle="collapse"
                                data-bs-target="#navbarCollapse">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarCollapse">
                            <div className="navbar-nav ms-auto p-4 p-lg-0">
                                <div className="navbar-nav ms-auto p-4 p-lg-0">
                                    <Link to={`/company-home/${company.id}`} className="nav-item nav-link iconNavbar">Home Page</Link>
                                </div>
                            </div>
                            <div className="nav-item dropdown" style={{marginTop: "-5px"}}>
                                <Link to={''} className="nav-item nav-link iconUp2"><i
                                    className="fas fa-user-tie fa-lg"></i> {company.account?.name}</Link>
                                <div className="dropdown-menu rounded-0 m-4">
                                    <Link to={'/home-page'} className="dropdown-item">Log out</Link>
                                </div>
                            </div>
                            <div className="nav-item dropdown" style={{marginRight: "20px", marginLeft: "-15px", marginTop: "-5px"}}>
                                <button className="btn btn-link iconNavbar" onClick={()=> {showNotification()}}><i className="bi bi-bell bell fa-lg"></i><span style={{position: "absolute", top: "-1px", color: "white", backgroundColor: "#ff6600",  fontSize: "14px",borderRadius: "50%", width: "20px", height: "20px"}}>{count}</span></button>
                            </div>

                            <Link to={`/company-post-new-job/${company.id}`} className="btn btn-primary rounded-0 py-4 px-lg-5 d-none d-lg-block"><i
                                className="fas fa-plus-circle"></i> Post A Job<i
                                className="fa fa-arrow-right ms-3"></i></Link>
                        </div>
                    </nav>
                    {/*<!-- Navbar End*/}

                    {/*/!*<!-- Header Start*!/*/}
                    <div className="container-xxl py-5 bg-dark page-header mb-5 animated slideInDown">
                        <div className="container my-5 pt-5 pb-4">
                            <h1 className="display-3 text-white mb-3 ">About Company</h1>
                            <nav aria-label="breadcrumb ">
                                <ol className="breadcrumb text-uppercase">
                                    <li className="breadcrumb-item "><Link to={''}>Home</Link></li>
                                    <li className="breadcrumb-item"><Link to={''}>Pages</Link></li>
                                    <li className="breadcrumb-item text-white active" aria-current="page">Your company
                                        information
                                    </li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    {/*/!*<!-- Header End*!/*/}

                    {/*Company inform*/}
                    <div className="header-inner bg-light animated slideInLeft">
                        <div className="container">
                            <div className="row gy-5 gx-4">
                                <div className="d-flex align-items-center mb-5 animated slideInDown"
                                     style={{marginBottom: "1px"}}>
                                    <img className="flex-shrink-0 img-fluid border rounded" src={company.imagePath}
                                         alt="Avatar Company" style={{width: "80px", height: "80px"}}/>
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
                                                <li><Link to={`/company-home/${company.id}`}>Home Page</Link></li>
                                                <li><Link to={`/company-update-profile/${company.id}`}>Update Profile</Link></li>
                                                <li><Link className="active" to={`/company-manger-user/${company.id}`}>Manage
                                                    Candidates</Link></li>
                                                <li><Link to={`/company-manager-job/${company.id}`}>Manage
                                                    Jobs</Link></li>
                                                <li><Link to={`/company-post-new-job/${company.id}`}>Post New Job</Link>
                                                </li>
                                                <li><Link to={'/home-page'}>Log Out</Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/*End thanh menu Company*/}

                    {/*<!-- Table Manager Job*/}
                    <section>
                        <div className="container">
                            <div className="row ">
                                <div className="col-md-12 ">
                                    <div className="user-dashboard-info-box mb-0">
                                        <div className="row mb-4">
                                            <div className="col-md-7 col-sm-5 d-flex align-items-center">
                                                <div className="section-title-02 mb-0 ">
                                                    <h4 className="mb-0">Manage Candidates</h4>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="user-dashboard-table table-responsive">
                                            <table className="table table-bordered">
                                                <thead className="bg-light">
                                                <tr style={{textAlign: "center"}}>
                                                    <th scope="col">Candidate Name</th>
                                                    <th scope="col">Job Name</th>
                                                    <th scope="col">Status</th>
                                                    <th scope="col">Action</th>
                                                    <th scope="col">Detail</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {jobApply.map((item) => {
                                                    return (
                                                        <tr>
                                                            <td style={{width: "40%"}}>
                                                                <div className="row gy-5 gx-4">
                                                                    <div className="d-flex align-items-center mb-2"
                                                                         style={{marginBottom: "1px"}}>
                                                                        <img className=" flex-shrink-0 img-fluid"
                                                                             src={item.user?.imagePath}
                                                                             alt="Avatar user" style={{
                                                                            width: "80px",
                                                                            height: "80px",
                                                                            borderRadius: "50px",
                                                                            border: "1px solid #ccc"
                                                                        }}/>
                                                                        <div className="text-start ps-4">
                                                                            <h5 className="mb-3">{item.user?.account?.name}</h5>
                                                                            <span className="text-truncate me-3"><i
                                                                                className="fa fa-map-marker-alt text-primary me-2"></i> {item.user?.address}</span><br/>
                                                                            <span className="text-truncate me-3"><i
                                                                                className="fas fa-phone fa-flip-horizontal fa-fw"></i> {item.user?.phoneNumber}</span>
                                                                            <span className="text-truncate me-3"><i
                                                                                className="fas fa-envelope fa-fw"></i> {item.user.account?.email}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td style={{width: "25%", color: "black", fontSize: "16px"}}
                                                                scope="row">
                                                                <b>{item.job?.employeeType?.name} - {item.job?.company?.account?.name}</b>
                                                            </td>
                                                            <td style={{
                                                                width: "10%",
                                                                color: "black",
                                                                fontSize: "16px",
                                                                textAlign: "center"
                                                            }}
                                                                scope="row">
                                                                <b>{item.status}</b>
                                                            </td>
                                                            {item.status === 'Pending' ?
                                                                <td style={{textAlign: "center", width: "15%"}}>
                                                                    <button className="btn btn-link iconUp"
                                                                            style={{color: "green"}}
                                                                            onClick={() => applyUser(item.id)}>
                                                                        <i className="fas fa-check-square fa-lg"
                                                                        ></i> Ok
                                                                    </button>
                                                                    <button className="btn btn-link iconUp"
                                                                            style={{color: "red"}}
                                                                            onClick={() => rejectUser(item.id)}>
                                                                        <i className="fas fa-times fa-lg"
                                                                        ></i> Fail
                                                                    </button>
                                                                </td> : <td></td>}
                                                            <td style={{textAlign: "center", width: "10%"}}>
                                                                <button className="btn btn-link iconUp"><Link
                                                                    to={`/company-view-user-profile/${item.user?.id}`}
                                                                    className="text-primary"
                                                                    data-toggle="tooltip" title="view"><i
                                                                    className="fas fa-eye fa-lg"
                                                                    style={{color: "green"}}></i> View</Link></button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/*<!-- End Table Manager Job*/}

                    {/*<!-- Footer Start*/}
                    <div className="container-fluid bg-dark text-white-50 footer pt-5 mt-5" data-wow-delay="0.1s">
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
                                        &copy; <Link to={''} className="border-bottom"
                                                     href="https://freewebsitecode.com">Your
                                        Site
                                        Name</Link>, All Right Reserved.
                                        Designed By <Link to={''} className="border-bottom"
                                                          href="https://freewebsitecode.com">Free
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
                    {/*<!-- Footer End*/}

                    {/*<!-- Back to Top*/}
                    <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top"><i
                        className="fas fa-angle-up"></i></a>
                </div>
        </>
    )
}

export default CompanyMangerUser