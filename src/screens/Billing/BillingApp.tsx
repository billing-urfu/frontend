import Sidebar from "@/components/ui/sidebar";
import { Route, Routes } from "react-router-dom";
import Users from "./BillingScrens/Users";
import FinStatistics from "./BillingScrens/FinStatistics";
import RepAndAnalytics from "./BillingScrens/RepAndAnalytics";
//import PrivateRoute from "@/components/Auth/PrivateRoute";

function BillingApp() {
  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
      <div className="flex inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80" />
        <div className="absolute inset-0 backdrop-blur-sm" />
      </div>
      <Sidebar />
      <Routes>
        <Route path="users" element={<Users />} />
        <Route path="finansInfo" element={<FinStatistics />} />
        <Route path="otchet" element={<RepAndAnalytics />} />
        <Route path="eventlog" />
      </Routes>
    </div>
  );
}

export default BillingApp;
