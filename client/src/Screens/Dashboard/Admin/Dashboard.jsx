import { FaRegListAlt } from "react-icons/fa";
import { MdLibraryMusic } from "react-icons/md";
import { FaUsers } from "react-icons/fa6";
import Table from "../../../Components/Table";
import SideBar from "../SideBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllUsersAction } from "../../../Redux/Actions/userActions";
import toast from "react-hot-toast";
import Loader from "../../../Components/Notifications/Loader";
import { Empty } from "../../../Components/Notifications/Empty";
import { deleteSongAction } from "../../../Redux/Actions/SongsActions";

function Dashboard() {
  const dispatch = useDispatch();

  const { isLoading, isError, songs, totalSongs } = useSelector(
    (state) => state.getAllSongs
  );
  const {
    isLoading: albumLoading,
    isError: albumError,
    albums,
  } = useSelector((state) => state.albumGetAll);
  const {
    isLoading: userLoading,
    isError: userError,
    users,
  } = useSelector((state) => state.adminGetAllUsers);
  const { isLoading: deleteLoading, isError: deleteError } = useSelector(
    (state) => state.deleteSong
  );

  // delete song handler
  const deleteSongHandler = (id) => {
    window.confirm("Are you sure you want to delete this song?") &&
      dispatch(deleteSongAction(id));
  };

  useEffect(() => {
    // get all users
    dispatch(getAllUsersAction());
    // errors
    if (isError || albumError || userError || deleteError) {
      toast.error("Something went wrong");
    }
  }, [dispatch, isError, albumError, userError, deleteError]);

  // dashboard data
  const DashboardData = [
    {
      bg: "bg-orange-600",
      icon: FaRegListAlt,
      title: "Total Songs",
      total: isLoading ? "Loading..." : totalSongs ?? 0,
    },
    {
      bg: "bg-blue-700",
      icon: MdLibraryMusic,
      title: "Total Albums",
      total: albumLoading ? "Loading..." : albums?.length ?? 0,
    },
    {
      bg: "bg-green-600",
      icon: FaUsers,
      title: "Total Users",
      total: userLoading ? "Loading..." : users?.length ?? 0,
    },
  ];
  return (
    <SideBar>
      <h2 className="text-xl font-bold">Dashboard</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {DashboardData.map((data, index) => (
          <div
            key={index}
            className="p-4 rounded bg-main border-border grid grid-cols-4 gap-2"
          >
            <div
              className={`col-span-1 rounded-full h-12 w-12 flex-colo ${data.bg}`}
            >
              <data.icon />
            </div>
            <div className="col-span-3">
              <h2>{data.title}</h2>
              <p className="mt-2 font-bold">{data.total}</p>
            </div>
          </div>
        ))}
      </div>
      <h3 className="text-md font-medium italic my-6 text-border">
        Recent Songs
      </h3>
      {isLoading || deleteLoading ? (
        <Loader />
      ) : songs?.length > 0 ? (
        <Table
          data={songs.slice(0, 5)}
          admin
          onDeleteHandler={deleteSongHandler}
        />
      ) : (
        <Empty message="Empty" />
      )}
    </SideBar>
  );
}

export default Dashboard;
