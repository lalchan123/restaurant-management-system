import Link from "next/link";
import { LuFacebook, LuInstagram, LuPhone, LuArrowRight, LuMail, LuAlertCircle } from "react-icons/lu";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx"; // fixed
import { twMerge } from "tailwind-merge";

export const cn = (...inputs) => {
  return twMerge(clsx(inputs));
};

export const FOOTER_LINKS = {
  About: [
    { name: "About Us", link: ""  },
    { name: "Features", link: "" },
    // { name: "News" },
    { name: "Careers", link: "" },
    // { name: "Services" },
  ],
  // Company: [
  //   { name: "Our Team" },
  //   { name: "Partner with Us" },
  //   { name: "FAQs" },
  //   { name: "Blog" },
  // ],
  Support: [
    // { name: "About", link: "" },
    { name: "Support Center", link: "" },
    { name: "Feedback", link: "" },
    { name: "Contact Us", link: "/contact-us" },
    // { name: "Accessibility" },
  ],
};

// function TextFormInput({
//   control,
//   id,
//   name,
//   label,
//   className,
//   labelClassName,
//   containerClassName,
//   noValidate,
//   fullWidth,
//   startInnerIcon,
//   endButtonIcon,
//   ...other
// }) {
//   function renderInput({ field, fieldState }) {
//     const hasError = !noValidate && fieldState.error?.message;

//     return (
//       <div
//         className={cn(containerClassName, "relative", {
//           "max-w-full": fullWidth,
//         })}
//       >
//         {label && (
//           <label
//             htmlFor={name}
//             className={cn(
//               "mb-2 block text-sm font-medium text-default-900",
//               labelClassName
//             )}
//           >
//             {label}
//           </label>
//         )}

//         <div className={cn("relative", fullWidth && "max-w-full")}>
//           <input
//             {...other}
//             {...field}
//             id={id ?? name}
//             className={cn(
//               "form-input rounded-lg border border-default-200 bg-green-600/5 px-4 py-2.5 dark:bg-default-50",
//               { "ps-10": startInnerIcon },
//               { "pe-14": endButtonIcon },
//               { "w-full": fullWidth },
//               { "border-red-500 focus:border-red-500": hasError },
//               className
//             )}
//           />

//           {startInnerIcon && (
//             <span className="absolute start-3 top-1/2 -translate-y-1/2">
//               {startInnerIcon}
//             </span>
//           )}

//           {endButtonIcon && (
//             <button
//               type="submit"
//               className="absolute end-0 top-1/2 inline-flex h-[2.875rem] w-[2.875rem] -translate-y-1/2 items-center justify-center rounded-e-md border border-transparent bg-primary text-sm font-semibold text-white transition-all hover:bg-primary-500"
//             >
//               {endButtonIcon}
//             </button>
//           )}

//           {hasError && (
//             <div
//               className={cn(
//                 "pointer-events-none absolute inset-y-0 flex items-center",
//                 endButtonIcon ? "end-14" : "end-4"
//               )}
//             >
//               <LuAlertCircle size={20} className="text-red-500" />
//             </div>
//           )}
//         </div>

//         {hasError && (
//           <p className="mt-2 text-xs text-red-600">{fieldState.error.message}</p>
//         )}
//       </div>
//     );
//   }

//   return (
//     <Controller
//       control={control}
//       name={name}
//       defaultValue=""
//       render={renderInput}
//     />
//   );
// }


// function SubscribeToMail() {
//   const subscribeSchema = yup.object({
//     email: yup
//       .string()
//       .email("Please enter a valid email")
//       .required("Please enter your email"),
//   });

//   const { control, handleSubmit } = useForm({
//     resolver: yupResolver(subscribeSchema),
//   });

//   return (
//     <div className="col-span-1">
//       <div className="flex flex-col gap-3">
//         {/* <div className="rounded-lg bg-primary/10"> */}
//         <div className="rounded-lg bg-green-500/10">
//           <div className="p-8">
//             <form className="mb-6 space-y-2" onSubmit={handleSubmit(() => {})}>
//               <label
//                 htmlFor="subscribeEmail"
//                 className="mb-4 text-lg font-medium text-default-950"
//               >
//                 Subscribe
//               </label>
//               <div className="flex rounded-md shadow-sm">
//                 {/* <TextFormInput
//                   name="email"
//                   className="form-input bg-white"
//                   control={control}
//                   placeholder="Email address"
//                   endButtonIcon={<LuArrowRight size={20} />}
//                   startInnerIcon={<LuMail size={20} />}
//                   fullWidth
//                 /> */}
//               </div>
//             </form>
//             <p className="mb-6 text-sm text-default-500">
//               Subscribe to Yup&apos;s email notifications to get notified for
//               all money saving and tummy filling offers. Enter your email
//               address to get started{" "}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

const MenuFooterLinks = () => {
  return (
    <div className="border-t border-default-200 bg-green-600/5">
      <div className="container">
        <div className="grid items-center gap-6 py-6 lg:grid-cols-3 lg:py-10">
          <div className="lg:col-span-2">
            <div className="mb-6 grid grid-cols-2 gap-6 md:grid-cols-4">
              {Object.keys(FOOTER_LINKS).map((title, idx) => {
                return (
                  <div className="flex flex-col gap-3" key={title + idx}>
                    <h5 className="mb-3 font-semibold text-default-950">
                      {title}
                    </h5>
                    {FOOTER_LINKS[title].map((item, idx) => (
                      <div className="text-default-600" key={item.name + idx}>
                        <Link href={item.link ?? ""}>{item.name}</Link>
                      </div>
                    ))}
                  </div>
                );
              })}

              <div className="flex flex-col gap-3">
                <h5 className="mb-3 font-semibold text-default-950">
                  Working Hours
                </h5>
                <div className="text-default-600">
                  <div className="font-semibold text-default-600">Every Day</div>
                  <p>11:00 AM - 02:30 PM and</p>
                  <p>05:00 PM - 09:00 PM</p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <h5 className="mb-3 font-semibold text-default-950">
                  Get in touch
                </h5>
                <div className="text-default-600">
                  <p>1925 N Central Expy, McKinney, TX 75070</p>
                </div>
                <div className="text-default-600">
                  <Link href="tel:+1234567891012">972-548-0200</Link>
                </div>
                <div className="text-default-600">
                  <Link href="mailto:mypoolhub@gmail.com">mypoolhub@gmail.com</Link>
                </div>
                <div className="flex items-center gap-4">
                  {/* {[LuPhone, LuFacebook, LuInstagram, FaXTwitter].map(
                    (icon, idx) => {
                      const Icon = icon;
                      return (
                        <Link key={idx} href="" className="cursor-pointer">
                          <Icon
                            size={24}
                            className="text-default-600 transition-all hover:text-primary"
                          />
                        </Link>
                      );
                    }
                  )} */}
                </div>
              </div>
            </div>
          </div>

          {/* <SubscribeToMail /> */}
        </div>
      </div>
    </div>
  );
};

export default MenuFooterLinks;
