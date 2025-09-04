import Link from "next/link";
import { LuPlus } from "react-icons/lu";

const GoToAddButton = ({ buttonText, buttonLink }) => {
  return (
    <Link
      href={buttonLink}
      // className="inline-flex rounded-md bg-primary px-6 py-2.5 text-sm text-white hover:bg-primary-500 "
      className="inline-flex rounded-md bg-green-500 px-6 py-2.5 text-sm text-white hover:bg-green-600"
    >
      <LuPlus size={20} className="me-2 inline-flex align-middle" />
      {buttonText}
    </Link>
  );
};

export default GoToAddButton;
