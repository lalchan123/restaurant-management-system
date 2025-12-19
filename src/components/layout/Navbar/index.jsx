'use client';
import Image from "next/image";
import dynamic from "next/dynamic";
import {
  LuHeart,
  LuLogOut,
  LuMenu,
  LuSearch,
  LuShoppingCart,
  LuUser,
  LuUserCircle,
  LuHeartPulse,
  LuHexagon,
  LuHighlighter,
  LuKeySquare,
  LuHome,
} from "react-icons/lu";
import SimplebarReactClient from "@/components/SimplebarReactClient";
import TabNavigation from "./TabNavigation";
import VerticalMenu from "./VerticalMenu";
import { OfferAdBanner } from "@/components";
import { logoDarkImg, logoLightImg } from "@/assets/data/images";
import { getAPIPostDataByRefId, getClientVerticalMenuItems, getHorizontalMenuItems } from "@/helpers";
import ProductSearchBar from "./ProductSearchBar";
import Link from "next/link";
import CartAndWishList from "./CartAndWishList";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from '@mui/material/DialogTitle';
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Tooltip from "@mui/material/Tooltip";
import TextField from '@mui/material/TextField';
import { useRouter } from "next/navigation";
const HorizontalMenu = dynamic(() => import("./HorizontalMenu"));
const StickyHeader = dynamic(() => import("@/components/StickyHeader"), {
  ssr: false,
});

