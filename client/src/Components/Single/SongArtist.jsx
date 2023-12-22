import { FaUserFriends } from "react-icons/fa";
import Titles from "../Titles";

function SongArtist() {
  return (
    <div className="my-12">
      <Titles title="Artist" Icon={FaUserFriends} />
      <div className="mt-10">
        <div className="w-64 p-3 italic text-xs text-text rounded flex-colo bg-dry border border-gray-800">
          <img
            src="/assets/artist.png"
            alt="artist"
            className="w-64 h-64 object-cover rounded mb-2"
          />
          <p className="font-semibold">Cyndi Wang</p>
        </div>
      </div>
    </div>
  );
}

export default SongArtist;
