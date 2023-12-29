import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa6";
import { RiMusic2Line } from "react-icons/ri";
import FlexSongItems from "../FlexSongItems";
import Loader from "../../Components/Notifications/Loader";
import { LikeSong, SongLiked } from "../../Context/Functionalities";

const SwiperComponent = ({ songs }) => {
  const { isLoading } = useSelector((state) => state.userLikeSong);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);

  // check if song is added to favorites
  const isLiked = (song) => {
    return SongLiked(song);
  };

  return (
    <Swiper
      direction="vertical"
      slidesPerView={1}
      loop={true}
      speed={1000}
      modules={[Autoplay]}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      className="w-full flex-colo xl:h-96 bg-dry lg:h-64 h-48"
    >
      {songs.slice(0, 6).map((song, index) => (
        <SwiperSlide key={index} className="relative rounded overflow-hidden">
          <img
            src={song.image}
            alt={song.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute linear-bg xl:pl-52 sm:pl-32 pl-8 top-0 bottom-0 right-0 left-0 flex flex-col justify-center lg:gap-8 md:gap-5 gap-4">
            <h1 className="xl:text-4xl truncate capitalize font-sans md:text-2xl text-xl font-bold">
              {song.name}
            </h1>
            <div className="flex gap-5 items-center text-dryGray">
              <FlexSongItems song={song} />
            </div>
            <div className="flex gap-5 items-center">
              <Link
                to={`/song/${song?._id}`}
                className="bg-subMain hover:text-main transitions text-white px-8 py-3 rounded font-medium sm:text-sm text-xs"
              >
                Play
              </Link>
              <button
                onClick={() => LikeSong(song, dispatch, userInfo)}
                disabled={isLiked(song) || isLoading}
                className={`bg-white ${
                  isLiked(song) ? "text-subMain" : "text-white"
                } hover:text-subMain transitions px-4 py-3 rounded text-sm bg-opacity-30`}
              >
                <FaHeart />
              </button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

function Banner({ songs, isLoading }) {
  return (
    <div className="relative w-full">
      {isLoading ? (
        <div className="w-full flex-colo xl:h-96 bg-dry lg:h-64 h-48">
          <Loader />
        </div>
      ) : songs?.length > 0 ? (
        <SwiperComponent
          className="w-full flex-colo xl:h-96 bg-dry lg:h-64 h-48"
          songs={songs}
        />
      ) : (
        <div className="w-full flex-colo xl:h-96 bg-dry lg:h-64 h-48">
          <div className="flex-colo w-24 h-24 p-5 mb-4 rounded-full bg-dry text-subMain text-4xl">
            <RiMusic2Line />
          </div>
          <p className="text-border text-sm">
            It seem's like we don't have any songs
          </p>
        </div>
      )}
    </div>
  );
}

export default Banner;
