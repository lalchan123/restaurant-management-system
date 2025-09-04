import Link from "next/link";
import { AuthFormLayout } from "@/components";
import ResetPasswordForm from "../ResetPasswordForm";

export const metadata = {
  title: "Reset Password",
};

const BottomLink = () => (
  <p className="mt-auto text-center text-default-950">
    Back to{" "}
    {/* <Link href="/auth/login" className="ms-1 text-primary"> */}
    <Link href="/auth/login" className="ms-1 text-green-500">
      <span className="font-medium">Login</span>
    </Link>
  </p>
);

const ResetPassword = async ({ params }) => {
  const Email = decodeURIComponent(params?.email);
  return (
    <AuthFormLayout
      authTitle="Reset Password"
      helpText="Create a new strong password"
      // bottomLink={<BottomLink />}
      // hasThirdPartyAuth
      bottomLink={""}
    >
      <ResetPasswordForm Email={ Email } />
    </AuthFormLayout>
  );
};

export default ResetPassword;
