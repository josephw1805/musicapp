import { FaCalendarDays, FaMusic } from "react-icons/fa6";

function FlexSongItems({ song }) {
  return (
    <>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">{song.album}</span>
      </div>
      <div className="flex items-center gap-2">
        <FaCalendarDays className="text-subMain w-3 h-3" />
        <span className="text-sm font-medium">{song.year}</span>
      </div>
      <div className="flex items-center gap-2">
        <FaMusic className="text-subMain w-3 h-3" />
        <span className="text-sm font-medium">{song.genre}</span>
      </div>
    </>
  );
}

export default FlexSongItems;
