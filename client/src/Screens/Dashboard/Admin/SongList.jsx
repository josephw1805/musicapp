import Table from "../../../Components/Table";
import { Songs } from "../../../Data/SongData";
import SideBar from "../SideBar";


function SongList() {
  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className=" text-xl font-bold">Songs List</h2>
          <button className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded">
            Delete All
          </button>
        </div>

        <Table data={Songs} admin />
      </div>
    </SideBar>
  );
}

export default SongList;
