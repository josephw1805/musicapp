import { Songs } from "../../Data/SongData";
import Song from "../Song";
import Titles from "../Titles";
import { BsCollectionFill } from "react-icons/bs";

function PopularSongs() {
  return (
    <div className="my-16">
      <Titles title="Popular Songs" Icon={BsCollectionFill} />
      <div className="grid sm:mt-12 mt-6 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {Songs.slice(0, 8).map((song, index) => (
          <Song key={index} song={song} />
        ))}
      </div>
    </div>
  );
}

export default PopularSongs;
