import { Empty } from "../Notifications/Empty";
import Song from "../Song";
import Titles from "../Titles";
import { BsCollectionFill } from "react-icons/bs";
import Loader from "../../Components/Notifications/Loader";

function PopularSongs({ isLoading, songs }) {
  return (
    <div className="my-16">
      <Titles title="Popular Songs" Icon={BsCollectionFill} />
      {isLoading ? (
        <Loader />
      ) : songs?.length > 0 ? (
        <div className="grid sm:mt-12 mt-6 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
          {songs?.slice(0, 8).map((song, index) => (
            <Song key={index} song={song} />
          ))}
        </div>
      ) : (
        <div className="mt-6">
          <Empty message="It seem's like we don't have any songs" />
        </div>
      )}
    </div>
  );
}

export default PopularSongs;
