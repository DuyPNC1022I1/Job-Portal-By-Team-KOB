import React, {useEffect, useState} from "react";
import "../searchpage/SeachPageCss.css"
import axios from "axios";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Link, useNavigate, useParams} from "react-router-dom";
import Swal from "sweetalert2";


export default function UserSearchPage() {
    const [user, setUser] = useState({})
    const [listJob, setListJob] = useState([])
    const [count, setCount] = useState('')
    const [counts, setCounts] = useState('')
    const [currentPage,setCurrentPage]=useState(0)
    const [check,setCheck]=useState(false)
    const [totalPage,setTotalPage]=useState(0);
    const navigate = useNavigate()
    const params = useParams()
    const [flag, setFlag] = useState(false)
    const [searchValue, setSearchValue] = useState({
        city: [],
        typeTime: [],
        expiration: [],
        salary: [],
        gender: []
    })
    const [notification, setNotification] = useState([])
    const param = useParams()

    useEffect(() => {
        backupSearchValue()
    }, [flag])

    useEffect(() => {
        GetJobs(currentPage)
        GetUser()
        window.scrollTo(0, 0);
    }, [])

    function GetUser() {
        axios.get(`http://localhost:8080/users/${params.id}`).then((response) => {
            setUser(response.data)
            GetNotification(response.data.account.id)
            sessionStorage.setItem("userId", JSON.stringify(response.data.id));
        }).catch(() => {
            navigate("/err")
        })
    }

    function GetJobs(page) {
        axios.get(`http://localhost:8080/jobs?page=${page}`).then((res) => {
            setListJob(res.data?.content)
            setCurrentPage(res.data.number)
            setTotalPage(res.data.totalPages)
            setCount(res.data.pageSize)
        }).catch(() => {
            navigate("/err")
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
                    navigate(`/user-search-page/${user.id}`)
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

    // Hiển thị số thông báo chưa đọc
    function checkStatus(arr) {
        let count = 0;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].status === true) {
                count++
            }
        }
        setCounts(count)
    }
    function isPrevious() {
        GetJobs(currentPage-1)
        window.scrollTo(window.innerWidth, 400);
    }

    //hàm tiến page
    function isNext() {
        GetJobs(currentPage+1)
        window.scrollTo(window.innerWidth, 400);
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
            <div className={"body-all-page"}>
                <div className={'body-search'}>

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
                                    <Link to={`/user-search-page/${user.id}`} className="nav-item nav-link iconNavbar">Home Page</Link>
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
                                <div className="nav-item dropdown" style={{marginRight: "20px", marginLeft: "-15px", marginTop: "-5px"}}>
                                    <button className="btn btn-link iconNavbar2" onClick={()=> {showNotification()}}><i className="bi bi-bell bell fa-lg "></i><span style={{position: "absolute", top: "-1px", color: "white", backgroundColor: "#ff6600", borderRadius: "50%",fontSize: "13px", width: "20px", height: "20px"}}>{counts}</span></button>
                                </div>
                            </div>
                            {/*Logo Account End*/}
                            <Link to={`/user-my-profile/${user.id}`}
                                  className="btn btn-primary rounded-0 py-4 px-lg-5 d-none d-lg-block"><i
                                className="	far fa-address-card fa-lg"></i> My Profile<i
                                className="fa fa-arrow-right ms-3"></i></Link>
                        </div>
                    </nav>
                    {/*<!-- Navbar End*/}

                    {/*Header start*/}
                    <Formik
                        initialValues={{
                            key1: "",
                            key2: ""
                        }}
                        onSubmit={(value) => {
                            find(value)
                        }}
                        enableReinitialize={true}
                    >
                        <Form>
                            <section className="banner-bg-slider animated slideInDown ">
                                <div id="bg-slider">
                                    <img src="/image/slider/banner-01.jpg" alt="image"
                                         style={{height: "500px", width: "100%"}}/>
                                </div>
                                <div className="banner-bg-slider-content">
                                    <div className="container">
                                        <div className="row justify-content-center">
                                            <div className=" col-lg-9 col-md-9 d-flex">
                                                <div className="content text-center">
                                                    <h1 className="text-white mb-2">Drop <span
                                                        className="text-white-50"> Resume &amp; Get </span> Your Desired
                                                        Job
                                                    </h1>
                                                    <p className="lead mb-4 font-weight-normal text-white">We've got
                                                        monthly
                                                        and
                                                        daily
                                                        plans that fit your needs. You can always exchange out jobs,
                                                        upgrade
                                                        or
                                                        scale
                                                        down when you need to.</p>
                                                    <div className="job-search-field">
                                                        <div className="job-search-item">
                                                            <div className="row g-2">
                                                                <div
                                                                    className="form-group mb-md-0 justify-content-center">
                                                                    <Field type="text" className="form-control"
                                                                           name={'key1'} id={'key1'}
                                                                           placeholder="Job Title, Gender or Company..."/>
                                                                    <Field as={'select'} name={'key2'}
                                                                           id={'key2'}
                                                                           className="form-select border-0"
                                                                           style={{width: "150px"}}>
                                                                        <option value=""> -- Location --</option>
                                                                        <option value="2">Ha Noi</option>
                                                                        <option value="1">Ho Chi Minh</option>
                                                                        <option value="4">Others</option>
                                                                    </Field>
                                                                    <button type="submit"
                                                                            style={{display: "flex"}}
                                                                            className="btn btn-primary btn-lg m-0 abcd">
                                                                        <i
                                                                            className="fas fa-search buttonSearch"
                                                                            style={{paddingRight: "5px"}}></i> Find Jobs
                                                                    </button>
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
                        </Form>
                    </Formik>
                    {/*Header End*/}

                    {/*Content List Job*/}
                    <div className={"container-searchPage "}>
                        <div className="grid1 wide1">

                            {/*Menu select-option*/}
                            <div className="row1">
                                <div className="col1 l-31">
                                    <div className={' row-nav'}>
                                        <h4 className={'title-search-nav'}> Find your style </h4>
                                        <div className={'sortBy-time'}>
                                            {/*<h5 className={'title-name-sort'}> Sort by: </h5>*/}
                                            <select id={'optional'} onChange={(event) => sortJob(event)}
                                                    className="btn btn-link">
                                                <option className={'optionBy'} value=""> --- Sort By ---</option>
                                                <option className={'optionBy'} value="newest">Newest</option>
                                                <option className={'optionBy'} value="oldest">Oldest</option>
                                                <option className={'optionBy'} value="salaryMin">Salary Up
                                                </option>
                                                <option className={'optionBy'} value="salaryMax">Salary Down
                                                </option>
                                            </select>
                                        </div>
                                        <br/>
                                        <Formik initialValues={{
                                            city: searchValue.city,
                                            typeTime: searchValue.typeTime,
                                            expiration: searchValue.expiration,
                                            salary: searchValue.salary,
                                            gender: searchValue.gender
                                        }}
                                                onSubmit={() => {
                                                    submitSearch()

                                                }}>
                                            <Form>
                                                <hr style={{width: '100%'}}/>
                                                <div style={{fontSize: "2px"}}>
                                                    <button className={'btn btn btn-outline-info abcdef'}
                                                            style={{width: "110px", fontSize: "15px"}} type={"submit"}><i className="fa fa-filter fa-lg"><span style={{marginRight: "5px"}}></span>Find </i>
                                                    </button>
                                                    <button className={'btn btn btn-outline-warning abcdef'} type={"reset"}
                                                            onClick={resetValue}
                                                            style={{marginLeft: 8, padding: "7px 17px", width: "110px", fontSize: "15px"}}><i className="fas fa-eraser fa-lg"><span style={{marginRight: "5px"}}></span>Reset </i>
                                                    </button>
                                                </div>
                                                <br />
                                                <div className={'col1 l-31 form-search'}>
                                                    <ul className={'job-type-title'}><h5
                                                        className={'name-nav-check h50'}> Job
                                                        Type
                                                    </h5>
                                                        <li className={'opacity-radio'}><Field
                                                            onChange={(event) => saveValueBackup(event)}
                                                            style={{cursor: "pointer"}}
                                                            className={'job-type-check1'}
                                                            name={'typeTime'}
                                                            checked={searchValue.typeTime?.includes('Full time')}
                                                            value={'Full time'}
                                                            type="checkbox"/>
                                                            <label htmlFor="job-type-check1"><span
                                                                style={{marginRight: "5px"}}></span>Full time</label>
                                                        </li>
                                                        <li className={'opacity-radio'}><Field
                                                            style={{cursor: "pointer"}}
                                                            className={'job-type-check2'}
                                                            onChange={(event) => saveValueBackup(event)}
                                                            checked={searchValue.typeTime?.includes('Part Time')}
                                                            value={'Part Time'}
                                                            name={'typeTime'}
                                                            type="checkbox"/>
                                                            <label htmlFor="job-type-check2"><span
                                                                style={{marginRight: "5px"}}></span>Part time </label>
                                                        </li>
                                                        <li className={'opacity-radio'}><Field
                                                            style={{cursor: "pointer"}}
                                                            className={'job-type-check3'}
                                                            name={'typeTime'}
                                                            onChange={(event) => saveValueBackup(event)}
                                                            checked={searchValue.typeTime?.includes('freelance')}
                                                            value={'freelance'}
                                                            type="checkbox"/>
                                                            <label htmlFor="job-type-check3"><span
                                                                style={{marginRight: "5px"}}></span>Freelance</label>
                                                        </li>
                                                    </ul>
                                                    <hr style={{width: '180px'}}/>
                                                    <ul className={'job-type-title'}><h5
                                                        className={'h50 name-nav-check'}><span
                                                        style={{marginRight: "5px"}}></span>Address
                                                    </h5>
                                                        <li className={'opacity-radio'}><Field
                                                            style={{cursor: "pointer"}}
                                                            className={'job-type-check1'}
                                                            name={'city'}
                                                            value={'2'}
                                                            onChange={(event) => saveValueBackup(event)}
                                                            checked={searchValue.city?.includes('2')}
                                                            type="checkbox"/>
                                                            <label htmlFor="job-type-check1"><span
                                                                style={{marginRight: "5px"}}></span>Ha Noi</label></li>
                                                        <li className={'opacity-radio'}><Field
                                                            style={{cursor: "pointer"}}
                                                            className={'job-type-check2'}
                                                            name={'city'}
                                                            onChange={(event) => saveValueBackup(event)}
                                                            checked={searchValue.city?.includes('1')}
                                                            value={'1'}
                                                            type="checkbox"/>
                                                            <label htmlFor="job-type-check2"><span
                                                                style={{marginRight: "5px"}}></span>Ho Chi Minh </label>
                                                        </li>
                                                        <li className={'opacity-radio'}><Field
                                                            style={{cursor: "pointer"}}
                                                            className={'job-type-check3'}
                                                            name={'city'}
                                                            onChange={(event) => saveValueBackup(event)}
                                                            checked={searchValue.city?.includes('4')}
                                                            value={'4'}
                                                            type="checkbox"/>
                                                            <label htmlFor="job-type-check3"><span
                                                                style={{marginRight: "5px"}}></span>Others </label></li>
                                                    </ul>
                                                    <hr style={{width: 180 + 'px'}}/>
                                                    <ul className={'job-Experience'}><h5
                                                        className={'name-nav-check h50'}>Experience
                                                    </h5>
                                                        <li className={'opacity-radio'}><Field
                                                            style={{cursor: "pointer"}}
                                                            name={'expiration'}
                                                            onChange={(event) => saveValueBackup(event)}
                                                            checked={searchValue.expiration?.includes('0')}
                                                            value={'0'}
                                                            type="checkbox"/>
                                                            <label htmlFor=" job-Experience1 "><span
                                                                style={{marginRight: "5px"}}></span>Fresher</label></li>
                                                        <li className={'opacity-radio'}><Field
                                                            style={{cursor: "pointer"}}
                                                            name={'expiration'}
                                                            value={'1'}
                                                            onChange={(event) => saveValueBackup(event)}
                                                            checked={searchValue.expiration?.includes('1')}
                                                            type="checkbox"/>
                                                            <label htmlFor="job-Experience2"><span
                                                                style={{marginRight: "5px"}}></span>1 year</label></li>
                                                        <li className={'opacity-radio'}><Field
                                                            style={{cursor: "pointer"}}
                                                            name={'expiration'}
                                                            value={'2'}
                                                            onChange={(event) => saveValueBackup(event)}
                                                            checked={searchValue.expiration?.includes('2')}
                                                            type="checkbox"/>
                                                            <label htmlFor=" job-Experience3 "><span
                                                                style={{marginRight: "5px"}}></span>2 year</label></li>
                                                        <li className={'opacity-radio'}><Field
                                                            style={{cursor: "pointer"}}
                                                            name={'expiration'}
                                                            onChange={(event) => saveValueBackup(event)}
                                                            checked={searchValue.expiration?.includes('3')}
                                                            value={'3'}
                                                            type="checkbox"/>
                                                            <label htmlFor="job-Experience4"><span
                                                                style={{marginRight: "5px"}}></span>3 year</label></li>
                                                        <li className={'opacity-radio'}><Field
                                                            style={{cursor: "pointer"}}
                                                            name={'expiration'}
                                                            onChange={(event) => saveValueBackup(event)}
                                                            checked={searchValue.expiration?.includes('4')}
                                                            value={'4'}
                                                            type="checkbox"/>
                                                            <label htmlFor="job-Experience4"><span
                                                                style={{marginRight: "5px"}}></span> More than 3
                                                                year</label></li>
                                                    </ul>
                                                    <hr style={{width: 180 + 'px'}}/>
                                                    <ul className={'job-Salary'}><h5
                                                        className={'name-nav-check h50'}> Offered
                                                        Salary
                                                    </h5>
                                                        <li className={'opacity-radio'}><Field
                                                            style={{cursor: "pointer"}}
                                                            name={'salary'}
                                                            value={'0'}
                                                            onChange={(event) => saveValueBackup(event)}
                                                            checked={searchValue.salary?.includes('0')}
                                                            type="checkbox"/>
                                                            <label htmlFor='job-salary '><span
                                                                style={{marginRight: "5px"}}></span>Less than 1k
                                                            </label></li>
                                                        <li className={'opacity-radio'}><Field
                                                            style={{cursor: "pointer"}}
                                                            name={'salary'}
                                                            value={'1'}
                                                            onChange={(event) => saveValueBackup(event)}
                                                            checked={searchValue.salary?.includes('1')}
                                                            type="checkbox"/>
                                                            <label htmlFor='job-salary '><span
                                                                style={{marginRight: "5px"}}></span>1k - 2k</label></li>
                                                        <li className={'opacity-radio'}><Field
                                                            style={{cursor: "pointer"}}
                                                            name={'salary'}
                                                            value={'2'}
                                                            onChange={(event) => saveValueBackup(event)}
                                                            checked={searchValue.salary?.includes('2')}
                                                            type="checkbox"/>
                                                            <label htmlFor="job-salary"><span
                                                                style={{marginRight: "5px"}}></span> 2k - 3k</label>
                                                        </li>
                                                        <li className={'opacity-radio'}><Field
                                                            style={{cursor: "pointer"}}
                                                            name={'salary'}
                                                            onChange={(event) => saveValueBackup(event)}
                                                            checked={searchValue.salary?.includes('3')}
                                                            value={'3'}
                                                            type="checkbox"/>
                                                            <label htmlFor="job-salary "><span
                                                                style={{marginRight: "5px"}}></span>3k - 4k</label></li>
                                                        <li className={'opacity-radio'}><Field
                                                            style={{cursor: "pointer"}}
                                                            name={'salary'}
                                                            onChange={(event) => saveValueBackup(event)}
                                                            checked={searchValue.salary?.includes('4')}
                                                            value={'4'}
                                                            type="checkbox"/>
                                                            <label htmlFor="job-salary"><span
                                                                style={{marginRight: "5px"}}></span>4k - 5k</label></li>
                                                        <li className={'opacity-radio'}><Field
                                                            style={{cursor: "pointer"}}
                                                            name={'salary'}
                                                            onChange={(event) => saveValueBackup(event)}
                                                            checked={searchValue.salary?.includes('5')}
                                                            value={'5'}
                                                            type="checkbox"/>
                                                            <label htmlFor="job-salary"><span
                                                                style={{marginRight: "5px"}}></span>More than 5k</label>
                                                        </li>
                                                    </ul>
                                                    <hr style={{width: 180 + 'px'}}/>
                                                    <ul className={'job-gender'}><h5
                                                        className={'name-nav-check h50'}><span
                                                        style={{marginRight: "5px"}}></span> Gender
                                                    </h5>
                                                        <li className={'opacity-radio'}><Field
                                                            style={{cursor: "pointer"}}
                                                            name={'gender'}
                                                            onChange={(event) => saveValueBackup(event)}
                                                            checked={searchValue.gender?.includes('male')}
                                                            value={'male'}
                                                            type="checkbox"/>
                                                            <label htmlFor='job-salary '><span
                                                                style={{marginRight: "5px"}}></span> Male</label></li>
                                                        <li className={'opacity-radio'}><Field
                                                            style={{cursor: "pointer"}}
                                                            name={'gender'}
                                                            onChange={(event) => saveValueBackup(event)}
                                                            checked={searchValue.gender?.includes('female')}
                                                            value={'female'}
                                                            type="checkbox"/>
                                                            <label htmlFor="job-salary"><span
                                                                style={{marginRight: "5px"}}></span> Female</label></li>
                                                        <hr style={{width: 180 + 'px'}}/>
                                                    </ul>
                                                </div>
                                            </Form>
                                        </Formik>
                                    </div>
                                </div>
                            </div>
                            {/*Menu select-option End*/}

                            {/*Content list job*/}
                            <div className="col1 l-91">
                                <div className={'list-show-job'}>
                                    <h4 className={'tilte-list-job'}><p
                                        style={{fontSize: '22px', padding: '14px', marginBottom: "2px"}}>
                                        Total <span style={{color: "#ff8a00"}}>{listJob.length}</span> jobs for you </p>
                                    </h4>
                                    <div className={'content-job-search'} style={{width: "1050px"}}>
                                        <div className="tab-class text-center wow fadeInUp" data-wow-delay="0.3s">
                                            <div className="tab-content">
                                                <div id="tab-1" className="tab-pane fade show p-0 active">
                                                    {listJob.map((item) => {
                                                        return (
                                                            <Link className="btn btn-link w-100" to={`/user-job-detail/${item.id}`}>
                                                                <div className="job-item abcd p-4 mb-4">
                                                                    <div className="row g-4">
                                                                        <div
                                                                            className="col-sm-12 col-md-8 d-flex align-items-center">
                                                                            <img
                                                                                className="flex-shrink-0 img-fluid border rounded"
                                                                                src={item.company?.imagePath}
                                                                                style={{width: 80, height: 80}}
                                                                                alt="image"/>
                                                                            <div className="text-start ps-8"
                                                                                 style={{marginLeft: "8px"}}>
                                                                                <h5 className="mb-3">{item.employeeType?.name} - {item.company?.account?.name}</h5>
                                                                                <span className="text-truncate me-3"><i
                                                                                    className="fa fa-map-marker-alt text-primary me-2"></i>{item.company?.address}</span>
                                                                                <span className="text-truncate me-3"><i
                                                                                    className="far fa-clock text-primary me-2"></i>{item.typeTime}</span>
                                                                                <span className="text-truncate me-3"><i
                                                                                    className="fas fa-venus-double me-3"></i>{item.gender}</span>
                                                                                <span className="text-truncate me-3"><i
                                                                                    className="fas fa-user-friends me-3"></i>{item.quantity}</span>
                                                                                <span className="text-truncate me-0"><i
                                                                                    className="far fa-money-bill-alt text-primary me-2"></i>${item.salaryMin} - ${item.salaryMax}</span>
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            className="col-sm-12 col-md-4 d-flex flex-column align-items-start align-items-md-end justify-content-center">
                                                                            <div className="d-flex mb-3">
                                                                                <Link to={''}
                                                                                      className="btn btn-light btn-square me-3"><i
                                                                                    className="far fa-heart text-primary"></i></Link>
                                                                                <button className="btn btn-primary"
                                                                                        onClick={() => {
                                                                                            ApplyJob(item.id)
                                                                                        }}>Apply Now
                                                                                </button>
                                                                            </div>
                                                                            <small className="text-truncate"><i
                                                                                className="far fa-calendar-alt text-primary me-2"></i>Date
                                                                                Create: {item.startDate}</small>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        )
                                                    })}
                                                    {check?<div></div>:
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
                                                        </div>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*Content list job end*/}
                        </div>

                    </div>
                    {/*Content List Job End*/}
                </div>
            </div>

            {/*Footer Start*/}
            <div className={'footer-site-search'} style={{marginTop: '500px'}}>
                <div className="container-fluid bg-dark text-white-50 footer pt-5 mt-5">
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
                <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top"><i
                    className="fas fa-angle-up"></i></a>
            </div>
            {/*Footer End*/}
        </>
    )

    //Function tim kiem chi tiet
    function submitSearch() {
        let timerInterval
        Swal.fire({
            title: 'Waiting loading...!',
            html: 'Display the result after <b></b> milliseconds.',
            timer: 500,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                    b.textContent = Swal.getTimerLeft()
                }, 100)
                window.scrollTo(window.innerWidth, 400);
            },
            willClose: () => {
                clearInterval(timerInterval)
            },
        }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
                axios.post('http://localhost:8080/jobs/search-all', searchValue).then((response) => {
                    setListJob(response.data)
                    setCount(response.data.length)
                    setCheck(true)
                    window.scrollTo(window.innerWidth, 400);
                }).catch(() => {
                    navigate('/err')
                })
            }
        })
    }

    //Function tim kiem nhanh
    function find(value) {
        let timerInterval
        Swal.fire({
            title: 'Waiting loading...!',
            html: 'Display the result after <b></b> milliseconds.',
            timer: 500,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                    b.textContent = Swal.getTimerLeft()
                }, 100)
                window.scrollTo(window.innerWidth, 400);
            },
            willClose: () => {
                clearInterval(timerInterval)
            },
        }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
                axios.post(`http://localhost:8080/jobs/findByKeyWord`, value).then((response) => {
                    setListJob(response.data)
                    setCheck(true)
                }).catch(() => {
                    navigate('/err')
                })
            }
        })
    }

    function sortJob(e) {
        let timerInterval
        Swal.fire({
            title: 'Waiting loading...!',
            html: 'Display the result after <b></b> milliseconds.',
            timer: 500,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                    b.textContent = Swal.getTimerLeft()
                }, 100)
                window.scrollTo(window.innerWidth, 400);
            },
            willClose: () => {
                clearInterval(timerInterval)
            },
        }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
                let sort = e.target.value
                axios.post(`http://localhost:8080/jobs/sort?sort=${sort}`).then((response) => {
                    setListJob(response.data)
                    setCheck(true)
                }).catch(() => {
                    navigate('/err')
                })
            }
        })
    }

    function saveValueBackup(event) {
        let nameKey = event.target.name;
        let valueKey = event.target.value;
        if (Array.isArray(searchValue[nameKey])) {
            if (searchValue[nameKey].includes(valueKey)) {
                const newArr = searchValue[nameKey].filter(item => item !== valueKey)
                sessionStorage.setItem(nameKey, JSON.stringify(newArr));
            } else {
                const newArr = [...searchValue[nameKey], valueKey];
                sessionStorage.setItem(nameKey, JSON.stringify(newArr));
            }
        } else {
            sessionStorage.setItem(nameKey, JSON.stringify([valueKey]));
        }
        setFlag(!flag);
    }

    function backupSearchValue() {
        let typeTime = JSON.parse(sessionStorage.getItem('typeTime'));
        let city = JSON.parse(sessionStorage.getItem('city'));
        let expiration = JSON.parse(sessionStorage.getItem('expiration'));
        let salary = JSON.parse(sessionStorage.getItem('salary'));
        let gender = JSON.parse(sessionStorage.getItem('gender'));
        if (typeTime !== null || city !== null || expiration !== null || salary !== null || gender !== null) {
            setSearchValue({
                city: city !== null ? city : [],
                typeTime: typeTime !== null ? typeTime : [],
                expiration: expiration !== null ? expiration : [],
                salary: salary !== null ? salary : [],
                gender: gender !== null ? gender : []
            })
        }
    }

    function resetValue() {
        sessionStorage.setItem('city', JSON.stringify([]));
        sessionStorage.setItem('typeTime', JSON.stringify([]));
        sessionStorage.setItem('expiration', JSON.stringify([]));
        sessionStorage.setItem('salary', JSON.stringify([]));
        sessionStorage.setItem('gender', JSON.stringify([]));
        setFlag(!flag)
    }
}

