import { NavLink } from "react-router-dom";
import { BsCollectionPlay } from "react-icons/bs";
import { FiHeart, FiUserCheck } from "react-icons/fi";
import { CgMenuBoxed } from "react-icons/cg";
import MenuDrawer from "../../Components/MenuDrawer";
import { useContext } from "react";
import { SidebarContext } from "../../Context/DrawerContext";
import { useSelector } from "react-redux";

function MobileFooter() {
  const { likedSongs } = useSelector((state) => state.userGetFavoriteSongs);
  const { userInfo } = useSelector((state) => state.userLogin);
  const active = "bg-white text-main";
  const inActive =
    "transitions text-2xl flex-colo hover:bg-white hover:text-main rounded-md px-4 py-3";

  const Hover = ({ isActive }) =>
    isActive ? `${active} ${inActive}` : inActive;

  const { openDrawer, closeDrawer, mobileDrawer } = useContext(SidebarContext);

  return (
    <>
      <MenuDrawer closeDrawer={closeDrawer} mobileDrawer={mobileDrawer} />
      <footer className="lg:hidden fixed z-50 bottom-0 w-full px-1">
        <div className="bg-dry rounded-md flex-btn w-full p-1">
          <NavLink to="/songs" className={Hover}>
            <BsCollectionPlay />
          </NavLink>
          <NavLink to="/favorites" className={Hover}>
            <div className="relative">
              <FiHeart />
              {userInfo && <div className="w-5 h-5 flex-colo rounded-full text-xs bg-subMain text-white absolute -top-5 -right-1">
                {likedSongs?.length ?? 0}
              </div>}
            </div>
          </NavLink>
          <NavLink
            to={
              userInfo
                ? userInfo.isAdmin
                  ? "/dashboard"
                  : "/profile"
                : "/login"
            }
            className={Hover}
          >
            <FiUserCheck />
          </NavLink>
          {/* Mobile Menu */}
          <button className={inActive} onClick={openDrawer}>
            <CgMenuBoxed />
          </button>
        </div>
      </footer>
    </>
  );
}

export default MobileFooter;
