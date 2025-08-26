"use client";
import PersonalDetailsForm from "./PersonalDetailsForm";
import BusinessDetailForm from "./BusinessDetailForm";
import BankDetailsForm from "./BankDetailsForm";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { LuEraser, LuSave } from "react-icons/lu";
import {
  DateFormInput,
  SelectFormInput,
  TextAreaFormInput,
  TextFormInput,
} from "@/components";



const Restaurant = () => {
  return (
    <div>
        <nav
        className="mb-6 flex flex-wrap justify-center gap-4"
        aria-label="Tabs"
        role="tablist"
        >
            <button
              type="button"
              className="active flex w-full justify-center rounded-lg bg-primary/10 px-20 py-3 text-center text-sm font-medium text-primary hs-tab-active:bg-primary hs-tab-active:text-white sm:w-auto"
              data-hs-tab="#tabPersonalDetail"
              aria-controls="tabPersonalDetail"
              role="tab"
            >
              Personal Detail
            </button>
            <button
              type="button"
              className="flex w-full justify-center rounded-lg bg-primary/10 px-20 py-3 text-center text-sm font-medium text-primary hs-tab-active:bg-primary hs-tab-active:text-white sm:w-auto"
              data-hs-tab="#tabBusinessDetail"
              aria-controls="tabBusinessDetail"
              role="tab"
            >
              Business Detail
            </button>
            <button
              type="button"
              className="flex w-full justify-center rounded-lg bg-primary/10 px-20 py-3 text-center text-sm font-medium text-primary hs-tab-active:bg-primary hs-tab-active:text-white sm:w-auto"
              data-hs-tab="#tabBankDetail"
              aria-controls="tabBankDetail"
              role="tab"
            >
              Bank Detail
            </button>
        </nav>
        <div className="rounded-lg border border-default-200 p-6">
            <PersonalDetailsForm />
            <BusinessDetailForm />
            <BankDetailsForm />
        </div>
    </div>
  );
};

export default Restaurant;
