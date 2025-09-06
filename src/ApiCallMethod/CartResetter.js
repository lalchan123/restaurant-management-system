// components/CartResetter.jsx
"use client";

import { useShoppingContext } from "@/context";
import { useEffect } from "react";

export default function CartResetter() {
  const { removeAllCart } = useShoppingContext();
  useShoppingContext

  useEffect(() => {
    removeAllCart(); // reset on reload
  }, []);

  return null;
}
