import './App.css'
import CreateEvent from './pages/CreateEvent'

function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <CreateEvent />
    </div>
  )
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
