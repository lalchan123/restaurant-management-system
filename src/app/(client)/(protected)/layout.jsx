"use client";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import NextTopLoader from "nextjs-toploader";

const Layout = ({ children }) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const pathname = usePathname();

  var ClaimOffer = parseFloat(localStorage.getItem("ClaimOffer"));
  var DiscountOfferPercentageFirstOrder = parseFloat(localStorage.getItem("DiscountOfferPercentageFirstOrder"));

  console.log("ClaimOffer", ClaimOffer, typeof (ClaimOffer));
  console.log("DiscountOfferPercentageFirstOrder", DiscountOfferPercentageFirstOrder, typeof (DiscountOfferPercentageFirstOrder));
  
  if (!isNaN(ClaimOffer) || !isNaN(DiscountOfferPercentageFirstOrder)) {
    if (status == "unauthenticated") {
      router.replace(`/auth/login?redirectTo=${pathname}`);
      return null;
    }

    if (session?.user) {
      if (session?.user?.data[0]?.user_role_type !== "user") {
        router.replace(`/auth/login?redirectTo=${pathname}`);
        return null;
      }
    }
  }
  // if (status == "unauthenticated") {
  //   router.replace(`/auth/login?redirectTo=${pathname}`);
  //   return null;
  // }

  // if (session?.user) {
  //   if (session?.user?.data[0]?.user_role_type !== "user") {
  //     router.replace(`/auth/login?redirectTo=${pathname}`);
  //     return null;
  //   }
  // }

  if (status == "loading") {
    return <NextTopLoader color="#F58220" showSpinner={false} />;
  }

  return <>{children}</>;
};

export default Layout;
