import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import PageNotFound from "./pages/PageNotFound";
import AuthRoute from "./components/AuthRoute";
import { useDispatch } from "react-redux";
import { login } from "./reducer/authSlice";
import ViewBill from "./pages/ViewBill";
import ManageCategory from "./pages/ManageCategory";
import ManageProduct from "./pages/ManageProduct";
import ManageOrder from "./pages/ManageOrder";
import ManageUsers from "./pages/ManageUsers";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(login(token));
    }
  }, [dispatch]);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthRoute component={Home} />} />
          <Route path="/manageCategory" element={<AuthRoute component={ManageCategory} />} />
          <Route path="/manageProduct" element={<AuthRoute component={ManageProduct} />} />
          <Route path="/manageOrder" element={<AuthRoute component={ManageOrder} />} />
          <Route path="/viewBill" element={<AuthRoute component={ViewBill} />} />
          <Route path="/manageUsers" element={<AuthRoute component={ManageUsers} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
