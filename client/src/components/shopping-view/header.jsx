import {LogOut, Menu, ShoppingCart, UserCog} from "lucide-react";
import TitleText from "./header-text";
import AnimatedTitle from "./header-text";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import { Label } from "../ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser, resetTokenAndCredentials } from "@/store/auth-slice";
import UserCartWrapper from "./cart-wrapper";
import { useEffect, useState } from "react";
import { fetchCartItems } from "@/store/shop/cart-slice";


const style_sphere =() => (
  <svg version="1.1" viewBox="0 0 2000 2000" width="50" height="50" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <clipPath id="circleClip">
      <circle cx="1000" cy="1000" r="900" />
    </clipPath>
  </defs>
    <g clip-path="url(#circleClip)">
        <path transform="translate(0)" d="m0 0h2e3v2e3h-2e3z" fill="#FDFDF4"/>
        <path transform="translate(1171,491)" d="m0 0h35l38 3 46 8 22 6 33 11 38 15 32 13 21 7 12 3 14 1 15-3 10-5 7-6 8-14 6-14 7-24 1-1h31v400l-4 1h-21l-7-1-3-15-7-40-10-42-12-36-9-21-13-26-18-27-10-13-15-16-8-9-11-9-11-10-21-14-25-15-27-13-40-14-31-6-25-3-13-1h-30l-26 3-23 6-23 8-16 8-18 11-16 13-8 7-14 14-13 17-11 19-8 18-5 17-3 16-1 12v12l3 24 6 20 7 16 8 14 13 17 11 12 16 16 11 9 13 11 19 14 19 13 27 18 20 12 16 10 26 15 21 12 18 10 32 17 22 12 29 16 25 14 52 30 26 16 19 12 27 18 18 13 11 9 14 12 12 11 12 12 18 22 13 19 10 17 12 23 10 24 8 26 6 31 2 22 1 15v11l-2 29-5 30-8 29-10 26-8 17-9 16-14 21-10 13-12 14-7 8-20 20-22 18-18 13-16 10-24 13-25 11-19 7-25 7-34 7-37 5-16 1h-40l-34-2-43-5-23-5-47-14-54-17-33-10-40-10-13-2h-15l-12 3-9 6-7 8-6 12-6 19-4 16-1 1h-29l-1-1v-396h31l2 5 8 40 10 40 9 30 10 27 12 27 8 15 13 19 11 14 10 10 7 8 9 9 28 22 19 12 19 11 19 9 19 8 28 9 26 6 26 5 18 2 22 1h23l26-2 27-4 25-6 19-7 22-10 16-10 12-9 11-9 16-16 8-10 10-14 12-23 7-19 5-23 1-9v-31l-3-19-6-21-8-20-11-21-8-12-10-13-9-10-7-8-11-11-11-9-12-10-20-14-46-28-48-28-25-14-21-12-25-14-43-25-29-17-15-9-26-16-19-12-14-9-12-8-19-13-18-13-14-11-11-9-10-9-8-7-13-13-7-8-10-11-18-24-17-28-13-29-6-18-6-23-4-24-2-27v-20l3-30 4-23 8-28 11-28 13-25 15-22 10-13 11-13 10-10 2-3h2l2-4h2l2-4 12-11 8-7 13-10 12-8 14-9 18-10 16-7 23-9 27-8 34-7 29-4z" fill="#380B77"/>
        <path transform="translate(807,278)" d="m0 0h40l29 2 28 4 37 7 24 7 26 9 30 12 37 15 24 9 16 4 8 1h11l16-4 10-5 10-9 8-15 8-24 3-12 1-1h33l1 8v126l-1 9-49 2-37 4-24 4-29 7-9 1-13-11-16-13-16-10-19-12-29-15-19-7-31-10-35-7-34-3h-29l-26 3-25 5-21 7-23 11-18 11-13 10-10 9-8 7-12 13-14 19-10 17-8 18-6 20-3 15-1 8v24l3 22 6 20 7 16 9 15 13 17 9 10 4 4v2l4 2v2l4 2 9 9 8 7 16 13 12 9 14 10 23 16 19 12 9 6 1 6-2 15-1 20v23l2 30 4 25 5 25 10 32 9 21 9 19 14 24 11 17 6 7v2l-5-2-17-10-22-12-24-14-23-13-40-24-26-16-17-11-39-26-18-13-12-9-11-9-14-12-16-14-7-8-13-13-11-14-10-13-10-15-12-20-13-27-10-30-6-25-3-18-2-28v-24l2-24 4-27 6-24 7-21 11-25 13-24 14-21 13-16 9-11 14-14 2-3h2l2-4 8-7 14-12 13-10 15-10 13-8 22-12 28-12 25-9 28-7 36-6 15-2z" fill="#4F0079"/>
        <path transform="translate(486,1139)" d="m0 0h33l2 6 9 43 10 40 11 36 12 32 15 31 14 21 14 19 14 15 14 14 14 11 17 13 27 16 16 9 29 13 18 7 35 10 5 2 1 70-2 2-41-11-46-14-45-15-37-11-25-6-19-3h-16l-8 2-10 5-9 8-8 14-5 16-6 24h-32l-1-1z" fill="#4F0079"/>
        <path transform="translate(1103,1199)" d="m0 0 35 19 27 16 24 13 24 14 27 15 35 21 2 3-4 15-11 30-15 30-20 30-13 16-8 10-7 8-7 6-15 15-11 9-12 10-18 13-17 11-26 14-6 3-6-1-13-9-16-13-12-11-7-8-10-13-4-6 2-4 11-6 17-12 13-11 17-17 8-10 10-14 10-17 8-19 6-19 4-23v-34l-4-24-6-21-8-20-4-7z" fill="#4F0079"/>
        <path transform="translate(1191,630)" d="m0 0h15l1 8v55l-1 8-1 1h-31l-2-2-10-60-1-7 1-1z" fill="#4F0079"/>
    </g>
</svg>
  );

