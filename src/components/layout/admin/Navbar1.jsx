
import Image from "next/image";
import Link from "next/link";
// import SimplebarReactClient from "@/components/SimplebarReactClient";
import { LuWallet, LuUserCog, LuSoup, LuHotel, LuUsers, LuLogOut, LuUserCircle2, LuZap, LuChevronDown, LuDot, LuLayoutGrid, LuSettings2, LuListOrdered } from "react-icons/lu";
// import {
//   logoDarkImg,
//   logoLightImg,
//   offerBgOtherImg,
// } from "@/assets/data/images";
import SimpleBar from "simplebar-react";

// import VerticalMenu from "./VerticalMenu";
// import { getAdminVerticalMenuItems } from "@/helpers";

import { usePathname } from "next/navigation";
import { Fragment, useCallback, useEffect, useState } from "react";
// import { findAllParent, findMenuItem, getMenuItemFromURL } from "@/helpers";
// import { cn } from "@/utils";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs) => {
  return twMerge(clsx(inputs));
};

const SimplebarReactClient = ({ children, ...options }) => {
  return <SimpleBar {...options}>{children}</SimpleBar>;
};

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



export const ADMIN_VERTICAL_MENU_ITEMS = [
  {
    key: "dashboard-page",
    label: "Dashboard",
    icon: LuLayoutGrid,
    url: "/admin/dashboard",
    isTitle: true,
  },
  {
    key: "manage-page",
    label: "Manage",
    icon: LuSettings2,
    url: "/admin/manage",
    isTitle: true,
  },
  {
    key: "orders",
    label: "Orders",
    icon: LuListOrdered,
    isTitle: true,
    children: [
      {
        key: "orders-list",
        label: "Orders List",
        url: "/admin/orders",
        parentKey: "orders",
      },
      {
        key: "orders-details",
        label: "Order Details",
        url: "/admin/orders/9f36ca",
        parentKey: "orders",
      },
    ],
  },
  {
    key: "customers",
    label: "Customers",
    icon: LuUsers,
    isTitle: true,
    children: [
      {
        key: "customers-list",
        label: "Customers List",
        url: "/admin/customers",
        parentKey: "customers",
      },
      {
        key: "customers-order-list",
        label: "Customers Order List",
        url: "/admin/customers-order",
        parentKey: "customers",
      },
      {
        key: "customers-details",
        label: "Customer Details",
        url: "/admin/customers-order/701",
        parentKey: "customers",
      },
      {
        key: "customers-add",
        label: "Add Customer",
        url: "/admin/add-customer",
        parentKey: "customers",
      },
      // {
      //   key: "customers-edit",
      //   label: "Edit Customer",
      //   url: "/admin/edit-customer",
      //   parentKey: "customers",
      // },
    ],
  },
  {
    key: "restaurants",
    label: "Restaurants",
    icon: LuHotel,
    isTitle: true,
    children: [
      {
        key: "restaurants-list",
        label: "Restaurants List",
        url: "/admin/restaurants",
        parentKey: "restaurants",
      },
      {
        key: "restaurants-details",
        label: "Restaurant Details",
        url: "/admin/restaurants/901",
        parentKey: "restaurants",
      },
      {
        key: "restaurants-add",
        label: "Add Restaurant",
        url: "/admin/add-restaurant",
        parentKey: "restaurants",
      },
      // {
      //   key: "restaurants-edit",
      //   label: "Edit Restaurant",
      //   url: "/admin/edit-restaurant",
      //   parentKey: "restaurants",
      // },
    ],
  },
  {
    key: "dishes",
    label: "Dishes",
    icon: LuSoup,
    isTitle: true,
    children: [
      {
        key: "dishes-list",
        label: "Dishes List",
        url: "/admin/dishes",
        parentKey: "dishes",
      },
      // {
      //   key: "dishes-details",
      //   label: "Dish Details",
      //   url: "/admin/dishes/1008",
      //   parentKey: "dishes",
      // },
      {
        key: "dishes-add",
        label: "Add Dish",
        url: "/admin/add-dish",
        parentKey: "dishes",
      },
      // {
      //   key: "dishes-edit",
      //   label: "Edit Dish",
      //   url: "/admin/edit-dish",
      //   parentKey: "dishes",
      // },
    ],
  },
  {
    key: "sellers",
    label: "Sellers",
    icon: LuUserCog,
    isTitle: true,
    children: [
      {
        key: "sellers-list",
        label: "Sellers List",
        url: "/admin/sellers",
        parentKey: "sellers",
      },
      {
        key: "sellers-details",
        label: "Seller Details",
        url: "/admin/sellers/704",
        parentKey: "sellers",
      },
      {
        key: "sellers-add",
        label: "Add Seller",
        url: "/admin/add-seller",
        parentKey: "sellers",
      },
      {
        key: "sellers-edit",
        label: "Edit Seller",
        url: "/admin/edit-seller",
        parentKey: "sellers",
      },
    ],
  },
  {
    key: "wallet-page",
    label: "Wallet",
    icon: LuWallet,
    url: "/admin/wallet",
    isTitle: true,
  },
];

