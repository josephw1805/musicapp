import { Input } from "../../Components/UsedInput";
import SideBar from "./SideBar";

const Password = () => {
  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">Change Password</h2>
        <Input
          label="Old Password"
          placeholder="Enter your old password"
          type="password"
          bg
        />
        <Input
          label="New Password"
          placeholder="Enter your new password"
          type="password"
          bg
        />
        <Input
          label="Confirm Password"
          placeholder="Enter your new password again"
          type="password"
          bg
        />
        <div className="flex justify-end items-center my-4">
          <button className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto">
            Change Password
          </button>
        </div>
      </div>
    </SideBar>
  );
};

export default Password;