function MenuItems() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleNavigate(getCurrentMenuItem) {
    sessionStorage.removeItem("filters");
    const currentFilter =
      getCurrentMenuItem.id !== "home"
        && getCurrentMenuItem.id !== "products"
        && getCurrentMenuItem.id !== "search"
        ? {
          category: [getCurrentMenuItem.id],
        }
        : null;

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    location.pathname.includes("listing") && currentFilter !== null
      ? setSearchParams(
        new URLSearchParams(`?category=${getCurrentMenuItem.id}`)
      )
      : navigate(getCurrentMenuItem.path);
  }
  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {shoppingViewHeaderMenuItems.map(menuItem => (
        <Label
          onClick={() => handleNavigate(menuItem)}
          className="text-sm font-medium cursor-pointer" key={menuItem.id} to={menuItem.path}>{menuItem.label}</Label>
      ))}
    </nav>
  )
}

function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const totalQuantity = cartItems?.items?.reduce((sum, item) => sum + (item.quantity || 0), 0);;

  function handleLogout() {
    // dispatch(logoutUser());
    dispatch(resetTokenAndCredentials());
    sessionStorage.clear();
    navigate("/auth/login");
  }

  useEffect(() => {
    dispatch(fetchCartItems(user?.id));
  }, [dispatch]);

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4"> 
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button onClick={() => setOpenCartSheet(true)} variant="outline"
          size="icon"
          className="relative"
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="absolute top-[-5px] right-[2px] font-bold text-sm">
            {totalQuantity || 0}
          </span>
          <span className="sr-only">User cart</span>
        </Button>
        <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items
            : []} />
      </Sheet>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black">
            <AvatarFallback className="bg-black text-white font-extrabold cursor-pointer">
              {user?.userName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/shop/account")}>
            <UserCog className="mr-2 h-4 w-4" />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>)
}


function ShoppingHeader() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6 bg-pink-300">
        <Link to="/shop/home" className="flex items-center gap-2">
          {style_sphere()}
          {/* <span className="font-bold">Style Sphere</span> */}
          <TitleText/>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs">
            <MenuItems />
            <HeaderRightContent />
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <MenuItems />
        </div>
        <div className="hidden lg:block">
          <HeaderRightContent />
        </div>
      </div>
    </header>
  )
}

export default ShoppingHeader;

