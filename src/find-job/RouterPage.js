import {Route, Routes} from "react-router-dom";
import Err404 from "./404";
import HomePage from "./HomePage";
import CompanyMangerJob from "./company/CompanyMangerJob";
import CompanyHomePage from "./company/CompanyHomePage";
import CompanyPostNewJob from "./company/CompanyPostNewJob";
import JobDetail from "./company/JobDetail";
import CompanyEditJob from "./company/CompanyEditJob";
import LoginForm from "./login/LoginForm";
import Signup from "./login/Signup";
import SearchPage from "./searchpage/SearchPage";
import CompanyMangerUser from "./company/CompanyMangerUser";
import UserManagerJob from "./user/user-manager-job";
import UserChangePassword from "./user/user-change-password";
import UserSearchPage from "./user/user-search-page";
import AboutPage from "./AboutPage";
import UserMyProfile from "./user/user-my-profile";
import App1 from "../demo1/App";
import CompanyUpdateProfile from "./company/Company-update-profile";
import CompanyViewUser from "./company/Company-view-user";
import UserJobDetail from "./user/user-job-detail";
import ViewCompanyDetail from "./ViewCompanyDetail";

function RouterPage() {
    return (
        <>
            <Routes>
                {/*Home page*/}
                <Route index element={<HomePage />} />
                <Route path={'home-page'} element={<HomePage />} />
                <Route path={'about'} element={<AboutPage />} />
                <Route path={'view-company-detail/:id'} element={<ViewCompanyDetail />} />

                {/*Search*/}
                <Route path={'search-page'} element={<SearchPage  />} />

                {/*Login*/}
                <Route path={'/login'} element={<LoginForm />} />
                <Route path={'/signup'} element={<Signup />} />

                {/*Company*/}
                <Route path={'company-manager-job/:id'} element={<CompanyMangerJob />} />
                <Route path={'company-post-new-job/:id'} element={<CompanyPostNewJob />} />
                <Route path={'company-edit-job/:id'} element={<CompanyEditJob />} />
                <Route path={'company-home/:id'} element={<CompanyHomePage />} />
                <Route path={'job-detail/:id'} element={<JobDetail />} />
                <Route path={'company-manger-user/:id'} element={<CompanyMangerUser />} />
                <Route path={'company-update-profile/:id'} element={<CompanyUpdateProfile />} />
                <Route path={'company-view-user-profile/:id'} element={<CompanyViewUser />} />

                {/*User*/}
                <Route path={'user-my-profile/:id'} element={<UserMyProfile />} />
                <Route path={'user-manager-job/:id'} element={<UserManagerJob />} />
                <Route path={'user-change-password/:id'} element={<UserChangePassword />} />
                <Route path={'user-search-page/:id'} element={<UserSearchPage />} />
                <Route path={'user-job-detail/:id'} element={<UserJobDetail />} />

                {/*Error*/}
                <Route path={'err'} element={<Err404 />} />
                <Route path={'create-cv/:id'} element={<App1 />} />

            </Routes>
        </>
    )
}
export default RouterPage