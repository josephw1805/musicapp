import { useEffect, useState } from "react";
import AlbumModal from "../../../Components/Modals/AlbumModal";
import Table from "../../../Components/Table2";
import SideBar from "../SideBar";
import { HiPlusCircle } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../Components/Notifications/Loader";
import { Empty } from "../../../Components/Notifications/Empty";
import { deleteAlbumAction, getAlbumsAction } from "../../../Redux/Actions/AlbumsActions";
import toast from "react-hot-toast";

function Albums() {
  const [modalOpen, setModalOpen] = useState(false);
  const [album, setAlbum] = useState();
  const dispatch = useDispatch();

  // all albums
  const { albums, isLoading } = useSelector((state) => state.albumGetAll);
  // delete album
  const { isSuccess, isError } = useSelector((state) => state.albumDelete);
  const adminDeleteAlbum = (id) => {
    if (window.confirm("Are you sure you want to delete this album?")) {
      dispatch(deleteAlbumAction(id));
    }
  };

  const OnEditFunction = (id) => {
    setAlbum(id);
    setModalOpen(!modalOpen);
  };

  useEffect(() => {
    dispatch(getAlbumsAction())
    if (isError) {
      toast.error(isError);
      dispatch({ type: "DELETE_ALBUM_RESET" });
    }
    if (isSuccess) {
      dispatch({ type: "DELETE_ALBUM_RESET" });
    }

    if (!modalOpen) {
      setAlbum();
    }
  }, [modalOpen, dispatch, isSuccess, isError]);

  return (
    <SideBar>
      <AlbumModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        album={album}
      />
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className=" text-xl font-bold">Albums</h2>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-subMain flex-rows gap-4 font-medium transitions hover:bg-main border border-subMain text-white py-2 px-4 rounded"
          >
            <HiPlusCircle /> Create
          </button>
        </div>

        {isLoading ? (
          <Loader />
        ) : albums?.length > 0 ? (
          <Table
            data={albums}
            users={false}
            OnEditFunction={OnEditFunction}
            onDeleteFunction={adminDeleteAlbum}
          />
        ) : (
          <Empty message="You have no albums" />
        )}
      </div>
    </SideBar>
  );
}

export default Albums;
