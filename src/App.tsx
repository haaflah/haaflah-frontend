import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SigninPage from "./pages/SignInPage";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Routes>
      <Route index element={<LandingPage />} path="/" />
      <Route index element={<SigninPage />} path="/sign-in" />
      <Route index element={<Dashboard />} path="/dashboard" />
    </Routes>
  );
}

export default App;
