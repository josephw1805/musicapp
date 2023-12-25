import { Link, NavLink } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { CgUser } from "react-icons/cg";
import { useSelector } from "react-redux";

function NavBar() {
  const { userInfo } = useSelector((state) => state.userLogin);
  const hover = "hover:text-subMain transitions text-white";
  const Hover = ({ isActive }) => (isActive ? "text-subMain" : hover);

  return (
    <>
      <div className="bg-main shadow-md sticky top-0 z-20">
        <div className="container mx-auto py-6 px-2 lg:grid gap-10 grid-cols-7 justify-between items-center">
          {/* logo */}
          <div className="col-span-1 lg:block hidden">
            <Link to="/">
              <img
                className="w-full h-12 object-contain"
                src="/assets/logo.png"
                alt="logo"
              />
            </Link>
          </div>
          {/* search Form */}
          <div className="col-span-3">
            <form className="w-full text-sm bg-dryGray rounded flex-btn gap-4">
              <button
                type="submit"
                className="bg-subMain w-12 flex-colo h-12 rounded text-white"
              >
                <FaSearch />
              </button>
              <input
                type="text"
                placeholder="Search Music Name from here"
                className="font-medium placeholder:text-border text-sm w-11/12 h-12 bg-transparent border-none px-2 text-black"
              />
            </form>
          </div>
          {/* menus */}
          <div className="col-span-3 font-medium text-sm hidden xl:gap-14 2xl:gap-20 justify-between lg:flex xl:justify-end items-center">
            <NavLink to="/songs" className={Hover}>
              Songs
            </NavLink>
            <NavLink to="/about-us" className={Hover}>
              About Us
            </NavLink>
            <NavLink to="/contact-us" className={Hover}>
              Contact Us
            </NavLink>
            <NavLink
              to={
                userInfo?.isAdmin
                  ? "/dashboard"
                  : userInfo
                  ? "/profile"
                  : "/login"
              }
              className={Hover}
            >
              {userInfo ? (
                <img
                  src={userInfo?.image ?? "/assets/user.png"}
                  alt={userInfo?.fullName}
                  className="w-8 h-8 rounded-full object-cover border-subMain"
                />
              ) : (
                <CgUser className="w-8 h-8" />
              )}
            </NavLink>

            <NavLink to="/favorites" className={Hover}>
              <div className="relative">
                <FaHeart className="w-6 h-6" />
                <div className="w-5 h-5 flex-colo rounded-full text-xs bg-subMain text-white absolute -top-5 -right-1">
                  3
                </div>
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;
