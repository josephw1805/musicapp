import { BiPhoneCall } from "react-icons/bi";
import { BsCollection } from "react-icons/bs";
import { HiOutlineUserGroup } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";

function MenuDrawer({ closeDrawer, mobileDrawer }) {
  const links = [
    {
      name: "Songs",
      link: "/songs",
      icon: BsCollection,
    },
    {
      name: "About Us",
      link: "/about-us",
      icon: HiOutlineUserGroup,
    },
    {
      name: "Contact Us",
      link: "/contact-us",
      icon: BiPhoneCall,
    },
  ];

  const active = "bg-dry text-subMain";
  const hover = "hover:bg-dry";
  const inActive =
    "rounded sm:gap-10 font-medium text-sm transitions flex gap-3 items-center sm:px-8 px-4 py-4 items-center";

  const Hover = ({ isActive }) =>
    isActive ? `${active} ${inActive}` : `${inActive} ${hover}`;

  return (
    <div
      className={`fixed z-20 flex flex-col w-full h-full justify-between items-center bg-main text-white rounded transitions top-0 left-0 sidebar ${
        mobileDrawer === true ? " show-sidebar" : ""
      }`}
    >
      <div className="w-full flex-btn h-16 px-6 py-4 bg-dry">
        <Link onClick={closeDrawer} to="/">
          <img
            src="/assets/logo.png"
            alt="logo"
            className="w-28 h-28 object-contain"
          />
        </Link>
        <button
          type="button"
          onClick={closeDrawer}
          className=" transitions w-10 h-10 flex-colo text-base text-subMain bg-white rounded-full hover:bg-subMain hover:text-white "
        >
          <IoClose />
        </button>
      </div>
      {/* menu links */}
      <div className="w-full overflow-y-scroll scrollbar-hide flex-grow max-h-full">
        <div className="pb-12 pt-4">
          {links.map((link, index) => (
            <NavLink
              to={link.link}
              key={index}
              className={Hover}
              onClick={closeDrawer}
            >
              <link.icon className="text-lg" /> {link.name}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MenuDrawer;
