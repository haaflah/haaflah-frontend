
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <Routes>
      <Route index element={<LandingPage />} path="/" />
    </Routes>
  );
}

export default App;
