import { Route, Routes } from "react-router-dom";
import SigninPage from "./pages/SignInPage";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Routes>
      <Route element={<SigninPage />} path="/" >
        <Route index element={<SigninPage />} path="sign-in" />
      </Route>
      <Route index element={<Dashboard />} path="/dashboard" />
    </Routes>
  );
}

export default App;
