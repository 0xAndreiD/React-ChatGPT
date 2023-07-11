import { Link } from "react-router-dom";
import SVG from "react-inlinesvg";

export default function Logo() {
  return (
    <Link to="/" className="text-white">
      <SVG src="/assets/logo/logo.svg" width={48} height={32} fill="white" />
    </Link>
  );
}
