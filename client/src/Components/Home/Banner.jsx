import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Songs } from "../../Data/SongData";
import FlexSongItems from "../FlexSongItems";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa6";

function Banner() {
  return (
    <div className="relative w-full">
      <Swiper
        direction="vertical"
        slidesPerView={1}
        loop={true}
        speed={1000}
        modules={[Autoplay]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        className="w-full xl:h-96 bg-dry lg:h-64 h-48"
      >
        {Songs.slice(0, 6).map((song, index) => (
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
                  to={`/song/${song?.id}`}
                  className="bg-subMain hover:text-main transitions text-white px-8 py-3 rounded font-medium sm:text-sm text-xs"
                >
                  Play
                </Link>
                <button className="bg-white hover:text-subMain transitions text-white px-4 py-3 rounded text-sm bg-opacity-30">
                  <FaHeart />
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Banner;
