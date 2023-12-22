import Table from "../../../Components/Table2";
import { UsersData } from "../../../Data/UsersData";
import SideBar from "../SideBar";

function Users() {
  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className=" text-xl font-bold">Users</h2>
        </div>

        <Table data={UsersData} users />
      </div>
    </SideBar>
  );
}

export default Users;
