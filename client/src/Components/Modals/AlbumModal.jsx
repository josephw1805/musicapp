import { useDispatch, useSelector } from "react-redux";
import { Input } from "../UsedInput";
import MainModal from "./MainModal";
import { useEffect, useState } from "react";
import {
  createAlbumAction,
  updateAlbumAction,
} from "../../Redux/Actions/AlbumsActions";
import toast from "react-hot-toast";

function AlbumModal({ modalOpen, setModalOpen, album }) {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const dispatch = useDispatch();

  const { isLoading, isError, isSuccess } = useSelector(
    (state) => state.albumCreate
  );
  const {
    isLoading: upLoading,
    isError: upError,
    isSuccess: upSuccess,
  } = useSelector((state) => state.albumUpdate);

  // album handler
  const submitHandler = (e) => {
    e.preventDefault();
    if (title || genre || releaseDate) {
      // if album is not empty then update album else create album
      if (album) {
        dispatch(updateAlbumAction(album?._id, title, genre, releaseDate));
        setModalOpen(!modalOpen);
      } else {
        dispatch(createAlbumAction(title, genre, releaseDate));
        setTitle("");
        setGenre("");
        setReleaseDate("");
        setModalOpen(!modalOpen);
      }
    } else {
      toast.error("Please fill all the fields to create an album");
    }
  };

  useEffect(() => {
    // error
    if (upError || isError) {
      toast.error(upError || isError);
      dispatch({ type: isError ? "CREATE_ALBUM_RESET" : "UPDATE_ALBUM_RESET" });
    }

    // success
    if (isSuccess || upSuccess) {
      dispatch({ type: isError ? "CREATE_ALBUM_RESET" : "UPDATE_ALBUM_RESET" });
    }

    // if album is not null then set title, genre and release date
    if (album) {
      setTitle(album?.title);
      setGenre(album?.genre);
      setReleaseDate(album?.releaseDate);
    }

    // if modal is closed then set title, genre and release date to empty
    if (!modalOpen) {
      setTitle("");
      setGenre("");
      setReleaseDate("");
    }
  }, [isError, isSuccess, upSuccess, upError, album, modalOpen]);

  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className="inline-block sm:w-4/5 border border-border md:w-3/5 lg:w-2/5 w-full align-middle p-10 overflow-y-auto h-full bg-main text-white rounded-2xl">
        <h2 className="text-3xl font-bold">{album ? "Update" : "Create"}</h2>
        <form
          className="flex flex-col gap-6 text-left mt-6"
          onSubmit={submitHandler}
        >
          <Input
            label="Title"
            placeholder="Enter album title"
            type="text"
            bg={false}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            label="Genre"
            placeholder="Enter album genre"
            type="text"
            bg={false}
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
          <Input
            label="Release Date"
            placeholder="DD MM YYYY"
            type="text"
            bg={false}
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
          />
          <button
            disabled={isLoading || upLoading}
            type="submit"
            className="w-full flex-rows gap-4 py-3 font-lg hover:bg-dry transitions border-2 border-subMain rounded bg-subMain text-white"
          >
            {isLoading || upLoading
              ? "Loading...."
              : album
              ? "Update"
              : "Create"}
          </button>
          <button
            type="button"
            className="w-full flex-rows gap-4 py-3 font-lg hover:bg-subMain transitions border-2 border-subMain rounded bg-dry text-white"
            onClick={() => setModalOpen(false)}
          >
            Cancel
          </button>
        </form>
      </div>
    </MainModal>
  );
}

export default AlbumModal;
