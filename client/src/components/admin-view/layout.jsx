import { Outlet } from "react-router-dom";
import AdminSideBar from "./sidebar";
import AdminHeader from "./header";
import { useState } from "react";
import ScrollToTopButton from "../shopping-view/scroll-to-top-button";
import ShoppingFooter from "../shopping-view/footer";

function AdminLayout() {
  const [openSidebar, setOpenSidebar] = useState(false);
    return (
      <div className="flex min-h-screen w-full">
        {/* admin sidebar */}
        <AdminSideBar open={openSidebar} setOpen={setOpenSidebar}/>
        <div className="flex flex-1 flex-col">
          {/* admin header */}
          <AdminHeader setOpen={setOpenSidebar}/>
          <main className="flex-1 flex-col flex bg-muted/40 p-4 md:p-6">
            <Outlet />
          </main>
          <ScrollToTopButton />
          <ShoppingFooter/>
        </div>
      </div>
    );
  }
  
  export default AdminLayout;