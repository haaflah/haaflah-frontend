import { Route, Routes } from "react-router-dom";
import SigninPage from "./pages/SignInPage";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import RegistrationPage from "./pages/RegistrationPage";


function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      {/* Sign-in page */}
      <Route path="/sign-in" element={<SigninPage />} />
      {/* Dashboard page */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/registration-demo" element={<RegistrationPage/>} />
    </Routes>
  );
}

export default App;
