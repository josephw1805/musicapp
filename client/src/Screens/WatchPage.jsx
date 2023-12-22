import { Link, useParams } from "react-router-dom";
import Layout from "../Layout/Layout";
import { Songs } from "../Data/SongData";
import { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { FaCloudDownloadAlt, FaPlay } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";

function WatchPage() {
  let { id } = useParams();
  const song = Songs.find((song) => song.id === id);
  const [play, setPlay] = useState(false);

  return (
    <Layout>
      <div className="container mx-auto bg-dry p-6 mb-12">
        <div className="flex-btn flex-wrap mb-6 gap-2 bg-main rounded border border-gray-800 p-6">
          <Link
            to={`/song/${song?.id}`}
            className="md:text-xl text-sm flex gap-3 items-center font-bold text-dryGray"
          >
            <BiArrowBack /> {song?.name}
          </Link>
          <div className="flex-btn sm:w-auto w-full gap-5">
            <button className="bg-white hover:text-subMain transitions bg-opacity-30 text-white rounded px-4 py-3 text-sm">
              <FaHeart />
            </button>
            <button className="bg-subMain flex-rows gap-2 hover:text-main transitions text-white rounded px-8 font-medium py-3 text-sm">
              <FaCloudDownloadAlt /> Download
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
              src={song?.image ?? "/assets/songbackground.png"}
              alt={song?.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        )}
      </div>
    </Layout>
  );
}

export default WatchPage;
