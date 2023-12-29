import { useDispatch, useSelector } from "react-redux";
import Table from "../../../Components/Table";
import SideBar from "../SideBar";
import { useEffect } from "react";
import { getAllSongsAction } from "../../../Redux/Actions/SongsActions";
import toast from "react-hot-toast";
import { Empty } from "../../../Components/Notifications/Empty";
import Loader from "../../../Components/Notifications/Loader";
import { TbPlayerTrackNext, TbPlayerTrackPrev } from "react-icons/tb";

function SongList() {
  const dispatch = useDispatch();
  const { isLoading, isError, songs, pages, page } = useSelector(
    (state) => state.getAllSongs
  );
  useEffect(() => {
    // errors
    if (isError) {
      toast.error(isError);
    }
    dispatch(getAllSongsAction({}));
  }, [dispatch]);

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
          <button className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded">
            Delete All
          </button>
        </div>
        {isLoading ? (
          <Loader />
        ) : songs?.length > 0 ? (
          <>
            <Table data={songs} admin />
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
