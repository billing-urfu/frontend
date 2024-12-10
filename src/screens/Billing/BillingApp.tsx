import Sidebar from "@/components/ui/sidebar";
import { Route, Routes } from "react-router-dom";
import Hz1 from "./hz1";

function BillingApp() {
  return (
    <>
      <div>
        <p>ХАй</p>
      </div>
      <Sidebar />
      <div>
        <Routes>
          <Route path="/billing/hz1" element={<Hz1 />} />
          <Route path="/hz2" />
          <Route path="/hz3" />
          <Route path="/hz4" />
        </Routes>
      </div>
    </>
  );
}

export default BillingApp;
