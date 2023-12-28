import { useDispatch, useSelector } from "react-redux";
import Table from "../../../Components/Table2";
import SideBar from "../../../Screens/Dashboard/SideBar";
import { useEffect } from "react";
import {
  getAllUsersAction,
  deleteUserAction,
} from "../../../Redux/Actions/userActions";
import toast from "react-hot-toast";
import Loader from "../../../Components/Notifications/Loader";
import { Empty } from "../../../Components/Notifications/Empty";

function Users() {
  const dispatch = useDispatch();

  const { isLoading, isError, users } = useSelector(
    (state) => state.adminGetAllUsers
  );

  // delete
  const { isError: deleteError, isSuccess } = useSelector(
    (state) => state.adminDeleteUser
  );

  // delete user handler
  const deleteUserHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUserAction(id));
    }
  };

  useEffect(() => {
    dispatch(getAllUsersAction());
    if (isError || deleteError) {
      toast.error(isError || deleteError);
      dispatch({
        type: isError ? "GET_ALL_USERS_RESET" : "DELETE_USER_RESET",
      });
    }
  }, [dispatch, isError, deleteError, isSuccess]);

  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className=" text-xl font-bold">Users</h2>
        </div>
        {isLoading ? (
          <Loader />
        ) : users?.length > 0 ? (
          <Table data={users} users onDeleteFunction={deleteUserHandler} />
        ) : (
          <Empty message="You don't have any users" />
        )}
      </div>
    </SideBar>
  );
}

export default Users;
