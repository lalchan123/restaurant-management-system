"use client";
import Link from "next/link";
import { useEffect } from "react";
import { signOut } from "next-auth/react";
import { AuthFormLayout } from "@/components";
import { useRouter } from "next/navigation";


const Logout = () => {

  const router = useRouter();
  useEffect(() => {
    async function logoutUser() {
      localStorage.removeItem("email");
      localStorage.removeItem("user_id");
      localStorage.removeItem("token");
      router.push("/");
    }
    logoutUser();
  }, []);

  return (
    <div></div>
  );
};

export default Logout;
