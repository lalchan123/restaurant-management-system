"use client";

import { useEffect } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AutoLogout() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(async () => {
      await signOut({ redirect: false });
      router.push("/auth/login");
    }, 5 * 60 * 1000); // 5 minutes = 300000 ms

    // Cleanup timer on unmount
    return () => clearTimeout(timer);
  }, []);

  return null; // This component just handles logout
}
