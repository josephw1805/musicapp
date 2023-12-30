import { useDispatch, useSelector } from "react-redux";
import Table from "../../../Components/Table";
import SideBar from "../SideBar";
import { useEffect } from "react";
import {
  deleteAllSongsAction,
  deleteSongAction,
  getAllSongsAction,
} from "../../../Redux/Actions/SongsActions";
import toast from "react-hot-toast";
import { Empty } from "../../../Components/Notifications/Empty";
import Loader from "../../../Components/Notifications/Loader";
import { TbPlayerTrackNext, TbPlayerTrackPrev } from "react-icons/tb";

function SongList() {
  const dispatch = useDispatch();
  const { isLoading, isError, songs, pages, page } = useSelector(
    (state) => state.getAllSongs
  );
  const { isLoading: deleteLoading, isError: deleteError } = useSelector(
    (state) => state.deleteSong
  );
  const { isLoading: deleteAllLoading, isError: deleteAllError } = useSelector(
    (state) => state.deleteAllSongs
  );

  // delete song handler
  const deleteSongHandler = (id) => {
    window.confirm("Are you sure you want to delete this song?") &&
      dispatch(deleteSongAction(id));
  };

  // delete all songs handler
  const deleteAllSongsHandler = () => {
    window.confirm("Are you sure you want to delete all songs?") &&
      dispatch(deleteAllSongsAction());
  };

  useEffect(() => {
    // errors
    if (isError || deleteError || deleteAllError) {
      toast.error(isError || deleteError || deleteAllError);
    }
  }, [dispatch, isError, deleteError, deleteAllError]);

  const nextPage = () => {
    dispatch(
      getAllSongsAction({
        pageNumber: page + 1,
      })
    );
  };

  const prevPage = () => {
    dispatch(
      getAllSongsAction({
        pageNumber: page - 1,
      })
    );
  };

  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className=" text-xl font-bold">Songs List</h2>
          {songs?.length > 0 && (
            <button
              disabled={deleteAllLoading}
              onClick={deleteAllSongsHandler}
              className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded"
            >
              {deleteAllLoading ? "Deleting..." : "Delete All"}
            </button>
          )}
        </div>
        {isLoading || deleteLoading ? (
          <Loader />
        ) : songs?.length > 0 ? (
          <>
            <Table data={songs} admin onDeleteHandler={deleteSongHandler} />
            {/* Loading more */}
            <div className="w-full flex-rows gap-6 my-5">
              <button
                disabled={page === 1}
                onClick={prevPage}
                className="text-white p-2 rounded font-semibold border-2 border-subMain hover:bg-subMain"
              >
                <TbPlayerTrackPrev className="text-xl" />
              </button>
              <button
                disabled={page === pages}
                onClick={nextPage}
                className="text-white p-2 rounded font-semibold border-2 border-subMain hover:bg-subMain"
              >
                <TbPlayerTrackNext className="text-xl" />
              </button>
            </div>
          </>
        ) : (
          <Empty message="You have no songs" />
        )}
      </div>
    </SideBar>
  );
}

export default SongList;
