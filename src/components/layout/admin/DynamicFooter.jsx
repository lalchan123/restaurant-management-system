"use client";

import React, {  Fragment, useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { toast } from "sonner";

import * as Babel from "@babel/standalone";
import styled from 'styled-components';
import axios from "axios";
import Link from "next/link";
import Image from "next/image";


// import { logoDarkImg, logoLightImg } from "@/assets/data/images";
// import logoDarkImg from "@/assets/images/logo-dark.png";
// import logoLightImg from "@/assets/images/logo-light.png";

import { TextAreaFormInput, TextFormInput } from "@/components";
import { generateUniqueKey } from "@/ApiCallMethod/GenerateUniqueKey";
import { BaseURL } from "@/ApiCallMethod/Constants";
import restAPIPost from "@/ApiCallMethod/restAPIPost";
import { getAPIPostDataByRefId } from "@/helpers";
import {
  FaXTwitter,
  LuInstagram,
  LuFacebook,
  LuPhone,
  LuHeart,
  LuSearch,
  LuShoppingCart,
  LuUser,
  LuUserCircle,
  LuHeartPulse,
  LuHexagon,
  LuHighlighter,
  LuKeySquare,
  LuHome,
  LuMenu,
  LuWallet,
  LuUserCog,
  LuSoup,
  LuHotel,
  LuUsers,
  LuLogOut,
  LuUserCircle2,
  LuZap,
  LuChevronDown,
  LuDot,
  LuLayoutGrid,
  LuSettings2,
  LuListOrdered,
} from "react-icons/lu";
import SimpleBar from "simplebar-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
// import { usePathname } from "next/navigation";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const DynamicFooter = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const uniqueKey = generateUniqueKey();

  const [DynamicComponent, setDynamicComponent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAndRenderCode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchAndRenderCode = async () => {
    setLoading(true);
    try {
      // Example: fetch from your API (replace with real call)
      const webPageData = await getAPIPostDataByRefId(51, "", localStorage.getItem('user_id'));
      console.log("✅ DynamicNavbar web_page_data:", webPageData);
      // console.log("✅ DynamicNavbar webPageData?.data[0]:", webPageData?.data[3]?.web_data);
      const footerItems = webPageData?.data?.filter(item => item.page_name === 'footer_link');
      console.log("83 footerItems", footerItems);
      let code = footerItems[0]?.web_data
      // Example code (replace with `webPageData.code` if your API returns code)
      // let code = webPageData?.data[3]?.web_data
      // let code = `
      // import React from "react";
      //   const HelloWorld = () => {
      //     return (
      //       <div style={{ textAlign: "center", marginTop: "50px" }}>
      //         <h1>Hello, Dynamic Image!</h1>
      //         <img 
      //           src="https://picsum.photos/400/200" 
      //           alt="Random example" 
      //           style={{ borderRadius: "10px", marginTop: "20px" }}
      //         />
      //         <p>This image is loaded dynamically 🎨</p>
      //       </div>
      //     );
      //   };
      //   export default HelloWorld;
      // `
      // let code = `
        
      //   import React, { Fragment, useState, useContext, useEffect } from "react";
      //   import axios from "axios";
      //   import styled from "styled-components";

      //   const Text = styled.p\`
      //     font-family: "Nunito Sans", sans-serif;
      //   \`;

      //   const HelloWorld = () => {
      //     return (
      //       <div style={{ textAlign: "center", marginTop: "50px" }}>
      //         <h1>Hello, World!</h1>
      //         <p>Welcome to your first React component 🎉</p>
      //       </div>
      //     );
      //   };
      //   export default HelloWorld;
      // `;

      // If API returns code, prefer that
      // code = webPageData?.code ?? code;

      // --- sanitize / normalize code for browser evaluation ---
      // remove import ... from '...' style
      // const withoutImports = code
      //   .replace(/(^|\n)\s*import[\s\S]*?from\s*['"][^'"]+['"];?/g, "\n")
      //   // remove bare imports like: import 'some-polyfill';
      //   .replace(/(^|\n)\s*import\s+['"][^'"]+['"];?/g, "\n");
      
      const withoutImports = code
        .replace(/(^|\n)\s*import[\s\S]*?from\s*['"][^'"]+['"];?/g, "\n")
        .replace(/(^|\n)\s*import\s+['"][^'"]+['"];?/g, "\n");

      // convert `export default ...` into commonjs-style assignment
      const cleaned = withoutImports.replace(/export\s+default/g, "module.exports.default =");

      // transpile JSX -> JS (and modern JS) using babel-standalone
      const transformed = Babel.transform(cleaned, {
        presets: ["env", "react"]
      }).code;

      // Provide commonly-used React hooks in scope and evaluate in a small function
      const hooksPrefix = `
        const { useState, useEffect, useRef, useMemo, useCallback, useContext, useReducer } = React;
      `;

      const module = { exports: {} };
      const evaluateFn = new Function(
       "module",
       "exports",
       "React",
       "styled",
       "axios",
       "LuLayoutGrid",
       "LuLogOut",
       "LuUserCircle2",
       "LuZap",
       "LuChevronDown",
       "LuDot",
       "LuSettings2",
       "LuListOrdered",
       "LuUsers",
       "LuHotel",
       "LuSoup",
       "LuUserCog",
       "LuWallet",
       "Link",
       "SimpleBar",
       "usePathname",
       "Fragment",
       "twMerge",
       "clsx",
       "useSession",
       "LuHeart",
       "LuSearch",
        "LuShoppingCart",
        "LuUser",
        "LuUserCircle",
        "LuHeartPulse",
        "LuHexagon",
        "LuHighlighter",
        "LuKeySquare",
        "LuHome",
        "LuMenu",
        "useRouter",
        "useSearchParams",
        "Image",
        "LuPhone",
        "LuFacebook",
        "LuInstagram",
        "FaXTwitter",
        "yup",
        hooksPrefix + "\n" + transformed + "\nreturn module.exports;");
      const exported = evaluateFn(
        module,
        module.exports,
        React,
        styled,
        axios,
        LuLayoutGrid,
        LuLogOut,
        LuUserCircle2,
        LuZap,
        LuChevronDown,
        LuDot,
        LuSettings2,
        LuListOrdered,
        LuUsers,
        LuHotel,
        LuSoup,
        LuUserCog,
        LuWallet,
        Link,
        SimpleBar,
        usePathname,
        Fragment,
        twMerge,
        clsx,
        useSession,
        LuHeart,
        LuSearch,
        LuShoppingCart,
        LuUser,
        LuUserCircle,
        LuHeartPulse,
        LuHexagon,
        LuHighlighter,
        LuKeySquare,
        LuHome,
        LuMenu,
        useRouter,
        useSearchParams,
        Image,
        LuPhone,
        LuFacebook,
        LuInstagram,
        FaXTwitter,
        yup
      );

      const Component = exported && (exported.default || exported);
      if (!Component) {
        toast.error("No component found in evaluated code.");
        console.error("Evaluated exports:", exported);
      } else {
        // store component factory
        setDynamicComponent(() => Component);
      }
    } catch (error) {
      console.error("❌ Compilation or fetch error:", error);
      toast.error("Error loading component.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading dynamic component...</div>;

  const Rendered = DynamicComponent;
  return (
    <div style={{ padding: "20px" }}>
      {Rendered ? <Rendered /> : <p>No component to render.</p>}
    </div>
  );
};

export default DynamicFooter;
