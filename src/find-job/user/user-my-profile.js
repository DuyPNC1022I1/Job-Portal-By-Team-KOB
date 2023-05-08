import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import storage from "../FireBaseConfig";

function UserMyProfile() {
    const [user, setUser] = useState({})
    const navigate = useNavigate()
    const param = useParams()
    const [notification, setNotification] = useState([])
    const [count, setCount] = useState(0);
    const [flag, setFlag] = useState(false)
    const [jobs, setJobs] = useState([])

    const [showForm, setShowForm] = useState(false);
    //Open form upload image at "image Avatar User"
    const handleImageClick = () => {
        setShowForm(!showForm);
    };

    //Upload file
    const [image, setImage] = useState("")
    const [cvPath, setCvPath] = useState("")
    const [progressPercent, setProgressPercent] = useState(0)


    useEffect(() => {
        axios.get(`http://localhost:8080/users/${param.id}`).then((response) => {
            setUser(response.data)
            GetNotification(response.data.account?.id)
        }).catch(() => {
            navigate("/err")
        })
        showApplyJob()

        window.scrollTo(0, 0);
    }, [flag])

    function showApplyJob() {
        axios.post(`http://localhost:8080/action-jobs/find-user-apply-job/${param.id}`).then((response) => {
            setJobs(response.data)
        }).catch(() => {
            navigate("/err")
        })
    }

    function cancelApplyJob(id) {
        axios.post(`http://localhost:8080/action-jobs/cancel/${id}`).then((res) => {
            setFlag(!flag)
            Swal.fire(
                'Cancel Success!',
                'Welcome to recruiter page!',
                'success'
            ).catch((error) => {
                console.error(error);
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


    // Thông báo khi user apply job
    function GetNotification(id) {
        axios.post(`http://localhost:8080/notification/${id}`).then((res) => {
            setNotification(res.data)
            checkStatus(res.data)
        })
    }

    function readNotification(id) {
        axios.get(`http://localhost:8080/notification/${id}`).then(() => {
            setFlag(!flag)
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
                    axios.put(`http://localhost:8080/users`, values).then(() => {
                        setFlag(!flag)
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
        phoneNumber: Yup.string().matches(/^\d{10}$/, 'Match 10 digit phone numbers'),
        // phoneNumber: Yup.number().min(10, "* Phone more than 10 number"),
        birthDay: Yup.string()
            .matches(/^\d{2}\/\d{2}\/\d{4}$/, 'Invalid date format (dd/mm/yyyy)'),
    })

    //Upload file image
    function uploadFile(e) {
        if (e.target.files[0]) {
            // const time = new Date().getTime()
            // const storageRef = ref(storage, `image/${time}_${e.target.files[0].name}`);
            const storageRef = ref(storage, `image/${e.target.files[0].name}`);
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
                            id: user.id,
                            account: user.account,
                            imagePath: downloadURL,
                            phoneNumber: '',
                            address: '',
                            cvPath: cvPath,
                            birthDay: '',
                            gender: '',
                            description: '',
                        }
                        axios.put(`http://localhost:8080/users`, values).then(() => {
                            setShowForm(false)
                            setFlag(!flag)
                        }).catch(() => {
                            navigate("/err")
                        })
                    });
                }
            );
        }
    }

    //Upload file cv
    function uploadFileCV(e) {
        if (e.target.files[0]) {
            // const time = new Date().getTime()
            // const storageRef = ref(storage, `image/${time}_${e.target.files[0].name}`);
            const storageRef = ref(storage, `cv/${e.target.files[0].name}`);
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
                        setCvPath(downloadURL)
                    });
                }
            );
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
                                    textAlign: "center",
                                    top: "-1px",
                                    color: "white",
                                    fontSize: "14px",
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
                <Formik initialValues={{
                    id: user.id,
                    account: user.account,
                    imagePath: image,
                    phoneNumber: '',
                    address: '',
                    cvPath: cvPath,
                    birthDay: '',
                    gender: '',
                    description: '',
                }}
                        onSubmit={(values) => {
                            save(values)
                        }}
                        enableReinitialize={true}
                >
                    <div className="header-inner bg-light animated slideInLeft" style={{height: "220px"}}>
                        <div className="container">
                            <div className="row gy-5 gx-4">
                                <div className="d-flex align-items-center mb-5 animated slideInDown"
                                     style={{marginBottom: "1px", paddingTop: "20px", paddingLeft: "55px"}}>
                                    <img className="flex-shrink-0 img-fluid border" src={user.imagePath}
                                         alt="Avatar Company"
                                         style={{width: "120px", height: "120px", borderRadius: "50%"}}
                                         onClick={handleImageClick}
                                    />
                                    {showForm && (
                                                <input type="file" className="btn btn-link"
                                                       id="image"
                                                       onChange={(e) => uploadFile(e)}/>
                                    )}
                                    <span style={{
                                        position: "absolute",
                                        textAlign: "center",
                                        top: "100px",
                                        left: "139px",
                                        color: "black",
                                        backgroundColor: "#fdf908",
                                        borderRadius: "50%",
                                        width: "23px",
                                        height: "23px"
                                    }}><i className="fas fa-marker"></i></span>
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
                </Formik>
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
                                            <li><Link className="active" to={`/user-my-profile/${user.id}`}>My
                                                Profile</Link></li>
                                            <li><Link to={`/create-cv/${user.id}`}>My CV</Link></li>
                                            <li><Link to={`/user-change-password/${user.id}`}>Change Password</Link>
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

                {/*Basic information user*/}
                <Formik
                    initialValues={{
                        id: user.id,
                        account: user.account,
                        imagePath: image,
                        phoneNumber: '',
                        address: '',
                        cvPath: cvPath,
                        birthDay: '',
                        gender: '',
                        description: '',
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
                                            <div className="col-md-8">
                                                <div className="wow fadeInUp " data-wow-delay="0.5s">
                                                    <Form>
                                                        <div className="row g-3">
                                                            {/*Upload cv */}
                                                            <div className="cover-photo-contact">
                                                                <div className="form-group">
                                                                    <label htmlFor="image"
                                                                           className="custom-file-label">Update
                                                                        CV </label>
                                                                    <input type="file" className="btn btn-link"
                                                                           id="image"
                                                                           onChange={(e) => uploadFileCV(e)}/>
                                                                </div>
                                                            </div>
                                                            {/*Upload cv end*/}
                                                            <div className="col-12">
                                                                <div className="form-group ">
                                                                    <label htmlFor="account">Your name</label>
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
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <label htmlFor="account">Address</label>
                                                                    <Field name={'address'} type="text"
                                                                           className="form-control"
                                                                           id="address"
                                                                           placeholder="Address"/>
                                                                    <small style={{
                                                                        color: 'red',
                                                                        fontSize: "16px"
                                                                    }}><ErrorMessage name={'address'}/></small>
                                                                </div>
                                                            </div>
                                                            <div className="form-group col-md-6 select-border">
                                                                <label htmlFor="gender">Gender</label>
                                                                <Field as='select' name={'gender'}
                                                                       className="form-control basic-select">
                                                                    <option value="Male"> Male</option>
                                                                    <option value="FeMale"> FeMale</option>
                                                                    <option value="Others"> Others</option>
                                                                </Field>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                                    <label htmlFor="birthDay">Date of birth</label>
                                                                    <Field name={'birthDay'} type="text"
                                                                           className="form-control"
                                                                           id="birthDay"
                                                                           placeholder="Date of birth"/>
                                                                    <small style={{
                                                                        color: 'red',
                                                                        fontSize: "16px"
                                                                    }}><ErrorMessage name={'birthDay'}/></small>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
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
                                                                <button className="btn btn-primary w-100 py-3">
                                                                    Update
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </Form>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="col-lg-10 animated slideInRight">
                                                    <div className="bg-light1 rounded p-2 mb-4">
                                                        <div className="widget pb-5">
                                                            <Link to={`/create-cv/${user.id}`}>
                                                                <div className="docs-content" style={{display: "flex"}}>
                                                                    <div className="docs-text"
                                                                         style={{fontSize: "19px"}}>
                                                                        Create & export
                                                                        <span className="d-block text-danger">PDF</span>
                                                                    </div>
                                                                    <div className="docs-icon"><span
                                                                        className="material-symbols-outlined" style={{
                                                                        left: 189,
                                                                        fontSize: "120px",
                                                                        top: 17,
                                                                        color: "red"
                                                                    }}>Picture_as_pdf</span>
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        </div>
                                                    </div>
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
                {/*Basic information user end*/}


                {/*<!-- Footer Start*/}
                <div className="container-fluid bg-dark text-white-50 footer pt-5 mt-5 "
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

export default UserMyProfile