import { BsFillGridFill } from "react-icons/bs";
import { FaListAlt } from "react-icons/fa";
import { MdLibraryMusic  } from "react-icons/md";
import { RiLockPasswordLine, RiMvFill } from "react-icons/ri";
import { FaHeart, FaUsers } from "react-icons/fa6";
import { FiSettings } from "react-icons/fi";
import Layout from "../../Layout/Layout";
import { NavLink } from "react-router-dom";

function SideBar({ children }) {
  const SideLinks = [
    {
      name: "Dashboard",
      link: "/dashboard",
      icon: BsFillGridFill,
    },
    {
      name: "Songs List",
      link: "/songslist",
      icon: FaListAlt,
    },
    {
      name: "Favorites Songs",
      link: "/favorites",
      icon: FaHeart,
    },
    {
      name: "Albums",
      link: "/albums",
      icon: MdLibraryMusic ,
    },
    {
      name: "Add Song",
      link: "/addsong",
      icon: RiMvFill,
    },
    {
      name: "Users",
      link: "/users",
      icon: FaUsers,
    },
    {
      name: "Update Profile",
      link: "/profile",
      icon: FiSettings,
    },
    {
      name: "Change Password",
      link: "/password",
      icon: RiLockPasswordLine,
    },
  ];

  const active = "bg-dryGray text-subMain";
  const hover = "hover:text-white hover:bg-main";
  const inActive =
    "rounded font-medium text-sm transitions flex gap-3 items-center p-4";

  const Hover = ({ isActive }) =>
    isActive ? `${active} ${inActive}` : `${inActive} ${hover}`;

  return (
    <Layout>
      <div className="min-h-screen container mx-auto px-2">
        <div className="xl:grid grid-cols-8 gap-10 items-start md:py-12 py-6">
          <div className="col-span-2 sticky bg-dry border border-gray-800 p-6 rounded-md xl:mb-0 mb-5">
            {
              // SideBar Links
              SideLinks.map((link, index) => (
                <NavLink to={link.link} key={index} className={Hover}>
                  <link.icon /> <p>{link.name}</p>
                </NavLink>
              ))
            }
          </div>
          <div
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-display="10"
            data-aos-offset="200"
            className="col-span-6 rounded-md bg-dry border border-gray-800 p-6"
          >
            {children}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default SideBar;
