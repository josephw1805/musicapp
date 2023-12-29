import { FaUserFriends } from "react-icons/fa";
import Titles from "../Titles";

function SongArtist({ song }) {
  return (
    song?.artists?.length > 0 && (
      <div className="my-12">
        <Titles title="Artist" Icon={FaUserFriends} />
        <div className="mt-10">
          {song?.artists?.map((artist, index) => (
            <div
              key={index}
              className="w-64 p-3 italic text-xs text-text rounded flex-colo bg-dry border border-gray-800"
            >
              <img
                src={artist?.image}
                alt={artist?.name}
                className="w-64 h-64 object-cover rounded mb-2"
              />
              <p className="font-semibold">{artist?.name}</p>
            </div>
          ))}
        </div>
      </div>
    )
  );
}

export default SongArtist;
