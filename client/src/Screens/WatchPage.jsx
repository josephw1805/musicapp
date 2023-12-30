import { Link, useParams } from "react-router-dom";
import Layout from "../Layout/Layout";
import { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { FaPlay } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { getSongByIdAction } from "../Redux/Actions/SongsActions";
import NotFound from "./NotFound";
import Loader from "../Components/Notifications/Loader";
import { LikeSong, SongLiked } from "../Context/Functionalities";

function WatchPage() {
  let { id } = useParams();
  const dispatch = useDispatch();
  const [play, setPlay] = useState(false);
  const { isLoading, isError, song } = useSelector(
    (state) => state.getSongById
  );

  const { isLoading: likeLoading } = useSelector((state) => state.userLikeSong);
  const { userInfo } = useSelector((state) => state.userLogin);

  // check if song is added to favorites
  const isLiked = SongLiked(song);

  useEffect(() => {
    // song id
    dispatch(getSongByIdAction(id));
  }, [dispatch, id]);

  return (
    <Layout>
      {isLoading ? (
        <div className="w-full gap-6 flex-colo min-h-screen">
          <Loader />
        </div>
      ) : isError ? (
        <NotFound />
      ) : (
        <div className="container mx-auto bg-dry p-6 mb-12">
          <div className="flex-btn flex-wrap mb-6 gap-2 bg-main rounded border border-gray-800 p-6">
            <Link
              to={`/song/${song?._id}`}
              className="md:text-xl text-sm flex gap-3 items-center font-bold text-dryGray"
            >
              <BiArrowBack /> {song?.name}
            </Link>
            <div className="flex-btn sm:w-auto w-full">
              <button
                onClick={() => LikeSong(song, dispatch, userInfo)}
                disabled={isLiked || likeLoading}
                className={`bg-white hover:text-subMain ${
                  isLiked ? "text-subMain" : "text-white"
                } transitions bg-opacity-30 rounded px-4 py-3 text-sm`}
              >
                <FaHeart />
              </button>
            </div>
          </div>

          {/* watch video */}
          {play ? (
            <video
              controls
              autoPlay={play}
              controlsList="nodownload"
              className="w-full h-header rounded"
            >
              <source src={song?.video} type="video/mp4" title={song?.name} />
            </video>
          ) : (
            <div className="w-full h-header rounded-lg overflow-hidden relative">
              <div className="absolute top-0 left-0 bottom-0 right-0 bg-main bg-opacity-30 flex-colo">
                <button
                  onClick={() => setPlay(true)}
                  className="bg-white text-subMain flex-colo border border-subMain rounded-full w-20 h-20 font-medium text-xl"
                >
                  <FaPlay />
                </button>
              </div>
              <img
                src={song?.image}
                alt={song?.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          )}
        </div>
      )}
    </Layout>
  );
}

export default WatchPage;
