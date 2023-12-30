import { useDispatch, useSelector } from "react-redux";
import Table from "../../Components/Table";
import SideBar from "./SideBar";
import { useEffect } from "react";
import {
  deleteFavoriteSongsAction,
  getFavoriteSongsAction,
} from "../../Redux/Actions/userActions";
import toast from "react-hot-toast";
import Loader from "../../Components/Notifications/Loader";
import { Empty } from "../../Components/Notifications/Empty";

function FavoritesSongs() {
  const dispatch = useDispatch();
  const { isLoading, isError, likedSongs } = useSelector(
    (state) => state.userGetFavoriteSongs
  );

  // delete
  const {
    isLoading: deleteLoading,
    isError: deleteError,
    isSuccess,
  } = useSelector((state) => state.userDeleteFavoriteSongs);

  // delete song handler
  const deleteSongsHandler = () => {
    window.confirm("Are you sure you want to delete all favorite songs?") &&
      dispatch(deleteFavoriteSongsAction());
  };

  useEffect(() => {
    dispatch(getFavoriteSongsAction());
    if (isError || deleteError) {
      toast.error(isError || deleteError);
      dispatch({
        type: isError
          ? "GET_FAVORITE_SONGS_RESET"
          : "DELETE_FAVORITE_SONGS_RESET",
      });
    }
  }, [dispatch, isError, deleteError, isSuccess]);

  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className=" text-xl font-bold">Favorites Songs</h2>
          {likedSongs?.length > 0 && (
            <button
              disabled={deleteLoading}
              onClick={deleteSongsHandler}
              className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded"
            >
              {deleteLoading ? "Deleting..." : "Delete All"}
            </button>
          )}
        </div>

        {isLoading ? (
          <Loader />
        ) : likedSongs?.length > 0 ? (
          <Table data={likedSongs} admin={false} />
        ) : (
          <Empty message="You have no favorite songs" />
        )}
      </div>
    </SideBar>
  );
}

export default FavoritesSongs;
