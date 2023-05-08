import Main from './components/Main.js'
import Footer from './components/structure/Footer.js';
import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";


function App1() {
    const param = useParams();
    const [user, setUser] = useState({});
    const [notification,setNotification]=useState([])
    const [count, setCount] = useState(0);
    const [flag, setFlag] = useState(false)
    useEffect(() => {
        axios.get(`http://localhost:8080/users/${param.id}`).then((response) => {
                setUser(response.data);
                GetNotification(response.data.account?.id)
            });

    }, []);
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

    // Thông báo khi user apply job
    function GetNotification(id) {
        axios.post(`http://localhost:8080/notification/${id}`).then((res)=>{
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
            icon: 'question',
            title: 'Notification from the Company.',
            width: 650,
            color: '#ff6600',
            html: `<ul>${listItems}</ul>`,
        })
    }
    return (
        <div className="App" style={{textAlign: "unset"}}>

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

            <Main props={user}/>
            <Footer/>
        </div>
    );
}

export default App1;
