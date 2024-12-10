import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import PersonalAccount from "./screens/PersonalAccount/PersonalAccount";
import BillingApp from "./screens/Billing/BillingApp";
import PrivateRoute from "./components/Auth/PrivateRoute";
import LoginPage from "./screens/Login/LoginPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/billing"
          element={
            <PrivateRoute requiredRole="admin">
              <BillingApp />
            </PrivateRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute requiredRole="user">
              <PersonalAccount />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
