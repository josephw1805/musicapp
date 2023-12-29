import { FaHeart } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LikeSong, SongLiked } from "../Context/Functionalities";

function Song({ song }) {
  const { isLoading } = useSelector((state) => state.userLikeSong);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);

  // check if song is added to favorites
  const isLiked = SongLiked(song);

  return (
    <>
      <div className="border border-border p-1 hover:scale-95 transitions relative rounded overflow-hidden">
        <Link to={`/song/${song?._id}`} className="w-full">
          <img
            src={song?.titleImage}
            alt={song?.name}
            className="w-full h-64 object-cover"
          />
        </Link>
        <div className="absolute flex-btn gap-2 bottom-0 right-0 left-0 bg-main bg-opacity-60 text-white px-4 py-3">
          <h3 className="font-semibold truncate">{song?.name}</h3>
          <button
            onClick={() => LikeSong(song, dispatch, userInfo)}
            disabled={isLiked || isLoading}
            className={`h-9 w-9 text-sm flex-colo transitions 
            ${
              isLiked ? "bg-transparent" : "bg-subMain"
            } hover:bg-transparent border-2 border-subMain rounded-md bg-subMain text-white`}
          >
            <FaHeart />
          </button>
        </div>
      </div>
    </>
  );
}

export default Song;
