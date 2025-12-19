import Image from "next/image";
import { LuMail, LuMapPin, LuPhone } from "react-icons/lu";
import { Breadcrumb } from "@/components";
import { contactOtherImg } from "@/assets/data/images";
import Link from "next/link";
import WebPageCreate from "./WebPageCreate";

export const metadata = {
  title: "Create Web Page",
};

const CreateWebPage = () => {
  return (
    <>
      <Breadcrumb title="Create Web Page" />
      <section className="py-6 lg:py-16 bg-green-600/5">
        <div className="container">
          {/* <div className="grid gap-10 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <h1 className="mb-2 text-2xl font-semibold text-default-800">
                Contact Information
              </h1>
              <p className="mb-8 max-w-xl text-sm text-default-600">
                Loremum et malesuada fames ac ante ipsum primis in faucibus. Sed
                molestie accumsan dui, non iaculis.
              </p>
              <div className="flex items-center justify-center">
                <Image
                  src={contactOtherImg}
                  className="h-full max-w-full"
                  alt="contact"
                />
              </div>
            </div>
            <div className="lg:col-span-3">
              <ContactForm />
            </div>
          </div> */}
          <WebPageCreate />
        </div>
      </section>
     
    </>
  );
};

export default CreateWebPage;
