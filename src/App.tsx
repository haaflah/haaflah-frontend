import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SigninPage from "./pages/SignInPage";

function App() {
  return (
    <Routes>
      <Route index element={<LandingPage />} path="/" />
      <Route index element={<SigninPage />} path="/sign-in" />
    </Routes>
  );
}

export default App;