function MenuItemWithChildren({
  item,
  linkClassName,
  activeMenuItems,
  toggleMenu,
  className,
}) {
  const [open, setOpen] = useState(activeMenuItems.includes(item.key));

  const Icon = item.icon ?? LuLayoutGrid;

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
    <li className={className}>
      <button
        className={cn(
          "hs-accordion-toggle flex w-full items-center gap-x-3.5 rounded-md px-4 py-3 text-sm text-default-700 hover:bg-default-100",
          {
            active: activeMenuItems.includes(item.key),
          }
        )}
        aria-expanded={open}
        data-menu-key={item.key}
        onClick={toggleMenuItem}
      >
        <Icon size={20} />
        {item.label}
        <LuChevronDown
          size={16}
          className="ms-auto transition-all hs-accordion-active:rotate-180"
        />
      </button>
      <div className="hs-accordion-content hidden w-full overflow-hidden transition-[height]">
        <ul className="mt-2 space-y-2">
          {(item.children ?? []).map((child, idx) => (
            <Fragment key={idx}>
              {child.children ? (
                <MenuItemWithChildren
                  item={child}
                  toggleMenu={toggleMenu}
                  className="hs-accordion"
                  activeMenuItems={activeMenuItems}
                  linkClassName={cn(linkClassName, {
                    active: activeMenuItems?.includes(child.key),
                  })}
                />
              ) : (
                <MenuItem
                  item={child}
                  className={cn("group", {
                    active: activeMenuItems?.includes(child.key),
                  })}
                  linkClassName={cn(
                    linkClassName,
                    "group-[.active]:text-primary group-[.active]:bg-primary/10"
                  )}
                />
              )}
            </Fragment>
          ))}
        </ul>
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
  const Icon = item.icon ?? LuDot;
  return (
    <Link
      className={className}
      href={item.url ?? ""}
      target={item.target}
      data-menu-key={item.key}
    >
      <Icon size={item.icon ? 20 : 24} />
      {item.label}
    </Link>
  );
}

/**
 * Renders the application menu
 */
function VerticalMenu({ menuItems }) {
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
    <ul className="admin-menu hs-accordion-group flex w-full flex-col gap-1.5 p-4">
      {(menuItems ?? []).map((item) => (
        <Fragment key={item.key}>
          {item.children ? (
            <MenuItemWithChildren
              item={item}
              toggleMenu={toggleMenu}
              className={"hs-accordion"}
              activeMenuItems={activeMenuItems}
              linkClassName={cn(
                "flex items-center gap-x-3.5 py-2 px-2.5 text-sm font-medium text-default-700 rounded-md hover:bg-default-100"
              )}
            />
          ) : (
            <MenuItem
              item={item}
              linkClassName={cn(
                "flex items-center gap-x-3.5 py-3 px-4 text-sm text-default-700 rounded-md hover:bg-default-100 group-[.active]:text-primary group-[.active]:bg-primary/10",
                { active: activeMenuItems.includes(item.key) }
              )}
              className={cn("group", {
                active: activeMenuItems?.includes(item.key),
              })}
            />
          )}
        </Fragment>
      ))}
    </ul>
  );
}

const MenuNavbar = () => {
  return (
    <div
      id="application-sidebar"
      className="hs-overlay fixed inset-y-0 start-0 z-60 hidden w-64 -translate-x-full transform overflow-y-auto border-e border-default-200 bg-green-600/5 transition-all duration-300 hs-overlay-open:translate-x-0 dark:bg-default-50 lg:bottom-0 lg:right-auto lg:block lg:translate-x-0"
    >
      <div className="sticky top-0 flex h-18 items-center justify-center border-b border-dashed border-default-200 px-6">
        {/* <Link href="/">
          <Image
            src={logoDarkImg}
            height={200}
            width={200}
            alt="logo"
            className="flex h-10 dark:hidden"
            placeholder="blur"
            priority
          />
          <Image
            src={logoLightImg}
            height={200}
            width={200}
            alt="logo"
            className="hidden h-10 dark:flex"
            placeholder="blur"
            priority
          />
        </Link> */}
      </div>

      <SimplebarReactClient className="h-[calc(100%-390px)]">
        <VerticalMenu menuItems={ADMIN_VERTICAL_MENU_ITEMS} />
      </SimplebarReactClient>

      <ul className="admin-menu flex flex-col gap-2 px-4 pt-10">
        <li className="menu-item">
          <Link
            className="flex items-center gap-x-3.5 rounded-md px-4 py-3 text-sm text-default-700 hover:bg-default-100"
            href="/admin/profile"
          >
            <LuUserCircle2 size={20} />
            Profile
          </Link>
        </li>
        <li className="menu-item">
          <Link
            className="flex items-center gap-x-3.5 rounded-md px-4 py-3 text-sm text-red-500 hover:bg-red-400/10 hover:text-red-600"
            href="/auth/logout"
          >
            <LuLogOut size={20} />
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default MenuNavbar;
