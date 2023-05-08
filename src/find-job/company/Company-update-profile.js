import React, {useEffect, useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {Link, useNavigate, useParams} from "react-router-dom";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import storage from "../FireBaseConfig";

function CompanyUpdateProfile() {
    const [company, setCompany] = useState({})
    const navigate = useNavigate()
    const param = useParams()
    const [count, setCount] = useState(0);
    const [notification,setNotification]=useState([])
    const [flag,setFlag]=useState(false)
    //Upload file
    const [image, setImage] = useState("")
    const [progressPercent, setProgressPercent] = useState(0)

    const [showForm, setShowForm] = useState(false);
    //Open form upload image at "image Avatar User"
    const handleImageClick = () => {
        setShowForm(!showForm);
    };

    useEffect(() => {
        GetCompany();
        window.scrollTo(0, 0);
    }, [flag])

    function GetCompany() {
        axios.get(`http://localhost:8080/companies/${param.id}`).then((response) => {
            setCompany(response.data)
            setImage(response.data.imagePath)
            ShowNotification(response.data.account?.id)
            sessionStorage.setItem("companyId", JSON.stringify(response.data.id));
        }).catch(() => {
            navigate("/err")
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
    function readNotification(id){
        axios.get(`http://localhost:8080/notification/${id}`).then(()=>{
            setFlag(!flag)
        })
    }

    //Show notification
    function showNotification() {
        const listItems = notification.map((item) => `<li><i class="far fa-comment fa-lg"></i><a href="/company-manger-user/${company.id}" > ${item.text}</a></li>`).join('');
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

    // Thông báo khi user apply job
    function ShowNotification(id) {
        axios.post(`http://localhost:8080/notification/${id}`).then((res)=>{
            setNotification(res.data)
            checkStatus(res.data)
        })
    }

    function save(values) {
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
                    axios.put(`http://localhost:8080/companies`, values).then(() => {
                        setFlag(!flag)
                        setShowForm(false)
                    }).catch(() => {
                        navigate("/err")
                    })
                    window.scrollTo(0, 0);
                }
            })
        ) {
        }
    }

    //Phần validation trong Formik sử dụng Yup
    const validationYup = Yup.object().shape({
        phoneNumber: Yup.number().min(10, "* Phone more than 10 number"),
    })

    //Upload file image
    function uploadFile(e) {
        if (e.target.files[0]) {
            const storageRef = ref(storage, `imageCompany/${e.target.files[0].name}`);
            const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);
            uploadTask.on("state_changed",
                (snapshot) => {
                    const progress =
                        Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    setProgressPercent(progress);
                },
                (error) => {
                    console.log(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImage(downloadURL)
                        let values={
                            id: company.id,
                            account:company.account,
                            googleMapLink: '',
                            imagePath: downloadURL,
                            phoneNumber: '',
                            address: '',
                            city: company.city,
                            description: '',
                            totalEmployee: 0
                        }
                        axios.put(`http://localhost:8080/companies`, values).then(() => {
                            setShowForm(false)
                        }).catch(() => {
                            navigate("/err")
                        })
                    });
                }
            );
        }
    }

    return (
        <>
            <div className="container-xxl bg-white p-0" style={{overflow: "hidden"}}>

                {/*<!-- Navbar Start*/}
                <nav className="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0">
                    <Link to={`/company-home/${company.id}`}
                          className="navbar-brand d-flex align-items-center text-center py-0 px-4 px-lg-5">
                        <img src="/image/KOB.png" alt="KOB avatar" className="d-block"
                             style={{width: "250px", height: "70px"}}/>
                    </Link>
                    <button type="button" className="navbar-toggler me-4" data-bs-toggle="collapse"
                            data-bs-target="#navbarCollapse">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <div className="navbar-nav ms-auto p-4 p-lg-0">
                            <Link to={`/company-home/${company.id}`} className="nav-item nav-link iconNavbar">Home Page</Link>
                        </div>
                        <div className="nav-item dropdown" style={{marginTop: "-5px"}}>
                            <Link to={''} className="nav-item nav-link iconUp2"><i
                                className="fas fa-user-tie fa-lg"></i> {company.account?.name}</Link>
                            <div className="dropdown-menu rounded-0 m-4">
                                <Link to={'/home-page'} className="dropdown-item">Log out</Link>
                            </div>
                        </div>
                        {/*Show notification*/}
                        <div className="nav-item dropdown"
                             style={{marginRight: "20px", marginLeft: "-15px", marginTop: "-5px"}}>
                            <button className="btn btn-link iconNavbar" onClick={() => {
                                showNotification()
                            }}><i className="bi bi-bell bell fa-lg"></i><span style={{
                                position: "absolute",
                                top: "-1px",
                                color: "white",
                                backgroundColor: "#ff6600",
                                borderRadius: "50%",
                                fontSize: "14px",
                                width: "20px",
                                height: "20px"
                            }}>{count}</span></button>
                        </div>
                        <Link to={`/company-post-new-job/${company.id}`} className="btn btn-primary rounded-0 py-4 px-lg-5 d-none d-lg-block"><i
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
                                <li className="breadcrumb-item "><Link to={`/company-home/${company.id}`}>Home</Link></li>
                                <li className="breadcrumb-item"><Link to={`/company-home/${company.id}`}>Pages</Link></li>
                                <li className="breadcrumb-item text-white active" aria-current="page">Your company
                                    information
                                </li>
                            </ol>
                        </nav>
                    </div>
                </div>
                {/*<!-- Header End*/}

                {/*Company inform*/}
                <Formik
                    initialValues={{
                        id: company.id,
                        account: company.account,
                        googleMapLink: '',
                        imagePath: image,
                        phoneNumber: '',
                        address: '',
                        city: {
                            id: 1,
                            name: 'Ho Chi Minh'
                        },
                        description: '',
                        totalEmployee: 0
                    }}
                    onSubmit={(values) => {
                        save(values)
                    }}
                    validationSchema={validationYup}
                    enableReinitialize={true}
                >
                    <div className="header-inner bg-light animated slideInLeft">
                        <div className="container">
                            <div className="row gy-5 gx-4">
                                <div className="d-flex align-items-center mb-5 animated slideInDown"
                                     style={{marginBottom: "1px"}}>
                                    <div>
                                        <img className="flex-shrink-0 img-fluid border rounded" src={image}
                                             alt="Avatar Company" style={{width: "100px", height: "100px"}} onClick={handleImageClick}/>
                                        {showForm && <input type="file" className="btn btn-link"
                                                            id="image"
                                                            onChange={(e) => uploadFile(e)}/>
                                        }
                                    </div>
                                    <span style={{
                                        position: "absolute",
                                        textAlign: "center",
                                        top: "4px",
                                        left: "88px",
                                        color: "black",
                                        backgroundColor: "#fdf908",
                                        borderRadius: "50%",
                                        width: "23px",
                                        height: "23px"
                                    }}><i className="fas fa-marker"></i></span>
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
                </Formik>
                {/*/End Company Inform*/}

                {/*Tab Menu*/}
                <section>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="sticky-top secondary-menu-sticky-top">
                                    <div className="secondary-menu" style={{display: "flex", justifyContent: "center"}}>
                                        <ul>
                                            <li><Link to={`/company-home/${company.id}`}>Home Page</Link></li>
                                            <li><Link to={`/company-update-profile/${company.id}`} className="active">Update Profile</Link></li>
                                            <li><Link to={`/company-manger-user/${company.id}`}>Manage Candidates</Link></li>
                                            <li><Link to={`/company-manager-job/${company.id}`}>Manage Jobs</Link></li>
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
                {/*Tab Menu End*/}

                {/*Form update*/}
                <Formik
                    initialValues={{
                        id: company.id,
                        account: company.account,
                        googleMapLink: '',
                        imagePath: image,
                        phoneNumber: '',
                        address: '',
                        city: {
                            id: 1,
                            name: 'Ho Chi Minh'
                        },
                        description: '',
                        totalEmployee: 0
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
                                    <div className="user-dashboard-info-box mb-0">
                                        <h2>Basic information</h2>
                                        <div className="row g-4">
                                            <div className="col-md-12">
                                                <div className="wow fadeInUp" data-wow-delay="0.5s">
                                                    <Form>
                                                        <div className="row g-3">

                                                            <div className="col-12">
                                                                <div className="form-group ">
                                                                    <label htmlFor="account">Company name</label>
                                                                    <Field name={'account.name'} type="text"
                                                                           className="form-control"
                                                                           id="account.name"
                                                                           placeholder="Name"/>
                                                                    <small style={{
                                                                        color: 'red',
                                                                        fontSize: "16px"
                                                                    }}><ErrorMessage name={'name'}/></small>
                                                                </div>
                                                            </div>

                                                            <div className="col-md-12">
                                                                <div className="form-group">
                                                                    <label htmlFor="address">Address</label>
                                                                    <Field name={'address'} type="text"
                                                                           className="form-control"
                                                                           id="address"
                                                                           placeholder="Address"/>
                                                                    <small style={{
                                                                        color: 'red',
                                                                        fontSize: "16px"
                                                                    }}><ErrorMessage name={'Address'}/></small>
                                                                </div>
                                                            </div>

                                                            <div className="col-md-12">
                                                                <div className="form-group">
                                                                    <label htmlFor="phoneNumber">Phone</label>
                                                                    <Field name={'phoneNumber'} type="text"
                                                                           className="form-control"
                                                                           id="phoneNumber"
                                                                           placeholder="Phone number"/>
                                                                    <small style={{
                                                                        color: 'red',
                                                                        fontSize: "16px"
                                                                    }}><ErrorMessage name={'phoneNumber'}/></small>
                                                                </div>
                                                            </div>
                                                            <div className="col-12">
                                                                <label htmlFor="description">Description</label>
                                                                <div className="form-floating"><Field as='textarea'
                                                                                                      name={'description'}
                                                                                                      className="form-control"
                                                                                                      placeholder="Leave a description here"
                                                                                                      id="description"
                                                                                                      style={{height: "150px"}}></Field>
                                                                </div>
                                                            </div>
                                                            <div className="col-12">
                                                                <button className="btn btn-primary py-2">
                                                                    Update
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
                {/*Form update end*/}

                {/*<!-- Footer Start*/}
                <div className="container-fluid bg-dark text-white-50 footer pt-5 mt-5"
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
export default CompanyUpdateProfile