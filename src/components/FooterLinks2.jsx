import Link from "next/link";
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
             
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MenuFooterLinks;
