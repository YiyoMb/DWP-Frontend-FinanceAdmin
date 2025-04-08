import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import Goals from "./pages/Goals/Goals";
import Budget from "./pages/Budget/Budget";
import Train from "./pages/Train/Train";
import Forum from "./pages/Forum/Forum";
import ForgotPassword from "./pages/Auth/Components/ForgotPassword"
import ResetPassword from "./pages/Auth/Components/ResetPassword"
import MFASetup from "./pages/Auth/Components/MFASetup";
import './index.css';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/budget" element={<Budget />} />
            <Route path="/train" element={<Train />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/setup-mfa" element={<MFASetup />} />
        </Routes>
      </Router>
  );
}

export default App;
