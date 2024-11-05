import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";
import ShoppingFooter from "./footer";
import ScrollToTopButton from "./scroll-to-top-button";

function ShoppingLayout() {
  return (
    <div className="flex flex-col bg-white overflow-hidden">
      {/* common header */}
      <ShoppingHeader />
      <main className="flex flex-col w-full">
        <Outlet />
      </main>
      <ScrollToTopButton />
      <ShoppingFooter/>
    </div>
  );
}

export default ShoppingLayout;
