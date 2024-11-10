import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import PersonalAccount from "./screens/PersonalAccount/PersonalAccount";
import BIlling from "./screens/Billing/Billing";
//import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<PersonalAccount />} />
        <Route path="/Billing" element={<BIlling />} />
      </Routes>
    </>
  );
}

export default App;
