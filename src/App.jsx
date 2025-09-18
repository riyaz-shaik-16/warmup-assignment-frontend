import Login from "./components/Login";
import Register from "./components/Register";
import CompanyInfo from "./components/CompanyInfo";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import SetupLayout from "./pages/SetupLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/Dashboard";
import PublicRoute from "./components/PublicRoute";

const App = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000} // auto-close in 3 seconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        {/* <Route path="/company-info" element={<CompanyInfo />} /> */}
        <Route element={<ProtectedRoute />}>
          <Route path="/setup" element={<SetupLayout />}>
            <Route path="company-info" element={<CompanyInfo />} />
            {/* <Route path="/> */}
          </Route>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