const Navbar = async() => {
  
  const { data: session } = useSession();
  const router = useRouter();
  // console.log("session?.user?.data[0]?.user_id;", session?.user?.data[0]?.user_id)
  // console.log("session?.user?.data[0]", session?.user)
  const [pagesData, SetPagesData] = useState([]);
  const [pageName, SetPageName] = useState("");

 

  
  useEffect(() => {
    DataFetch()
  }, [])
    
  const DataFetch = async () => {
    const pagesDataList = await getAPIPostDataByRefId(51, "", localStorage.getItem("user_id"));
    console.log("56 pagesDataList?.data", pagesDataList?.data)
    SetPagesData(pagesDataList?.data);
    localStorage.removeItem("pageName");
  }

  const [createPageShow, SetCreatePageShow] = useState(false)
  const handleCreatePageClose = () => {
    SetCreatePageShow(false)
  }
  const PageShowRedirect = () => {
    router.push("/webpage/web-page");
  }

  return (
    <>
      <OfferAdBanner />

      <StickyHeader>
        <div className="flex h-14 items-center lg:h-20 bg-green-600/5">
          <div className="container">
            <div className="grid grid-cols-2 items-center gap-4 lg:grid-cols-3">
              <div className="flex">
                <button
                  className="block lg:hidden "
                  data-hs-overlay="#mobile-menu"
                >
                  <LuMenu
                    size={28}
                    // className="me-4 text-default-600 hover:text-primary"
                    className="me-4 text-default-600 hover:text-green-500"
                  />
                </button>

                <Link href="/">
                  <Image
                    src={logoDarkImg}
                    height={250}
                    width={250}
                    alt="logo"
                    className="flex h-10 dark:hidden"
                    placeholder="blur"
                    priority
                  />
                  <Image
                    src={logoLightImg}
                    height={250}
                    width={250}
                    alt="logo"
                    className="hidden h-10 dark:flex"
                    placeholder="blur"
                    priority
                  />
                </Link>
              </div>

              <HorizontalMenu menuItems={getHorizontalMenuItems()} />

              <ul className="flex items-center justify-end gap-x-6">
                <li className="menu-item relative hidden 2xl:flex">
                  <ProductSearchBar />
                </li>

                <li className="menu-item flex 2xl:hidden">
                  <button
                    data-hs-overlay="#mobileSearchSidebar"
                    // className="relative flex text-base text-default-600 transition-all hover:text-primary"
                    className="relative flex text-base text-default-600 transition-all hover:text-green-500"
                  >
                    <LuSearch size={20} />
                  </button>
                </li>

                <CartAndWishList />

                <li className="menu-item flex">
                  <div className="hs-dropdown relative inline-flex [--placement:bottom] [--trigger:hover]">
                    {/* <div className="hs-dropdown-toggle relative flex cursor-pointer items-center text-base text-default-600 transition-all after:absolute after:inset-0 hover:text-primary hover:after:-bottom-10"> */}
                    <div className="hs-dropdown-toggle relative flex cursor-pointer items-center text-base text-default-600 transition-all after:absolute after:inset-0 hover:text-green-500 hover:after:-bottom-10">
                      <LuUser size={20} />
                    </div>
                    <div className="hs-dropdown-menu z-20 mt-4 hidden min-w-[200px] rounded-lg border border-default-100 bg-white p-1.5 opacity-0 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] transition-[opacity,margin] hs-dropdown-open:opacity-100 dark:bg-default-50">
                      {
                        session?.user?.data[0]?.user_role_type === 'user' ? 
                          // session?.user?.data && session.user.data.length > 0 
                          //   ? session.user.data[0]?.user_role_type 
                          //   : null === 'user' ? 
                            <ul className="flex flex-col gap-1">
                              <li>
                                <Link
                                  className="flex items-center gap-3 rounded px-3 py-2 font-normal text-default-600 transition-all hover:bg-default-100 hover:text-default-700"
                                  href="/user/dashboard"
                                  target="_blank"
                                >
                                  <LuHome size={16} /> User Dashboard
                                </Link>
                              </li>
                              <li>
                                <Link
                                  className="flex items-center gap-3 rounded px-3 py-2 font-normal text-default-600 transition-all hover:bg-default-100 hover:text-default-700"
                                  href="/user/profile"
                                  target="_blank"
                                >
                                  <LuUserCircle size={16} /> User Profile
                                </Link>
                              </li>
                              <li>
                                <Link
                                  className="flex items-center gap-3 rounded px-3 py-2 font-normal text-default-600 transition-all hover:bg-default-100 hover:text-default-700"
                                  href="/cart"
                                >
                                  <LuShoppingCart size={16} />
                                  Cart
                                </Link>
                              </li>
                              <li>
                                <Link
                                  className="flex items-center gap-3 rounded px-3 py-2 font-normal text-default-600 transition-all hover:bg-default-100 hover:text-default-700"
                                  href="/wishlist"
                                >
                                  <LuHeart size={16} />
                                  Wishlist
                                </Link>
                              </li>
                              <li>
                                <Link
                                  className="flex items-center gap-3 rounded px-3 py-2 font-normal text-default-600 transition-all hover:bg-default-100 hover:text-default-700"
                                  href="/checkout"
                                >
                                  <LuHeart size={16} />
                                  Checkout
                                </Link>
                              </li>
                              <li>
                                <Link
                                  className="flex items-center gap-3 rounded px-3 py-2 font-normal text-default-600 transition-all hover:bg-default-100 hover:text-default-700"
                                  href="/faqs"
                                >
                                  <LuHeart size={16} />
                                  FAQ
                                </Link>
                              </li>
                              <li>
                                <Link
                                  className="flex items-center gap-3 rounded px-3 py-2 font-normal text-default-600 transition-all hover:bg-default-100 hover:text-default-700"
                                  href="/auth/reset-password"
                                >
                                  <LuKeySquare size={16} />
                                  Reset Password
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href="/auth/logout"
                                  className="flex w-full items-center gap-3 rounded px-3 py-2 font-normal text-default-600 transition-all hover:bg-default-100 hover:text-default-700"
                                >
                                  <LuLogOut size={16} />
                                  Log Out
                                </Link>
                              </li>
                            </ul>
                          : session?.user?.data[0]?.user_role_type === 'admin' ? 
                          // : session?.user?.data && session.user.data.length > 0 
                          //   ? session.user.data[0]?.user_role_type 
                          //   : null === 'admin' ? 
                            <ul className="flex flex-col gap-1">
                              <li>
                                <Link
                                  className="flex items-center gap-3 rounded px-3 py-2 font-normal text-default-600 transition-all hover:bg-default-100 hover:text-default-700"
                                  href="/admin/dashboard"
                                  target="_blank"
                                >
                                  <LuHome size={16} /> Admin Dashboard
                                </Link>
                              </li>
                              <li>
                                <Link
                                  className="flex items-center gap-3 rounded px-3 py-2 font-normal text-default-600 transition-all hover:bg-default-100 hover:text-default-700"
                                  href="/admin/profile"
                                  target="_blank"
                                >
                                  <LuUserCircle size={16} /> Admin Profile
                                </Link>
                              </li>
                              <li>
                                <Link
                                  className="flex items-center gap-3 rounded px-3 py-2 font-normal text-default-600 transition-all hover:bg-default-100 hover:text-default-700"
                                  href="/cart"
                                >
                                  <LuShoppingCart size={16} />
                                  Cart
                                </Link>
                              </li>
                              <li>
                                <Link
                                  className="flex items-center gap-3 rounded px-3 py-2 font-normal text-default-600 transition-all hover:bg-default-100 hover:text-default-700"
                                  href="/wishlist"
                                >
                                  <LuHeart size={16} />
                                  Wishlist
                                </Link>
                              </li>
                              <li>
                                <Link
                                  className="flex items-center gap-3 rounded px-3 py-2 font-normal text-default-600 transition-all hover:bg-default-100 hover:text-default-700"
                                  href="/checkout"
                                >
                                  <LuHexagon size={16} />
                                  Checkout
                                </Link>
                              </li>
                              <li>
                                <Link
                                  className="flex items-center gap-3 rounded px-3 py-2 font-normal text-default-600 transition-all hover:bg-default-100 hover:text-default-700"
                                  href="/faqs"
                                >
                                  <LuHighlighter size={16} />
                                  FAQ
                                </Link>
                              </li>
                              <li>
                                <Link
                                  className="flex items-center gap-3 rounded px-3 py-2 font-normal text-default-600 transition-all hover:bg-default-100 hover:text-default-700"
                                  href="/auth/reset-password"
                                >
                                  <LuKeySquare size={16} />
                                  Reset Password
                                </Link>
                              </li>
                              <li>
                                <Link
                                  href="/auth/logout"
                                  className="flex w-full items-center gap-3 rounded px-3 py-2 font-normal text-default-600 transition-all hover:bg-default-100 hover:text-default-700"
                                >
                                  <LuLogOut size={16} />
                                  Log Out
                                </Link>
                              </li>
                            </ul>
                          : localStorage.getItem("email") &&
                            localStorage.getItem("user_id") &&
                            localStorage.getItem("token") ?
                            <ul className="flex flex-col gap-1">
                              <li
                                className="flex items-center gap-3 rounded px-3 py-2 font-normal text-default-600 transition-all hover:bg-default-100 hover:text-default-700"
                                onClick={() => {
                                  SetCreatePageShow(true)
                                }}
                              >
                                <LuUserCircle size={16} /> Add Web Page
                              </li>
                              <li>
                                <Link
                                  href="/auth/web-admin/logout"
                                  className="flex w-full items-center gap-3 rounded px-3 py-2 font-normal text-default-600 transition-all hover:bg-default-100 hover:text-default-700"
                                >
                                  <LuLogOut size={16} />
                                  Log Out
                                </Link>
                              </li>
                            </ul>
                          : <ul className="flex flex-col gap-1">
                              {/* <li
                                className="flex items-center gap-3 rounded px-3 py-2 font-normal text-default-600 transition-all hover:bg-default-100 hover:text-default-700"
                                onClick={() => {
                                  SetCreatePageShow(true)
                                }}
                              >
                                <LuUserCircle size={16} /> Add Web Page
                              </li> */}
                              <li>
                                <Link
                                  className="flex items-center gap-3 rounded px-3 py-2 font-normal text-default-600 transition-all hover:bg-default-100 hover:text-default-700"
                                  href="/auth/web-admin/login"
                                >
                                  <LuUserCircle size={16} /> Admin Login
                                </Link>
                                <Link
                                  className="flex items-center gap-3 rounded px-3 py-2 font-normal text-default-600 transition-all hover:bg-default-100 hover:text-default-700"
                                  href="/auth/login"
                                >
                                  <LuUserCircle size={16} /> Login
                                </Link>
                              </li>
                              <li>
                                <Link
                                  className="flex items-center gap-3 rounded px-3 py-2 font-normal text-default-600 transition-all hover:bg-default-100 hover:text-default-700"
                                  href="/cart"
                                >
                                  <LuShoppingCart size={16} />
                                  Cart
                                </Link>
                              </li>
                              <li>
                                <Link
                                  className="flex items-center gap-3 rounded px-3 py-2 font-normal text-default-600 transition-all hover:bg-default-100 hover:text-default-700"
                                  href="/wishlist"
                                >
                                  <LuHeart size={16} />
                                  Wishlist
                                </Link>
                              </li>
                              <li>
                                <Link
                                  className="flex items-center gap-3 rounded px-3 py-2 font-normal text-default-600 transition-all hover:bg-default-100 hover:text-default-700"
                                  href="/checkout"
                                >
                                  <LuHexagon size={16} />
                                  Checkout
                                </Link>
                              </li>
                              <li>
                                <Link
                                  className="flex items-center gap-3 rounded px-3 py-2 font-normal text-default-600 transition-all hover:bg-default-100 hover:text-default-700"
                                  href="/faqs"
                                >
                                  <LuHighlighter size={16} />
                                  FAQ
                                </Link>
                              </li>
                              <li>
                                <Link
                                  className="flex items-center gap-3 rounded px-3 py-2 font-normal text-default-600 transition-all hover:bg-default-100 hover:text-default-700"
                                  href="/auth/forgot-password"
                                >
                                  <LuKeySquare size={16} />
                                  Forgot Password
                                </Link>
                              </li>
                              {/* <li>
                                <Link
                                  href="/auth/logout"
                                  className="flex w-full items-center gap-3 rounded px-3 py-2 font-normal text-default-600 transition-all hover:bg-default-100 hover:text-default-700"
                                >
                                  <LuLogOut size={16} />
                                  Log Out
                                </Link>
                              </li> */}
                            </ul>  
                      }
                     
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </StickyHeader>

      <TabNavigation />

      <div
        id="mobile-menu"
        className="hs-overlay fixed left-0 top-0 z-60 hidden h-full w-full max-w-[270px] -translate-x-full transform border-r border-default-200  bg-white transition-all hs-overlay-open:translate-x-0 dark:bg-default-50"
        tabIndex={-1}
      >
        <div className="flex h-16 items-center justify-center border-b border-dashed border-default-200 transition-all duration-300">
          <Link href="/home">
            <Image
              src={logoDarkImg}
              width={130}
              height={40}
              alt="logo"
              className="flex h-10 dark:hidden"
              placeholder="blur"
              priority
            />
            <Image
              src={logoLightImg}
              width={130}
              height={40}
              alt="logo"
              className="hidden h-10 dark:flex"
              placeholder="blur"
              priority
            />
          </Link>
        </div>
        <SimplebarReactClient className="h-[calc(100%-4rem)]">
          <nav className="hs-accordion-group flex w-full flex-col flex-wrap p-4">
            <VerticalMenu menuItems={getClientVerticalMenuItems()} />
          </nav>
        </SimplebarReactClient>
      </div>

      <Dialog
        maxWidth="lg"
        open={createPageShow}
        onClose={handleCreatePageClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{ sx: { borderRadius: "50px" } }}
      >
        <DialogTitle>Page Name show</DialogTitle>
        <DialogContent>
          <Box sx={{ minWidth: 500, minHeight: 250 }}>
           <select
              id="function_name"
              class="relative inline-block text-left inline-flex justify-center gap-x-1.5 ml-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 w-full"
              value={pageName}
              onChange={(e) => {
                SetPageName(e.target.value);
                localStorage.setItem("pageName", JSON.stringify(e.target.value))
              }}
            >
              <option selected className="text-xs">
                {"Page Name"}
              </option>
              {
                pagesData?.map((item, i) => {
                  return (
                    <option
                      className="text-xs"
                      value={`${item?.page_name}`}
                    >
                      {item?.page_name}
                    </option>
                  )
                })
              }
              
            </select>
          </Box>
        </DialogContent>
        <DialogActions sx={{ pt: 2, pb: 4, pl: 2, pr: 2 }}>
          <Tooltip title="Close" placement="top">
            <Button
              onClick={handleCreatePageClose}
              size="small"
              sx={{
                fontSize: "16px",
                color: "black",
                marginRight: -4,
                padding: 0,
                "&:hover": {
                  color: "green",
                },
                height: 0,
                width: 0,
              }}
            >
              ✘
            </Button>
          </Tooltip> 
          <Tooltip title="Submit" placement="top">
            <Button
              onClick={PageShowRedirect}
              autoFocus
              size="small"
              sx={{
                fontSize: "20px",
                color: "black",
                margin: 0,
                padding: 0,
                "&:hover": {
                  color: "green",
                },
                height: 0,
                width: 0,
              }}
            >
              ⮕
            </Button>
          </Tooltip>  
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Navbar;
