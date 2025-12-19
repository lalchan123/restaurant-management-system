"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import * as Babel from "@babel/standalone";
import styled from 'styled-components';
import axios from "axios";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridRowModes,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";


import { TextAreaFormInput, TextFormInput } from "@/components";
import { generateUniqueKey } from "@/ApiCallMethod/GenerateUniqueKey";
import { BaseURL } from "@/ApiCallMethod/Constants";
import restAPIPost from "@/ApiCallMethod/restAPIPost";
import { getAPIPostDataByRefId } from "@/helpers";

const WebPageCreate = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const uniqueKey = generateUniqueKey();

  const [DynamicComponent, setDynamicComponent] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log("28 pageName LocalStorage", localStorage.getItem("pageName"), typeof(localStorage.getItem("pageName")))

  useEffect(() => {
    fetchAndRenderCode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchAndRenderCode = async () => {
    setLoading(true);
    try {
      // Example: fetch from your API (replace with real call)
      const webPageData = await getAPIPostDataByRefId(51, "", localStorage.getItem('user_id'));
      console.log("✅ web_page_data:", webPageData);
      // console.log("✅ webPageData?.data[0]:", webPageData?.data[4]?.web_data);
      // const contentItems = webPageData?.data?.filter(item => item.page_name === 'Lorem Ipsum Text');
      const contentItems = webPageData?.data?.filter(item => item.page_name === JSON.parse(localStorage.getItem("pageName")));
      console.log("83 contentItems", contentItems);
      let code = contentItems[0]?.web_data
      // Example code (replace with `webPageData.code` if your API returns code)
      // let code = webPageData?.data[4]?.web_data
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

      console.log("99 transformed", transformed)
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
       "Box",
       "DataGrid",
        hooksPrefix + "\n" + transformed + "\nreturn module.exports;");
      const exported = evaluateFn(
        module,
        module.exports,
        React,
        styled,
        axios,
        Box,
        DataGrid
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
    <div>
      {Rendered ? <Rendered /> : <p>No component to render.</p>}
    </div>
  );
};

export default WebPageCreate;
