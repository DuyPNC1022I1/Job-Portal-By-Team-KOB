import {Link, useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import Swal from "sweetalert2";

function CompanyEditJob() {
    const navigate = useNavigate()
    const [jobs, setJobs] = useState({})
    const param = useParams()
    const [loading, setLoading] = useState(false)
    const [count, setCount] = useState(0);
    const [notification,setNotification]=useState([])
    const [flag,setFlag]=useState(false)
    const [company, setCompany] = useState({})
    const [career, setCareer] = useState([])
    const [employees, setEmployees] = useState([])

    useEffect(() => {
        getJobsById()
        GetCompany()
        getCareer()
        getEmployees()
        window.scrollTo(0, 0);
    }, [flag])

    function getJobsById() {
        axios.get(`http://localhost:8080/jobs/${param.id}`).then((response) => {
            setJobs(response.data)
        }).catch(() => {
            navigate('/err')
        })
    }

    function getCareer() {
        axios.get('http://localhost:8080/career').then((response) => {
            setCareer(response.data)
        }).catch(() => {
            navigate("/err404")
        })
    }

    function getEmployees() {
        axios.get('http://localhost:8080/employees').then((response) => {
            setEmployees(response.data)
        }).catch(() => {
            navigate("/err404")
        })
    }

    async function save(values) {
        await setLoading(true);
        if (
            Swal.fire({
                title: 'Are you sure?',
                text: "Click yes to save!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Save it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        'Save complete!',
                        'Your file has been saved.',
                        'success'
                    )
                    axios.put(`http://localhost:8080/jobs/${jobs.id}`, values).then(() => {
                        navigate(`/company-manager-job/${jobs.company?.id}`)
                    }).catch(() => {
                        navigate("/err")
                    })
                }
            })
        ) {
        }
    }

    //Phần validation trong Formik sử dụng Yup
    const validationYup = Yup.object().shape({
        expiration: Yup.number().required("* Error! Please input here!").min(0, "Expiration more than 0"),
        quantity: Yup.number().required("* Error! Please input here!").min(0, "Quantity more than 0"),
        salaryMin: Yup.number().required("* Error! Please input here!").min(0, "Salary more than 0"),
        salaryMax: Yup.number().required("* Error! Please input here!").min(0, "Salary more than 0"),
        employeeType: Yup.object().required("* Error! Please choose gender!")
    })

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
    function GetCompany() {
        let id = JSON.parse(sessionStorage.getItem('companyId'));
        axios.get(`http://localhost:8080/companies/${id}`).then((response) => {
            setCompany(response.data)
            ShowNotification(response.data.account?.id)
        }).catch(() => {
            navigate("/err")
        })
    }

    function readNotification(id){
        axios.get(`http://localhost:8080/notification/${id}`).then(()=>{
            setFlag(!flag)
        })
    }

    //Show notification
    function showNotification() {
        const listItems = notification.map((item) => `<li><i class="far fa-comment fa-lg"></i><a href="/company-manger-user/${jobs.company?.id}" > ${item.text}</a></li>`).join('');
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
            <div className="container-xxl bg-white p-0 " style={{overflow: "hidden"}}>

                {/*<!-- Navbar Start*/}
                <nav className="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0">
                    <Link to={`/company-home/${jobs.company?.id}`}
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
                                <Link to={`/company-home/${jobs.company?.id}`} className="nav-item nav-link iconNavbar">Home Page</Link>
                            </div>
                        </div>
                        <div className="nav-item dropdown" style={{marginTop: "-5px"}}>
                            <Link to={''} className="nav-item nav-link iconUp2"><i
                                className="fas fa-user-tie fa-lg"></i> {jobs.company?.account?.name}</Link>
                            <div className="dropdown-menu rounded-0 m-4">
                                <Link to={'/home-page'} className="dropdown-item">Log out</Link>
                            </div>
                        </div>
                        <div className="nav-item dropdown" style={{marginRight: "20px", marginLeft: "-15px", marginTop: "-5px"}}>
                            <button className="btn btn-link iconNavbar" onClick={()=> {showNotification()}}><i className="bi bi-bell bell fa-lg"></i><span style={{position: "absolute", top: "-1px", color: "white", backgroundColor: "#ff6600", borderRadius: "50%", width: "20px", height: "20px"}}>{count}</span></button>
                        </div>

                        <Link to={`/company-post-new-job/${jobs.company?.id}`} className="btn btn-primary rounded-0 py-4 px-lg-5 d-none d-lg-block"><i
                            className="fas fa-plus-circle"></i> Post A Job<i
                            className="fa fa-arrow-right ms-3"></i></Link>
                    </div>
                </nav>
                {/*<!-- Navbar End*/}

                {/*<!-- Header Start*/}
                <div className="container-xxl py-5 bg-dark page-header mb-5 animated slideInDown">
                    <div className="container my-5 pt-5 pb-4">
                        <h1 className="display-3 text-white mb-3">Your Company</h1>
                        <nav aria-label="breadcrumb">
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
                {/*<!-- Header End*/}

                {/*Logo Company*/}
                <div className="header-inner bg-light">
                    <div className="container">
                        <div className="row gy-5 gx-4">
                            <div className="d-flex align-items-center mb-5" style={{marginBottom: "1px"}}>
                                <img className="flex-shrink-0 img-fluid border rounded" src={jobs.company?.imagePath}
                                     alt="" style={{width: "80px", height: "80px"}}/>
                                <div className="text-start ps-4">
                                    <h3 className="mb-3">{jobs.company?.account?.name}</h3>
                                    <span className="text-truncate me-3"><i
                                        className="fa fa-map-marker-alt text-primary me-2"></i> {jobs.company?.address}</span>
                                    <span className="text-truncate me-3"><i
                                        className="fas fa-phone fa-flip-horizontal fa-fw"></i> {jobs.company?.phoneNumber}</span>
                                    <span className="text-truncate me-3"><i
                                        className="fas fa-envelope fa-fw"></i> {jobs.company?.account?.email}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*End Logo Company*/}

                {/*Thanh Menu Company */}
                <section>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="sticky-top secondary-menu-sticky-top">
                                    <div className="secondary-menu" style={{display: "flex", justifyContent: "center"}}>
                                        <ul>
                                            <li><Link to={`/company-home/${jobs.company?.id}`}>Home Page</Link></li>
                                            <li><Link to={`/company-update-profile/${jobs.company?.id}`}>Update Profile</Link></li>
                                            <li><Link to={`/company-manger-user/${jobs.company?.id}`}>Manage Candidates</Link></li>
                                            <li><Link to={`/company-manager-job/${jobs.company?.id}`}>Manage Jobs</Link>
                                            </li>
                                            <li><Link to={`/company-post-new-job/${jobs.company?.id}`}>Post
                                                New Job</Link></li>
                                            <li><Link to={'/home-page'}>Log Out</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/*End thanh menu Company*/}

                {/*<!-- Form edit Job -  Manager Job*/}
                <Formik
                    initialValues={{
                        id: jobs.id,
                        description: jobs.description,
                        expiration: jobs.expiration,
                        gender: jobs.gender,
                        quantity: jobs.quantity,
                        salary_max: jobs.salaryMax,
                        salary_min: jobs.salaryMin,
                        startDate: jobs.startDate,
                        status: jobs.status,
                        typeTime: jobs.typeTime,
                        career: jobs.career,
                        city: jobs.city,
                        employeeType: jobs.employeeType,
                        company: jobs.company
                    }}
                    onSubmit={(values) => {
                        save(values)
                    }}
                    validationSchema={validationYup}
                    enableReinitialize={true}
                >
                    <section>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="container">
                                        <h1 className="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">Edit
                                            Job</h1>
                                        <div className="row g-4">
                                            <div className="col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                                                {/*<iframe className="position-relative rounded w-100 h-100"*/}
                                                {/*        src={jobs.company?.googleMapLink}*/}
                                                {/*        frameBorder="0" style={{minHeight: "400px", border: "0"}}*/}
                                                {/*        allowFullScreen=""*/}
                                                {/*        aria-hidden="false"*/}
                                                {/*        tabIndex="0">*/}
                                                {/*</iframe>*/}
                                                <img src="/image/about/about-07.jpg" alt="Image" className="d-block"
                                                     style={{width: "100%", height: "100%"}}/>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="wow fadeInUp" data-wow-delay="0.5s">
                                                    <Form>
                                                        <div className="row g-3">
                                                            <div className="col-12">
                                                                <div className="form-floating">
                                                                    <Field name={'expiration'} type="text"
                                                                           className="form-control"
                                                                           id="expiration"
                                                                           placeholder="experience"/>
                                                                    <label htmlFor="expiration">Experience</label>
                                                                    <small style={{
                                                                        color: 'red',
                                                                        fontSize: "16px"
                                                                    }}><ErrorMessage name={'expiration'}/></small>
                                                                </div>
                                                            </div>
                                                            <div className="col-12">
                                                                <div className="form-floating">
                                                                    <Field name={'quantity'} type="text"
                                                                           className="form-control"
                                                                           id="quantity"
                                                                           placeholder="quantity"/>
                                                                    <label htmlFor="quantity">Quantity</label>
                                                                    <small style={{
                                                                        color: 'red',
                                                                        fontSize: "16px"
                                                                    }}><ErrorMessage name={'quantity'}/></small>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-floating">
                                                                    <Field name={'salaryMin'} type="text"
                                                                           className="form-control"
                                                                           id="salaryMin"
                                                                           placeholder="salaryMin"/>
                                                                    <label htmlFor="salaryMin">Salary Min
                                                                        ($)</label>
                                                                    <small style={{
                                                                        color: 'red',
                                                                        fontSize: "16px"
                                                                    }}><ErrorMessage name={'salaryMin'}/></small>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-floating">
                                                                    <Field name={'salaryMax'} type="text"
                                                                           className="form-control"
                                                                           id="salaryMax"
                                                                           placeholder="salaryMax"/>
                                                                    <label htmlFor="salaryMax">Salary Max
                                                                        ($)</label>
                                                                    <small style={{
                                                                        color: 'red',
                                                                        fontSize: "16px"
                                                                    }}><ErrorMessage name={'salaryMax'}/></small>
                                                                </div>
                                                            </div>
                                                            <div className="form-group col-md-6 select-border">
                                                                <Field as='select' name={'career.name'}
                                                                       className="form-control basic-select">
                                                                    <option> -- Select Career --</option>
                                                                    {career.map((item) => {
                                                                        return (
                                                                            <>
                                                                                <option value={item.id}>{item.name}</option>
                                                                            </>

                                                                        )
                                                                    })}
                                                                </Field>
                                                            </div>
                                                            <div className="form-group col-md-6 select-border">
                                                                <Field as='select' name={'gender'}
                                                                       className="form-control basic-select">
                                                                    <option> -- Select Gender --</option>
                                                                    <option value="Male">Male</option>
                                                                    <option value="FeMale">FeMale</option>
                                                                    <option value="FeMale">Others</option>
                                                                </Field>
                                                            </div>
                                                            <div className="form-group col-md-6 select-border">
                                                                <Field as='select' name={'employeeType.name'}
                                                                       className="form-control basic-select">
                                                                    <option> -- Select EmployeeType --</option>
                                                                    {employees.map((item) => {
                                                                        return (
                                                                            <>
                                                                                <option value={item.id}>{item.name}</option>
                                                                            </>

                                                                        )
                                                                    })}
                                                                </Field>
                                                            </div>
                                                            <div className="form-group col-md-6 select-border">
                                                                <Field as='select' name={'typeTime'}
                                                                       className="form-control basic-select">
                                                                    <option> -- Select TypeTime --</option>
                                                                    <option value="Full time">Full time</option>
                                                                    <option value="Part time">Part time</option>
                                                                </Field>
                                                            </div>
                                                            <div className="col-12">
                                                                <div className="form-floating"><Field as='textarea'
                                                                                                      name={'description'}
                                                                                                      className="form-control"
                                                                                                      placeholder="Leave a description here"
                                                                                                      id="description"
                                                                                                      style={{height: "150px"}}></Field>
                                                                    <label htmlFor="description">Description</label>
                                                                </div>
                                                            </div>
                                                            <div className="col-12">
                                                                <button className="btn btn-primary w-100 py-3"
                                                                        type={"submit"}>{loading ? 'Loading...' : 'Save'}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </Form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/*<!-- End Form Post new Job*/}
                </Formik>


                {/*<!-- Footer Start*/}
                <div className="container-fluid bg-dark text-white-50 footer pt-5 mt-5"
                     data-wow-delay="0.1s">
                    <div className="container py-5">
                        <div className="row g-5">
                            <div className="col-lg-3 col-md-6">
                                <h5 className="text-white mb-4">Company</h5>
                                <Link to={''} className="btn btn-link text-white-50" href="">About Us</Link>
                                <Link to={''} className="btn btn-link text-white-50" href="">Contact Us</Link>
                                <Link to={''} className="btn btn-link text-white-50" href="">Our Services</Link>
                                <Link to={''} className="btn btn-link text-white-50" href="">Privacy Policy</Link>
                                <Link to={''} className="btn btn-link text-white-50" href="">Terms & Condition</Link>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <h5 className="text-white mb-4">Quick Links</h5>
                                <Link to={''} className="btn btn-link text-white-50" href="">About Us</Link>
                                <Link to={''} className="btn btn-link text-white-50" href="">Contact Us</Link>
                                <Link to={''} className="btn btn-link text-white-50" href="">Our Services</Link>
                                <Link to={''} className="btn btn-link text-white-50" href="">Privacy Policy</Link>
                                <Link to={''} className="btn btn-link text-white-50" href="">Terms & Condition</Link>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <h5 className="text-white mb-4">Contact</h5>
                                <p className="mb-2"><i className="fa fa-map-marker-alt me-3"></i>Location, City, Country
                                </p>
                                <p className="mb-2"><i className="fa fa-phone-alt me-3"></i>+012 345 67890</p>
                                <p className="mb-2"><i className="fa fa-envelope me-3"></i>info@example.com</p>
                                <div className="d-flex pt-2">
                                    <Link to={''} className="btn btn-outline-light btn-social" href=""><i
                                        className="fab fa-twitter"></i></Link>
                                    <Link to={''} className="btn btn-outline-light btn-social" href=""><i
                                        className="fab fa-facebook-f"></i></Link>
                                    <Link to={''} className="btn btn-outline-light btn-social" href=""><i
                                        className="fab fa-youtube"></i></Link>
                                    <Link to={''} className="btn btn-outline-light btn-social" href=""><i
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
                                    &copy; <Link to={''} className="border-bottom" href="https://freewebsitecode.com">Your
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

export default CompanyEditJob