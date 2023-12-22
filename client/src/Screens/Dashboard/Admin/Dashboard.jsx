import { FaRegListAlt } from "react-icons/fa";
import { MdLibraryMusic } from "react-icons/md";
import { FaUsers } from "react-icons/fa6";

import Table from "../../../Components/Table";
import { Songs } from "../../../Data/SongData";
import { AlbumsData } from "../../../Data/AlbumsData";
import { UsersData } from "../../../Data/UsersData";
import SideBar from "../SideBar";

function Dashboard() {
  const DashboardData = [
    {
      bg: "bg-orange-600",
      icon: FaRegListAlt,
      title: "Total Songs",
      total: Songs.length,
    },
    {
      bg: "bg-blue-700",
      icon: MdLibraryMusic,
      title: "Total Albums",
      total: AlbumsData.length,
    },
    {
      bg: "bg-green-600",
      icon: FaUsers,
      title: "Total Users",
      total: UsersData.length,
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

      <Table data={Songs.slice(0, 5)} admin />
    </SideBar>
  );
}

export default Dashboard;
