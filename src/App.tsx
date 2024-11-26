import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import PersonalAccount from "./screens/PersonalAccount/PersonalAccount";
import BIlling from "./screens/Billing/Billing";
import PrivateRoute from "./components/Auth/PrivateRoute";
import LoginPage from "./screens/Login/LoginPage";

//import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <PersonalAccount />
            </PrivateRoute>
          }
        />
        <Route
          path="/billing"
          element={
            <PrivateRoute>
              <BIlling />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
