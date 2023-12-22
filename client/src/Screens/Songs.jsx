import Filters from "../Components/Filters";
import Layout from "../Layout/Layout";
import { Songs } from "../Data/SongData";
import Song from "../Components/Song";
import { useState } from "react";
import { CgSpinner } from "react-icons/cg";

function SongsPage() {
  const maxPage = 10;
  const [page, setPage] = useState(maxPage);
  const HandleLoadingMore = () => {
    setPage(page + maxPage);
  };

  return (
    <Layout>
      <div className="min-height-screen container mx-auto px-2 my-6">
        <Filters />
        <p className="text-lg font-medium my-6">
          Total
          <span className="font-bold text-subMain"> {Songs?.length} </span>
          items found
        </p>
        <div className="grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-6">
          {Songs.slice(0, page)?.map((song, index) => (
            <Song key={index} song={song} />
          ))}
        </div>
        {/* Loading more */}
        <div className="w-full flex-colo md:my-20 my-10">
          <button
            onClick={HandleLoadingMore}
            className="flex-rows gap-3 text-white py-3 px-8 rounded font-semibold border-2 border-subMain"
          >
            Loading More <CgSpinner className="animate-spin" />
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default SongsPage;
