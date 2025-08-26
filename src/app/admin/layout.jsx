"use client";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import NextTopLoader from "nextjs-toploader";
import { Footer } from "@/components";
import { Navbar, Topbar } from "@/components/layout/admin";

const Layout = ({ children }) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const pathname = usePathname();

  console.log("13 admin pathname", pathname)
  console.log("14 admin status", status)
  console.log("15 admin session", session)

  if (status == "unauthenticated") {
    router.replace(`/auth/login?redirectTo=${pathname}`);
    return null;
  }

  if (session?.user) {
    // if (session.user.role !== "admin") {
    //   router.replace(`/`);
    //   return null;
    // }
    if (session.user.role === "user") {
      router.replace(`/`);
      return null;
    }
  }

  if (status == "loading") {
    return <NextTopLoader color="#F58220" showSpinner={false} />;
  }

  return (
    <>
      <Topbar />
      <Navbar />
      {children}
      <Footer hideLinks />
    </>
  );
};

export default Layout;
