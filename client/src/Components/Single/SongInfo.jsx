import { FaCloudDownloadAlt, FaPlay, FaShareAlt } from "react-icons/fa";
import FlexSongItems from "../FlexSongItems";
import { Link } from "react-router-dom";
import Rating from "../Stars";

function SongInfo({ song, setModalOpen, DownloadSongVideo, progress }) {
  return (
    <div className="w-full xl:h-screen relative text-white">
      <img
        src={song?.image}
        alt={song?.name}
        className="w-full hidden xl:inline-block h-full object-cover"
      />
      <div className="xl:bg-main bg-dry flexcolo xl:bg-opacity-90 xl:absolute top-0 left-0 right-0 bottom-0">
        <div className="container px-3 mx-auto 2xl:px-32 xl:grid grid-cols-3 flex-colo py-10 lg:py-20 gap-8">
          <div className="xl:col-span-1 w-full xl:order-none order-last h-header bg-dry border border-gray-800 rounded-lg overflow-hidden">
            <img
              src={song?.titleImage}
              alt={song?.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="col-span-2 md:grid grid-cols-5 gap-4 items-center">
            <div className="col-span-3 flex flex-col gap-10">
              {/* Title */}
              <h1 className="xl:text-4xl capitalize font-sans text-2xl font-bold">
                {song?.name}
              </h1>
              {/* flex items */}
              <div className="flex items-center gap-4 font-medium text-dryGray">
                <div className="flex-colo bg-subMain text-xs px-2 py-1">
                  320 Kbps
                </div>
                <FlexSongItems song={song} />
              </div>
              {/* description */}
              <p className="text-text text-sm leading-7">{song?.desc}</p>
              <div className="grid sm:grid-cols-5 grid-cols-3 gap-4 p-6 bg-main border border-gray-800 rounded-lg">
                {/* share */}
                <div className="col-span-1 flex-colo border-r border-border">
                  <button
                    onClick={() => setModalOpen(true)}
                    className="w-10 h-10 flex-colo rounded-lg bg-white bg-opacity-20"
                  >
                    <FaShareAlt />
                  </button>
                </div>
                {/* language */}
                <div className="col-span-2 flex-colo font-medium text-sm">
                  <p>
                    Language :
                    <span className="ml-2 truncate">{song?.language}</span>
                  </p>
                </div>
                {/* watch button */}
                <div className="sm:col-span-2 col-span-3 flex justify-end font-medium text-sm">
                  <Link
                    to={`/watch/${song?._id}`}
                    className="bg-dry py-4 hover:bg-subMain transitions border-2 border-subMain rounded-full flex-rows gap-4 w-full sm:py-3"
                  >
                    <FaPlay className="w-3 h-3" /> Watch
                  </Link>
                </div>
              </div>
              {/* ratings */}
              <div className="flex mb-6 text-lg gap-2 text-star">
                <Rating value={song?.rate} />
              </div>
            </div>
            <div className="col-span-2 md:mt-0 mt-2 flex justify-end">
              <button
                onClick={() => DownloadSongVideo(song?.video, song?.name)}
                disabled={progress}
                className="md:w-1/4 w-full relative flex-colo bg-subMain hover:bg-transparent border-2 border-subMain transitions md:h-64 h-20 rounded font-medium"
              >
                <div className="flex-rows gap-6 text-base uppercase tracking-widest absolute md:rotate-90">
                  Download
                  <FaCloudDownloadAlt className="w-6 h-6 md:-rotate-90" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SongInfo;
