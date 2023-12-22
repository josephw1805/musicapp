import { Link } from "react-router-dom";
import { FcHome } from "react-icons/fc";

function NotFound() {
  return (
    <div className="flex-colo gap-8 w-full min-h-screen text-white bg-main lg:py-20 py-10 px-6 select-none">
      <img
        className="w-full h-96 object-contain"
        src="/assets/404.svg"
        alt="notfound"
      />
      <h1 className="lg:text-4xl font-bold">Page Not Found</h1>
      <p className="font-medium text-border italic leading-6">
        The page you are looking for does not exist. You may have mistyped the
        URL
      </p>
      <Link
        to="/"
        className="bg-dry text-white transitions flex-rows gap-4 hover:text-subMain font-medium py-3 px-6 rounded-md"
      >
        <FcHome /> Back Home
      </Link>
    </div>
  );
}

export default NotFound;
