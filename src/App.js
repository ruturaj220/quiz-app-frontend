import React from "react";
import {BrowserRouter as Router, Routes, Route, Outlet, useParams} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AddQuestions from "./pages/Admin/AddQuestions";
import AdminProfile from "./pages/Admin/AdminProfile";
import ShowQuestions from "./pages/Admin/ShowQuestions";
import QuizGenerate from "./pages/Admin/QuizGenerate";
import QuestionList from "./pages/Admin/QuestionList";
import QuizList1 from "./pages/Admin/QuizList1";
import UserDashboard from "./pages/User/UserDashboard";
import UserProfile from "./pages/User/UserProfile";
import Quiz from "./pages/User/Quiz";
import UserList from "./pages/Admin/UserList";
import ForgotPassword from "./pages/ForgotPassword";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundCancellationPolicy from "./pages/RefundCancellationPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import Contact from "./pages/Contact";

function App() {
  function NonAdminLayout() {
    return (
        <div>
          <Navbar />
          <Outlet />
        </div>
    );
  }
    function UserLayout() {
        const { username } = useParams();
        return (
            <div>
               <UserDashboard username={username}/>
            </div>
        );
    }

  return (

      <div>
        <Router>
          <Routes>
            <Route path="/" element={<NonAdminLayout />}>
              {/* Non-admin routes */}
                <Route index element={<Home />} />
                <Route path="signUp" element={<SignUp />} />
                <Route path="signIn" element={<SignIn />} />
                <Route path="privacyPolicy" element={<PrivacyPolicy/>}/>
                <Route path="RefundCancellationPolicy" element={<RefundCancellationPolicy/>}/>
                <Route path="TermsAndConditions" element={<TermsAndConditions/>}/>
                <Route path="contactUs" element={<Contact/>}/>
                <Route path="forgotPassword" element={<ForgotPassword/>}/>
            </Route>
            <Route path="/admin" element={<AdminDashboard />}>
              {/* Admin routes */}
                <Route path="profile" element={<AdminProfile />} />
                <Route path="addQuestions" element={<AddQuestions />} />
                <Route path="allQuestions" element={<ShowQuestions />} />
                <Route path="quizGenerate" element={<QuizGenerate/>}/>
                <Route path="quizList1" element={<QuizList1 />}/>
                <Route path="quiz/:quizId/questions" element={<QuestionList/>} />
                <Route path="getAllUser" element={<UserList />}/>
            </Route>
              <Route path="/user/:username" element={<UserLayout/>}>
                  {/*{User routes}*/}
                  <Route path="profile" element={<UserProfile />}/>
                  <Route path="quiz" element={<Quiz/>}/>
              </Route>
          </Routes>
        </Router>
      </div>
  );
}

export default App;
