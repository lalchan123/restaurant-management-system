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
  LuChevronDown,
} from "react-icons/lu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useCallback, useEffect, useState } from "react";
// import TabNavigation from "./TabNavigation";
// import VerticalMenu from "./VerticalMenu";
// import { OfferAdBanner } from "@/components";
// import { logoDarkImg, logoLightImg } from "@/assets/data/images";
// import logoDarkImg from "@/assets/images/logo-dark.png";
// import logoLightImg from "@/assets/images/logo-light.png";
// import { getClientVerticalMenuItems, getHorizontalMenuItems } from "@/helpers";
// import ProductSearchBar from "./ProductSearchBar";
import Link from "next/link";
// import CartAndWishList from "./CartAndWishList";
import { useSession } from "next-auth/react";
// const HorizontalMenu = dynamic(() => import("./HorizontalMenu"));
// const StickyHeader = dynamic(() => import("@/components/StickyHeader"), {
//   ssr: false,
// });

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs) => {
  return twMerge(clsx(inputs));
};

const SimplebarReactClient = ({ children, ...options }) => {
  return <SimpleBar {...options}>{children}</SimpleBar>;
};


function useScrollEvent() {
  const [scrollPassed, setScrollPassed] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(0);

  function handleScroll() {
    setScrollY(window.scrollY);
    setScrollPassed(
      ((window.scrollY + window.innerHeight) * 100) / document.body.offsetHeight
    );
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    setScrollY(window.scrollY);
    setScrollHeight(document.body.offsetHeight);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return {
    scrollPassed,
    scrollY,
    scrollHeight,
  };
}

function StickyHeader({ children }) {
  const { scrollY } = useScrollEvent();

  return (
    <header
      className={cn(
        "sticky inset-x-0 top-0 z-40 w-full items-center backdrop-blur transition-all duration-300",
        scrollY >= 80
          ? "bg-white shadow-none dark:bg-default-50 lg:shadow-md"
          : "bg-transparent"
      )}
    >
      {children}
    </header>
  );
}


const clientMenuItems = [
  {
    key: "home-page",
    label: "Home",
    url: "/",
    isTitle: true,
  },
  {
    key: "dish",
    label: "Dishes",
    url: "/dishes",
    isTitle: true,
    // children: [
    //   {
    //     key: "dish-grid",
    //     label: "Dishes Grid",
    //     url: "/dishes",
    //     parentKey: "dish",
    //   },
    //   {
    //     key: "dish-list",
    //     label: "Dishes List",
    //     url: "/dishes-list",
    //     parentKey: "dish",
    //   },
    //   {
    //     key: "dish-details",
    //     label: "Dish Details",
    //     url: "/dishes/1001",
    //     parentKey: "dish",
    //   },
    // ],
  },
  // {
  //   key: "user-pages",
  //   label: "Pages",
  //   isTitle: true,
  //   children: [
  //     {
  //       key: "user-pages-account-cart",
  //       label: "Cart",
  //       url: "/cart",
  //       parentKey: "user-pages",
  //     },
  //     {
  //       key: "user-pages-account-wishlist",
  //       label: "Wishlist",
  //       url: "/wishlist",
  //       parentKey: "user-pages",
  //     },
  //     {
  //       key: "user-pages-checkout",
  //       label: "Checkout",
  //       url: "/checkout",
  //       parentKey: "user-pages",
  //     },
  //     {
  //       key: "user-pages-faqs",
  //       label: "FAQ",
  //       url: "/faqs",
  //       parentKey: "user-pages",
  //     },
  //     {
  //       key: "user-pages-contact-us",
  //       label: "Contact Us",
  //       url: "/contact-us",
  //       parentKey: "user-pages",
  //     },
  //     {
  //       key: "user-pages-not-found",
  //       label: "Error 404",
  //       url: "/not-found",
  //       parentKey: "user-pages",
  //     },
  //     {
  //       key: "auth-login",
  //       label: "Login",
  //       url: "/auth/login",
  //       parentKey: "user-pages",
  //     },
  //     {
  //       key: "auth-register",
  //       label: "Register",
  //       url: "/auth/register",
  //       parentKey: "user-pages",
  //     },
  //     {
  //       key: "auth-forgot-password",
  //       label: "Forgot Password",
  //       url: "/auth/forgot-password",
  //       parentKey: "user-pages",
  //     },
  //     {
  //       key: "auth-reset-password",
  //       label: "Reset Password",
  //       url: "/auth/reset-password",
  //       parentKey: "user-pages",
  //     },
  //     {
  //       key: "auth-logout",
  //       label: "Logout",
  //       url: "/auth/logout",
  //       parentKey: "user-pages",
  //     },
  //   ],
  // },
  // {
  //   key: "admin-dashboard",
  //   label: "Admin",
  //   url: "/admin/dashboard",
  //   isTitle: true,
  // },
];

function MenuItemWithChildren({ item, linkClassName, activeMenuItems, toggleMenu }) {
  const [open, setOpen] = useState(activeMenuItems.includes(item.key));

  useEffect(() => {
    if (activeMenuItems) setOpen(activeMenuItems.includes(item.key));
  }, [activeMenuItems, item]);

  function toggleMenuItem() {
    const status = !open;
    setOpen(status);
    if (toggleMenu) toggleMenu(item, status);
    return false;
  }

  return (
    <li>
      <div className="hs-dropdown relative inline-flex [--placement:bottom] [--trigger:hover]">
        <button
          className={cn(
            "hs-dropdown-toggle inline-flex items-center rounded-full px-4 py-2 text-sm font-medium text-default-700 after:absolute after:inset-0 hover:text-primary hover:after:-bottom-10 lg:text-base",
            { "text-primary": activeMenuItems.includes(item.key) }
          )}
          aria-expanded={open}
          data-menu-key={item.key}
          onClick={toggleMenuItem}
        >
          {item.label}
          <LuChevronDown className="ms-2 h-4 w-4" />
        </button>
        <div className="hs-dropdown-menu z-10 mt-4 hidden min-w-[200px] rounded-lg border border-default-100 bg-white p-1.5 opacity-0 shadow-lg transition-[opacity,margin] hs-dropdown-open:opacity-100 dark:bg-default-50">
          <ul className="flex flex-col gap-1">
            {(item.children ?? []).map((child, idx) => (
              <Fragment key={idx}>
                {child.children ? (
                  <MenuItemWithChildren
                    item={child}
                    toggleMenu={toggleMenu}
                    activeMenuItems={activeMenuItems}
                    linkClassName={cn(linkClassName, {
                      "text-primary": activeMenuItems?.includes(child.key),
                    })}
                  />
                ) : (
                  <MenuItem
                    item={child}
                    className=""
                    linkClassName={cn(linkClassName, {
                      "text-primary": activeMenuItems?.includes(child.key),
                    })}
                  />
                )}
              </Fragment>
            ))}
          </ul>
        </div>
      </div>
    </li>
  );
}

function MenuItem({ item, className, linkClassName }) {
  return (
    <li className={className}>
      <MenuItemLink item={item} className={linkClassName} />
    </li>
  );
}

function MenuItemLink({ item, className }) {
  return (
    <Link
      className={className}
      href={item.url ?? ""}
      target={item.target}
      data-menu-key={item.key}
    >
      {item.label}
    </Link>
  );
}

function HorizontalMenu({ menuItems }) {
  const [activeMenuItems, setActiveMenuItems] = useState([]);

  const pathname = usePathname();

  function toggleMenu(menuItem, show) {
    if (show) {
      setActiveMenuItems([
        menuItem["key"],
        // ...findAllParent(menuItems, menuItem),
      ]);
    }
  }

  const activeMenu = useCallback(() => {
    const trimmedURL = pathname.replaceAll("", "");
    const matchingMenuItem = getMenuItemFromURL(menuItems, trimmedURL);

    if (matchingMenuItem) {
      const activeMt = findMenuItem(menuItems, matchingMenuItem.key);
      if (activeMt) {
        setActiveMenuItems([
          activeMt["key"],
          ...findAllParent(menuItems, activeMt),
        ]);
      }
    }
  }, [pathname, menuItems]);

  useEffect(() => {
    if (menuItems && menuItems.length > 0) activeMenu();
  }, [activeMenu, menuItems]);

  return (
    <ul className="menu relative hidden items-center justify-center lg:flex">
      {(menuItems ?? []).map((item) => (
        <Fragment key={item.key}>
          {item.isMega ? (
            <MegaMenuDropdown />
          ) : item.children ? (
            <MenuItemWithChildren
              item={item}
              toggleMenu={toggleMenu}
              activeMenuItems={activeMenuItems}
              linkClassName={cn(
                "flex items-center font-normal text-default-600 py-2 px-3 transition-all hover:text-default-700 hover:bg-default-100 rounded"
              )}
            />
          ) : (
            <MenuItem
              item={item}
              linkClassName={cn(
                "inline-flex items-center text-sm lg:text-base font-medium text-default-800 py-2 px-4 rounded-full hover:text-primary",
                { "text-primary": activeMenuItems.includes(item.key) }
              )}
              className=""
            />
          )}
        </Fragment>
      ))}
    </ul>
  );
}

const findAllParent = (menuItems, menuItem) => {
  let parents = [];
  const parent = findMenuItem(menuItems, menuItem.parentKey);

  if (parent) {
    parents.push(parent.key);
    if (parent.parentKey) {
      parents = [...parents, ...findAllParent(menuItems, parent)];
    }
  }
  return parents;
};


const findMenuItem = (menuItems, menuItemKey) => {
  if (menuItems && menuItemKey) {
    for (let i = 0; i < menuItems.length; i++) {
      if (menuItems[i].key === menuItemKey) {
        return menuItems[i];
      }
      const found = findMenuItem(menuItems[i].children, menuItemKey);
      if (found) return found;
    }
  }
  return null;
};

const getMenuItemFromURL = (items, url) => {
  if (items instanceof Array) {
    for (const item of items) {
      const foundItem = getMenuItemFromURL(item, url);
      if (foundItem) return foundItem;
    }
  } else {
    if (items.url == url) return items;
    if (items.children != null) {
      for (const item of items.children) {
        if (item.url == url) return item;
      }
    }
  }
};

function ProductSearchBar() {
  // const { search, updateSearch } = useFilterContext();

  // const pagesWithDishes = ["/dishes", "/dishes-list"];

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  // const queryParams = Object.fromEntries([...searchParams]);

  // function handleSearch(e) {
  //   updateSearch(e.target.value);
  //   setTimeout(() => {
  //     if (!pagesWithDishes.includes(pathname)) {
  //       router.push(
  //         `/dishes?${new URLSearchParams(queryParams).toString()}`
  //       );
  //     }
  //   }, 10);
  // }

  return (
    <form>
      <div className="relative w-72">
        <input
          type="search"
          placeholder="Search for items..."
          value={""}
          onChange={""}
          className="form-input w-full rounded-full border-transparent bg-green-400/20 px-4 py-1.5 ps-10 placeholder-green-500 dark:bg-default-50"
        />
        <span className="absolute start-3 top-1/2 -translate-y-1/2">
          <LuSearch className="text-green-500" />
        </span>
      </div>

      <button className="hidden" type="submit" />
      {/* {createPortal(
        <FloatingSearchBar handleSearch={handleSearch} searchValue={search} />,
        document.body
      )} */}
    </form>
  );
}



const Navbar = () => {
  
  const { data: session } = useSession();
  return (
    <>

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
                  {/* <Image
                    src="https://en.wikipedia.org/wiki/Image#/media/File:Image_created_with_a_mobile_phone.png"
                    // src={logoDarkImg}
                    height={250}
                    width={250}
                    alt="logo"
                    className="flex h-10 dark:hidden"
                    placeholder="blur"
                    priority
                  /> */}
                  {/* <Image
                    src="https://drive.google.com/file/d/1nspO_GEF7VB8jCiFLRcYn8f0OzXgvlcW/view?usp=sharing"
                    height={250}
                    width={250}
                    alt="logo"
                    priority
                  /> */}
                  <Image
                    src="https://tasteofindiamckinney.net/media/upload_file/images/logodarkimg1234.png"
                    width={250}
                    height={250}
                    alt="logo"
                    priority
                  />
                  {/* <img 
                    src="https://picsum.photos/400/200" 
                    alt="Random example" 
                    style={{ borderRadius: "10px", marginTop: "20px" }}
                  /> */}
                </Link>
              </div>

              <HorizontalMenu menuItems={clientMenuItems} />

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

                {/* <CartAndWishList /> */}

                <li className="menu-item flex">
                  <div className="hs-dropdown relative inline-flex [--placement:bottom] [--trigger:hover]">
                    {/* <div className="hs-dropdown-toggle relative flex cursor-pointer items-center text-base text-default-600 transition-all after:absolute after:inset-0 hover:text-primary hover:after:-bottom-10"> */}
                    <div className="hs-dropdown-toggle relative flex cursor-pointer items-center text-base text-default-600 transition-all after:absolute after:inset-0 hover:text-green-500 hover:after:-bottom-10">
                      <LuUser size={20} />
                    </div>
                    <div className="hs-dropdown-menu z-20 mt-4 hidden min-w-[200px] rounded-lg border border-default-100 bg-white p-1.5 opacity-0 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] transition-[opacity,margin] hs-dropdown-open:opacity-100 dark:bg-default-50">
                      <ul className="flex flex-col gap-1">
                        <li>
                          <Link
                            className="flex items-center gap-3 rounded px-3 py-2 font-normal text-default-600 transition-all hover:bg-default-100 hover:text-default-700"
                            href="/webpage/web-page"
                          >
                            <LuUserCircle size={16} /> Add Web Page
                          </Link>
                        </li>
                        <li>
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
                              
                      </ul>  
                    
                     
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </StickyHeader>

      {/* <TabNavigation />

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
      </div> */}
    </>
  );
};

export default Navbar;
